/*
MouzaIdGlobal, QanoongoidGlobal, MouzaNameGlobal, multipleKhasrasSelected are defined in parent js file
*/

var multipleSquareQilaDCRateType = ""; // "All Rate Applied" | Highest Rate Applied
var multipleSquareQilaList = [];
var DCRateSqaureQila = "";
//var allRatesApplied = "All Rate Applied";
//var highestRateApplied = "Highest Rate Applied";
//var highestRateApplieedFlag = true;
//var allRatesAppliedFlag = false;
//var DCRateUnit = "";
//var propertyDCValue = "";
//var landArea = 1;
var DCRateSquareQila = "";
var selectedQilaID = "";
var selectedSquareID = "";
var selectedQilaTreatAsUrban = false;
var kWindow3;
var kWindow4;
var DCRateSqft = "";
var qilaUnit_me = "";

$(document).ready(function () {
    initializeHighestRateGrid_SQ();
    initializeAllRateGrid_SQ();
    initializeDropDown("", selectLocationText, "AddSquareQilaLocation");
    $("#AddSquareQilaLocation").data("kendoDropDownList").value(selectLocationText);

    kWindow3 = $('#deleteConfirmationWindow_SQ').kendoWindow({
        width: "500px",
        title: DeleteQila,
        visible: false
    }).data('kendoWindow');
});

function initializeHighestRateGrid_SQ() {
    var squareQilaList = [];
    $("#highestRateAppliedGrid_SQ").kendoGrid({
        dataSource: {
            data: squareQilaList,
            pageSize: 10,
            schema: {
                model: {
                    fields: {
                        QilaNoId: { type: "string" },
                        TreatAsUrban: { type: "string" },
                        QilaNo: { type: "string" },
                        SquareNo: { type: "string" },
                        LandClassification: { type: "string" },
                        LandClassificationId: { type: "string" },
                        LandLocation: { type: "string" },
                        DCRate: { type: "string" },
                        RateUnit: { type: "string" },
                        PropertyDCValue: { type: "string" },
                        SquareNoId: { type: "string" },
                        SqftRate: { type: "string" },
                    }
                }
            },
        },
        scrollable: true,
        sortable: false,
        filterable: false,
        pageable: true,
        columns: [
            { field: "QilaNoId", hidden: true, width: "0px" },
            { field: "TreatAsUrban", hidden: true, width: "0px" },
            { field: "SquareNoId", hidden: true, width: "0px" },
            { field: "QilaNo", title: QilaNoPeriod, width: "10px" },
            { field: "SquareNo", title: SquareNoPeriod, width: "250px" },
            { field: "LandClassification", title: LandClassification, width: "250px" },
            { field: "LandClassificationId", hidden: true, width: "0px" },
            { field: "LandLocation", title: LandLocation, width: "250px" },
            { field: "DCRate", title: DCRate, width: "250px" },
            { field: "RateUnit", title: AreaUnit, width: "250px" },
            { field: "PropertyDCValue", title: PropertyDCValue, hidden: true, width: "250px" },
			{ field: "SqftRate", title: SquareFtRate, hidden: true },
            {
                field: "Action",
                command: [
                {
                    name: "Delete",
                    text: "",
                    imageClass: "fa fa-trash",
                    click: _handleHighestRateDelete_SQ,
                }
                ], width: "250px"
            }
        ]
    });
}




//$('.yesbtn_SQ').click(function () {
//    var grid = $('#highestRateAppliedGrid_SQ').data('kendoGrid');
//    grid.dataSource.remove(dataitem);
//    var grid = $('#allRatesAppliedGrid_SQ').data('kendoGrid');
//    grid.dataSource.remove(dataitem);
//    console.log('Qila Deleted from Grid');
//    kWindow3.close();
//});

//$('.nobtn_SQ').click(function () {
//    dataitem = {};
//    kWindow3.close();
//});


function deleteQilaFromGrid() {
    var grid = $('#highestRateAppliedGrid_SQ').data('kendoGrid');
        grid.dataSource.remove(dataitem);
        var grid = $('#allRatesAppliedGrid_SQ').data('kendoGrid');
        grid.dataSource.remove(dataitem);
        console.log('Qila Deleted from Grid');
        kWindow3.close();
}
function closeDeleteQilaConfirmationWindow() {
        dataitem = {};
        kWindow3.close();
}

function _handleHighestRateDelete_SQ(event) {
    if (!(kWindow3.element.is(":visible"))) {
        var grid = $('#highestRateAppliedGrid_SQ').data('kendoGrid');
        dataitem = grid.dataItem($(event.currentTarget).closest("tr"));
        kWindow3.center().open();
    }
};

function _handleAllRatesAppliedDelete_SQ(event) {
    if (!(kWindow3.element.is(":visible"))) {
        var grid = $('#allRatesAppliedGrid_SQ').data('kendoGrid');
        dataitem = grid.dataItem($(event.currentTarget).closest("tr"));
        kWindow3.open().center();
    }
};


function GetSquareQilaListForGrid() {
    //multipleQilaList
    var qilaList = [];
    for (i = 0; i < multipleSquareQilaList.length; i++) {
        if (multipleSquareQilaList[i] != null) {
            var rate;
            if (typeof (multipleSquareQilaList[i].QilaNoRate) == "string") {
                rate = parseFloat(multipleSquareQilaList[i].QilaNoRate.replace(/,/g, ''));
            }
            else {
                rate = multipleSquareQilaList[i].QilaNoRate;
            }
            var area = multipleSquareQilaList[i].LandArea;
            var qilaGrid =
            {
                QilaNoId: multipleSquareQilaList[i].QilaNoId,
                SquareNoId: multipleSquareQilaList[i].SquareNoId,
                TreatAsUrban: multipleSquareQilaList[i].TreatAsUrban,
                QilaNo: multipleSquareQilaList[i].QilaNo,
                SquareNo: multipleSquareQilaList[i].SquareNo,
                LandClassification: multipleSquareQilaList[i].LandClassification,
                LandLocation: multipleSquareQilaList[i].Location,
                LandClassificationId: multipleSquareQilaList[i].LandClassificationId,
                DCRate: returnCommas(multipleSquareQilaList[i].QilaNoRate),
                QilaNoRate: multipleSquareQilaList[i].QilaNoRate,
                LandArea: multipleSquareQilaList[i].LandArea,
                RateUnit: multipleSquareQilaList[i].LandAreaUnit,
                PropertyDCValue: returnCommas(rate * area),
            };
            qilaList.push(qilaGrid);
        }
    }
    return qilaList;
}

function initializeAllRateGrid_SQ() {
    var qila = { QilaNo: "1", LandArea: 1, AreaUnit: "Marla" };
    var qilaList = [];
    qilaList.push(qila);
    $("#allRatesAppliedGrid_SQ").kendoGrid({
        dataSource: {
            data: qilaList,
            pageSize: 10,
            schema: {
                model: {
                    fields: {
                        QilaNoId: { type: "string" },
                        TreatAsUrban: { type: "string" },
                        QilaNo: { type: "string" },
                        SquareNo: { type: "string" },
                        LandClassification: { type: "string" },
                        LandLocation: { type: "string" },
                        LandLocationId: { type: "string" },
                        DCRate: { type: "string" },
                        LandArea: { type: "string" },
                        RateUnit: { type: "string" },
                        PropertyDCValue: { type: "string" },
                        SquareNoId: { type: "string" },
                        SqftRate: { type: "string" },
                    }
                }
            },
        },
        scrollable: true,
        sortable: false,
        filterable: false,
        pageable: true,
        columns: [
                { field: "QilaNoId", hidden: true, width: "0px" },
                { field: "TreatAsUrban", hidden: true, width: "0px" },
                { field: "SquareNoId", hidden: true, width: "0px" },
                { field: "QilaNo", title: QilaNoPeriod, width: "250px" },
                { field: "SquareNo", title: SquareNoPeriod, width: "250px" },
                { field: "LandClassification", title: LandClassification, width: "250px" },
                { field: "LandClassificationId", hidden: true, width: "0px" },
                { field: "LandLocation", title: LandLocation, width: "250px" },
                { field: "DCRate", title: DCRate, width: "250px" },
                { field: "LandArea", title: LandArea, width: "250px" },
                { field: "RateUnit", title: AreaUnit, width: "250px" },
                { field: "PropertyDCValue", title: PropertyDCValue, width: "250px" },
                { field: "SqftRate", title: SquareFtRate, hidden: true },
                {
                    field: "Action",
                    command: [
                        {
                            name: "Delete",
                            text: "",
                            imageClass: "fa fa-trash",
                            click: _handleAllRatesAppliedDelete_SQ,
                            //imageClass: "fa fa-trash",
                        }
                    ], width: "250px"
                }
        ]
    });
}


//var kWindow4 = $('#deleteConfirmationWindow_SQ').kendoWindow({
//    width: "500px",
//    title: "Delete Qila",
//    visible: false
//}).data('kendoWindow');


//$('.yesbtn_SQ').click(function () {
//    var grid = $('#allRatesAppliedGrid_SQ').data('kendoGrid');
//    console.log('Qila Deleted from Grid');
//    grid.dataSource.remove(dataitem);
//    kWindow4.close();
//});

//$('.nobtn_SQ').click(function () {
//    dataitem = {};
//    kWindow4.close();
//});







function actionOnAddSquareQilaLandClassificationChanged() {
    $("#AddSquareNoAutoComplete").val("");
    $("#AddSquareNoAutoComplete").text("");
    $("#AddQilaNoAutoComplete").val("");
    $("#AddQilaNoAutoComplete").text("");
    $("#addSquareQilaLandAreaValue").val("");
    $("#addSquareQilaLandAreaValue").text("");
    $('#addSquareQilaLandValueDC').html('');
    $('#landAreaUnitValue_SQ').html('');
    $('#DCRateValue_SQ').html('');
    disableButton("btnAddMultipleSquareQilaInGrid");
    populateAddSquareQilaLocationByMouzaId();
}

function actionOnAddSquareQilaLocationOnChange() {
    $("#AddSquareNoAutoComplete").val("");
    $("#AddSquareNoAutoComplete").text("");
    $("#AddQilaNoAutoComplete").val("");
    $("#AddQilaNoAutoComplete").text("");
    $("#addSquareQilaLandAreaValue").val("");
    $("#addSquareQilaLandAreaValue").text("");
    $('#addSquareQilaLandValueDC').html('');
    $('#landAreaUnitValue_SQ').html('');
    $('#DCRateValue_SQ').html('');
    disableButton("btnAddMultipleSquareQilaInGrid");
    populateSquareNoAutoComplete();
}


function populateAddSquareQilaLocationByMouzaId() {
    var landClassificationId = $("#AddSquareQilaLandClassification").val();

    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaIdForSquareNo?MouzaName=' + encodeURIComponent(MouzaNameGlobal) + "&QanoonGoId=" + QanoongoidGlobal + "&landClassificationId=" + landClassificationId, selectLocationText, "AddSquareQilaLocation");
    $("#AddSquareQilaLocation").data("kendoDropDownList").value(selectLocationText);

}


function populateSquareNoAutoComplete() {
    var Mouzaid = MouzaIdGlobal;
    var Qanoongoid = QanoongoidGlobal;
    var LandClassificationid = $("#AddSquareQilaLandClassification").val();
    var LocationString = $("#AddSquareQilaLocation").data("kendoDropDownList").text()
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
        url: base_url_service_layer + '/api/Proxy/Locations/SquareNumbersForDCValuation',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(
            mouzaViewModel
        ),
        success: function (listOfSquareNo) {
            $("#SquareNo_validationMessage").hide();
            var autocomplete = $("#AddSquareNoAutoComplete").data("kendoAutoComplete");
            if (autocomplete != null) {
                autocomplete.destroy();
            }
            var valid = false;
            $("#AddSquareNoAutoComplete").kendoAutoComplete({
                dataTextField: "SquareNo",
                dataSource: listOfSquareNo,
                filter: "startswith",
                //placeholder: "Select Khasra",
                highlightFirst: true,
                select: function (e) {
                    $("#AddQilaNoAutoComplete").val("");
                    $("#AddQilaNoAutoComplete").text("");
                    valid = true;
                    $("#SquareNo_validationMessage").hide();
                    var selectedOne = this.dataItem(e.item.index());
                    selectedSquareID = selectedOne.SquareNoId;
                    var GMapString = selectedOne.GMapSearchKey;//Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
                    var DefaultGMapString = null;//Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
                    var KmlDBUrl = selectedOne.DB_KML_URL;
                    
                },
                open: function (e) {
                    valid = false;
                },
                close: function (e) {
                    // if no valid selection - clear input
                    if (!valid) this.value('')
                    else populateQilaNoAutoComplete();
                    valid = false;
                },
                change: function (e) {
                    if (!valid) this.value('');
                    disableButton("btnAddMultipleSquareQilaInGrid");
                    
                },
            });
        },
        error: function (data) {
            var response = data.responseText.replace(/"/g, '');
        }
    });
}

    function populateQilaNoAutoComplete() {
        var Mouzaid = MouzaIdGlobal;
        var Qanoongoid = QanoongoidGlobal;
        var LandClassificationid = $("#AddSquareQilaLandClassification").val();
        var LocationString = $("#AddSquareQilaLocation").data("kendoDropDownList").text();
        var squareNumber = $("#AddSquareNoAutoComplete").val();
        var MouzaName = MouzaNameGlobal;
        var mouzaViewModel = {
            MouzaId: Mouzaid,
            QanoonGoId: Qanoongoid,
            LandClassificationId: LandClassificationid,
            LocationString: LocationString,
            MouzaName: MouzaName,
            KhasraNo: '',
            SquareNo: squareNumber,
            QilaNo: ''
        }
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/Locations/QilaNumbersBySquareNumber',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(
                mouzaViewModel
            ),
            success: function (listOfQilas) {
                $("#QilaNo_validationMessage").hide();
                var autocomplete = $("#AddQilaNoAutoComplete").data("kendoAutoComplete");
                if (autocomplete != null) {
                    autocomplete.destroy();
                }
                var valid = false;
                $("#AddQilaNoAutoComplete").kendoAutoComplete({
                    dataTextField: "QilaNo",
                    dataSource: listOfQilas,
                    filter: "startswith",
                    //placeholder: "Select Khasra",
                    highlightFirst: true,
                    select: function (e) {
                        valid = true;
                        $("#QilaNo_validationMessage").hide();
                        var selectedOne = this.dataItem(e.item.index());
                        selectedQilaID = selectedOne.QilaNoId;
                        var landUnit = selectedOne.QilaNoRateUnit;
                        selectedQilaTreatAsUrban = selectedOne.TreatAsUrban;
                        if (landUnit != null) {
                            setLandUnit_SQ(landUnit);
                        }
                        var GMapString = selectedOne.GMapSearchKey;//Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
                        var DefaultGMapString = null;//Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
                        var KmlDBUrl = selectedOne.DB_KML_URL;
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
                        enableButton("btnFindRateMultipleSquareQila");
                        disableButton("btnAddMultipleSquareQilaInGrid");
                    },
                });
            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');
            }
        });


    function setLandUnit_SQ(rateUnit) {
        if (rateUnit != null && rateUnit != "") {
            document.getElementById("landAreaUnitValue_SQ").innerHTML = "&nbsp;" + rateUnit;
        }
        else {
            document.getElementById("landAreaUnitValue_SQ").innerHTML = "&nbsp;";
        }
    }
}


function onMultipleSquareQilaClose() {
    reset();
}

function onMultipleSquareQilaCloseActivate() {
    if (multipleSquareQilaDCRateType == highestRateApplied) {
        var qilasList = GetSquareQilaListForGrid();
        for (var i = 0; i < qilasList.length; i++) {
            SetGridData(qilasList[i], "highestRateAppliedGrid_SQ");
        }
        allRatesAppliedFlag = false;
        highestRateApplieedFlag = true;
        $('#highestRateAppliedRadioBtn_SQ').prop('checked', true);
        $('#allRatesAppliedRadioBtn_SQ').prop('checked', false);
    }
    else if (multipleSquareQilaDCRateType == allRatesApplied) {
        var qilasList = GetSquareQilaListForGrid();
        for (var i = 0; i < qilasList.length; i++) {
            SetGridData(qilasList[i], "allRatesAppliedGrid_SQ");
        }
        allRatesAppliedFlag = true;
        highestRateApplieedFlag = false;
        $('#highestRateAppliedRadioBtn_SQ').prop('checked', false);
        $('#allRatesAppliedRadioBtn_SQ').prop('checked', true);
        $("#PropertyAreaQuantity").hide();
        $("#PropertyAreaQuantityLabel").hide();
        $("#PropertyAreaQuantity").text("");
        $("#PropertyAreaQuantity").val("");
    }
}

function onMultipleSquareQilaClose() {
    reset();
}

function reset() {
}

function CloseWindowMultipleSquareQila() {
    $("#MultipleSquareQilaWindow").data("kendoWindow").close();
}

function resetMultipleSquareQilaScreen() {
    resetMultipleSquareQilaUIScreen();
    multipleSquareQilaList = [];
    multipleSquareQilaDCRateType = "";
    multipleKhasrasSelected = false;
}

function resetMultipleSquareQilaUIScreen() {
    $("#highestRateAppliedRadioBtn_SQ").prop("checked", true);
    $("#allRatesAppliedRadioBtn_SQ").prop("checked", false);
    highestRateApplieedFlag = true;
    allRatesAppliedFlag = false;
    clearGridData("allRatesAppliedGrid_SQ");
    clearGridData("highestRateAppliedGrid_SQ");
    $("#highestRateAppliedGrid_SQDiv").hide();
    $("#allRatesAppliedGrid_SQDiv").hide();
    $("#multipleSquareQilaListError").text("");
    $(".k-invalid-msg").hide();
}

function addQilaToList() {
    multipleSquareQilaList = [];
    var displayedData;
    if (allRatesAppliedFlag) {
        displayedData = $("#allRatesAppliedGrid_SQ").data().kendoGrid.dataSource._data;
        multipleSquareQilaDCRateType = allRatesApplied;
    }
    else if (highestRateApplieedFlag) {
        displayedData = $("#highestRateAppliedGrid_SQ").data().kendoGrid.dataSource._data;
        multipleSquareQilaDCRateType = highestRateApplied;
    }
    var gridLength = displayedData.length;
    if (gridLength > 1) {
        for (i = 0; i < gridLength ; i++) {
            var qila = {
                QilaNoId: displayedData[i].QilaNoId,
                SquareNoId: displayedData[i].SquareNoId,
                TreatAsUrban: displayedData[i].TreatAsUrban,
                LandClassificationId: displayedData[i].LandClassificationId,
                QilaNo: displayedData[i].QilaNo,
                SquareNo: displayedData[i].SquareNo,
                LandArea: displayedData[i].LandArea,
                LandAreaUnit: displayedData[i].RateUnit,
                QilaNoRate: displayedData[i].DCRate,
                QilaNoRateString: returnCommas(displayedData[i].DCRate) + " per " + displayedData[i].RateUnit,
                QilaDCRateWithUnitString: returnCommas(displayedData[i].DCRate) + " per " + displayedData[i].RateUnit,
                LandAreaWithUnitString: (allRatesAppliedFlag ? displayedData[i].LandArea + " " + displayedData[i].RateUnit : "-"),
                LandArea: displayedData[i].LandArea,
                LandClassification: displayedData[i].LandClassification,
                Location: displayedData[i].LandLocation,
                QilaNoRateUnit: displayedData[i].RateUnit,
                SqFtRate: displayedData[i].SqftRate,
            }
            multipleSquareQilaList.push(qila);
        }
        multipleQilasSelected = true;
        if (highestRateApplieedFlag) {
            $("#PropertyAreaQuantity").show();
            $("#PropertyAreaQuantityLabel").show();
            $("#LandUnitOfArea").show();
            var dcRate = 0;
            var dcRateUnit;
            for (var i = 0; i < multipleSquareQilaList.length; i++) {
                if (multipleSquareQilaList[i] != null) {
                    if (multipleSquareQilaDCRateType == highestRateApplied) {
                        // Highest Rate applied
                        var qilaString = multipleSquareQilaList[i].QilaNoRate + '';
                        var qilaRate = parseFloat(qilaString.replace(/,/g, ""));
                        if (qilaRate > dcRate) {
                            dcRate = qilaRate;
                            dcRateUnit = multipleSquareQilaList[i].QilaNoRateUnit;
                        }
                    }
                }
            }
            $("#landAreaLabelDiv").show();
            $("#LandUnitOfArea").show();
            //$("#LandUnitOfArea").val('&nbsp;' + dcRateUnit);
            document.getElementById("LandUnitOfArea").innerHTML = '&nbsp;' + dcRateUnit;
            $("#btnAreaCalcDiv").show();
        }
        else if (allRatesAppliedFlag) {
            $("#PropertyAreaQuantity").hide();
            $("#PropertyAreaQuantityLabel").hide();
            $("#LandUnitOfArea").hide();
            $("#LandUnitOfArea").html("");

        }
        setDCRateSectionToDefault();
        CloseWindowMultipleSquareQila();
    }
    else {
        $("#multipleSquareQilaListError").text(Pleaseselectatleasttwoqilas);
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


function resetAddMultipleSquareQilaScreen() {

    resetKendoDropDown("AddSquareQilaLandClassification", selectlandClassificationText);
    resetKendoDropDown("AddSquareQilaLocation", selectLocationText);

    $("#AddSquareNoAutoComplete").val("");
    $("#AddSquareNoAutoComplete").text("");
    $("#AddQilaNoAutoComplete").val("");
    $("#AddQilaNoAutoComplete").text("");
    $("#addSquareQilaLandAreaValue").val("");
    $("#addSquareQilaLandAreaValue").text("");

    $('#addSquareQilaLandValueDC').html('');
    $('#landAreaUnitValue_SQ').html('');
    $('#DCRateValue_SQ').html('');
    $("#addKhasraToGridError").html('');
    disableButton("btnAddMultipleSquareQilaInGrid");
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
    $('#highestRateAppliedGrid_SQDiv').show();
    $("#highestRateAppliedGrid_SQ").data('kendoGrid').dataSource.add(d);
    //$("#highestRateAppliedGrid").data('kendoGrid').dataSource.data(d);
    //$('#highestRateAppliedGrid').data('kendoGrid').setDataSource(d);
    var grid = $("#highestRateAppliedGrid_SQ").data("kendoGrid");
    grid.dataSource.query({
        page: 1,
        pageSize: 10
    });
    $('#highestRateAppliedGrid_SQ').data('kendoGrid').refresh();
}


function AddQilaToGrid() {
    $("#DCValueId").html("0");
    var gridData;
    var NoQilaError = true;
    var LandClassificationString = $("#AddSquareQilaLandClassification").data("kendoDropDownList").text();
    var LandClassificationId = $("#AddSquareQilaLandClassification").val();
    var LocationString = $("#AddSquareQilaLocation").data("kendoDropDownList").text();
    var SquareNumber = $("#AddSquareNoAutoComplete").val();
    var QilaNumber = $("#AddQilaNoAutoComplete").val();
    
    var landArea = "";
    if (allRatesAppliedFlag) {
        landArea = $("#addSquareQilaLandAreaValue").val();
    }


    //var selectedClassification = $("#AddKhasraLandClassification").data("kendoDropDownList").text();
    var landAreaAdded = landArea;
    var landUnitAreaText = DCRateUnit.trim();

    var isfromRateOfChallanView = "false";
    isfromRateOfChallanView =  $("#IsRateOfChallanView").val();

    if (isfromRateOfChallanView == "false")
    {

        //if (LandClassificationString == "Agricultural" && landUnitAreaText == "Acre" && parseFloat(landAreaAdded) <= 0.125) {
        //    //here
        //    $("#RateErrorWindow").data("kendoWindow").title(RateErrorLabel).center().open();
        //    $("#div_RateErrorWindow").text(RateErrorRuralAcre);
        //    return;
        //}
        //else if (LandClassificationString == "Agricultural" && landUnitAreaText == "Kanal" && parseFloat(landAreaAdded) <= 1) {
        //    //here
        //    $("#RateErrorWindow").data("kendoWindow").title(RateErrorLabel).center().open();
        //    $("#div_RateErrorWindow").text(RateErrorRuralKanal);
        //    return;
        //}

    }
    
    var qila = {
        TreatAsUrban: selectedQilaTreatAsUrban,
        SquareNo: SquareNumber,
        SquareNoId: selectedSquareID,
        QilaNo: QilaNumber,
        QilaNoId: selectedQilaID,
        LandClassificationId: LandClassificationId,
        LandClassification: LandClassificationString,
        LandLocation: LocationString,
        DCRate: DCRateSquareQila,
        PropertyDCValue: propertyDCValue,
        RateUnit: DCRateUnit,
        LandArea: landArea,
        SqftRate: DCRateSqft
    };
    if (allRatesAppliedFlag) {
        gridData = $("#allRatesAppliedGrid_SQ").data().kendoGrid.dataSource._data;
        var gridLength = gridData.length;
        if (gridLength > 0) {
            for (i = 0; i < gridLength ; i++) {
                if (gridData[i].SquareNo == SquareNumber && gridData[i].QilaNo == QilaNumber) {
                    $("#addSquareQilaToGridError").html(QilaNoAlreadyselected);
                    NoQilaError = false;
                    break;
                }
            }
        }
        if (NoQilaError) {
            SetGridData(qila, "allRatesAppliedGrid_SQ");
        }
    }
    else if (highestRateApplieedFlag) {
        gridData = $("#highestRateAppliedGrid_SQ").data().kendoGrid.dataSource._data;
        var gridLength = gridData.length;
        if (gridLength > 0) {
            for (i = 0; i < gridLength ; i++) {
                if (gridData[i].SquareNo == SquareNumber && gridData[i].QilaNo == QilaNumber) {
                    $("#addSquareQilaToGridError").html(QilaNoAlreadyselected);
                    NoQilaError = false;
                    break;
                }
            }
        }
        if (NoQilaError) {
            SetGridData(qila, "highestRateAppliedGrid_SQ");
        }
    }
    if (NoQilaError) {
        CloseAddMultipleQilaWindow();
    }
}

function OpenWindowMultipleSquareQila() {
    $("#rateOfChallanMultipleSquareQilaError").html('');
    MouzaNameGlobal = $('#Mouza').data("kendoDropDownList").text();
    MouzaIdGlobal = $("#Mouza").val();
    QanoongoidGlobal = $("#Qanoongoee").val();
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaNameForSquareNo?MouzaName=' + encodeURIComponent(MouzaNameGlobal) + "&QanoonGoId=" + encodeURIComponent(QanoongoidGlobal), selectlandClassificationText, "AddSquareQilaLandClassification");
    resetMultipleSquareQilaUIScreen();
    $("#MultipleSquareQilaWindow").data("kendoWindow").center().open();
}

function OpenAddMultipleSquareQilaWindow() {
    resetAddMultipleSquareQilaScreen();
    disableButton("btnAddMultipleSquareQilaInGrid");
    $("#multipleSquareQilaListError").text('');
    if (allRatesAppliedFlag) {
        $("#addSquareQilaLandAreaDiv").show();
        $("#addSquareQilaLandValueDCDiv").show();
    }
    else {
        $("#addSquareQilaLandAreaDiv").hide();
        $("#addSquareQilaLandValueDCDiv").hide();
    }
    $("#AddMultipleSquareQilaWindow").data("kendoWindow").center().open();
}

function CloseAddMultipleQilaWindow() {
    $("#AddMultipleSquareQilaWindow").data("kendoWindow").close();
}

function ratesRadioButtonOnChange_SQ() {
    var $radio = $('input[name=RateAppliedType_SQ]:checked');
    radioButtonId = $radio.attr('id');
    $("#allRatesAppliedGrid_SQDiv").hide();
    $("#highestRateAppliedGrid_SQDiv").hide();
    clearGridData("allRatesAppliedGrid_SQ");
    clearGridData("highestRateAppliedGrid_SQ");
    $("#multipleSquareQilaListError").text('');
    if (radioButtonId == "highestRateAppliedRadioBtn_SQ") {
        allRatesAppliedFlag = false;
        highestRateApplieedFlag = true;
        if (multipleSquareQilaDCRateType == highestRateApplied) {
            var qilasList = GetKhasraListForGrid();
            for (var i = 0; i < qilasList.length; i++) {
                SetGridData(qilasList[i], "highestRateAppliedGrid_SQ");
            }
        }
    }
    else if (radioButtonId == "allRatesAppliedRadioBtn_SQ") {
        if (multipleSquareQilaDCRateType == allRatesApplied) {
            var qilasList = GetKhasraListForGrid();
            for (var i = 0; i < qilasList.length; i++) {
                SetGridData(qilasList[i], "allRatesAppliedGrid_SQ");
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

function FindDCRate_SQ() {
    var validation = validateAddMultipleSquareQilaForm();
    if (validation) {
        var LandClassificationid = $("#AddSquareQilaLandClassification").val();
        var LocationString = $("#AddSquareQilaLocation").data("kendoDropDownList").text();
        var SquareNumber = $("#AddSquareNoAutoComplete").val();
        var QilaNumber = $("#AddQilaNoAutoComplete").val();
        var deedId = $("#TransactionName").val();
        var mouzaViewModel = {
            MouzaId: MouzaIdGlobal,
            QanoonGoId: QanoongoidGlobal,
            LandClassificationId: LandClassificationid,
            LocationString: LocationString,
            MouzaName: MouzaNameGlobal,
            KhasraNo: "",
            SquareNo: SquareNumber,
            QilaNo: QilaNumber,
            multipleSquareQilaDCRateType: "",
            MultipleKhasras: "",
            DeedId: "",
            exemptStampDutyForGiftDeed: false,
        }
        getSquareQilaDCRate(mouzaViewModel);
    }
}


function validateAddMultipleSquareQilaForm() {
    var res1 = $('#AddSquareQilaLandClassification').kendoValidator().data('kendoValidator').validate();
    var res2 = $('#AddSquareNoAutoComplete').kendoValidator().data('kendoValidator').validate();
    var res3 = $('#AddSquareQilaLocation').kendoValidator().data('kendoValidator').validate();
    var res5 = $('#AddQilaNoAutoComplete').kendoValidator().data('kendoValidator').validate();
    var res4 = true;
    if (allRatesAppliedFlag) {
        res4 = $('#addSquareQilaLandAreaValue').kendoValidator().data('kendoValidator').validate();
    }
    if (res1 && res2 && res3 && res4 && res5) {
        return true;
    }
    else {
        return false;
    }
}

function getSquareQilaDCRate(mouzaViewModel) {
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/Locations/MouzaRateByLandInfoForQilaNo',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(
            mouzaViewModel
        ),
        success: function (qilaViewModel) {
            rate = qilaViewModel.QilaNoRateString;
            var sqft = qilaViewModel.SqFtRateString;
            if (rate != "") {
                var rateWithCommas = returnCommas(rate);
                sqft = returnCommas(sqft);
                document.getElementById("DCRateValue_SQ").innerHTML = rateWithCommas + "&nbsp;Per " + qilaViewModel.QilaNoRateUnit;
                
                if (allRatesAppliedFlag) {
                    var landArea = $("#addSquareQilaLandAreaValue").val();
                    document.getElementById("addSquareQilaLandValueDC").innerHTML = returnCommas(rate * landArea);//+ "&nbsp;Per " + khasraViewModel.KhasraRateUnit;
                }
                DCRateSquareQila = rateWithCommas;
                DCRateUnit = qilaViewModel.QilaNoRateUnit;
                DCRateSqft = sqft;
                if (allRatesAppliedFlag) {
                    landArea = $("#addSquareQilaLandAreaValue").val();
                }
                else {
                    landArea = 1;
                }
                propertyDCValue = returnCommas(rate * landArea);
                enableButton("btnAddMultipleSquareQilaInGrid");
            }
            else {
                // Rate not found for Qila
                disableButton("btnFindRateMultipleSquareQila");
            }

            findDCValue(rate);
        },
        error: function (data) {
            var response = data.responseText.replace(/"/g, '');
            //   alert(response);

        }
    });
}

function urduToEnglish_MultipleSquareQila() {
    $("#landTypeLblMultipleSquareQila").html('Land Type');
    $("#highestRateAppliedLblMultipleSquareQila").html('Highest Rate Applied');
    $("#allRateAppliedLblMultipleSquareQila").html('All Rates Applied');
}

function englishToUrdu_MultipleSquareQila() {
    $("#landTypeLblMultipleSquareQila").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">زمین کی قسم</span>');
    $("#highestRateAppliedLblMultipleSquareQila").html('<label style="font-family:MehrNastaliqWeb; font-size:120%; padding-left:0px;">سب سے زیادہ شرح کااطلاق</label>');
    $("#allRateAppliedLblMultipleSquareQila").html('<label style="font-family:MehrNastaliqWeb; font-size:120%; padding-left:0px;">تمام شرح کااطلاق</label>');
}

function urduToEnglish_AddMultipleSquareQila() {
    $("#landClassificationLblAddMultipleSquareQila").html('Land Classification');
    $("#locationLblAddMultipleSquareQila").html('Location');
    $("#squareNoLblAddMultipleSquareQila").html('Square No');
    $("#qilaNoLblAddMultipleSquareQila").html('Qila No');
    $("#landAreaLblAddMultipleSquareQila").html('Land Area');
    $("#dcRateLblAddMultipleSquareQila").html('DC Rate');
    $("#landValueLblAddMultipleSquareQila").html('Land Value (DC)');
}

function englishToUrdu_AddMultipleSquareQila() {
    $("#landClassificationLblAddMultipleSquareQila").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">زمین کی درجہ بندی</span>');
    $("#locationLblAddMultipleSquareQila").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">مقام</span>');
    $("#squareNoLblAddMultipleSquareQila").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">اسکوائر نمبر</span>');
    $("#qilaNoLblAddMultipleSquareQila").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">قلعہ نمبر</span>');
    $("#landAreaLblAddMultipleSquareQila").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">زمین کارقبہ</span>');
    $("#dcRateLblAddMultipleSquareQila").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ڈی سی قیمت</span>');
    $("#landValueLblAddMultipleSquareQila").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">(زمین کی قیمت (ڈی سی</span>');
}