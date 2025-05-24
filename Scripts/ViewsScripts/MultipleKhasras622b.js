

/*

MouzaIdGlobal, QanoongoidGlobal, MouzaNameGlobal, multipleKhasrasSelected are defined in parent js file

*/


var multipleKhasraDCRateType = ""; // "All Rate Applied" | Highest Rate Applied
var multipleKhasraList = [];

//var allRatesApplied = "All Rate Applied";
//var highestRateApplied = "Highest Rate Applied";
//var highestRateApplieedFlag = true;
//var allRatesAppliedFlag = false;
//var DCRateUnit = "";
//var propertyDCValue = "";
var DCRateKhasra = "";
//var landArea = 1;
var selectedKhasraID = "";
var selectedKhasraTreatAsUrban = false;
var DCRateSqft = "";





$(document).ready(function () {

    //multipleKhasraDCRateType = allRatesApplied;
    
    //initializeGridsMultipleKhasras();
    //initializeHighestRateGrid();
    initializeAllRateGrid();
    //initializeDropDown("", selectLocationText, "AddKhasraLocation");
    //$("#AddKhasraLocation").data("kendoDropDownList").value(selectLocationText);
    // Test Code
    //var khasra = { KhasraNo: "1", LandArea: 1, LandAreaUnit: "Marla" };
    //var khasra2 = { KhasraNo: "2", LandArea: 2, LandAreaUnit: "Marla" };

    //multipleKhasraList.push(khasra);
    //multipleKhasraList.push(khasra2);

    //reset();
    
});



function initializeHighestRateGrid() {

    var khasrasList = [];
    $("#highestRateAppliedGrid").kendoGrid({
        dataSource: {
            data: khasrasList,
            pageSize: 10,
            schema: {
                model: {
                    fields: {
                        KhasraId: { type: "string" },
                        TreatAsUrban: { type: "string" },
                        KhasraNo: { type: "string" },
                        LandClassification: { type: "string" },
                        LandClassificationId: { type: "string" },
                        LandLocation: { type: "string" },
                        DCRate: { type: "string" },
                        RateUnit: { type: "string" },
                        PropertyDCValue: { type: "string" },
                        SqftRate: {type: "string"},
                    }
                }
            },
        },

        scrollable: true,
        sortable: false,
        filterable: false,
        pageable: true,


        columns: [
            { field: "KhasraId", hidden: true, width: "0px" },
            { field: "TreatAsUrban", hidden: true, width: "0px" },
                { field: "KhasraNo", title: KhasraNoPeriod, width: "250px" },
                { field: "LandClassification", title: LandClassification, width: "250px" },
                { field: "LandClassificationId", hidden:true, width: "0px" },
                { field: "LandLocation", title: LandLocation, width: "250px" },
                { field: "DCRate", title: "DC Valuation Rate", width: "250px" },
                { field: "RateUnit", title: AreaUnit, width: "250px" },
                { field: "PropertyDCValue", title: PropertyDCValue, hidden: true, width: "250px" },
				{ field: "SqftRate", title: SquareFtRate, hidden:true },
                {
                    field: "Action",

                    command: [
                    {
                        name: "Delete",
                        text: "",
                        
                        imageClass: "fa fa-trash",
                        click: _handleHighestRateDelete
                       
                    }
                    ], width: "250px"
                    
                    //command: [
                    //{
                    //    name: "Delete",
                    //    //className: "delete-btn-center-adjustment custom-btn ",
                    //    //imageClass: "fa fa-trash",
                    //    //click: openDeleteUserWindow
                    //}
                    //], width: "10%"
                }
        ]
    });

    
}



var kWindow = $('#deleteConfirmationWindow').kendoWindow({
    width: "500px",
    title: "Delete Khasra",
    visible: false
}).data('kendoWindow');

$('.yesbtn').click(function () {
    var grid = $('#allRatesAppliedGrid').data('kendoGrid');
    console.log('Khasra Deleted from Grid');
    grid.dataSource.remove(dataitem);
    kWindow.close();
});

$('.nobtn').click(function () {
    dataitem = {};
    kWindow.close();
});

function _handleHighestRateDelete(event) {
    if (!(kWindow.element.is(":visible"))) {
        var grid = $('#highestRateAppliedGrid').data('kendoGrid');
        dataitem = grid.dataItem($(event.currentTarget).closest("tr"));
        kWindow.center().open();
    }
};
function GetKhasraListForGrid() {
    //multipleKhasraList
    var khasrasList = [];
    for (i = 0; i < multipleKhasraList.length; i++) {
        if (multipleKhasraList[i] != null) {
            var rate;
            if (typeof (multipleKhasraList[i].KhasraRate) == "string") {
                rate = parseFloat(multipleKhasraList[i].KhasraRate.replace(/,/g, ''));
            }
            else {
                rate = multipleKhasraList[i].KhasraRate;
            }
            var area = multipleKhasraList[i].LandArea;
            //var khasraGrid =
            //{
            //    KhasraId: multipleKhasraList[i].KhasraId,
            //    TreatAsUrban: multipleKhasraList[i].TreatAsUrban,
            //    KhasraNo: multipleKhasraList[i].KhasraNo,
            //    LandClassification: multipleKhasraList[i].LandClassification,
            //    LandLocation: multipleKhasraList[i].Location,
            //    LandClassificationId: multipleKhasraList[i].LandClassificationId,
            //    DCRate: returnCommas(multipleKhasraList[i].KhasraRate),
            //    LandArea: multipleKhasraList[i].LandArea,
            //    RateUnit: multipleKhasraList[i].LandAreaUnit,
            //    PropertyDCValue: returnCommas(rate * area),
            //};

            var khasraGrid = {
                DistrictId: multipleKhasraList[i].DistrictId,
                TalukaId: multipleKhasraList[i].TalukaId,
                FloorId: multipleKhasraList[i].FloorId,
                BasementId: multipleKhasraList[i].BasementId,
                PropertyAreaId: multipleKhasraList[i].PropertyAreaId,
                LandClassification: multipleKhasraList[i].LandClassification,
                LandClassificationId: multipleKhasraList[i].LandClassificationId,
                LandCategory: multipleKhasraList[i].LandCategory,
                LandCategoryId: multipleKhasraList[i].LandCategoryId,
                DCCabniteRate: multipleKhasraList[i].DCCabniteRate,
                DCStructureRate: multipleKhasraList[i].DCStructureRate,
                LandArea: multipleKhasraList[i].LandArea,
                CoveredArea: multipleKhasraList[i].CoveredArea,
                RateUnit: multipleKhasraList[i].RateUnit,
                PropertyDCValue: multipleKhasraList[i].PropertyDCValue,
            };

            khasrasList.push(khasraGrid);
        }
    }

    return khasrasList;
}

function initializeAllRateGrid() {
   // var khasra = { KhasraNo: "1", LandArea: 1, AreaUnit: "Marla" };
    var khasrasList = [];
  //  khasrasList.push(khasra);
    $("#allRatesAppliedGrid").kendoGrid({
        dataSource: {
            data: khasrasList,
            pageSize: 14,
            schema: {
                model: {
                    fields: {
                        DistrictId: { type: "string" },
                        TalukaId: { type: "string" },
                        FloorId: { type: "string" },
                        BasementId: { type: "string" },
                        PropertyAreaId: { type: "string" },
                        LandClassification: { type: "string" },
                        LandClassificationId: { type: "string" },
                        LandCategory: { type: "string" },
                        LandCategoryId: { type: "string" },
                        DCCabniteRate: { type: "string" },
                        DCStructureRate: { type: "string" },
                        LandArea: { type: "string" },
                        CoveredArea: { type: "string" },
                        RateUnit: { type: "string" },
                        PropertyDCValue: { type: "string" },
                       
                    }
                }
            },
        },

        scrollable: true,
        sortable: false,
        filterable: false,
        pageable: true,


        columns: [
            
                { field: "DistrictId", hidden: true, width: "0px" },
                { field: "TalukaId", hidden: true, width: "0px" },
                { field: "PropertyAreaId", hidden: true, width: "0px" },
               
                { field: "LandClassification", title: "Classification", width: "100px" },
                { field: "LandClassificationId", hidden: true, width: "0px" },
                 { field: "LandCategory", title: "Category", width: "100px" },
                { field: "LandCategoryId", hidden: true, width: "0px" },
                { field: "FloorId", title: "Floors", width: "100px" },
                { field: "BasementId", title: "Basements", width: "100px" },
                { field: "DCCabniteRate", title: "Valuation Rate", width: "150px" },
                { field: "DCStructureRate", title: "Structure Rate", width: "150px" },
                { field: "LandArea", title: "Land Area", width: "100px" },
                { field: "CoveredArea", title: "Covered Area", width: "150px" },
                { field: "RateUnit", title: "Rate Unit", width: "100px" },
                { field: "PropertyDCValue", title: "Property Value", width: "150px" },               
                {
                    field: "Action",

                    command: [
                        {
                            name: "Delete",
                            text:"",
                            
                            imageClass: "fa fa-trash",
                            click: _handleAllRatesAppliedDelete
                            //imageClass: "fa fa-trash",
                        }
                    ], width: "100px"
                }

        ]
    });
}


var kWindow2 = $('#deleteConfirmationWindow').kendoWindow({
    width: "500px",
    title: "Delete Khasra",
    visible: false
}).data('kendoWindow');


$('.yesbtn').click(function () {
    var grid = $('#allRatesAppliedGrid').data('kendoGrid');
    console.log('Khasra Deleted from Grid');
    grid.dataSource.remove(dataitem);
    kWindow2.close();
});


$('.nobtn').click(function () {
    dataitem = {};
    kWindow2.close();
});

function _handleAllRatesAppliedDelete(event) {
    if (!(kWindow2.element.is(":visible"))) {
        var grid = $('#allRatesAppliedGrid').data('kendoGrid');
        dataitem = grid.dataItem($(event.currentTarget).closest("tr"));
        kWindow2.open().center();
    }
};


function actionOnAddKhasraLandClassificationChanged() {
    $("#AddKhasraAutoComplete").val("");
    $("#AddKhasraAutoComplete").text("");
    $("#addKhasraLandAreaValue").val("");
    $("#addKhasraLandAreaValue").text("");

    $('#addKhasraLandValueDC').html('');
    $('#landAreaUnitValue').html('');
    $('#DCRateValue').html('');
    disableButton("btnAddMultipleKhasraInGrid"); 
    populateAddKhasraLocationByMouzaId();
}

function actionOnAddKhasraLocationOnChange() {
    $("#AddKhasraAutoComplete").val("");
    $("#AddKhasraAutoComplete").text("");
    $("#addKhasraLandAreaValue").val("");
    $("#addKhasraLandAreaValue").text("");

    $('#addKhasraLandValueDC').html('');
    $('#landAreaUnitValue').html('');
    $('#DCRateValue').html('');
    disableButton("btnAddMultipleKhasraInGrid");
    populateKhasrasAutoComplete();
}


function populateAddKhasraLocationByMouzaId() {
    var landClassificationId = $("#AddKhasraLandClassification").val();
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=' + encodeURIComponent(MouzaNameGlobal) + "&QanoonGoId=" + QanoongoidGlobal + "&landClassificationId=" + landClassificationId, selectLocationText, "AddKhasraLocation");
    $("#AddKhasraLocation").data("kendoDropDownList").value(selectLocationText);
}


function populateKhasrasAutoComplete() {

    var Mouzaid = MouzaIdGlobal;
    var Qanoongoid = QanoongoidGlobal;
    var LandClassificationid = $("#AddKhasraLandClassification").val();
    var LocationString = $("#AddKhasraLocation").data("kendoDropDownList").text()
    var MouzaName = MouzaNameGlobal;

    var mouzaViewModel = {
        MouzaId: Mouzaid,
        QanoonGoId: Qanoongoid,
        LandClassificationId: LandClassificationid,
        LocationString: LocationString,
        MouzaName: MouzaName,
        KhasraNo: '',
        SquareNo: '',
        QilaNo: ''
    }

    $.ajax({
        url: base_url_service_layer + '/api/Proxy/Locations/KhasrasByLandInfo',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(
            mouzaViewModel
        ),

        success: function (listOfKhasras) {
            $("#Khasra_validationMessage").hide();
            var autocomplete = $("#AddKhasraAutoComplete").data("kendoAutoComplete");
            if (autocomplete != null) {
                autocomplete.destroy();
            }
            var valid = false;
            $("#AddKhasraAutoComplete").kendoAutoComplete({
                dataTextField: "KhasraNo",
                dataSource: listOfKhasras,
                filter: "startswith",
                //placeholder: "Select Khasra",
                highlightFirst: true,
                select: function (e) {
                    valid = true;
                    $("#Khasra_validationMessage").hide();
                    var selectedOne = this.dataItem(e.item.index());
                    selectedKhasraID = selectedOne.KhasraId;
                    var landUnit = selectedOne.KhasraRateUnit;
                    selectedKhasraTreatAsUrban = selectedOne.TreatAsUrban;
                    if (landUnit != null) {
                        setLandUnit(landUnit);
                    }
                    var GMapString = selectedOne.GMapSearchKey;//Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
                    var DefaultGMapString = null;//Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
                    var KmlDBUrl = selectedOne.DB_KML_URL;

                    //LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);

                    //onKhasraNumberChange();

                },
                open: function (e) {
                    valid = false;
                },
                close: function (e) {
                    // if no valid selection - clear input
                    if (!valid) this.value('');
                    valid = false;
                },
                change: function (e) {
                    if (!valid) this.value('');
                    enableButton("btnFindRateMultipleKhasra");
                    disableButton("btnAddMultipleKhasraInGrid");
                },
            });
        },
        error: function (data) {
            var response = data.responseText.replace(/"/g, '');
        }
    });


    function setLandUnit(rateUnit) {

        if (rateUnit != null && rateUnit != "") {
            document.getElementById("landAreaUnitValue").innerHTML = rateUnit;
        }
        else {
            document.getElementById("landAreaUnitValue").innerHTML = "&nbsp;";
        }
    }


}




//function initializeGridsMultipleKhasras() {

//    $("#allRatesAppliedGrid").kendoGrid({
//        dataSource: {
//            data: multipleKhasraList,
//            schema: {
//                model: {
//                    fields: {
//                        KhasraNo: { type: "string" },
//                        LandArea: { type: "string" },
//                        LandAreaUnit: { type: "string" },
//                    }
//                }
//            },
//        },

//        scrollable: false,
//        sortable: false,
//        filterable: false,
//        pageable: false,
//        height: 650,

//        columns: [
//            { field: "KhasraNo", title: "Khasra Number", width: "200px" },
//            { field: "LandArea", title: "Land Area", width: "250px" },
//            { field: "LandAreaUnit", title: "Land Area Unit", width: "250px" },
//        ]
//    });

//}

function onMultipleKhasrasClose()
{
    reset();
}

function onMultipleKhasrasCloseActivate() {
    if (multipleKhasraDCRateType == highestRateApplied)
    {
        var khasrasList = GetKhasraListForGrid();

        for (var i = 0; i < khasrasList.length; i++) {

            SetGridData(khasrasList[i], "highestRateAppliedGrid");
        }

        allRatesAppliedFlag = false;
        highestRateApplieedFlag = true;

        $('#highestRateAppliedRadioBtn').prop('checked', true);
        $('#allRatesAppliedRadioBtn').prop('checked', false);

    }
    else if (multipleKhasraDCRateType == allRatesApplied) {
        var khasrasList = GetKhasraListForGrid();

        for (var i = 0; i < khasrasList.length; i++) {

            SetGridData(khasrasList[i], "allRatesAppliedGrid");
        }

        allRatesAppliedFlag = true;
        highestRateApplieedFlag = false;

        $('#highestRateAppliedRadioBtn').prop('checked', false);
        $('#allRatesAppliedRadioBtn').prop('checked', true);

        $("#PropertyAreaQuantity").hide();
        $("#PropertyAreaQuantityLabel").hide();
        $("#PropertyAreaQuantity").text("");
        $("#PropertyAreaQuantity").val("");
    }
    
}

function reset()
{
    
}

function CloseWindowMultipleKhasras() {
   // addKhasrasToList();
    $("#MultipleKhasrasWindow").data("kendoWindow").close();
}

function resetMultipleKhasraScreen() {
    resetMultipleKhasraUIScreen();
   // if (multipleKhasraList.length == 0) {
        multipleKhasraList = [];
   // }
    multipleKhasraDCRateType = "";
    multipleKhasrasSelected = false;
}

function resetMultipleKhasraUIScreen() { 
   
    allRatesAppliedFlag = true;
    clearGridData("allRatesAppliedGrid");
   // clearGridData("highestRateAppliedGrid");
    //$("#highestRateAppliedGridDiv").hide();
    $("#allRatesAppliedGridDiv").hide();
    $("#multipleKhasraListError").text("");
    $(".k-invalid-msg").hide();
}




function addKhasrasToList() {
   // if (multipleKhasraList.length == 0) {
        multipleKhasraList = [];
  //  }
    
    var displayedData;
    var Land_for_mean = 0;
        displayedData = $("#allRatesAppliedGrid").data().kendoGrid.dataSource._data;
        multipleKhasraDCRateType = allRatesApplied;
        var CabinetRate = 0;
        var StructureRate = 0;
        var TotalPropertyVlue = 0;
        var FloorId = 0;
        var BasementId = 0;
        var Covered_Area = 0;
        var Land_Area = 0; 
        var land_unit = '';
        var structure_unit = '';
        var PropertyValue_land = 0;
        var PropertyValue_structure = 0; 
    var gridLength = displayedData.length;
    if (gridLength > 1) {
        for (i = 0; i < gridLength ; i++) {
            CabinetRate += parseFloat(returnCommas(displayedData[i].DCCabniteRate).replace(/,/g, ''));
            StructureRate += parseFloat(returnCommas(displayedData[i].DCStructureRate).replace(/,/g, ''));
            TotalPropertyVlue += parseFloat(returnCommas(displayedData[i].PropertyDCValue).replace(/,/g, ''));
            if (parseFloat(returnCommas(displayedData[i].DCCabniteRate).replace(/,/g, '')) > 0) {
                land_unit = displayedData[i].RateUnit;
                if (isDCValueNotFirst) {
                        
                    PropertyValue_land += parseFloat(returnCommas(displayedData[i].PropertyDCValue).replace(/,/g, ''));

                }
            }
            if (parseFloat(returnCommas(displayedData[i].DCStructureRate).replace(/,/g, '')) > 0) {
                structure_unit = displayedData[i].RateUnit;
                if (isDCValueNotFirst && displayedData[i].CoveredArea != '') {
                    PropertyValue_structure += parseFloat(returnCommas(displayedData[i].PropertyDCValue).replace(/,/g, ''));
                  }
            }
            //var Land_for_mean = 0; 
            if (displayedData[i].LandClassificationId == 2 || displayedData[i].LandClassificationId == 7 || displayedData[i].LandClassificationId == 5) {

                if (displayedData[i].LandClassificationId == 5 && displayedData[i].CoveredArea == '') {
                    Land_for_mean+=1;
                }
                else if (displayedData[i].LandClassificationId == 2 || displayedData[i].LandClassificationId == 7) {

                    Land_for_mean += 1;

                } else {
                    Land_for_mean = Land_for_mean; 
                }
            }

             
           

            var khasra = {
                DistrictId: displayedData[i].DistrictId,
                TalukaId: displayedData[i].TalukaId,
                FloorId: displayedData[i].FloorId,
                BasementId: displayedData[i].BasementId,
                PropertyAreaId: displayedData[i].PropertyAreaId,
                LandClassification: displayedData[i].LandClassification,
                LandClassificationId: displayedData[i].LandClassificationId,
                LandCategory: displayedData[i].LandCategory,
                LandCategoryId: displayedData[i].LandCategoryId,
                DCCabniteRate: returnCommas(displayedData[i].DCCabniteRate) ,
                DCStructureRate: displayedData[i].DCStructureRate,
                LandArea:displayedData[i].LandArea,
                CoveredArea: displayedData[i].CoveredArea,
                RateUnit: displayedData[i].RateUnit,
                PropertyDCValue: displayedData[i].PropertyDCValue,
            }
            multipleKhasraList.push(khasra);
            if (isDCValueNotFirst) {
                challan.propertyInfo.MultipleKhasras = multipleKhasraList;
            }
        }
        multipleKhasrasSelected = true;
        if (isDCValueNotFirst) {
            challan.propertyInfo.multipleKhasrasSelected = multipleKhasrasSelected;
        }
        document.getElementById("rateValue").innerHTML = returnCommas(CabinetRate);
        document.getElementById("LandUnit").innerHTML = " Per " + land_unit;
        document.getElementById("LandUnitStructure").innerHTML = " Per " + structure_unit;
       
       
        if (isDCValueNotFirst) {
            //if (Land_for_mean == 3) {
            //    PropertyValue_land = PropertyValue_land / 3; 
            //}
            if (PropertyValue_land > 0) {
                if (Land_for_mean == 0) {
                    Land_for_mean = 1; 
                }
                PropertyValue_land = PropertyValue_land / Land_for_mean;
            } else {
                PropertyValue_land = 0; 
            }
            document.getElementById("DCValueId").innerHTML = returnCommas(Math.ceil(PropertyValue_land));
            document.getElementById("StructureValueId").innerHTML = returnCommas(Math.ceil(PropertyValue_structure));
            document.getElementById("DCRateSqFt2").innerHTML = returnCommas(StructureRate);
            
            $('#DcValuationRateNextButton').prop("disabled", false);
        } else {
            //if (Land_for_mean == 3) {
            //    TotalPropertyVlue = TotalPropertyVlue / 3;
            //}
            if (Land_for_mean == 0) {
                Land_for_mean = 1; 
            }
            TotalPropertyVlue = TotalPropertyVlue / Land_for_mean;
            document.getElementById("DCValueId").innerHTML = returnCommas(Math.ceil(TotalPropertyVlue));
            document.getElementById("DCRateSqFt").innerHTML = returnCommas(StructureRate);

        }
       // alert(isDCValueNotFirst); 
       // setDCRateSectionToDefault();
        CloseWindowMultipleKhasras();
        $('#findRateButton').prop("disabled", true);
    }
    else
    {
        $("#multipleKhasraListError").text(Pleaseselectatleasttwokhasras);
        //show error
    }
}


function setDCRateSectionToDefault() {
    $("#DCValueId").text('0');
    $("#rateValue").html('0');
    $("#DCRateSqFt").html('Rs. 0');
    $("#LandUnit").html('');
    disableButton("DcValuationRateNextButton");
}

function ShowBasementFieldMulti() {

    if ($('#districtDropdownDC').val() == 1 && ($("#CategoriesUrbanMultiproperty  option:selected").text() == "I" || $("#CategoriesUrbanMultiproperty  option:selected").text() == "II" || $("#CategoriesUrbanMultiproperty  option:selected").text() == "III" || $("#CategoriesUrbanMultiproperty  option:selected").text() == "IV")) {

        if ($("#BasementsDropdownDCMultiproperty").val() > 0) {
            $("#CoveredAreaRateBasementsMultiproperty").val(0);
            $("#CoveredAreaRateBasementsMultiproperty").show();
            enableButton("btnFindRateMultipleKhasra");
            disableButton("btnAddMultipleKhasraInGrid")
        } else {
            $("#CoveredAreaRateBasementsMultiproperty").hide();
        }
    }

}

function resetAddMultipleKhasrasScreen() {

    resetKendoDropDown("LandClassificationUrbanMultiproperty", selectlandClassificationText);
    resetKendoDropDown("CategoriesUrbanMultiproperty", SelectLandCategoryText);
    resetKendoDropDown("FlDropdownDCMultiproperty", selectFloorText);
    resetKendoDropDown("BasementsDropdownDCMultiproperty", selectBasementText);

    $("#CoveredAreaQuantityMultiproperty").val("");    
    $("#BasementCoveredAreaQuantityMultiproperty").val("");
    $("#PropertyAreaQuantityMultiproperty").val("");     
    $('#TotalMultipropertyResult').html('');
    $('#DCRateSqFtMultiproperty').html('');
    $('#DCValueIdMultiproperty').html('');
    $('#LandUnitOfAreaMultiproperty').html('');
    $('#LandUnitOfAreaMultiproperty').html('');
    disableButton("btnAddMultipleKhasraInGrid");
    disableButton("btnFindRateMultipleKhasra");
    $(".k-invalid-msg").hide();

}


function resetKendoDropDown(id, text) {
    if ($('#' + id).data("kendoDropDownList") != null)
        $('#' + id).data("kendoDropDownList").value(text);
}



function pullDataFromKendoList(listId, list) {
    //var data = $("#"+listId).data("kendoDropDownList");
    //for (var item in data.dataSource._data) {
    //    list.push(this.item);
    //}


    var grid = $("#" + listId).data("kendoDropDownList");

    var ds = grid.dataSource;
    var len = grid.dataSource.data().length;
    if (len > 0) {
        var i;

        for (i = 0; i < len; i++) {
            
            var val = grid.dataSource.data()[i];
            
            list.push(val);
        }
    }
}

function SetGridData(gridData, id, reportScope) {
    $('#' + id + 'Div').show();
    $('#' + id).data('kendoGrid').dataSource.add(gridData);
    var grid = $('#' + id).data("kendoGrid");
    grid.dataSource.query({
        page: 1,
        pageSize: 10
    });
    $('#' + id).data('kendoGrid').refresh();
}


function SetReportGrids(d, reportScope) {
    $('#highestRateAppliedGridDiv').show();
    $("#highestRateAppliedGrid").data('kendoGrid').dataSource.add(d);
    //$("#highestRateAppliedGrid").data('kendoGrid').dataSource.data(d);
    //$('#highestRateAppliedGrid').data('kendoGrid').setDataSource(d);
    var grid = $("#highestRateAppliedGrid").data("kendoGrid");
    grid.dataSource.query({
        page: 1,
        pageSize: 10
    });
    $('#highestRateAppliedGrid').data('kendoGrid').refresh();
}


function AddKhasraToGrid() {
   // $("#DCValueIdMultiproperty").html("0");
    var gridData;
    var NoKhasraError = true;
    DC_Cabnite_Rate = document.getElementById("rateValueMultiproperty").innerHTML;
    DC_Cabnite_Rate = parseFloat(DC_Cabnite_Rate.replace(/,/g, ''));
    DC_Structure_Rate = document.getElementById("DCRateSqFtMultiproperty").innerHTML
    DC_Structure_Rate = parseFloat(DC_Structure_Rate.replace(/,/g, ''));
    var DistrictId = $("#districtDropdownDC").val();
    var TalukaId = $("#talukaDropdownDC").val();
    var PropertyAreaId = $("#PropertyArea").val();
    var Floors_id = $("#FlDropdownDCMultiproperty").val();
    var Bassement_id = $("#BasementsDropdownDCMultiproperty").val(); 
    var LandClassification = $("#LandClassificationUrbanMultiproperty").data("kendoDropDownList").text();
    var LandClassificationId = $("#LandClassificationUrbanMultiproperty").val();
    var LandCategory = $("#CategoriesUrbanMultiproperty").data("kendoDropDownList").text();
    var LandCategoryId = $("#CategoriesUrbanMultiproperty").val();
    var LandArea = $("#PropertyAreaQuantityMultiproperty").val(); 
    var DCCabniteRate = DC_Cabnite_Rate;
    var DCStructureRate = DC_Structure_Rate;
  
    var CoveredArea = $("#CoveredAreaQuantityMultiproperty").val();
    var RateUnit = document.getElementById("LandUnitOfAreaCoveredMultiproperty").innerHTML; 
    var PropertyDCValue = document.getElementById("TotalMultipropertyResult").innerHTML;
    //var LandClassificationString = $("#AddKhasraLandClassification").data("kendoDropDownList").text();
    //var LandClassificationId = $("#AddKhasraLandClassification").val();
    //var LocationString = $("#AddKhasraLocation").data("kendoDropDownList").text();
    //var KhasraNumber = $("#AddKhasraAutoComplete").val();
    //var landArea = "";
    if (DCCabniteRate > 0) {

        LandArea = LandArea;
    } else {
        LandArea = 0; 
    }
    if (DCStructureRate > 0) {

        CoveredArea = CoveredArea;
    } else {
        CoveredArea = 0;
    }

    //var selectedClassification = $("#AddKhasraLandClassification").data("kendoDropDownList").text();
    //var landAreaAdded = $("#addKhasraLandAreaValue").val();
    //var landUnitAreaText = $("#landAreaUnitValue").text().trim();

    var isfromRateOfChallanView = "false";
    isfromRateOfChallanView = $("#IsRateOfChallanView").val();

    
    
    var khasra = {
        DistrictId: DistrictId,
        TalukaId: TalukaId,
        FloorId: Floors_id,
        BasementId:Bassement_id,
        PropertyAreaId: PropertyAreaId,
        LandClassification: LandClassification,
        LandClassificationId: LandClassificationId,
        LandCategory: LandCategory,
        LandCategoryId: LandCategoryId,
        DCCabniteRate: DCCabniteRate,
        DCStructureRate:DCStructureRate , 
        LandArea: LandArea,
        CoveredArea: CoveredArea,
        RateUnit: RateUnit,
        PropertyDCValue: PropertyDCValue,
    };
    
        gridData = $("#allRatesAppliedGrid").data().kendoGrid.dataSource._data;
        var gridLength = gridData.length;
       
       
        if (NoKhasraError) {
            SetGridData(khasra, "allRatesAppliedGrid");
        }
    

   
    if (NoKhasraError) {
        CloseAddMultipleKhasrasWindow();
    }
}
    




function OpenWindowMultipleKhasras() {
   // alert(multipleKhasraList.length); 
   // alert(isDCNextFirstScreen); 
   
    $("#rateOfChallanMultipleKhasraError").html('');
    DistrictNameGlobal = $('#districtDropdownDC').data("kendoDropDownList").text();
    DistrictIdGlobal = $("#districtDropdownDC").val();
    TalukaidGlobal = $("#talukaDropdownDC").val();
    PropertAreaNameGlobal = $("#PropertyArea").data("kendoDropDownList").text();
    PropertAreaIdGlobal = $("#PropertyArea").val();
     var userProvidedLandValueGlobal =$("#userProvidedLandValue").val();
      var userProvidedConstructedValueGlobal = $("#userProvidedConstructedValue").val();
      userProvidedLandValueGlobal = sanitizeNumericValue(userProvidedLandValue);
      userProvidedConstructedValueGlobal = sanitizeNumericValue(userProvidedConstructuedValue);
    

   // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=' + encodeURIComponent(MouzaNameGlobal) + "&QanoonGoId=" + QanoongoidGlobal, selectlandClassificationText, "AddKhasraLandClassification");
      initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + PropertAreaIdGlobal + "&talukaId=" + TalukaidGlobal + "&LandValue=" + userProvidedLandValueGlobal + "&constructedValue=" + userProvidedConstructedValueGlobal, selectlandClassificationText, "LandClassificationUrbanMultiproperty");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllCategoriesByLandClassifications?PropertyAreaId=' + "&talukaId=" + "&landClassificationId=", SelectLandCategoryText, "CategoriesUrbanMultiproperty");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/GetFloors', selectFloorText, "FlDropdownDCMultiproperty");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/GetBasements', selectBasementText, "BasementsDropdownDCMultiproperty");
    //if (multipleKhasraList.length > 0) {
    //    SetGridData(multipleKhasraList, "allRatesAppliedGrid");
    //} else {
    //    clearGridData("allRatesAppliedGrid");
    //    resetMultipleKhasraUIScreen();
    //}
    clearGridData("allRatesAppliedGrid");
    resetMultipleKhasraUIScreen();
    
    $("#MultipleKhasrasWindow").data("kendoWindow").center().open();
}
function sanitizeNumericValue(value) {
    if (typeof value === "string") {
        return parseFloat(value.replace(/,/g, '')) || 0; // Remove commas and convert to number
    }
    return value || 0; // Return the value if already a number or default to 0
}
function OpenAddMultipleKhasrasWindow() {
    resetAddMultipleKhasrasScreen();
    disableButton("btnAddMultipleKhasraInGrid");
    $("#multipleKhasraListError").text('');
    //populateKhasrasAutoComplete();

    if (allRatesAppliedFlag)
    {
        $("#addKhasraLandAreaDiv").show();
        $("#addKhasraLandValueDCDiv").show();
    }
    else
    {
        $("#addKhasraLandAreaDiv").hide();
        $("#addKhasraLandValueDCDiv").hide();
    }

    $("#AddMultipleKhasrasWindow").data("kendoWindow").center().open();
}



function CloseAddMultipleKhasrasWindow() {
    $("#AddMultipleKhasrasWindow").data("kendoWindow").close();
}


function ratesRadioButtonOnChange() {
    var $radio = $('input[name=RateAppliedType]:checked');
    radioButtonId = $radio.attr('id');
    $("#allRatesAppliedGridDiv").hide();
    $("#highestRateAppliedGridDiv").hide();
    clearGridData("allRatesAppliedGrid");
   
    $("#multipleKhasraListError").text('');
    if (radioButtonId == "highestRateAppliedRadioBtn") {
        allRatesAppliedFlag = false;
        highestRateApplieedFlag = true;

        if (multipleKhasraDCRateType == highestRateApplied) {
            var khasrasList = GetKhasraListForGrid();

            for (var i = 0; i < khasrasList.length; i++) {

                SetGridData(khasrasList[i], "highestRateAppliedGrid");
            }
        }
    }
    else if (radioButtonId == "allRatesAppliedRadioBtn"){
        if (multipleKhasraDCRateType == allRatesApplied) {
            var khasrasList = GetKhasraListForGrid();

            for (var i = 0; i < khasrasList.length; i++) {

                SetGridData(khasrasList[i], "allRatesAppliedGrid");
            }
        }
        allRatesAppliedFlag = true;
        highestRateApplieedFlag = false;
        $("#PropertyAreaQuantity").hide();
        $("#PropertyAreaQuantityLabel").hide();
        $("#PropertyAreaQuantity").text("");
        $("#PropertyAreaQuantity").val("");
    }
}


function FindDCRateMultiproperty() {
   
        //var LandClassificationid = $("#AddKhasraLandClassification").val();
        //var LocationString = $("#AddKhasraLocation").data("kendoDropDownList").text();
        //var KhasraNumber = $("#AddKhasraAutoComplete").val();
        //var deedId = $("#TransactionName").val();
        //var mouzaViewModel = {
        //    MouzaId: MouzaIdGlobal,
        //    QanoonGoId: QanoongoidGlobal,
        //    LandClassificationId: LandClassificationid,
        //    LocationString: LocationString,
        //    MouzaName: MouzaNameGlobal,
        //    KhasraNo: KhasraNumber,
        //    SquareNo: "",
        //    QilaNo: "",
        //    MultipleKhasraDCRateType: "",
        //    MultipleKhasras: "",
        //    DeedId: "",
        //    exemptStampDutyForGiftDeed: false,
        //}
    //gteKhasraDCRate(mouzaViewModel);
    var test = 0 ; 
    if ($('#District').val() == "0") {
        test = 1; 
        $('#District_validationMessage').show();
        $('#District_validationMessage').html(SelectavalidDistrict);
    }
    if ($('#talukaDropdownDC').val() == "0") {
        test = 1; 
        $('#Taluka_validationMessage').show();
        $('#Taluka_validationMessage').html(SelectavalidTehsil);
    }

    if ($('#PropertyArea').val() == "0") {
        test = 1;
        $('#PropertyArea_validationMessage').show();
        $('#PropertyArea_validationMessage').html(SelectavalidPropertyArea);
    }

    if ($('#LandClassificationUrbanMultiproperty').val() == "0" || $('#LandClassificationUrbanMultiproperty').val() == "") {
        test = 1; 
        $('#LandClassification_validationMessage').show();
        $('#LandClassification_validationMessage').html(SelectavalidLandClassification);
    }

    if ($('#CategoriesUrbanMultiproperty').val() == "0" || $('#CategoriesUrbanMultiproperty').val() == "") {
        test = 1; 
        $('#Categories_validationMessage').show();
        $('#Categories_validationMessage').html('Select a valid Category');
    }
   
    $("#DCValueError").hide();
    if (test = 1) {

        disableButton("btnFindRateMultipleKhasra");
    }
    var $radio = $('input[name=LandType]:checked');

    var id = $radio.attr('id');

    var res4 = true;
    var res5 = true;

   
    var Talukaid = $("#talukaDropdownDC").val();
    var PropertyAreaId = $("#PropertyArea").val();
    var LandClassificationid = $("#LandClassificationUrbanMultiproperty").val();
    var Categoriesid = $("#CategoriesUrbanMultiproperty").val();
    //var Location = $("#LocationUrban").data("kendoDropDownList").text();

    var AreaName = $('#PropertyArea').data("kendoDropDownList").text();

    var propertyAreaViewModel = {
        Talukaid: Talukaid,
        PropertyAreaId: PropertyAreaId,
        LandClassificationId: LandClassificationid,
        Categoriesid: Categoriesid,
        // Location: Location,
        //  PropertyAreaId: AreaName
    }

    $.ajax({
        url: base_url_service_layer + '/api/Proxy/Locations/PropertyAreaRateByLandInfo',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(
            propertyAreaViewModel
        ),

        success: function (proeprtyAreaViewModel) {

            rate = proeprtyAreaViewModel.DCRateString;
            structureRate = proeprtyAreaViewModel.SqFtRateString;


            document.getElementById("rateValueMultiproperty").innerHTML = returnCommas(rate);
           
            document.getElementById("LandUnitMultiproperty").innerHTML = " Per " + proeprtyAreaViewModel.DCRateUnit;
            document.getElementById("LandUnitStructureMultiproperty").innerHTML = " Per " + proeprtyAreaViewModel.DCRateUnit;
            document.getElementById("LandUnitOfAreaMultiproperty").innerHTML = " " + proeprtyAreaViewModel.DCRateUnit;
            document.getElementById("LandUnitOfAreaCoveredMultiproperty").innerHTML = " " + proeprtyAreaViewModel.DCRateUnit;
            document.getElementById("DCRateSqFtMultiproperty").innerHTML = returnCommas(proeprtyAreaViewModel.SqFtRateString);
            

            $("#waitModalForSave").modal();
            findCabnitRateMultiproperty(rate, structureRate);
            $("#waitModalForSave").modal('hide');
            enableButton("btnAddMultipleKhasraInGrid");
        },
        error: function (data) {
            var response = data.responseText.replace(/"/g, '');
            //   alert(response);

        }
    });


}

function resetDropDown(feild) {
   // alert(feild.id);
    if (feild.id == "FlDropdownDCMultiproperty") {

        resetKendoDropDown("CategoriesUrbanMultiproperty", SelectLandCategoryText);
        resetKendoDropDown("BasementsDropdownDCMultiproperty", selectBasementText);
        $("#CoveredAreaQuantityMultiproperty").val();
        $("#BasementCoveredAreaQuantityMultiproperty").val();
        // resetKendoDropDown("CategoriesUrban", SelectLandCategoryText);

    }
    if (feild.id == "BasementsDropdownDCMultiproperty") {

        resetKendoDropDown("CategoriesUrbanMultiproperty", SelectLandCategoryText);
        $("#CoveredAreaQuantityMultiproperty").val();
        $("#BasementCoveredAreaQuantityMultiproperty").val();
        // resetKendoDropDown("CategoriesUrban", SelectLandCategoryText);

    }

}

function findCabnitRateMultiproperty(Cabnitrate, StructureRate) {

    //alert("CabniteRate" + Cabnitrate + "StructureRate" + StructureRate);
    $("#waitModalForSave").modal();
    var $radio = $('input[name=LandType]:checked');
    var id = $radio.attr('id');
    var DCValueStructure = 0;

    var DCValue = 0;
    var DCValueStructure = 0;
    if (StructureRate != 0 && Cabnitrate == 0) {
        debugger;
        var propertyAreaQuantity = $("#CoveredAreaQuantityMultiproperty").val();
        var DCValueStructure = StructureRate * propertyAreaQuantity;
        //alert(DCValueStructure); 
        var Floor_rate = 0;
        var Basement_rate = 0;
        var DC_Initial_val = DCValueStructure;
        if ($("#LandClassificationUrbanMultiproperty  option:selected").text() == "Residential Built Up") {
            if ($("#FlDropdownDCMultiproperty").val() > 0) {

                Floor_rate = DCValueStructure * 25 / 100;
                DCValueStructure += (Floor_rate * $("#FlDropdownDCMultiproperty").val());
                // alert(DCValue);
            }

            if ($("#BasementsDropdownDCMultiproperty").val() > 0) {
                Basement_rate = DC_Initial_val * 25 / 100;
                DCValueStructure += (Basement_rate * $("#BasementsDropdownDCMultiproperty").val());
                // alert(DCValue);

            }



        }
       
        //Condtion Applied for Karachi and Other Dist. 
        if ($("#LandClassificationUrbanMultiproperty  option:selected").text() == "Commercial Built Up") {
            var Floor_Basment_Rate = 0;
            var BasementCovered_Rate = 0;
            var Covererd_Area_Quantity = $("#CoveredAreaQuantityMultiproperty").val();
            var Basement_Area_Quantity = $("#BasementCoveredAreaQuantityMultiproperty").val();

            if ($('#districtDropdownDC').val() == 1 && ($("#CategoriesUrbanMultiproperty  option:selected").text() == "I" || $("#CategoriesUrbanMultiproperty  option:selected").text() == "II" || $("#CategoriesUrbanMultiproperty  option:selected").text() == "III" || $("#CategoriesUrbanMultiproperty  option:selected").text() == "IV")) {

                //changes for fromula updated : 

                var Sum_Val = 0;
                var FloorCount = 0 ; 

                if ($("#FlDropdownDCMultiproperty").val() > 0) {
                    FloorCount++; 
                    Floor_Basment_Rate = DCValueStructure * 100 / 100;
                    Sum_Val += (Floor_Basment_Rate * $("#FlDropdownDCMultiproperty").val());
                    // alert(DCValue);
                }
                if (Sum_Val == 0 && FloorCount == 0) {
                    Sum_Val = DCValueStructure;

                }

                if ($("#BasementsDropdownDCMultiproperty").val() > 0) {
                    BasementCovered_Rate = 13500 * Basement_Area_Quantity;
                    Sum_Val += parseFloat(returnCommas(BasementCovered_Rate).replace(/,/g, ''));

                    // alert(DCValue);

                }
               

                DCValueStructure = parseFloat(returnCommas(Sum_Val).replace(/,/g, ''));






            }
                //for Every other district and cotegory greater than 5 
            else {
                var Sum_Val = 0
                if ($("#FlDropdownDCMultiproperty").val() > 0) {

                    Floor_Basment_Rate = DCValueStructure * 100 / 100;
                    Sum_Val += (Floor_Basment_Rate * $("#FlDropdownDCMultiproperty").val());
                    // alert(DCValue);
                }

                if ($("#BasementsDropdownDCMultiproperty").val() > 0) {
                    Floor_Basment_Rate = DCValueStructure * 100 / 100;
                    Sum_Val += (Floor_Basment_Rate * $("#BasementsDropdownDCMultiproperty").val());
                    // alert(DCValue);

                }

                DCValueStructure += parseFloat(returnCommas(Sum_Val).replace(/,/g, ''));

            }
        }

        document.getElementById("TotalMultipropertyResult").innerHTML = returnCommas(DCValueStructure);
        //document.getElementById("DCValueId").innerHTML = 0;
   






    }

    else if (StructureRate != 0 && Cabnitrate != 0) {

        if ($("#LandClassificationUrbanMultiproperty  option:selected").text() == "Industrial") {
            var propertyAreaQuantity1 = $("#PropertyAreaQuantityMultiproperty").val();
            var propertyAreaQuantity2 = $("#CoveredAreaQuantityMultiproperty").val();
            var DCValue = (Cabnitrate * propertyAreaQuantity1);
            DCValueStructure = (StructureRate * propertyAreaQuantity2);
           
        }
    }
    else {

        var propertyAreaQuantity = $("#PropertyAreaQuantityMultiproperty").val();
        DCValue = Cabnitrate * propertyAreaQuantity;



    }
    //else if (StructureRate != 0 && Cabnitrate == 0) {

    //    var propertyAreaQuantity = $("#CoveredAreaQuantity").val();
    //  //  var DCValue = StructureRate * propertyAreaQuantity;
    //    var DCValue = 0;
    //    DCValueStructure = StructureRate * propertyAreaQuantity;

    //}

    if (DCValue > 0 && DCValueStructure == 0) {
        document.getElementById("TotalMultipropertyResult").innerHTML = returnCommas(DCValue);
    }
    else if (DCValue == 0 && DCValueStructure > 0) {
        document.getElementById("TotalMultipropertyResult").innerHTML = returnCommas(DCValueStructure);
    }
    else if (DCValue > 0 && DCValueStructure > 0) {
        document.getElementById("TotalMultipropertyResult").innerHTML = parseFloat(returnCommas(DCValue).replace(/,/g, '')) + parseFloat(returnCommas(DCValueStructure).replace(/,/g, ''));
        //parseFloat(returnCommas(DCValue).replace(/,/g, ''));
        // document.getElementById("StructureValueId").innerHTML = ;

    }
    else {
        DCValue = "0";
        DCValueStructue = 0;
        document.getElementById("TotalMultipropertyResult").innerHTML = "0";
        // document.getElementById("StructureValueId").innerHTML = 0;
    }



    $("#waitModalForSave").modal('hide');
}





function FindDCRate() {
    var validation = validateAddMultipleKhasrasForm();
    if (validation) {
        var LandClassificationid = $("#AddKhasraLandClassification").val();
        var LocationString = $("#AddKhasraLocation").data("kendoDropDownList").text();
        var KhasraNumber = $("#AddKhasraAutoComplete").val();
        var deedId = $("#TransactionName").val();
        var mouzaViewModel = {
            MouzaId: MouzaIdGlobal,
            QanoonGoId: QanoongoidGlobal,
            LandClassificationId: LandClassificationid,
            LocationString: LocationString,
            MouzaName: MouzaNameGlobal,
            KhasraNo: KhasraNumber,
            SquareNo: "",
            QilaNo: "",
            MultipleKhasraDCRateType: "",
            MultipleKhasras: "",
            DeedId: "",
            exemptStampDutyForGiftDeed:false,
        }
        gteKhasraDCRate(mouzaViewModel);
    }
}


function validateAddMultipleKhasrasForm() {
    var res1 = $('#AddKhasraLandClassification').kendoValidator().data('kendoValidator').validate();
    var res2 = $('#AddKhasraAutoComplete').kendoValidator().data('kendoValidator').validate();
    var res3 = $('#AddKhasraLocation').kendoValidator().data('kendoValidator').validate();
    var res4 = true;
    if (allRatesAppliedFlag) {
        res4 = $('#addKhasraLandAreaValue').kendoValidator().data('kendoValidator').validate();
    }
    if (res1 && res2 && res3 && res4) {
        return true;
    }
    else {
        return false;
    }

}

function gteKhasraDCRate(mouzaViewModel) {
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/Locations/MouzaRateByLandInfo',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(
            mouzaViewModel
        ),

        success: function (khasraViewModel) {
            rate = khasraViewModel.KhasraRateString;
            var sqft = khasraViewModel.SqFtRateString;
            if (rate != "") {
                var rateWithCommas = returnCommas(rate);
                sqft = returnCommas(sqft);
                document.getElementById("DCRateValue").innerHTML = rateWithCommas + " Per " + khasraViewModel.KhasraRateUnit;
                
                if (allRatesAppliedFlag) {
                    var landArea = $("#addKhasraLandAreaValue").val();
                    document.getElementById("addKhasraLandValueDC").innerHTML = returnCommas(rate * landArea);//+ "&nbsp;Per " + khasraViewModel.KhasraRateUnit;
                }
                DCRateKhasra = rateWithCommas;
                DCRateUnit = khasraViewModel.KhasraRateUnit;
                DCRateSqft = sqft;
                if (allRatesAppliedFlag) {
                    landArea = $("#addKhasraLandAreaValue").val();
                }
                else
                {
                    landArea = 1;
                }
                propertyDCValue =returnCommas( rate * landArea );       

                enableButton("btnAddMultipleKhasraInGrid");
            }
            else {
                // Rate not found for the Khasra

                disableButton("btnFindRateMultipleKhasra");
            }

            findDCValue(rate);
        },
        error: function (data) {
            var response = data.responseText.replace(/"/g, '');
            //   alert(response);

        }
    });
}


function disableButton(id) {
    $("#" + id).attr("disabled", true);
}

function enableButton(id) {
    $("#" + id).attr("disabled", false);
}


function clearGridData(id) {
    $("#" + id).data('kendoGrid').dataSource.data([]);
}

function urduToEnglish_MultipleKhasra() {
    $("#landTypeLblMultipleKhasra").html('Land Type');
    $("#highestRateAppliedLblMultipleKhasra").html('Highest Rate Applied');
    $("#allRatesAppliedLblMultipleKhasra").html('All Rates Applied');
}

function englishToUrdu_MultipleKhasra() {
    $("#landTypeLblMultipleKhasra").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">زمین کی قسم</span>');
    $("#highestRateAppliedLblMultipleKhasra").html('<label style="font-family:MehrNastaliqWeb; font-size:120%; padding-left:0px;">سب سے زیادہ شرح کااطلاق</span>');
    $("#allRatesAppliedLblMultipleKhasra").html('<label style="font-family:MehrNastaliqWeb; font-size:120%; padding-left:0px;">تمام شرح کااطلاق</span>');
}

function urduToEnglish_AddMultipleKhasra() {
    $("#landClassificationLblAddMultipleKhasra").html('Land Classification');
    $("#locationLblAddMultipleKhasra").html('Location');
    $("#khasraLblAddMultipleKhasra").html('Khasra');
    $("#landAreaLblAddMultipleKhasra").html('Land Area');
    $("#dcRateLblAddMultipleKhasra").html('DC Rate');
    $("#landValueLblAddMultipleKhasra").html('Land Value (DC)');
}

function englishToUrdu_AddMultipleKhasra() {
    $("#landClassificationLblAddMultipleKhasra").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">زمین کی درجہ بندی</span>');
    $("#locationLblAddMultipleKhasra").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">مقام</span>');
    $("#khasraLblAddMultipleKhasra").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">خسرہ</span>');
    $("#landAreaLblAddMultipleKhasra").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">زمین کارقبہ</span>');
    $("#dcRateLblAddMultipleKhasra").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ڈی سی قیمت</span>');
    $("#landValueLblAddMultipleKhasra").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">(زمین کی قیمت (ڈی سی</span>');
}