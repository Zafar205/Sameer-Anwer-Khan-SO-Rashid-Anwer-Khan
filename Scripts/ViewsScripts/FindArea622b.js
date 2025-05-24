var urban = "UrbanFindArea";
$(document).ready(function () {
    $('#RuralDivFindArea').hide();
    $('#UrbanDivFindArea').hide();
    $('#UrbanGridData').hide();
    $('#RuralGridData').hide();
    $("#MouzaFindArea").kendoAutoComplete();
    $("#PropertyAreaFindArea").kendoAutoComplete();
    var advSearchWindow = $('#advanceSearchContent');
    var advSearch = $('#advSearch');
    advSearch.click(function () {
        advSearchWindow.data("kendoWindow").center().open();
        resetAdvControls();
        advSearch.fadeOut();       
        window.parent.$("#LandAreaWindow").data("kendoWindow").close();        
    });

    function onClose() {
        $(".k-invalid-msg").hide();
        initializeDistricts();
        // resetAdvControls(); 
      //  $('.floating-label').hide();
         advSearch.fadeIn();
     //   $("#advanceSearchContent").data("kendoWindow").close();
        $("#LandAreaWindow").data("kendoWindow").center().open();
    }

    advSearchWindow.kendoWindow({
        width: "1200px",
     //   heigth: "1000px",
        title: AdvanceSearch,
        visible: false,
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    }).data("kendoWindow");

});

function resetAdvControls(source) {
    // $('.floating-label').show();
    $(".k-invalid-msg").hide();
    $('#advSearchData').hide();
    $('#advSearchDataGrid').hide();
    ResetTextBox('khasratxt');
    ResetTextBox('squaretxt');
    ResetTextBox('qillatxt');
    if (source !== 'rdb') {
        $("#districtDropdownAdvSearch").val("").data("kendoDropDownList").text(selectDistrictText);
        $("#tehsilDropdownAdvSearch").val("").data("kendoDropDownList").text(selectTehsilText);
        $("#qanoongoeeDropdownAdvSearch").val("").data("kendoDropDownList").text(SelectQanoongoeeText);
        $("#mouzaDropdownAdvSearch").val("").data("kendoDropDownList").text(SelectMouzaText);
    }
}

function onChangeDistrictAdvSearch() {
    var districtId = $("#districtDropdownAdvSearch").val();
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TehsilsByDistrictId?id=' + districtId, selectTehsilText, "tehsilDropdownAdvSearch");
    $("#tehsilDropdownAdvSearch").val("").data("kendoDropDownList").text(selectTehsilText);
    $("#qanoongoeeDropdownAdvSearch").val("").data("kendoDropDownList").text(SelectQanoongoeeText);
    $("#mouzaDropdownAdvSearch").val("").data("kendoDropDownList").text(SelectMouzaText);
}

function onChangeTehsilAdvSearch() {
    var tehsilId = $("#tehsilDropdownAdvSearch").val();
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + tehsilId, SelectQanoongoeeText, "qanoongoeeDropdownAdvSearch");
    $("#qanoongoeeDropdownAdvSearch").val("").data("kendoDropDownList").text(SelectQanoongoeeText);
    $("#mouzaDropdownAdvSearch").val("").data("kendoDropDownList").text(SelectMouzaText);
}

function onChangeQanoongoeeAdvSearch() {
    var qanoongoeeId = $("#qanoongoeeDropdownAdvSearch").val();
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByQanoonGoId?id=' + qanoongoeeId, SelectMouzaText, "mouzaDropdownAdvSearch");
    $("#mouzaDropdownAdvSearch").val("").data("kendoDropDownList").text(SelectMouzaText);
}


function initializeDistricts() {
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownFindArea");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownAdvSearch");
    initializeDropDown(null, selectTehsilText, "tehsilDropdownAdvSearch");
    initializeDropDown(null, SelectQanoongoeeText, "qanoongoeeDropdownAdvSearch");
    initializeDropDown(null, SelectMouzaText, "mouzaDropdownAdvSearch");
    initiallizeAndSetDataGrid();
    ResetTextBox('khasratxt');
    ResetTextBox('squaretxt');
    ResetTextBox('qillatxt');
    if ($('#districtDropdownAdvSearch').data("kendoDropDownList") != null)
        $('#districtDropdownAdvSearch').data("kendoDropDownList").value(selectDistrictText);
}

function onChangeDistrictFindArea() {
    var $radio = $('input[name=LandTypeFindLand]:checked');
    var id = $radio.attr('id');
    $("#MouzaFindArea").data("kendoAutoComplete").value("");
    $("#PropertyAreaFindArea").data("kendoAutoComplete").value("");
    $("#RuralDivFindArea").hide();
    $("#UrbanDivFindArea").hide();
    $('#UrbanGridData').hide();
    $('#RuralGridData').hide();
    if (id == urban) {
        $('#UrbanDivFindArea').show();
        $('#RuralDivFindArea').hide();
        populatePropertyAreaAutoComplete();
    }
    else {
        $('#RuralDivFindArea').show();
        $('#UrbanDivFindArea').hide();
        populateMouzaAutoComplete();
    }
}

function populatePropertyAreaAutoComplete() {
    var districtId = $("#districtDropdownFindArea").val();
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/FindArea/GetAllPropertyAreasByDistrictId/?districtId=' + districtId,
        type: 'POST',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function (listofPropertyAreas) {
            var autocomplete = $("#PropertyAreaFindArea").data("kendoAutoComplete");
            var valid = false;
            if (autocomplete != null) {
                autocomplete.destroy();
            }
            $("#PropertyAreaFindArea").kendoAutoComplete({
                dataSource: listofPropertyAreas,
                filter: "startswith",
                highlightFirst: true,
                open: function (e) {
                    valid = false;
                },
                select: function (e) {
                    valid = true;
                    var selectedOne = this.dataItem(e.item.index());
                    console.log(kendo.stringify(selectedOne));
                    showUrbanHeirarchyFindArea(selectedOne, districtId);
                },
                close: function (e) {
                    // if no valid selection - clear input
                    if (!valid) this.value('');
                    valid = false;
                },
                change: function (e) {
                    if (!valid) this.value('');
                },
            });

        },
        error: function (data) {
            var response = data.responseText.replace(/"/g, '');
            console.log(response);
        }
    });
}

function populateMouzaAutoComplete() {
    var districtId = $("#districtDropdownFindArea").val();
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/FindArea/GetAllMouzasByDistrictId/?districtId=' + districtId,
        type: 'POST',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function (listofMouzas) {
            var autocomplete = $("#MouzaFindArea").data("kendoAutoComplete");
            var valid = false;
            if (autocomplete != null) {
                autocomplete.destroy();
            }
            $("#MouzaFindArea").kendoAutoComplete({
                dataSource: listofMouzas,
                filter: "startswith",
                highlightFirst: true,
                open: function (e) {
                    valid = false;
                },
                select: function (e) {
                    valid = true;
                    var selectedOne = this.dataItem(e.item.index());
                    console.log(kendo.stringify(selectedOne));
                    showRuralHeirarchyFindArea(selectedOne, districtId);
                },
                close: function (e) {
                    // if no valid selection - clear input
                    if (!valid) this.value('');
                    valid = false;
                },
                change: function (e) {
                    if (!valid) this.value('');

                },
            });

        },
        error: function (data) {
            var response = data.responseText.replace(/"/g, '');
            console.log(response);

        }
    });
}

function OnClickFindLand() {
    $("#LandAreaWindow").data("kendoWindow").center().open();
    initializeDistricts();
}

function onLandAreaClose() {
    resetLandAreaForm();
}

function resetLandAreaForm() {
    $("#districtDropdownFindArea").val("").data("kendoDropDownList").text(selectDistrictText);
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownFindArea");
    $("#MouzaFindArea").data("kendoAutoComplete").value("");
    $("#PropertyAreaFindArea").data("kendoAutoComplete").value("");
    $("#RuralDivFindArea").hide();
    $("#UrbanDivFindArea").hide();
    $('#UrbanGridData').hide();
    $('#RuralGridData').hide();
}

function showHierarchyFindArea() {
    resetLandAreaForm();
    $("#RuralDivFindArea").hide();
    $("#UrbanDivFindArea").hide();

}

function showUrbanHeirarchyFindArea(PropertyAreaName, district_id) {
    initilizeUrbanHeirarchyGrids();
    $('#UrbanGridData').show();
    $('#RuralGridData').hide();

    $.ajax({
        url: base_url_service_layer + '/api/Proxy/FindArea/GetUrbanHeirarchy?PropertyAreaName=' + encodeURIComponent(PropertyAreaName) + '&district_id=' + encodeURIComponent(district_id),
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        success: function (data) {

            var HeirarchyList = [];

            for (i = 0; i < data.length; i++) {
                var heirarchyListdata =
                    {
                        District: data[i].District,
                        Tehsil: data[i].Tehsil,
                        Town: data[i].Town,
                        RevenueCircle: data[i].RevenueCircle,
                        PropertyArea: data[i].PropertyArea
                    }
                HeirarchyList.push(heirarchyListdata);
            }
            $('#UrbanHeirarchyListGrid').data('kendoGrid').dataSource.data(HeirarchyList);
            $('#UrbanHeirarchyListGrid').data('kendoGrid').refresh();

            $('#UrbanGridData').show();
            $('#RuralGridData').hide();
            $('#UrbanHeirarchyListGrid').show();

        },
        error: function (data) {
            $('#UrbanGridData').hide();
            $('#UrbanHeirarchyListGrid').hide();
        }
    });
}

function initilizeUrbanHeirarchyGrids() {
    var HeirarchyList = [];
    $("#UrbanHeirarchyListGrid").kendoGrid({
        dataSource: {
            data: HeirarchyList,
            schema: {
                model: {
                    fields: {
                        District: { type: "string" },
                        Tehsil: { type: "string" },
                        Town: { type: "string" },
                        RevenueCircle: { type: "string" },
                        PropertyArea: { type: "string" }
                    }
                }
            },
            //pageSize: 5
        },
        scrollable: true,
        sortable: false,
        filterable: false,
        pageable: false,

        columns: [
             { field: "District", title: District, width: "250px" },
            { field: "Tehsil", title: Tehsil, width: "250px" },
              { field: "Town", title: Town, width: "250px" },
           { field: "RevenueCircle", title: RevenueCircle, width: "250px" },
           { field: "PropertyArea", title: PropertyArea, width: "250px" },
        ]
    });
}

function showRuralHeirarchyFindArea(MouzaName, districtId) {
    initilizeRuralHeirarchyGrids();
    $('#RuralGridData').show();
    $("#UrbanDivFindArea").hide();

    $.ajax({
        url: base_url_service_layer + '/api/Proxy/FindArea/GetRuralHeirarchy/?MouzaName=' + encodeURIComponent(MouzaName) + '&district_id=' + encodeURIComponent(districtId),
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        success: function (data) {

            var HeirarchyList = [];

            for (i = 0; i < data.length; i++) {
                var heirarchyListdata =
                    {
                        District: data[i].District,
                        Tehsil: data[i].Tehsil,
                        Qanoongoee: data[i].Qanoongoee,
                        Mouza: data[i].Mouza
                    }
                HeirarchyList.push(heirarchyListdata);
            }

            $('#ruralHeirarchyListGrid').data('kendoGrid').dataSource.data(HeirarchyList);
            $('#ruralHeirarchyListGrid').data('kendoGrid').refresh();

            $('#RuralGridData').show();
            $('#UrbanGridData').hide();
            $('#ruralHeirarchyListGrid').show();

        },
        error: function (data) {
            $('#RuralGridData').hide();
            $('#ruralHeirarchyListGrid').hide();
        }
    });
}

function initilizeRuralHeirarchyGrids() {
    var HeirarchyList = [];
    $("#ruralHeirarchyListGrid").kendoGrid({
        dataSource: {
            data: HeirarchyList,
            schema: {
                model: {
                    fields: {
                        District: { type: "string" },
                        Tehsil: { type: "string" },
                        Qanoongoee: { type: "string" },
                        Mouza: { type: "string" }
                    }
                }
            },
            //pageSize: 5
        },

        scrollable: true,
        sortable: false,
        filterable: false,
        pageable: false,

        columns: [
             { field: "District", title: District, width: "250px" },
            { field: "Tehsil", title: Tehsil, width: "250px" },
           { field: "Qanoongoee", title: QanoonGoee, width: "250px" },
           { field: "Mouza", title: Mouza, width: "250px" },

        ]
    });
}

function onAreaCloseActivate() {

}

function onClickAdvanceSearch()
{
   // $("#AdvanceSearchWindow").data("kendoWindow").center().open();
  //  window.parent.$("#LandAreaWindow").data("kendoWindow").close();
   
}

function KhasraClick()
{
    $('#textboxes').show();
    $('#rowkhasratxt').show();
    $('#sqtextboxes').hide();
}

function sqClick()
{
    $('#rowkhasratxt').hide();
    //  $('#sqtextboxes').css("Visibility", "visible");
    $('#sqtextboxes').show();
}

function advanceSearchRecord()
{
   // .kendoValidator().data('kendoValidator').validate();
    var res1 = $("#districtDropdownAdvSearch").kendoValidator().data('kendoValidator').validate();
    var res2 = $('#tehsilDropdownAdvSearch').kendoValidator().data('kendoValidator').validate();
    var res3 = $('#khasratxt').kendoValidator().data('kendoValidator').validate();
    var res4 = $('#squaretxt').kendoValidator().data('kendoValidator').validate();
    var res5 = $('#qillatxt').kendoValidator().data('kendoValidator').validate();
    //if (res1 == false || res2 == false)
    //{
    //    return;
    //}
    var distId = $("#districtDropdownAdvSearch").val();
    var tehId = $("#tehsilDropdownAdvSearch").val();
    var qanoongoeeId = $("#qanoongoeeDropdownAdvSearch").val();
    var mouzaId = $("#mouzaDropdownAdvSearch").val();
    var txtkhasra = $("#khasratxt").val();
    var txtSqrno = $("#squaretxt").val();
    var txtQillaNo = $("#qillatxt").val();
    var $option = $('input[name=advanceSRd]:checked');
    var id = $option.attr('id');
    $('#waitModal').modal();
    if (id == 'sqno') {
        if ( false == res4 || false == res5 || false == res1 || false == res2  )//(txtSqrno == '' || txtSqrno == null) && (txtQillaNo == '' || txtQillaNo == null))
        {
           // $(".k-icon k-warning").show();
          //  $('#SquareNoErr').text('Square No is required'); $('#SquareNoErr').show();
            //  $('#QillaNoErr').text('Qilla No is required'); $('#QillaNoErr').show();
            $("#waitModal").modal('hide');
            return;
        } else {
            initiallizeAndSetDataGrid();
            $('#advSearchData').hide();
            $.ajax({
                url: base_url_service_layer + '/api/Proxy/FindArea/ShowHierarchyBySquareQilla?district=' + distId + '&tehsil=' + tehId
                    + '&qanoongoee=' + qanoongoeeId + '&mouza=' + mouzaId + '&square=' + txtSqrno + '&qilla=' + txtQillaNo,
                type: 'POST',
                dataType: 'json',
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    $('#advSearchDataGrid').data('kendoGrid').dataSource.data(data);
                    $('#advSearchDataGrid').data('kendoGrid').refresh();
                    $('#advSearchData').show();
                    $('#advSearchDataGrid').show();
                    $("#waitModal").modal('hide');
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    //$('#norecordfound').show();
                    //$('#norecordfound').html("No Record Found");
                    $("#waitModal").modal('hide');                   
                    $('#dialogButton').click();
                    $('#DialogueStatus').html('Error');
                    $('#dialogMessage').html('No Record Found');
                    $("#waitModal").modal('hide');
                }
            });

        }

    } else if (id == 'khasra') {
        if (false == res3 || false == res1 || false == res2)// (txtkhasra == '' || txtkhasra == null)
        {
            //$('#khasraNoErr').text('Khasra No is required');$('#khasraNoErr').show();
            $("#waitModal").modal('hide');
            return;
        } else {
            initiallizeAndSetDataGrid();
            $('#advSearchData').hide();
            $.ajax({
                url: base_url_service_layer + '/api/Proxy/FindArea/ShowHierarchyByKhasra?district=' + distId + '&tehsil=' + tehId
                    + '&qanoongoee=' + qanoongoeeId + '&mouza=' + mouzaId + '&khasra=' + txtkhasra,
                type: 'POST',
                dataType: 'json',
                contentType: "application/json;charset=utf-8",
                success: function (data) {                                       
                    $('#advSearchDataGrid').data('kendoGrid').dataSource.data(data);
                    $('#advSearchDataGrid').data('kendoGrid').refresh();
                    $('#advSearchData').show();
                    $('#advSearchDataGrid').show();
                    $("#waitModal").modal('hide');
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    //$('#norecordfound').show();
                    //$('#norecordfound').html("No Record Found");
                    $("#waitModal").modal('hide');
                    $('#dialogButton').click();
                    $('#DialogueStatus').html('Error');
                    $('#dialogMessage').html('No Record Found');
                    $("#waitModal").modal('hide');

                }
            });
        }
    }
}

//District, Tehsil, QanoonGo, Mouza, Khasra/Square No, Qilla No, Land Classification, Location
function initiallizeAndSetDataGrid()
{
    var Srcdata = [];
   $("#advSearchDataGrid").kendoGrid({
        dataSource: {
            data: Srcdata,
            schema: {
                model: {
                    fields: {
                        District: { type: "string" },
                        Tehsil: { type: "string" },
                        QanoonGoee: { type: "string" },
                        Mouza: { type: "string" },
                        Khasra: { type: "string" },
                        SquareNo: { type: "string" },
                        QillaNo: { type: "string" },
                        LandClassification: { type: "string" },
                        Location: {type:"string"}
                    }
                }
            },
            pageSize: 10
        },
        scrollable: true,
        sortable: false,
        filterable: false,
        pageable: true,
        columns: [
             { field: "District", title: District,  width: "100px" },
             { field: "Tehsil", title: Tehsil , width: "120px" },
             { field: "QanoonGoee", title: QanoonGoee, width: "150px" },
             { field: "Mouza", title: Mouza ,  width: "100px" },
             { field: "Khasra", title: Khasra ,  width: "100px" },
             { field: "SquareNo", title: SquareNo , width: "100px" },
             { field: "QillaNo", title: QillaNo , width: "100px" },
             { field: "LandClassification", title: LandClassification , width: "150px" },
             { field: "Location", title: Location , width: "120px" },
        ],
    });
}

function txtInputchange(source)
{
    if(source == 'khasra')
    {

    } else if (source == 'qilla') {

    } else if (source == 'square') {

    }
}
function ResetTextBox(id) {

    $("#" + id).val("");
    $("#" + id).removeClass("empty");
    $("#" + id).addClass("empty");
}

function urduToEnglish_FindArea() {
    $("#landTypeFindArea").html("Select Land Type");
    $("#UrbanLblFindArea").html("Urban");
    $("#RuralLblFindArea").html("Rural");
    $("#advanceSearchHeadingFindArea").html("Advance Search");
    $("#districtLblFindArea").html("District");
    $("#mouzaLblFindArea").html("Mouza");
    $("#propertyAreaLblFindArea").html("Property Area");
    $("#districtFloatingLblFindArea").html("District");
    $("#tehsilFloatingLblFindArea").html("Tehsil");
    $("#qanoonGoeeFloatingLblFindArea").html("Qanoongoee");
    $("#mouzaFloatingLblFindArea").html("Mouza");
    $("#khasraLblFindArea").html("Khasra");
    $("#squareQilaLblFindArea").html("Square No. / Qilla No.");
    changeFloatingLabelOfElement("khasratxt", "Khasra");
    changeFloatingLabelOfElement("squaretxt", "Square No");
    changeFloatingLabelOfElement("qillatxt", "Qilla No");
    changeFloatingLabelOfElement("squaretxt", "Square No");
}

function englishToUrdu_FindArea() {
    $("#landTypeFindArea").html('<span style="font-family:MehrNastaliqWeb;">زمین کی قسم منتخب کریں</span>');
    $("#UrbanLblFindArea").html('<span style="font-family:MehrNastaliqWeb;">شہری</span>');
    $("#RuralLblFindArea").html('<span style="font-family:MehrNastaliqWeb;">دیہاتی</span>');
    $("#advanceSearchHeadingFindArea").html('<span style="font-family:MehrNastaliqWeb;">ایڈوانس سرچ</span>');
    $("#districtLblFindArea").html('<span style="font-family:MehrNastaliqWeb;">ضلع</span>');
    $("#mouzaLblFindArea").html('<span style="font-family:MehrNastaliqWeb;">موضع</span>');
    $("#propertyAreaLblFindArea").html('<span style="font-family:MehrNastaliqWeb;">پراپرٹی ایریا</span>');
    $("#districtFloatingLblFindArea").html('<span style="font-family:MehrNastaliqWeb;">ضلع</span>');
    $("#tehsilFloatingLblFindArea").html('<span style="font-family:MehrNastaliqWeb;">تحصیل</span>');
    $("#qanoonGoeeFloatingLblFindArea").html('<span style="font-family:MehrNastaliqWeb;">قانون گو</span>');
    $("#mouzaFloatingLblFindArea").html('<span style="font-family:MehrNastaliqWeb;">موضع</span>');
    $("#khasraLblFindArea").html('<label style="padding-left:0px; font-family:MehrNastaliqWeb;">خسرہ</label>');
    $("#squareQilaLblFindArea").html('<label style="padding-left:0px; font-family:MehrNastaliqWeb;">اسکوائر/قلعہ نمبر</label>');
    changeFloatingLabelOfElement("khasratxt", "خسرہ");
    changeFloatingLabelOfElement("squaretxt", "اسکوائرنمبر");
    changeFloatingLabelOfElement("qillatxt", "قلعہ نمبر");
    changeFloatingLabelOfElement("squaretxt", "اسکوائرنمبر");
}

