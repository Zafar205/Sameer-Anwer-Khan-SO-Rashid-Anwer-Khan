//var isDCValueNotFirst = true;

var isDCValueNotFirst = false;
var isDCValueNotFirst;
var isDCValueAdmin = false;
var isCVTandNotDC = true;
var KhasraID = 0;
var SquareNoId = 0;
var QilaNoId = 0;
var dropdownIdentifier = 0;
var leaseDeeds = [85, 86, 87, 90, 91, 92, 94];
var isLeaseDeed = false;
var defaultGMapStringPostFix = "Punjab, Pakistan";
var defaultGMapStringSeparator = ",";
var userProvidedLandValue = 0;
var payCVTRegDC2FirstTime = true;
var MouzasReturned = "";
var KhasraUrbanId = 0;
var SquareNoUrbanId = 0;
var QilaNoUrbanId = 0;
var isExchangeOfProperty;
var isKhasraAvailableRateOfChallan = false;
var isPropertyAreaAvailableRateOfChallan = false;
var isKhasraHierarchyRateOfChallan = false;
var isSquareNoHierarchyRateOfChallan = false;
var landClassificationList = [];
var landLocationList = [];
var MouzaNameGlobal = "";
var MouzaIdGlobal = "";
var QanoongoidGlobal = "";
var multipleKhasrasSelected = false;
var multipleQilasSelected = false;
var SINGLE_LAND = "Single Land Classification";
var MULTIPLE_LAND = "Multiple Land Classification";
var KhasraType = "";
var multipleSquareQilaSelected = false;
var SINGLE_SQUARE_QILA = "Single Square Qila";
var MULTIPLE_SQUARE_QILA = "Multiple Square Qila";
var SquareQilaType = "";
var bothKandSqN_IsKhasraHierarchy = false;
var bothKandSqN_IsSqNoHierarchy = false;
var bothKandSqN_IsPropertyHierarchy = false;
var allRatesApplied = "All Rate Applied";
var highestRateApplied = "Highest Rate Applied";
var highestRateApplieedFlag = true;
var allRatesAppliedFlag = false;
var DCRateUnit = "";
var propertyDCValue = "";
var landArea = 1;
var releaseDeedId = "109";
var immoveableDeedId = "116";
var PowerofAttowrney = "55"; // Self Added for Our Own Purpose
var isDCGreater = false;
var isP1DCGreater = false;
var isP2DCGreater2 = false;
var regcvtDeedId = 6;
var url = "";
var rateString = '';
var cabinet_rate_dc = 0;
var structure_rate_dc = 0;

$(document).ready(function () {
    $("#LandClassificationStamp").kendoDropDownList();
    disableFindRateButton();
    //console.log(challan);
    ShowInfoByLandType();
    initialize();
    //initializeGmaps();


 
    url = document.location.href;
    if (url.indexOf("RateOfChallanView") == -1)
    {
        debugger;
        var time = new Date();
        if (time.getDay()!=6 && time.getDay()!=0 && time.getHours() >= 9 && time.getHours() < 17)
        {
            $("#map").show();
            $("#mapembed").hide();
            
           // initializeGoogleMapByAdminValue();
        }
        else
        {
            $("#map").hide();
            $("#mapembed").show();
        }
        
    }
    else
    {
        console.log("in else");
    }

    
    //singleKhasraSelect()
    $('#khasraHierarchyDiv').hide();
    $('#squareNoHierarchyDiv').hide();
    $('#khasraUrbanDiv').hide();
    $('#squareNoUrbanHierarchyDiv').hide();
    $('#DCRateFoundLabel').show();
    $('#DCRateNotFoundLabel').hide();
    $('#RateRuralNotFoundLabel').hide();
    $("#rateOfChallanMultipleSquareQilaError").html('');
    $("#rateOfChallanMultipleKhasraError").html(''); 
    $("#bothKandSqNHeirachySelectionDiv").hide();
    //$("#RateOfChallan").show();
    var validator = $("#LandformSecondaryThree").kendoValidator().data("kendoValidator");
    //var validator1 = $("#LandformSecondaryTwo").kendoValidator().data("kendoValidator");
    //var validator2 = $("#LandformSecondaryOne").kendoValidator().data("kendoValidator");
    //var validator3 = $("#LandformMain").kendoValidator().data("kendoValidator");
    $("#Khasra").kendoAutoComplete();
    $("#squareNo").kendoAutoComplete();
    $("#qilaNo").kendoAutoComplete();
    $("#KhasraUrban").kendoAutoComplete();
    $("#squareNoUrban").kendoAutoComplete();
   
    //$("#qilaNoUrban").kendoAutoComplete();
    //x =  7895575.78854708;
    //y =3683523.38131322;
    //console.log(meters2degress(x, y))
    /*
    var source = new proj4("EPSG:900913");
    var dest = new proj4("EPSG:4326");
    var point = proj4( source,dest, [8223627.80189123, 3895474.34712126]);
    */
    $('.k-widget k-tooltip k-tooltip-validation k-invalid-msg field-validation-error').hide();
    //if (sessionStorage["currentLanguage"] == "Urdu") {
    //    englishToUrdu_RateOfChallan();
    //}
    //else {
    //    urduToEnglish_RateOfChallan();
    //}
    //if (lang == "ur")
    //{
    //    $("#amountLabelRateOfChallan").css("direction", "rtl");
    //}


    if (document.cookie == "_culture=ur") {

        $("#div_RateErrorWindow").css("margin-right", "30px");
        $("#div_RateErrorWindow").css("text-align", "right");

    }

   



});

function removeLeadingZerosGeneric(ParamObject) {
    //debugger;
    $("#" + $(ParamObject).attr("id")).val(removeLeadingZeros(ParamObject.value));
}



function AllowFindRateMultiproperty() {

    var $radio = $('input[name=LandType]:checked');
    $("#CoveredAreaRate2").hide();
    var id = $radio.attr('id');
    if (id == "Urban") {
        test = 0 ; 
        var district = $("#districtDropdownDC").val();
        var Taluka = $("#talukaDropdownDC").val();
        var PropertyArea = $("#PropertyArea").val();
        var LandClassification = $("#LandClassificationUrbanMultiproperty").val();
        var Categories = $("#CategoriesUrbanMultiproperty").val();
        // alert("district" + district + "Taluka" + Taluka + "PropertyArea" + PropertyArea + "LandClassification" + LandClassification + "Categories" + Categories); 
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
        if (test == 0) {
            enableButton("btnFindRateMultipleKhasra");
        } else {
            disableButton("btnFindRateMultipleKhasra");
        }

        if (district > 0 && Taluka > 0 && PropertyArea > 0 && LandClassification > 0 && Categories > 0) {

            if ($("#LandClassificationUrbanMultiproperty  option:selected").text() == "Commercial Built Up") {

                if ($('#districtDropdownDC').val() == 1 && ($("#CategoriesUrbanMultiproperty  option:selected").text() == "I" || $("#CategoriesUrbanMultiproperty  option:selected").text() == "II" || $("#CategoriesUrbanMultiproperty  option:selected").text() == "III" || $("#CategoriesUrbanMultiproperty  option:selected").text() == "IV")) {
                    if ($("#BasementsDropdownDCMultiproperty").val() > 0) {
                        $("#CoveredAreaRateBasementsMultiproperty").show();
                    }
                    $("#CoveredAreaRateMultiproperty").hide();
                    $("#CoveredAreaRate2Multiproperty").show();
                    //  $("#CoveredAreaQuantity").attr("placeholder", "Covered Area Excluding Basements");



                }

            } else {
                $("#CoveredAreaRateBasementsMultiproperty").hide();
               
                if ($("#LandClassificationUrbanMultiproperty  option:selected").text() == "Residential Built Up" || $("#LandClassificationUrbanMultiproperty  option:selected").text() == "Flats/Appartments") {
                   //  alert($("#LandClassificationUrbanMultiproperty  option:selected").text()); 
                    $("#CoveredAreaRateMultiproperty").show();
                    $("#CoveredAreaRate2Multiproperty").hide();
                }
                else if ($("#LandClassificationUrbanMultiproperty  option:selected").text() == "Industrial") {
                    $("#CoveredAreaRateMultiproperty").show();
                    $("#CoveredAreaRate2Multiproperty").hide();
                    $("#CoveredAreaRateBasementsMultiproperty").hide();
                }
                else {
                    $("#CoveredAreaRateMultiproperty").hide();
                    $("#CoveredAreaRate2Multiproperty").hide();
                    $("#CoveredAreaRateBasementsMultiproperty").hide();
                }
               
            }






            $('#btnFindRateMultipleKhasra').prop("disabled", false);
        }




    }
    else {
        var district = $("#districtDropdownDC").val();
        var Taluka = $("#talukaDropdownDC").val();
        var LandValue = $("#PropertyAreaQuantityMultiproperty").val();
        if (LandValue > 0 && Taluka > 0 && district > 0) {
            $('#btnFindRateMultipleKhasra').prop("disabled", false);
        }

    }




}


function removeLeadingZeros(nStr)
{
    nStr += '';
    nStr = nStr.replace(/,/g, ""); // Remove any commas, if any
    if (nStr == "" || nStr == null) return "";

    var isFloatingNumber = false;

    var floatNumber = parseFloat(nStr);
    if (isNaN(floatNumber)) return nStr;
    else return floatNumber.toString();

    //if (floatNumber == 0) return "0";

    //nStr = floatNumber.toString();
    //return nStr;
}




////////////////////////////////////DC Valuation////////////////////////////////////

    function ShowInfoByLandType() {
        $("#UrbanDiv").hide();
        $("#RuralDiv").hide();
        $("#townDropdownDCDiv").hide();
        $('#landclassificationurbandiv').hide();
        $('#landclassifictaionruraldiv').hide();
        $('#squareNoHierarchyDiv').hide();
        $('#khasraUrbanDiv').hide();
       // $('#LocationaDiv').hide();
        $('#LocationUrbanDiv').hide();
        $('#squareNoUrbanHierarchyDiv').hide();
        //$('#squareNoUrbanDiv').hide();
        //$('#qilaNoUrbanDiv').hide();
        $('#khasraHierarchyDiv').hide();
        //$("#btnMultipleKhasra").hide();
        $("#khasraTypeRadioButtonDiv").hide();
        $("#squareQilaTypeRadioButtonDiv").hide();
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        if (id == "Urban") {
            resetKendoDropDown("districtDropdownDC", selectDistrictText);
            resetKendoDropDown("talukaDropdownDC", selectTehsilText);
            resetKendoDropDown("LandClassificationUrban", selectlandClassificationText);
            resetKendoDropDown("PropertyArea", selectPropertyAreaText);
            resetKendoDropDown("LandClassificationUrban", selectlandClassificationText);
            resetKendoDropDown("CategoriesUrban", SelectLandCategoryText);
            resetKendoDropDown("FlDropdownDC", selectFloorText);
            resetKendoDropDown("BasementsDropdownDC", selectBasementText);
            $("#RuralResultDiv").hide();
            $("#UrbanResultDiv").show();
            $("#UrbanDiv").show(); 
            $('#landclassificationurbandiv').show();
            $('#LandClassificationDiv').show();
            $('#categoriesurbandiv').show();
            $('#landclassifictaionruraldiv').hide(); 
            $("#PropertyAreaQuantity").show();
            $("#PropertyAreaQuantityLabel").show();
            $("#landAreaLabelDiv").show();
            $("#btnAreaCalcDiv").show();
            $("#btnMultipleKhasra").hide();
            $("#btnMultipleSquareQila").hide();
            $("#PropertyAreaDiv").show();
        }
        else {
            resetKendoDropDown("districtDropdownDC", selectDistrictText);
            resetKendoDropDown("talukaDropdownDC", selectTehsilText);
            resetKendoDropDown("modeofIrrigation", selectModeofIrrigationText);
            $("#RuralResultDiv").show();
            $("#UrbanResultDiv").hide();
            $("#RuralDiv").show();
            $("#PropertyAreaDiv").hide();
            $('#landclassificationurbandiv').hide();
            $('#categoriesurbandiv').hide();
            $('#PropertyAreaQuantity').show(); 
        }
    }

    function LandClassificationChange() {
        //ShowInfoByLandType();
        resetAll();
    }

    function populateTehsilsDropdown() {
        var id = challan.TehsilId;
        initializeDropDown(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + id, selectLocationText, "AddKhasraLocation");
    }





    //function getTehsilDetails(tehsilId)
    //{
    //    $.ajax({
    //        url: base_url_service_layer + "/api/Proxy/Locations/GetTehsil?tehsil_id=" + tehsilId,
    //        type: 'POST',
    //        dataType: 'json',
    //        contentType: "application/json;charset=utf-8",
    //        //data: JSON.stringify(mouzaViewModel),
    //        success: function (LookupViewModel) {
    //            if (LookupViewModel != null) {
    //                var GMapString = LookupViewModel.GMapSearchKey;
    //                var KmlDBUrl = LookupViewModel.DB_KML_URL;
    //                var district = document.getElementById("DistrictName").innerHTML;
    //                var tehsil = document.getElementById("TehsilName").innerHTML;
    //                var DefaultGMapString = tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;
    //                LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
    //            }
    //        },
    //        error: function (data) {
    //            var response = data.responseText.replace(/"/g, '');
    //        }
    //    });
    //}


    function populateQanoongoee() {

        //var id =  challan.TehsilId;

        var id = $("#talukaDropdownDC").val();
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + id, selectQanoongoeeText, "Qanoongoee");


        disableFindRateButton();

    }
    function populateQanoongoeeByDropDown() {

        var id = $("#talukaDropdownDC").val();

        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + id, selectQanoongoeeText, "Qanoongoee");
        disableFindRateButton();



    }


    function populateRevenueCircleByDropdown() {

        var id = $("#talukaDropdownDC").val();
        var town = $('#townDropdownDC').data("kendoDropDownList").text();
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=' + id + "&town=" + town, selectRevenueCircleText, "RevenueCircle");
        disableFindRateButton();






    }

    function populateByLandType() {
        $("#PropertyArea").val("").data("kendoDropDownList").text(selectPropertyAreaText);
        if ($('#RevenueCircle').data("kendoDropDownList") != null)
            $("#RevenueCircle").val("").data("kendoDropDownList").text(selectRevenueCircleText);
        if ($('#PropertyArea').data("kendoDropDownList") != null)
            $("#PropertyArea").val("").data("kendoDropDownList").text(selectPropertyAreaText);
       
        if ($('#LandClassification').data("kendoDropDownList") != null) 
            $("#LandClassification").val("").data("kendoDropDownList").text(selectlandClassificationText);
        if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
            $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
        if ($('#CategoriesUrban').data("kendoDropDownList") != null)
            $("#CategoriesUrban").val("").data("kendoDropDownList").text(SelectLandCategoryText);
       /// if ($('#Location').data("kendoDropDownList") != null)
         //   $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
        disableFindRateButton();
        $('#Khasra').val('');
        $('#squareNo').val('');
        $('#qilaNo').val('');
        $('#KhasraUrban').val('');
        $('#squareNoUrban').val('');
        $('#qilaNoUrban').val('');

        $('#Taluka_validationMessage').hide();
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');       
        if (id == "Urban") {
            if (isDCValueNotFirst)
            { populateRevenueCircle(); }
            else
            { populateRevenueCircleByDropdown(); }
        }
        else {
            if (isDCValueNotFirst)
            { populateQanoongoee(); }
            else
            { populateQanoongoeeByDropDown(); }

        }

        dropdownIdentifier = 2;

        var Data = $("#talukaDropdownDC").data("kendoDropDownList")

        var GMapString = Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;

        var KmlUrl = Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;

        var KmlDBUrl = Data.dataSource.data()[Data.selectedIndex - 1].DB_KML_URL;

        var district = $("#districtDropdownDC option:selected").text();
        var tehsil = $("#talukaDropdownDC option:selected").text();

        var DefaultGMapString = tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;

        if (url.indexOf("RateOfChallanView") == -1) {
            $("#mapembed").show();
            
        }
        else {
            console.log("in else");
        }

        

       

    }

    
    function SetNoDataExist(data)
    {
        //alert("testing SETNODATAEXIT"); 
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');

        //var talukaDropdownDC = $("#talukaDropdownDC").data("kendoDropDownList");
        //var ds = talukaDropdownDC.dataSource;        
        //var noDataSource = new kendo.data.DataSource({
        //    data: {Id:0, Name:"No Data Exist"}
        //});
        if (id == "Urban") {

            //$('#RevenueCircle').data('kendoDropDownList').dataSource.add({
            //    Id: 0,
            //    Name: "No Data Exist"
            //});
            $('#talukaDropdownDC').data('kendoDropDownList').select(function (dataItem) {
                return dataItem.Id === 0;
            });

            data.items[0].Name = "No Data Exist";
            var tddc = $("#talukaDropdownDC").data("kendoDropDownList");
            tddc.options.optionLabel = "No Data Exist";
            tddc.refresh();
            tddc.select(0);

           // tddc.value("No Data Exist");
          //  tddc.enable(false);
            var rddc = $("#RevenueCircle").data("kendoDropDownList");
            rddc.text("No Data Exist");
            rddc.enable(false);
            var pddc=    $("#PropertyArea").data("kendoDropDownList");
            pddc.text("No Data Exist");
            pddc.enable(false);
            var lddc=    $("#LandClassificationUrban").data("kendoDropDownList");
            lddc.text("No Data Exist");
            lddc.enable(false);


            var cct = $("#CategoriesUrban").data("kendoDropDownList");
            cct.enable("No Data Exist");
            cct.text(false);
               /*   $("#talukaDropdownDC").data("kendoDropDownList").setDataSource(noDataSource);
                  $("#RevenueCircle").data("kendoDropDownList").setDataSource(noDataSource);
                  $("#PropertyArea").data("kendoDropDownList").setDataSource(noDataSource); 
                  $("#LandClassificationUrban").data("kendoDropDownList").setDataSource(noDataSource); */
                
            }
        else {

            var tddc = $("#talukaDropdownDC").data("kendoDropDownList");
            tddc.value("No Data Exist");
            tddc.enable(false);
            var qddc = $("#Qanoongoee").data("kendoDropDownList");
            qddc.text("No Data Exist");
            qddc.enable(false);

            var mddc = $("#Mouza").data("kendoDropDownList");
            mddc.text("No Data Exist");
            mddc.enable(false);

            var lddc = $("#LandClassificationUrban").data("kendoDropDownList");
            lddc.text("No Data Exist");
            lddc.enable(false);

            var cct = $("#CategoriesUrban").data("kendoDropDownList");
            cct.enable("No Data Exist");
            lddc.text(false);

            var locddc = $("#Location").data("kendoDropDownList");
            locddc.text("No Data Exist");
            locddc.enable(false);

            /*      $("#talukaDropdownDC").val("No Data Exist").data("kendoDropDownList").text("No Data Exist");
                  $("#Qanoongoee").val("No Data Exist").data("kendoDropDownList").text("No Data Exist");
                  $("#Mouza").val("No Data Exist").data("kendoDropDownList").text("No Data Exist");
                  $("#LandClassification").val("No Data Exist").data("kendoDropDownList").text("No Data Exist");
                  $("#Location").val("No Data Exist").data("kendoDropDownList").text("No Data Exist");
                $("#talukaDropdownDC").data("kendoDropDownList").setDataSource(noDataSource);
                $("#Qanoongoee").data("kendoDropDownList").setDataSource(noDataSource);
                $("#Mouza").data("kendoDropDownList").setDataSource(noDataSource);
                $("#LandClassificationUrban").data("kendoDropDownList").setDataSource(noDataSource);
                $("#Location").data("kendoDropDownList").setDataSource(noDataSource);*/

            }
      //  }
    }

 function   enableDDropDownlists()
    {
        var tddc = $("#talukaDropdownDC").data("kendoDropDownList");    
        tddc.enable(true);
        tddc.text(selectTalukaText);

        var rddc = $("#RevenueCircle").data("kendoDropDownList");      
        rddc.enable(true);
        rddc.text(selectRevenueCircleText);

        var pddc = $("#PropertyArea").data("kendoDropDownList");      
        pddc.enable(true);
        pddc.text(selectPropertyAreaText);

        var lddc = $("#LandClassificationUrban").data("kendoDropDownList");
        lddc.enable(true);
        lddc.text(selectlandClassificationText);
        var cct = $("#CategoriesUrban").data("kendoDropDownList");
        cct.enable(true);
        cct.text(SelectLandCategoryText);

        var qddc = $("#Qanoongoee").data("kendoDropDownList");
        qddc.text(selectQanoongoeeText);
        qddc.enable(true);

        var mddc = $("#Mouza").data("kendoDropDownList");
        mddc.text(selectMouzaText);
        mddc.enable(true);


        var locddc = $("#Location").data("kendoDropDownList");
        locddc.text(selectLocationText);
        locddc.enable(true);
    }

 function populateTehsilByDropdown() {
     debugger;
     if ($('#talukaDropdownDC').data("kendoDropDownList") != null)
         $("#talukaDropdownDC").val("").data("kendoDropDownList").text(selectTehsilText);
     //Town added as a new feild after Tehsil
     if ($('#townDropdownDC').data("kendoDropDownList") != null)
         $("#townDropdownDC").val("").data("kendoDropDownList").text(selectTownText);

      if ($('#PropertyArea').data("kendoDropDownList") != null)
         $("#PropertyArea").val("").data("kendoDropDownList").text(selectPropertyAreaText);
    
     if ($('#LandClassification').data("kendoDropDownList") != null)
         $("#LandClassification").val("").data("kendoDropDownList").text(selectlandClassificationText);
     if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
         $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
     if ($('#CategoriesUrban').data("kendoDropDownList") != null)
         $("#CategoriesUrban").val("").data("kendoDropDownList").text(SelectLandCategoryText);
     if ($('#Location').data("kendoDropDownList") != null)
         $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
     disableFindRateButton();
     $('#Khasra').val('');
     $('#squareNo').val('');
     $('#qilaNo').val('');
     $('#KhasraUrban').val('');
     $('#squareNoUrban').val('');
     $('#qilaNoUrban').val('');
        disableFindRateButton();
        var districtData = $("#districtDropdownDC").data("kendoDropDownList")
    //    var DistrictGMapString = districtData.dataSource.data()[districtData.selectedIndex - 1].GMapSearchKey;
        var DistrictKmlUrl = null;
        //var DistrictKmlUrl = districtData.dataSource.data()[districtData.selectedIndex - 1].KML_URL;
        var DistrictDBKmlUrl = districtData.dataSource.data()[districtData.selectedIndex - 1].DB_KML_URL;
        var district = $("#districtDropdownDC option:selected").text();
        var DefaultGMapString = district + defaultGMapStringSeparator + defaultGMapStringPostFix;
        //var filename = $("#districtDropdownDC").data("kendoDropDownList").text();
        dropdownIdentifier = 1;
     //LoadKml(DistrictKmlUrl);
        if (url.indexOf("RateOfChallanView") == -1) {
            $("#mapembed").show();
           
        }
        else {
            console.log("in else");
        }
        
        //LoadKmlOrSearch(DistrictGMapString, DistrictKmlUrl, DistrictDBKmlUrl);
        var id = $("#districtDropdownDC").val();
        // initializeDropDown(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + id, selectTehsilText, "talukaDropdownDC");
        $("#talukaDropdownDC").kendoDropDownList({
            dataTextField: "Name",
            optionLabel: selectTehsilText,
            dataValueField: "Id",
           // autoBind: false,
            dataSource: {
                transport: {
                    read: {
                        url: base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + id,
                        dataType: 'json',
                        type: 'POST',
                    },
                },
                error: function (data) {
                    console.log(data._data);
                },
                change: function (data) {
                    //if (data.items != null && data.items[0].Name == "No Data Exist") {
                    //    //$('#Taluka_validationMessage').show();
                    //    //$('#Taluka_validationMessage').html('Tehsil should have a Data');
                    //    SetNoDataExist(data);
                    //}
                    //else {
                    //    enableDDropDownlists();
                    //}
                },
            }
        });                 
 }

 function populateTehsilByDropdownSP() {

     // ResetTextBox("PropertyAreaQuantity");
     resetKendoDropDown("talukaDropdownDC", selectTehsilText);
     resetKendoDropDown("LandClassificationUrban", selectlandClassificationText);
     resetKendoDropDown("PropertyArea", selectPropertyAreaText);
     resetKendoDropDown("KarachiAgriculture", selectDehText);
     resetKendoDropDown("CategoriesUrban", SelectLandCategoryText);
     resetKendoDropDown("FlDropdownDC", selectFloorText);
     resetKendoDropDown("BasementsDropdownDC", selectBasementText);
     var id_district = $("#districtDropdownDC").val();
     var Districtid = id_district;
     if (isDCValueNotFirst) {
         challan.rate_type_agriculture = 'Survey';
         }
     if (Districtid == 22 || Districtid == 24 || Districtid == 15) {

         $("#Land_radio_buttons").show();


     } else {
         $("#Land_radio_buttons").hide();
         $("input[name='AgricultureRateType']").prop('checked', false);
         $("#survey").prop('checked', true);
     }

     $("#AcreAreaQuantity").val(0);
     $("#GhantasAreaQuantity").val(0);
     $("#SqYardsAreaQuantity").val(0);
     $("#PropertyAreaQuantity").val(0);
     var id_district = $("#districtDropdownDC").val();
      var $radio = $('input[name=LandType]:checked');
       var id_Land = $radio.attr('id');
         if (id_Land == "Urban") {
             id_Land = 1;
         } else {
             id_Land = 0;
         }

     var DistrictId = id_district;
     var id_Land = id_Land;
   
   

     var arg = {

         IdLand: id_Land,
         district: DistrictId,
        
     };


    
     //$("#KhasraUrban").data("kendoAutoComplete").value("");
   
     initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictIdSP?IdLand=' + id_Land + "&district=" + DistrictId, selectTehsilText, "talukaDropdownDC");


 }









 //function populateTehsilByDropdownSP() {
 //    if ($('#talukaDropdownDC').data("kendoDropDownList") != null)
 //        $("#talukaDropdownDC").val("").data("kendoDropDownList").text(selectTalukaText);
 //    //Town added as a new feild after Tehsil
 //    if ($('#townDropdownDC').data("kendoDropDownList") != null)
 //        $("#townDropdownDC").val("").data("kendoDropDownList").text(selectTownText);

 //    if ($('#PropertyArea').data("kendoDropDownList") != null)
 //        $("#PropertyArea").val("").data("kendoDropDownList").text(selectPropertyAreaText);

 //    if ($('#LandClassification').data("kendoDropDownList") != null)
 //        $("#LandClassification").val("").data("kendoDropDownList").text(selectlandClassificationText);
 //    if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
 //        $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
 //    if ($('#CategoriesUrban').data("kendoDropDownList") != null)
 //        $("#CategoriesUrban").val("").data("kendoDropDownList").text(SelectLandCategoryText);
 //    if ($('#Location').data("kendoDropDownList") != null)
 //        $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
 //    disableFindRateButton();
 //    $('#Khasra').val('');
 //    $('#squareNo').val('');
 //    $('#qilaNo').val('');
 //    $('#KhasraUrban').val('');
 //    $('#squareNoUrban').val('');
 //    $('#qilaNoUrban').val('');
 //    disableFindRateButton();
 //    var districtData = $("#districtDropdownDC").data("kendoDropDownList")
 //    //    var DistrictGMapString = districtData.dataSource.data()[districtData.selectedIndex - 1].GMapSearchKey;
 //    var DistrictKmlUrl = null;
 //    //var DistrictKmlUrl = districtData.dataSource.data()[districtData.selectedIndex - 1].KML_URL;
 //    var DistrictDBKmlUrl = districtData.dataSource.data()[districtData.selectedIndex - 1].DB_KML_URL;
 //    var district = $("#districtDropdownDC option:selected").text();
 //    var DefaultGMapString = district + defaultGMapStringSeparator + defaultGMapStringPostFix;
 //    //var filename = $("#districtDropdownDC").data("kendoDropDownList").text();
 //    dropdownIdentifier = 1;
 //    //LoadKml(DistrictKmlUrl);
 //    if (url.indexOf("RateOfChallanView") == -1) {
 //        $("#mapembed").show();

 //    }
 //    else {
 //        console.log("in else");
 //    }

 //    //LoadKmlOrSearch(DistrictGMapString, DistrictKmlUrl, DistrictDBKmlUrl);
 //    var id_district = $("#districtDropdownDC").val();
 //    var $radio = $('input[name=LandType]:checked');
 //    var id_Land = $radio.attr('id');
 //    if (id_Land == "Urban") {
 //        id_Land = 1;
 //    } else {
 //        id_Land = 0;
 //    }
    
 //    // initializeDropDown(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + id, selectTehsilText, "talukaDropdownDC");
 //    $("#talukaDropdownDC").kendoDropDownList({
 //        dataTextField: "Name",
 //        optionLabel: selectTehsilText,
 //        dataValueField: "Id",
 //        // autoBind: false,
 //        dataSource: {
 //            transport: {
 //                read: {
 //                    url: base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictIdSP?IdLand=" + id_Land + "&district=" + id_district,
 //                    dataType: 'json',
 //                    type: 'POST',
 //                },
 //            },
 //            error: function (data) {
 //                console.log(data._data);
 //            },
 //            change: function (data) {
 //                //if (data.items != null && data.items[0].Name == "No Data Exist") {
 //                //    //$('#Taluka_validationMessage').show();
 //                //    //$('#Taluka_validationMessage').html('Tehsil should have a Data');
 //                //    SetNoDataExist(data);
 //                //}
 //                //else {
 //                //    enableDDropDownlists();
 //                //}
 //            },
 //        }
 //    });
 //}

 //function populateByTown() {
 //    var $radio = $('input[name=LandType]:checked');
 //    var id = $radio.attr('id');       
 //    if (id == "Urban") {
 //        if ($('#townDropdownDC').data("kendoDropDownList") != null)
 //            $("#townDropdownDC").val("").data("kendoDropDownList").text(selectTownText);
 //        if ($('#RevenueCircle').data("kendoDropDownList") != null)
 //            $("#RevenueCircle").val("").data("kendoDropDownList").text(selectRevenueCircleText);
 //        if ($('#PropertyArea').data("kendoDropDownList") != null)
 //            $("#PropertyArea").val("").data("kendoDropDownList").text(selectPropertyAreaText);
 //        if ($('#Qanoongoee').data("kendoDropDownList") != null)
 //            $("#Qanoongoee").val("").data("kendoDropDownList").text(selectQanoongoeeText);
 //        if ($('#Mouza').data("kendoDropDownList") != null)
 //            $("#Mouza").val("").data("kendoDropDownList").text(selectMouzaText);
 //        if ($('#LandClassification').data("kendoDropDownList") != null)
 //            $("#LandClassification").val("").data("kendoDropDownList").text(selectlandClassificationText);
 //        if ($('#CategoriesUrban').data("kendoDropDownList") != null)
 //            $("#CategoriesUrban").val("").data("kendoDropDownList").text(selectLandCategoryText);
 //        if ($('#Location').data("kendoDropDownList") != null)
 //            $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
 //        disableFindRateButton();
 //        $('#Khasra').val('');
 //        $('#squareNo').val('');
 //        $('#qilaNo').val('');
 //        $('#KhasraUrban').val('');
 //        $('#squareNoUrban').val('');
 //        $('#qilaNoUrban').val('');
 //        disableFindRateButton();
 //        var districtData = $("#districtDropdownDC").data("kendoDropDownList")
 //        var DistrictGMapString = districtData.dataSource.data()[districtData.selectedIndex - 1].GMapSearchKey;
 //        var DistrictKmlUrl = null;
 //        //var DistrictKmlUrl = districtData.dataSource.data()[districtData.selectedIndex - 1].KML_URL;
 //        var DistrictDBKmlUrl = districtData.dataSource.data()[districtData.selectedIndex - 1].DB_KML_URL;
 //        var district = $("#districtDropdownDC option:selected").text();
 //        var DefaultGMapString = district + defaultGMapStringSeparator + defaultGMapStringPostFix;
 //        //var filename = $("#districtDropdownDC").data("kendoDropDownList").text();
 //        dropdownIdentifier = 1;
 //        //LoadKml(DistrictKmlUrl);
 //        if (url.indexOf("RateOfChallanView") == -1) {
 //            var time = new Date();
 //            if (time.getDay() != 6 && time.getDay() != 0 && time.getHours() >= 9 && time.getHours() < 17) {
 //                $("#map").show();
 //                $("#mapembed").hide();
 //                LoadKmlOrSearch(DistrictGMapString, DefaultGMapString, DistrictDBKmlUrl);
 //            }
 //            else {
 //                $("#map").hide();
 //                $("#mapembed").show();

 //            }

 //        }
 //        else {
 //            console.log("in else");
 //        }

 //        //LoadKmlOrSearch(DistrictGMapString, DistrictKmlUrl, DistrictDBKmlUrl);
 //        var id = $("#talukaDropdownDC").val();
 //        // initializeDropDown(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + id, selectTehsilText, "talukaDropdownDC");
 //        //$("#townDropdownDC").kendoDropDownList({
 //        //    dataTextField: "Name",
 //        //    optionLabel: selectTownText,
 //        //    dataValueField: "Id",
 //        //    // autoBind: false,
 //        //    dataSource: {
 //        //        transport: {
 //        //            read: {
 //        //                url: base_url_service_layer + "/api/Proxy/Locations/TownByTehsilId?Id=" + id,
 //        //                dataType: 'json',
 //        //                type: 'POST',
 //        //            },
 //        //        },
 //        //        error: function (data) {
 //        //            console.log(data._data);
 //        //        },
 //        //        change: function (data) {
 //        //            //if (data.items != null && data.items[0].Name == "No Data Exist") {
 //        //            //    //$('#Taluka_validationMessage').show();
 //        //            //    //$('#Taluka_validationMessage').html('Tehsil should have a Data');
 //        //            //    SetNoDataExist(data);
 //        //            //}
 //        //            //else {
 //        //            //    enableDDropDownlists();
 //        //            //}
 //        //        },
 //        //    }
 //        //});
 //    }
 //    else {
 //        populateByLandType();
 //    }
 //}

    // Called in case of Qanoongoo is changed.
    function populateMouza() {
        console.log("populateMouza() called.");
        $('#Qanoongoee_validationMessage').hide();
        QanoongoidGlobal = $("#Qanoongoee").val();
        var Qanoongoid = $("#Qanoongoee").val();
        var qanoongodata = $("#Qanoongoee").data("kendoDropDownList")
        var qanoongomapString = qanoongodata.dataSource.data()[qanoongodata.selectedIndex - 1].GMapSearchKey;
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=' + Qanoongoid, selectMouzaText, "Mouza");
        if ($('#Mouza').data("kendoDropDownList") != null)
            $("#Mouza").val("").data("kendoDropDownList").text(selectMouzaText);
        if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
            $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
        if ($('#LandClassification').data("kendoDropDownList") != null)
            $("#LandClassification").val("").data("kendoDropDownList").text(selectlandClassificationText);
        if ($('#Location').data("kendoDropDownList") != null)
            $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
        disableFindRateButton();
        $('#Khasra').val('');
        $('#squareNo').val('');
        $('#qilaNo').val('');
        $('#KhasraUrban').val('');
        $('#squareNoUrban').val('');
        $('#qilaNoUrban').val('');
               //  console.log(ds._data[0]);
        MouzasReturned = $("#Mouza").data("kendoDropDownList");
       // var district = challan.propertyInfo.DistrictString;
       // var qanoongoh = $("#Qanoongoee option:selected").text();
        // resetToKhasraHierarchy();             -- logic already placed in  actionOnMouzaChange   (in resetKhasraSquareNoHierarchy() function)   -- changed on 8/12/2016
        dropdownIdentifier = 3;
        var Data = $("#Qanoongoee").data("kendoDropDownList")
        var GMapString = Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
        var KmlUrl = Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
        var KmlDBUrl = Data.dataSource.data()[Data.selectedIndex - 1].DB_KML_URL;
        var district = $("#districtDropdownDC option:selected").text();
        var tehsil = $("#talukaDropdownDC option:selected").text();
        var qanoonGooSelectedText = $("#Qanoongoee option:selected").text();
        var DefaultGMapString = qanoonGooSelectedText + defaultGMapStringSeparator + tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;
        //LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
    }







    function inCaseOfBothKandSqNRadioBtn() {
        var $radio = $('input[name=bothKandSqNSelection]:checked');
        radioButtonId = $radio.attr('id');
        var $landTypeRadio = $('input[name=LandType]:checked');
        var landTypeId = $landTypeRadio.attr('id');
        $("#btnMultipleKhasra").hide();
        $("#btnMultipleSquareQila").hide();
        if (radioButtonId == "bothKandSqNIsKhasraSelected") {
            bothKandSqN_IsKhasraHierarchy = true;
            bothKandSqN_IsSqNoHierarchy = false;
            bothKandSqN_IsPropertyHierarchy = false;
            if (landTypeId == "Rural") {
                resetKhasraSquareNoHierarchy();
            }
            else if (landTypeId == "Urban") {
                //populateLandClassificationByPropertyArea();
                actionOnPropertyAreaChange();
            }
        }
        else if (radioButtonId == "bothKandSqNIsSqNoSelected") {
            bothKandSqN_IsKhasraHierarchy = false;
            bothKandSqN_IsSqNoHierarchy = true;
            bothKandSqN_IsPropertyHierarchy = false;
            if (landTypeId == "Rural") {
                resetKhasraSquareNoHierarchy();
            }
            else if (landTypeId == "Urban") {
                //populateLandClassificationByPropertyArea();
                actionOnPropertyAreaChange();
            }
        }
        else if (radioButtonId == "bothKandSqNIsPropertySelected") {
            bothKandSqN_IsKhasraHierarchy = false;
            bothKandSqN_IsSqNoHierarchy = false;
            bothKandSqN_IsPropertyHierarchy = true;
            if (landTypeId == "Rural") {
               // resetKhasraSquareNoHierarchy();
            }
            else if (landTypeId == "Urban") {
                //populateLandClassificationByPropertyArea();
                actionOnPropertyAreaChange();
            }
        }
    }

    function ResetDropDown(field) {
        $("#" + field).data("kendoDropDownList").value("");
    }

    //function resetKhasraSquareNoHierarchy()
    //{
    //    ResetDropDown("Location");
    //    ResetTextBox("PropertyAreaQuantity");
    //    var Data = $("#Mouza").data("kendoDropDownList");
    //    if (isDCValueNotFirst) {
    //        if (isExchangeOfProperty) {
    //            if (isDCNextFirstScreen) {
    //                challan.propertyInfo.isKhasraHierarchy = Data.dataSource.data()[Data.selectedIndex - 1].IS_KHASRA_HIERARCHY;
    //                challan.propertyInfo.isSquareNoHierarchy = Data.dataSource.data()[Data.selectedIndex - 1].IS_SQUARE_NO_HIERARCHY;
    //                if (challan.propertyInfo.isKhasraHierarchy && !bothKandSqN_IsSqNoHierarchy) {
    //                    challan.propertyInfo.isSquareNoHierarchy = false;
    //                    //challan.propertyInfo.isKhasraHierarchy = true;
    //                    resetToKhasraHierarchy();   
    //                }
    //                else if (challan.propertyInfo.isSquareNoHierarchy && !bothKandSqN_IsKhasraHierarchy) {
    //                    $("#SquareQilaTypeSingle").prop("checked", true);
    //                    $("#SquareQilaTypeMultiple").prop("checked", false);
    //                    $("#btnMultipleKhasra").hide();
    //                    //$("#btnMultipleSquareQila").show();
    //                    challan.propertyInfo.isKhasraHierarchy = false;
    //                    //challan.propertyInfo.isSquareNoHierarchy = true;
    //                    populateLandClassificationByMouzaForSquareNo();
    //                    $('#squareNoHierarchyDiv').show();
    //                    //$('#QilaNoDiv').show();
    //                    $('#khasraHierarchyDiv').hide();
    //                    //$("#btnMultipleKhasra").hide();
    //                    $("#khasraTypeRadioButtonDiv").hide();
    //                    $("#squareQilaTypeRadioButtonDiv").show();
    //                    singlesquareQilaSelect();

    //                }
    //            }
    //            else {
    //                challan.propertyInfo2.isKhasraHierarchy = Data.dataSource.data()[Data.selectedIndex - 1].IS_KHASRA_HIERARCHY;
    //                challan.propertyInfo2.isSquareNoHierarchy = Data.dataSource.data()[Data.selectedIndex - 1].IS_SQUARE_NO_HIERARCHY;

    //                if (challan.propertyInfo2.isKhasraHierarchy && !bothKandSqN_IsSqNoHierarchy) {
    //                    challan.propertyInfo2.isSquareNoHierarchy = false;
    //                    //challan.propertyInfo.isKhasraHierarchy = true;

    //                    //$('#khasraHierarchyDiv').show();
    //                    ////$("#btnMultipleKhasra").show();
    //                    //$("#khasraTypeRadioButtonDiv").show();
    //                    // $("#squareQilaTypeRadioButtonDiv").hide();
    //                    //$('#squareNoHierarchyDiv').hide();

    //                    //var multipleKhasrasSelectedForProperty2 = false;//(challan.propertyInfo2.MultipleKhasras != null && challan.propertyInfo2.MultipleKhasras.length > 0 ? true : false);

    //                    //if (multipleKhasrasSelectedForProperty2) {

    //                    //    $("#KhasraTypeMultipleKhasra").prop("checked", true);
    //                    //    $("#KhasraTypeSingleKhasra").prop("checked", false);
    //                    //}
    //                    //else {
    //                    //    $("#KhasraTypeSingleKhasra").prop("checked", true);
    //                    //    $("#KhasraTypeMultipleKhasra").prop("checked", false);
    //                    //}
    //                    //onKharaTypeChange();

    //                    ////$('#QilaNoDiv').hide();
    //                    //populateLandClassificationByMouza();
    //                    resetToKhasraHierarchy();
    //                }
    //                else if (challan.propertyInfo2.isSquareNoHierarchy && !bothKandSqN_IsKhasraHierarchy) {
    //                    $("#SquareQilaTypeSingle").prop("checked", true);
    //                    $("#SquareQilaTypeMultiple").prop("checked", false);
    //                    challan.propertyInfo2.isKhasraHierarchy = false;
    //                    //challan.propertyInfo2.isSquareNoHierarchy = true;
    //                    populateLandClassificationByMouzaForSquareNo();
    //                    $('#squareNoHierarchyDiv').show();
    //                    //$('#QilaNoDiv').show();
    //                    $('#khasraHierarchyDiv').hide();
    //                    //$("#btnMultipleKhasra").hide();
    //                    $("#khasraTypeRadioButtonDiv").hide();
    //                    $("#squareQilaTypeRadioButtonDiv").show();
    //                    singlesquareQilaSelect();
    //                }
    //            }
    //        }
    //        else {
                
    //            challan.propertyInfo.isKhasraHierarchy = Data.dataSource.data()[Data.selectedIndex - 1].IS_KHASRA_HIERARCHY;
    //            challan.propertyInfo.isSquareNoHierarchy = Data.dataSource.data()[Data.selectedIndex - 1].IS_SQUARE_NO_HIERARCHY;

    //            if (challan.propertyInfo.isKhasraHierarchy && !bothKandSqN_IsSqNoHierarchy) {
    //                challan.propertyInfo.isSquareNoHierarchy = false;
    //                //challan.propertyInfo2.isKhasraHierarchy = true;
    //                //$('#khasraHierarchyDiv').show();
    //                ////$("#btnMultipleKhasra").show();
    //                //$("#khasraTypeRadioButtonDiv").show();
    //                //$('#squareNoHierarchyDiv').hide();

    //                //var multipleKhasrasSelectedForProperty = false;//(challan.propertyInfo.MultipleKhasras != null && challan.propertyInfo.MultipleKhasras.length > 0 ? true : false);

    //                //if (multipleKhasrasSelectedForProperty) {

    //                //    $("#KhasraTypeMultipleKhasra").prop("checked", true);
    //                //    $("#KhasraTypeSingleKhasra").prop("checked", false);
    //                //}
    //                //else {
    //                //    $("#KhasraTypeSingleKhasra").prop("checked", true);
    //                //    $("#KhasraTypeMultipleKhasra").prop("checked", false);
    //                //}

    //                //onKharaTypeChange();
    //                ////$('#QilaNoDiv').hide();
    //                //populateLandClassificationByMouza();
                   
    //                resetToKhasraHierarchy();
    //            }
    //            else if (challan.propertyInfo.isSquareNoHierarchy && !bothKandSqN_IsKhasraHierarchy) {
    //                $("#SquareQilaTypeSingle").prop("checked", true);
    //                $("#SquareQilaTypeMultiple").prop("checked", false);
    //                $("#btnMultipleKhasra").hide();
    //                challan.propertyInfo.isKhasraHierarchy = false;
    //                challan.propertyInfo.isSquareNoHierarchy = true;
    //                populateLandClassificationByMouzaForSquareNo();
    //                $('#squareNoHierarchyDiv').show();
    //                //$('#QilaNoDiv').show();
    //                $('#khasraHierarchyDiv').hide();
    //                //$("#btnMultipleKhasra").hide();
    //                $("#khasraTypeRadioButtonDiv").hide();
    //                $("#squareQilaTypeRadioButtonDiv").show();
    //                singlesquareQilaSelect();
    //            }
    //        }
    //    }
    //    else {
    //        isKhasraHierarchyRateOfChallan = Data.dataSource.data()[Data.selectedIndex - 1].IS_KHASRA_HIERARCHY;
    //        isSquareNoHierarchyRateOfChallan = Data.dataSource.data()[Data.selectedIndex - 1].IS_SQUARE_NO_HIERARCHY;

    //        if (isKhasraHierarchyRateOfChallan && !bothKandSqN_IsSqNoHierarchy) {
    //            isSquareNoHierarchyRateOfChallan = false;
    //            //isKhasraHierarchyRateOfChallan = true;
    //            //$('#khasraHierarchyDiv').show();
    //            ////$("#btnMultipleKhasra").show();
    //            //$("#khasraTypeRadioButtonDiv").show();
    //            //$('#squareNoHierarchyDiv').hide();
    //            ////$('#QilaNoDiv').hide();

    //            //// Select Single Khasra by default
    //            //$("#KhasraTypeSingleKhasra").prop("checked", true);
    //            //$("#KhasraTypeMultipleKhasra").prop("checked", false);

    //            //onKharaTypeChange();

    //            //populateLandClassificationByMouza();
    //            resetToKhasraHierarchy();
    //        }
    //        else if (isSquareNoHierarchyRateOfChallan && !bothKandSqN_IsKhasraHierarchy) {
    //            $("#SquareQilaTypeSingle").prop("checked", true);
    //            $("#SquareQilaTypeMultiple").prop("checked", false);
    //            $("#btnMultipleKhasra").hide();
    //            isKhasraHierarchyRateOfChallan = false;
    //            populateLandClassificationByMouzaForSquareNo();
    //            $('#squareNoHierarchyDiv').show();
    //            //$('#QilaNoDiv').show();
    //            $('#khasraHierarchyDiv').hide();
    //            //$("#btnMultipleKhasra").hide();
    //            $("#khasraTypeRadioButtonDiv").hide();
    //            $("#squareQilaTypeRadioButtonDiv").show();
    //            singlesquareQilaSelect();
    //        }
    //    }

    //    $("#squareNo").data("kendoAutoComplete").value("");
    //    $("#qilaNo").data("kendoAutoComplete").value("");
    //    $("#Khasra").data("kendoAutoComplete").value("");
    //}

    function onLandClassificationTypeChange() {
        multipleLandClassificationSelected = false;
        var $radio = $('input[name=LandClassificationType]:checked');
        radioButtonId = $radio.attr('id');
        setDCRateSectionToDefault();
        if (radioButtonId == "MultipleLand") {
            multipleLandSelect();
        }
        else if (radioButtonId == "SingleLand") {
            singleLandSelect();
        }
    }
    function resetToKhasraHierarchy()
    {
        $('#khasraHierarchyDiv').show();
        $("#khasraTypeRadioButtonDiv").show();
        $("#squareQilaTypeRadioButtonDiv").hide();
        $('#squareNoHierarchyDiv').hide();
        $("#btnMultipleSquareQila").hide();
        //$('#QilaNoDiv').hide();
        var multipleKhasrasSelectedForProperty = false;//(challan.propertyInfo.MultipleKhasras != null && challan.propertyInfo.MultipleKhasras.length > 0 ? true : false);
        if (multipleKhasrasSelectedForProperty) {
            $("#KhasraTypeMultipleKhasra").prop("checked", true);
            $("#KhasraTypeSingleKhasra").prop("checked", false);
        }
        else {
            $("#KhasraTypeSingleKhasra").prop("checked", true);
            $("#KhasraTypeMultipleKhasra").prop("checked", false);
        }
        onKharaTypeChange();
        populateLandClassificationByMouza();
    }


    function SetRadioButtonValue(name, SelectdValue) {
        $('input[name="' + name + '"][value="' + SelectdValue + '"]').prop('checked', true);
    }




    function actionOnMouzaChange()
    {
        console.log("actionOnMouzaChange() called.");
        $('#Mouza_validationMessage').hide();
        MouzaNameGlobal = $('#Mouza').data("kendoDropDownList").text();
        MouzaIdGlobal = $("#Mouza").val();
        disableFindRateButton();
       // var district = challan.propertyInfo.DistrictString;
        var qanoongoh = $("#Qanoongoee option:selected").text();
        var mouza = $("#Mouza option:selected").text();
       // var mouzadata = $("#Mouza").data("kendoDropDownList")
       // var mouzamapString = mouzadata.dataSource.data()[mouzadata.selectedIndex - 1].GMapSearchKey;
        dropdownIdentifier = 4;
        if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
            $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
        if ($('#Location').data("kendoDropDownList") != null)
            $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
        disableFindRateButton();
        if ($('#LandClassification').data("kendoDropDownList") != null)
            $("#LandClassification").val("").data("kendoDropDownList").text(selectlandClassificationText);
        $('#Khasra').val('');
        $('#squareNo').val('');
        $('#qilaNo').val('');
        $('#KhasraUrban').val('');
        $('#squareNoUrban').val('');
        $('#qilaNoUrban').val('');
        var Data = $("#Mouza").data("kendoDropDownList")
        var GMapString = Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
        var KmlUrl = Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
        var KmlDBUrl = Data.dataSource.data()[Data.selectedIndex - 1].DB_KML_URL;
        //resetToKhasraHierarchy();
        var MouzaData = $("#Mouza").data("kendoDropDownList");
        if (MouzaData.dataSource.data()[Data.selectedIndex - 1].IS_KHASRA_HIERARCHY && MouzaData.dataSource.data()[Data.selectedIndex - 1].IS_SQUARE_NO_HIERARCHY)
        {
            bothKandSqN_IsKhasraHierarchy = true;
            bothKandSqN_IsSqNoHierarchy = false;
            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsKhasraSelected');
            $("#bothKandSqNHeirachySelectionDiv").show();
            $("#Property").hide();
            resetKhasraSquareNoHierarchy();
        }
        else {
            $("#bothKandSqNHeirachySelectionDiv").hide();
            bothKandSqN_IsKhasraHierarchy = false;
            bothKandSqN_IsSqNoHierarchy = false;
            resetKhasraSquareNoHierarchy();
        }
        var district = $("#districtDropdownDC option:selected").text();
        var tehsil = $("#talukaDropdownDC option:selected").text();
        var qanoonGooSelectedText = $("#Qanoongoee option:selected").text();
        var mouzaSelectedText = $("#Mouza option:selected").text();
        var DefaultGMapString = mouzaSelectedText + defaultGMapStringSeparator + qanoonGooSelectedText + defaultGMapStringSeparator + tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;
        //LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
    }

    function populateRevenueCircle() {
        //var id = challan.TehsilId;
        var id = $("#talukaDropdownDC").val();
        var town = $('#townDropdownDC').data("kendoDropDownList").text();
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=' + id+"&town="+ town, selectRevenueCircleText, "RevenueCircle");
        disableFindRateButton();
    }

    //function populateTown() {
    //    //var id = challan.TehsilId;
    //    var id = $("#talukaDropdownDC").val();
    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?id=' + id, selectTownText, "townDropdownDC");
    //    disableFindRateButton();
    //}
    //function populateTownByDropdown() {

    //    var id = $("#talukaDropdownDC").val();

    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?id=' + id, selectTownText, "townDropdownDC");
    //    disableFindRateButton();






    //}


    function populatePropertyAreaByDropDownOrLabel()
    {
        /*
        if (isDCValueNotFirst)
        { populatePropertyArea(); }
        else
        { populatePropertyAreaByDropdown(); }

        */

    }


    //function populatePropertyAreaByDropdown()
    //{

    //    var id = $("#RevenueCircle").val();

    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?RevenueCircleId=' + id, selectPropertyAreaText, "PropertyArea");

    //    disableFindRateButton();

    //}
    function calculateAcre() {
        var AcreQuantity = 0;
        var GhuntaAreaQuantity = 0;
        var SquareYardQuantity = 0;
        var TotalAcreValue = 0; 

        if ($("#AcreAreaQuantity").val() != "" && $("#AcreAreaQuantity").val() != "NaN") {
            AcreQuantity = parseFloat($("#AcreAreaQuantity").val().replace(/,/g, ""));
        }
        if ($("#GhantasAreaQuantity").val() != "" && $("#GhantasAreaQuantity").val() != "NaN") {
            GhuntaAreaQuantity = parseFloat($("#GhantasAreaQuantity").val().replace(/,/g, ""));
            GhuntaAreaQuantity = GhuntaAreaQuantity / 40; 
        }

        if ($("#SqYardsAreaQuantity").val() != "" && $("#SqYardsAreaQuantity").val() != "NaN") {
            SquareYardQuantity = parseFloat($("#SqYardsAreaQuantity").val().replace(/,/g, ""));
            SquareYardQuantity = SquareYardQuantity / 4840;
        }

        TotalAcreValue = AcreQuantity + GhuntaAreaQuantity + SquareYardQuantity;

        $("#PropertyAreaQuantity").val(TotalAcreValue.toFixed(4));

    }
    function forValueUpateOrderNUMDate() {
        challan.order_number = $("#OrderNumber").val();
        challan.order_date = $("#OrderDate").val();
    }
    function onChangeAfterRegistration() {
        $('.datepicker').datepicker();
        let isChecked = $('#afterRegistration').is(':checked');
       // alert(isChecked);
        calculateTotalAmountDeedDetailsDeficient();
        $("#DefiecientPenaltyInformation").show();
        if (isChecked) {
             
            $('#OrderNumber').attr('required', 'required');
            $('#OrderDate').attr('required', 'required');
            $("#PenaltyDeficient").val(0);
            $("#SurchargeDeficient").val(0);
            $("#OrderNumber").val('');
            $("#OrderDate").val('');
            $("#AdditionalInformation").show();
            challan.order_number = $("#OrderNumber").val();
            challan.order_date = $("#OrderDate").val();
            challan.is_after_registration = isChecked;
           
           // document.getElementById("orderNumberViewChallan").innerHTML = $("#OrderNumber").val();
           // document.getElementById("orderDateViewChallan").innerHTML = $("#OrderDate").val();

            
        } else {
            $('#OrderNumber').removeAttr('required');
            $('#OrderDate').removeAttr('required');
            $("#AdditionalInformation").hide();
            $("#PenaltyDeficient").val(0);
            $("#SurchargeDeficient").val(0);
            challan.order_number = '';
            challan.order_date = '';
            challan.is_after_registration = 0;
           // document.getElementById("orderNumberViewChallan").innerHTML = '--';
           // document.getElementById("orderDateViewChallan").innerHTML = '--';
        }
        calculateTotalAmountDeedDetailsDeficient();
        //var $radio = $('input[name=afterRegistrationCheckbox]:checked');
        //var id_reg = $radio.attr('id');
       
        //if ($.trim(id_reg) == "afterRegistration") {
        //    $("#penaltyAdditionalInformation").show();
        //} else {
        //    $("#penaltyAdditionalInformation").hide();
        //}
        
    }

    function populatePropertyArea() {
        debugger;
        //$('#Circle_validationMessage').hide();
        //SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsKhasraSelected');
        //var RevenueCircleid = $("#RevenueCircle").val();
     
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        var TalukaId = $("#talukaDropdownDC").val();
        var DistrictId = $("#districtDropdownDC").val(); 
        if ($.trim(id) == "Urban") {
            $("#PropertyAreaQuantity").attr('readonly', false);
            // var town = $('#townDropdownDC').data("kendoDropDownList").text();
            initializeDropDownPropertyArea(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByTalukaIdSP?TalukaId=' + TalukaId, selectPropertyAreaText, "PropertyArea");
            $("#PropertyArea").val("").data("kendoDropDownList").text(selectPropertyAreaText);
            if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
                $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
        } else {

            $("#PropertyAreaQuantity").attr('readonly', true);
            if (DistrictId == 1 ) {
               
                $("#LandClassificationStampDiv").hide(); 
                $("#ModeofIrrigationDiv").hide();
                $("#ProduceIndexUnitDiv").hide();
                $("#ProduceIndexRateDiv").hide();
                $("#KarachiAgricultureDiv").show();
                $("#KarachiAgricultureRateDiv").show(); 
                initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/KarachiAgricultureSP?TalukaId=' + TalukaId, selectDehText, "KarachiAgriculture");
                $("#KarachiAgriculture").val("").data("kendoDropDownList").text(selectDehText);

            }
  
           




            else {
                $("#LandClassificationStampDiv").show();
                $("#TulkaLandDiv").show();
                $("#ModeofIrrigationDiv").show();
                $("#ProduceIndexUnitDiv").show();
                $("#ProduceIndexRateDiv").show();
                $("#KarachiAgricultureDiv").show();
                $("#KarachiAgricultureRateDiv").hide();

                if (DistrictId == 2 || DistrictId == 18 || DistrictId == 24 || DistrictId == 21 || DistrictId == 16 || DistrictId == 17 || DistrictId == 8  || DistrictId == 13 || DistrictId == 23 || DistrictId == 11 || DistrictId == 22 || DistrictId == 12 || DistrictId == 26 || DistrictId == 7 || DistrictId == 25 || DistrictId == 5 || DistrictId == 15 || DistrictId == 3 || DistrictId == 14 || DistrictId == 10) {

                    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/KarachiAgricultureSP?TalukaId=' + TalukaId, selectDehText, "KarachiAgriculture");
                    $("#KarachiAgriculture").val("").data("kendoDropDownList").text(selectDehText);
                 //   $("#modeofIrrigation").val("").data("kendoDropDownList").text(selectModeofIrrigationText);



                } else {

                    $("#KarachiAgricultureDiv").hide();

                  //  initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/ModeofIrrigationSP?TalukaId=' + TalukaId, selectModeofIrrigationText, "modeofIrrigation");
                    //   $("#modeofIrrigation").val("").data("kendoDropDownList").text(selectModeofIrrigationText);

                    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukaLandTypeOtherDehSP?TalukaId=' + TalukaId , selectTulkaLandTypeText, "TalukaLandType");
                    $("#TalukaLandType").val("").data("kendoDropDownList").text(selectTulkaLandTypeText);

                }
            }
        }
        disableFindRateButton();
        dropdownIdentifier = 5;
        var Data = $("#RevenueCircle").data("kendoDropDownList")
        //var GMapString = Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
        //var KmlUrl = Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
        //var KmlDBUrl = Data.dataSource.data()[Data.selectedIndex - 1].DB_KML_URL;
        var district = $("#districtDropdownDC option:selected").text();
        var tehsil = $("#talukaDropdownDC option:selected").text();
        var revenueCircleSelectedText = $("#RevenueCircle option:selected").text();
        var DefaultGMapString = revenueCircleSelectedText + defaultGMapStringSeparator + tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;
        //LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
    }
    function actionOnTalukaLandTypeChange() {

        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        var TalukaId = $("#talukaDropdownDC").val();
        var DistrictId = $("#districtDropdownDC").val();
        var DehId = $("#KarachiAgriculture").val();


        if (DehId != null && DehId != '') {

            if (TalukaId != 1) {
                initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/ModeofIrrigationDehSP?PropertyAreaId=' + DehId + "&TalukaId=" + TalukaId, selectModeofIrrigationText, "modeofIrrigation");
                $("#modeofIrrigation").val("").data("kendoDropDownList").text(selectModeofIrrigationText);
            } 

        } else {
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/ModeofIrrigationSP?TalukaId=' + TalukaId, selectModeofIrrigationText, "modeofIrrigation");
            $("#modeofIrrigation").val("").data("kendoDropDownList").text(selectModeofIrrigationText);

        }

    }
    function populateTalukaLandType() {
        debugger;
        //$('#Circle_validationMessage').hide();
        //SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsKhasraSelected');
        //var RevenueCircleid = $("#RevenueCircle").val();

        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        var TalukaId = $("#talukaDropdownDC").val();
        var DistrictId = $("#districtDropdownDC").val();
        var DehId = $("#KarachiAgriculture").val(); 

            $("#PropertyAreaQuantity").attr('readonly', true);
            if (DehId != null && DehId != '') {

               
                initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukaLandTypeSP?PropertyAreaId=' + DehId + "&TalukaId=" + TalukaId, selectTulkaLandTypeText, "TalukaLandType");
                $("#TalukaLandType").val("").data("kendoDropDownList").text(selectTulkaLandTypeText);

               
                $.ajax({
                    url: base_url_service_layer + '/api/Proxy/Locations/GetMCEx?TalukaId=' + TalukaId + '&DehId=' + DehId,
                    type: 'POST',
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        //alert(data[0]);
                        debugger; 
                        LandTypeModel = data;

                        if (data[0].LOCAL_GOVT_RATE == 1) {
                            $("#MCLandLimit").show();
                        } else {
                            $("#MCLandLimit").hide();
                        }
                    },
                    error: function (data) {
                    }
                });


            }






            else {
                $("#LandClassificationStampDiv").show();
                $("#ModeofIrrigationDiv").show();
                $("#ProduceIndexUnitDiv").show();
                $("#ProduceIndexRateDiv").show();
                $("#KarachiAgricultureDiv").show();
                $("#KarachiAgricultureRateDiv").hide();

                if (DistrictId == 2 || DistrictId == 18) {

                    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/KarachiAgricultureSP?TalukaId=' + TalukaId, selectDehText, "KarachiAgriculture");
                    $("#KarachiAgriculture").val("").data("kendoDropDownList").text(selectDehText);
                    //   $("#modeofIrrigation").val("").data("kendoDropDownList").text(selectModeofIrrigationText);



                } else {



                    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/ModeofIrrigationSP?TalukaId=' + TalukaId, selectModeofIrrigationText, "modeofIrrigation");
                    $("#modeofIrrigation").val("").data("kendoDropDownList").text(selectModeofIrrigationText);
                }
            }
       
        disableFindRateButton();
        dropdownIdentifier = 5;
        var Data = $("#RevenueCircle").data("kendoDropDownList")
        //var GMapString = Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
        //var KmlUrl = Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
        //var KmlDBUrl = Data.dataSource.data()[Data.selectedIndex - 1].DB_KML_URL;
        var district = $("#districtDropdownDC option:selected").text();
        var tehsil = $("#talukaDropdownDC option:selected").text();
        var revenueCircleSelectedText = $("#RevenueCircle option:selected").text();
        var DefaultGMapString = revenueCircleSelectedText + defaultGMapStringSeparator + tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;
        //LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
    }






    //function populateFloors() {
    //    $('#Floor_validationMessage').hide();
    //    $('#Circle_validationMessage').hide();
    //    //SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsKhasraSelected');
    //    var RevenueCircleid = $("#RevenueCircle").val();
    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/GetFloors?RevenueCircleId=' + RevenueCircleid, selectFloorText, "Floor");
    //    $("#Floor").val("").data("kendoDropDownList").text(selectFloorText);
    //    //if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
    //        //$("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
    //    //$('#KhasraUrban').text('');
    //    //$('#squareNoUrban').text('');
    //    //$('#qilaNoUrban').text('');
    //    //$('#KhasraUrban').val('');
    //    //$('#squareNoUrban').val('');
    //    //$('#qilaNoUrban').val('');
    //    //disableFindRateButton();
    //    //dropdownIdentifier = 5;
    //    //var Data = $("#RevenueCircle").data("kendoDropDownList")
    //    //var GMapString = Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
    //    //var KmlUrl = Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
    //    //var KmlDBUrl = Data.dataSource.data()[Data.selectedIndex - 1].DB_KML_URL;
    //    //var district = $("#districtDropdownDC option:selected").text();
    //    //var tehsil = $("#talukaDropdownDC option:selected").text();
    //    //var revenueCircleSelectedText = $("#RevenueCircle option:selected").text();
    //    //var DefaultGMapString = revenueCircleSelectedText + defaultGMapStringSeparator + tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;
    //    //LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
    //}

    //function actionOnLandClassificationChanged() {

    //    $('#LandClassification_validationMessage').hide();
    //    if ($('#Location').data("kendoDropDownList") != null)
    //        $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
    //    $('#Khasra').val('');
    //    $('#squareNo').val('');
    //    $('#qilaNo').val('');
    //    $('#KhasraUrban').val('');
    //    $('#squareNoUrban').val('');
    //    $('#qilaNoUrban').val('');
    //    alert($("#LandClassificationUrban").text()); 
    //    //   setLandUnit();
    //    if (isDCValueNotFirst) {
    //        if (isExchangeOfProperty) {
    //            if (isDCNextFirstScreen) {
    //                if (challan.propertyInfo.isKhasraHierarchy)
    //                    populateLocationByMouzaId();
    //                else
    //                    populateLocationByMouzaIdForSquareNo();
    //            }
    //            else {
    //                if (challan.propertyInfo2.isKhasraHierarchy)
    //                    populateLocationByMouzaId();
    //                else
    //                    populateLocationByMouzaIdForSquareNo();
    //            }
    //        }
    //        else {
    //            if (challan.propertyInfo.isKhasraHierarchy)
    //                populateLocationByMouzaId();
    //            else
    //                populateLocationByMouzaIdForSquareNo();
    //        }
    //    }
    //    else {
    //        if (isKhasraHierarchyRateOfChallan) {
    //            populateLocationByMouzaId();
    //        }
    //        else {
    //            populateLocationByMouzaIdForSquareNo();
    //        }
    //    }

    //}



    
    function onKhasraNumberChange() {

        var Mouzaid = $("#Mouza").val();
        var Qanoongoid = $("#Qanoongoee").val();
        var LandClassificationid = $("#LandClassification").val();
        var LocationString = $("#Location").data("kendoDropDownList").text()
        var MouzaName = $('#Mouza').data("kendoDropDownList").text();
        var KhasraNumber = $('#Khasra').val();


        var mouzaViewModel = {
            MouzaId: Mouzaid,
            QanoonGoId: Qanoongoid,
            LandClassificationId: LandClassificationid,
            LocationString: LocationString,
            MouzaName: MouzaName,
            KhasraNo: KhasraNumber

        }

        $.ajax({
            url: base_url_service_layer + '/api/Proxy/Locations/MouzaRateUnitByLandInfo',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(
                mouzaViewModel
            ),

            success: function (KhasraModel) {

                if (KhasraModel != null) {

                    KhasraID = KhasraModel.KhasraId;
                    setLandUnitUrbanFromDB(KhasraModel.KhasraRateUnit);

                   
                }
                

            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');

                document.getElementById("LandUnit").innerHTML = "&nbsp;";
               // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
            }
        });

        
       
        
    }


    
    function populateLocationByMouzaIdForSquareNo() {
        var MouzaName = $('#Mouza').data("kendoDropDownList").text();
        var Qanoongoid = $("#Qanoongoee").val();
        var landClassificationIdForDD = $("#LandClassification").val();
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaIdForSquareNo?MouzaName=' + encodeURIComponent(MouzaName) + "&QanoonGoId=" + Qanoongoid + "&landClassificationId=" + landClassificationIdForDD, selectLocationText, "Location");
    }

    function populateLocationByMouzaId() {
        
        //var MouzaId = $("#Mouza").val();
        var MouzaName = $('#Mouza').data("kendoDropDownList").text();
        var Qanoongoid = $("#Qanoongoee").val();
        var landClassificationId = $("#LandClassification").val();

        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=' + encodeURIComponent (MouzaName)+ "&QanoonGoId=" + Qanoongoid + "&landClassificationId=" + landClassificationId, selectLocationText, "Location");

        $("#Location").data("kendoDropDownList").value(selectLocationText);
    }



    function populateLandClassificationByMouza() {
        var MouzaName = $('#Mouza').data("kendoDropDownList").text();
        var Qanoongoid = $("#Qanoongoee").val();
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=' + encodeURIComponent(MouzaName) + "&QanoonGoId=" + encodeURIComponent(Qanoongoid), selectlandClassificationText, "LandClassification");
        $("#LandClassification").data("kendoDropDownList").value(selectlandClassificationText);

    }

    function populateLandClassificationByMouzaForSquareNo() {
        var MouzaName = $('#Mouza').data("kendoDropDownList").text();
        var Qanoongoid = $("#Qanoongoee").val();
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaNameForSquareNo?MouzaName=' + encodeURIComponent(MouzaName) + "&QanoonGoId=" + encodeURIComponent(Qanoongoid), selectlandClassificationText, "LandClassification");
        $("#LandClassification").data("kendoDropDownList").value(selectlandClassificationText);
    }

    function actionOnPropertyAreaChange() {
        //bothKandSqN_IsKhasraHierarchy = false;
        //bothKandSqN_IsSqNoHierarchy = false;
        //Reset to resolve production issue 7th-Aug-2020
        $("#bothKandSqNHeirachySelectionDiv").hide();
       
        if ($("#KhasraUrban").data("kendoAutoComplete") != null) {
            $("#KhasraUrban").data("kendoAutoComplete").value("");
            $('#khasraUrbanDiv').hide();
        }
        if ($("#squareNo").data("kendoAutoComplete") != null) {
            $("#squareNo").data("kendoAutoComplete").value("");
            $("#qilaNo").data("kendoAutoComplete").value("");
            $('#squareNoHierarchyDiv').hide();
            $('#btnMultipleSquareQila').hide();
        }
        if ($("#squareNoUrban").data("kendoAutoComplete") != null) {
            $("#squareNoUrban").data("kendoAutoComplete").value("");
            $('#squareNoUrbanHierarchyDiv').hide();
        }
        ResetTextBox("Khasra");
        ResetTextBox("squareNo");
        ResetTextBox("qilaNo");
        //------------------------------------------------------
        
        $('#PropertyArea_validationMessage').hide();
        disableFindRateButton();
        var revenuecircle = $("#RevenueCircle option:selected").text();
        var propertyarea = $("#PropertyArea option:selected").text();
        dropdownIdentifier = 6;
        var Data = $("#PropertyArea").data("kendoDropDownList")
       // var GMapString = Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
      //  var KmlUrl = Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
      //  var KmlDBUrl = Data.dataSource.data()[Data.selectedIndex - 1].DB_KML_URL;
        if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
            $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
      

        populateLandClassificationByPropertyArea();

        var district = $("#districtDropdownDC option:selected").text();
        var tehsil = $("#talukaDropdownDC option:selected").text();
       // var RevenueCircleSelectedText = $("#RevenueCircle option:selected").text();
       // var propertyAreaSelectedText = $("#PropertyArea option:selected").text();
       // var DefaultGMapString = propertyAreaSelectedText + defaultGMapStringSeparator + RevenueCircleSelectedText + defaultGMapStringSeparator + tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;
      //  LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);

        //populateLocationByPropertyArea();
       // populateLocationUrbanByPropertyArea();
    }

    function actionOnLandClassificationChange() {
        //bothKandSqN_IsKhasraHierarchy = false;
        //bothKandSqN_IsSqNoHierarchy = false;
        //Reset to resolve production issue 7th-Aug-2020
        $("#FLDropdownDCDiv").hide();
        $("#BasementDropdownDCDiv").hide();
        if ($("#LandClassificationUrban  option:selected").text() == "Flats/Appartments" || $("#LandClassificationUrban  option:selected").text() == "Residential Built Up" || $("#LandClassificationUrban  option:selected").text() == "Commercial Built Up") {
            $("#PropertyAreaRate").hide();
            $("#CoveredAreaRateBasements").hide();
            $("#CoveredAreaRate").show();
            $("#UrbanRateDiv").hide();
            $("#LandValueCalDiv").hide();
            $("#LandValueResult").hide();
            $("#StructureRateDiv").show();
            $("#StructureRateCalDiv").show();
            $("#CoveredValueResult").show();

        }
        else if ($("#LandClassificationUrban  option:selected").text() == "Industrial" ) {
            $("#PropertyAreaRate").show();
            $("#CoveredAreaRate").show();
            $("#UrbanRateDiv").show();
            $("#LandValueCalDiv").show();
            $("#CoveredAreaRateBasements").hide();
            $("#LandValueResult").show();
            $("#StructureRateDiv").show();
            $("#StructureRateCalDiv").show();
            $("#CoveredValueResult").show(); 
            //$("#confirmfromCoveredRateUnit").show();
            //$("#StructureRateCalDiv").show();
            //$("#CoveredValueResult").show();
            //$("#confirmfromLandRateUnit").show();
            //$("#LandValueCalDiv").show();
            //$("#LandValueResult").show();

        }
        else {
            $("#PropertyAreaRate").show();
            $("#CoveredAreaRate").hide();
            $("#CoveredAreaRateBasements").hide();
            $("#UrbanRateDiv").show();
            $("#LandValueCalDiv").show();
            $("#LandValueResult").show();
            $("#StructureRateDiv").hide();
            $("#StructureRateCalDiv").hide();
            $("#CoveredValueResult").hide();
            //$("#confirmfromCoveredRateUnit").hide();
            //$("#StructureRateCalDiv").hide();
            //$("#CoveredValueResult").hide();


        }
        if ($("#LandClassificationUrban  option:selected").text() == "Residential Built Up" || $("#LandClassificationUrban  option:selected").text() == "Commercial Built Up") {
          
            $("#FLDropdownDCDiv").show();
            $("#BasementDropdownDCDiv").show();
        }



       


        if ($("#KhasraUrban").data("kendoAutoComplete") != null) {
            $("#KhasraUrban").data("kendoAutoComplete").value("");
            $('#khasraUrbanDiv').hide();
        }
        if ($("#squareNo").data("kendoAutoComplete") != null) {
            $("#squareNo").data("kendoAutoComplete").value("");
            $("#qilaNo").data("kendoAutoComplete").value("");
            $('#squareNoHierarchyDiv').hide();
            $('#btnMultipleSquareQila').hide();
        }
        if ($("#squareNoUrban").data("kendoAutoComplete") != null) {
            $("#squareNoUrban").data("kendoAutoComplete").value("");
            $('#squareNoUrbanHierarchyDiv').hide();
        }
        ResetTextBox("Khasra");
        ResetTextBox("squareNo");
        ResetTextBox("qilaNo");
        //------------------------------------------------------
        
        $('#LandClassificationU_validationMessage').hide();
        disableFindRateButton();
        var revenuecircle = $("#RevenueCircle option:selected").text();
        var propertyarea = $("#PropertyArea option:selected").text();
        dropdownIdentifier = 11;
        var Data = $("#PropertyArea").data("kendoDropDownList")
        var GMapString = Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
        var KmlUrl = Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
        var KmlDBUrl = Data.dataSource.data()[Data.selectedIndex - 1].DB_KML_URL;
        if ($('#CategoriesUrban').data("kendoDropDownList") != null)
            $("#CategoriesUrban").val("").data("kendoDropDownList").text(SelectLandCategoryText);
      

        populateCategoriesByLandClassification();

        var district = $("#districtDropdownDC option:selected").text();
        var taluka = $("#talukaDropdownDC option:selected").text();
        var RevenueCircleSelectedText = $("#RevenueCircle option:selected").text();
        var propertyAreaSelectedText = $("#PropertyArea option:selected").text();
      //  var DefaultGMapString = propertyAreaSelectedText + defaultGMapStringSeparator + RevenueCircleSelectedText + defaultGMapStringSeparator + tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;
       // LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);

        //populateLocationByPropertyArea();
       // populateLocationUrbanByPropertyArea();
    }
    

    function actionOnLandClassificationChangeMultistory() {
        //resetAddMultipleKhasrasScreen(); 
        //bothKandSqN_IsKhasraHierarchy = false;
        //bothKandSqN_IsSqNoHierarchy = false;
        //Reset to resolve production issue 7th-Aug-2020
        var land_id = $("#LandClassificationUrbanMultiproperty").val(); 
        gridData = $("#allRatesAppliedGrid").data().kendoGrid.dataSource._data;
        var gridLength = gridData.length;
        if (gridLength > 0) {
           // alert(gridData[0].LandClassificationId);
            var temp_list = 0; 
            for ($i = 0 ; $i < gridLength ; $i++) {
                if (gridData[$i].LandClassificationId == land_id) {
                    //alert("Land Classification Already there");
                    $("#LandClassificationDivErrorMessage").show();
                    //resetMultipleKhasraUIScreen(); 
                    resetKendoDropDown("LandClassificationUrbanMultiproperty", selectlandClassificationText);
                } else {
                    $("#LandClassificationDivErrorMessage").hide();
                }
            }
        }


        //Reset Fields to Repopulate Every thing
        resetKendoDropDown("CategoriesUrbanMultiproperty", SelectLandCategoryText);
        resetKendoDropDown("FlDropdownDCMultiproperty", selectFloorText);
        resetKendoDropDown("BasementsDropdownDCMultiproperty", selectBasementText);

        $("#CoveredAreaQuantityMultiproperty").val("");
        $("#BasementCoveredAreaQuantityMultiproperty").val("");
        $("#PropertyAreaQuantityMultiproperty").val("");
        $('#rateValueMultiproperty').html('');
        $('#DCRateSqFtMultiproperty').html('');
        $('#DCValueIdMultiproperty').html('');
        $('#LandUnitOfAreaMultiproperty').html('');
        $('#LandUnitOfAreaMultiproperty').html('');
        disableButton("btnAddMultipleKhasraInGrid");
        disableButton("btnFindRateMultipleKhasra");
        $(".k-invalid-msg").hide();
        //
        $("#FLDropdownDCDivMultistory").hide();
        $("#BasementDropdownDCDivMultistory").hide();
        $("#CoveredAreaRate2Multiproperty").hide(); 

        if ($("#LandClassificationUrbanMultiproperty  option:selected").text() == "Flats/Appartments" || $("#LandClassificationUrbanMultiproperty  option:selected").text() == "Residential Built Up" || $("#LandClassificationUrbanMultiproperty  option:selected").text() == "Commercial Built Up") {
            $("#PropertyAreaRateMultiproperty").hide();
            $("#CoveredAreaRateBasementsMultiproperty").hide();
            $("#CoveredAreaRateMultiproperty").show();
            $("#UrbanRateDivMultiproperty").hide();
            $("#LandValueCalDivMultiproperty").hide();
            $("#LandValueResultMultiproperty").hide();
            $("#StructureRateDivMultiproperty").show();
            $("#StructureRateCalDivMultiproperty").show();
            $("#CoveredValueResultMultiproperty").show();

        }
        else if ($("#LandClassificationUrbanMultiproperty  option:selected").text() == "Industrial") {
            $("#PropertyAreaRateMultiproperty").show();
            $("#CoveredAreaRateMultiproperty").show();
            $("#UrbanRateDivMultiproperty").show();
            $("#LandValueCalDivMultiproperty").show();
            $("#CoveredAreaRateBasementsMultiproperty").hide();
            $("#LandValueResultMultiproperty").show();
            $("#StructureRateDivMultiproperty").show();
            $("#StructureRateCalDivMultiproperty").show();
            $("#CoveredValueResultMultiproperty").show();
            //$("#confirmfromCoveredRateUnit").show();
            //$("#StructureRateCalDiv").show();
            //$("#CoveredValueResult").show();
            //$("#confirmfromLandRateUnit").show();
            //$("#LandValueCalDiv").show();
            //$("#LandValueResult").show();

        }
        else {
            $("#PropertyAreaRateMultiproperty").show();
            $("#CoveredAreaRateMultiproperty").hide();
            $("#CoveredAreaRateBasementsMultiproperty").hide();
            $("#UrbanRateDivMultiproperty").show();
            $("#LandValueCalDivMultiproperty").show();
            $("#LandValueResultMultiproperty").show();
            $("#StructureRateDivMultiproperty").hide();
            $("#StructureRateCalDivMultiproperty").hide();
            $("#CoveredValueResultMultiproperty").hide();
            //$("#confirmfromCoveredRateUnit").hide();
            //$("#StructureRateCalDiv").hide();
            //$("#CoveredValueResult").hide();


        }
        if ($("#LandClassificationUrbanMultiproperty  option:selected").text() == "Residential Built Up" || $("#LandClassificationUrbanMultiproperty  option:selected").text() == "Commercial Built Up") {

            $("#FLDropdownDCDivMultistory").show();
            $("#BasementDropdownDCDivMultistory").show();
        }






        //if ($("#KhasraUrban").data("kendoAutoComplete") != null) {
        //    $("#KhasraUrban").data("kendoAutoComplete").value("");
        //    $('#khasraUrbanDiv').hide();
        //}
        //if ($("#squareNo").data("kendoAutoComplete") != null) {
        //    $("#squareNo").data("kendoAutoComplete").value("");
        //    $("#qilaNo").data("kendoAutoComplete").value("");
        //    $('#squareNoHierarchyDiv').hide();
        //    $('#btnMultipleSquareQila').hide();
        //}
        //if ($("#squareNoUrban").data("kendoAutoComplete") != null) {
        //    $("#squareNoUrban").data("kendoAutoComplete").value("");
        //    $('#squareNoUrbanHierarchyDiv').hide();
        //}
        //ResetTextBox("Khasra");
        //ResetTextBox("squareNo");
        //ResetTextBox("qilaNo");
        //------------------------------------------------------

        $('#LandClassificationU_validationMessage').hide();
       // disableFindRateButton();
        //var revenuecircle = $("#RevenueCircle option:selected").text();
        //var propertyarea = $("#PropertyArea option:selected").text();
        dropdownIdentifier = 11;
        //var Data = $("#PropertyArea").data("kendoDropDownList")
        //var GMapString = Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
        //var KmlUrl = Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
        //var KmlDBUrl = Data.dataSource.data()[Data.selectedIndex - 1].DB_KML_URL;
        //if ($('#CategoriesUrban').data("kendoDropDownList") != null)
        //    $("#CategoriesUrban").val("").data("kendoDropDownList").text(SelectLandCategoryText);


        populateCategoriesByLandClassificationMultiStory();

        //var district = $("#districtDropdownDC option:selected").text();
        //var taluka = $("#talukaDropdownDC option:selected").text();
        //var RevenueCircleSelectedText = $("#RevenueCircle option:selected").text();
        //var propertyAreaSelectedText = $("#PropertyArea option:selected").text();
        //  var DefaultGMapString = propertyAreaSelectedText + defaultGMapStringSeparator + RevenueCircleSelectedText + defaultGMapStringSeparator + tehsil + defaultGMapStringSeparator + district + defaultGMapStringSeparator + defaultGMapStringPostFix;
        // LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);

        //populateLocationByPropertyArea();
        // populateLocationUrbanByPropertyArea();
    }




   
    //function populateLocationUrbanByPropertyArea() {

    //    //var MouzaId = $("#Mouza").val();
    //    var Tehsil = $("#talukaDropdownDC").val();
    //    var Town = $('#townDropdownDC').data("kendoDropDownList").text();
    //    var PropertyAreaId= $("#PropertyArea").val();
    //    var revenueCircleId = $("#RevenueCircle").val();
    //    var landClassificationId = $("#LandClassificationUrban").val();

    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaId?Tehsil='+tehsilId +"&Town="+ town +"&PropertyAreaId=" + PropertyAreaId + "&revenueCircleId=" + revenueCircleId + "&landClassificationId=" + landClassificationId, selectLocationText, "LocationUrban");
    //}

    function populateLocationByPropertyArea() {

        //var MouzaId = $("#Mouza").val();
        var PropertyAreaId = $('#PropertyArea').data("kendoDropDownList").text();
        var revenueCircleId = $("#RevenueCircle").val();
        var landClassificationId = $("#LandClassificationUrban").val();

       // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyArea?PropertyAreaId=' + PropertyAreaId + "&revenueCircleId=" + revenueCircleId + "&landClassificationId=" + landClassificationId, selectLocationText, "LocationUrban");
    }

    function populateCategoriesByLandClassification() {
       // ResetTextBox("PropertyAreaQuantity");
        
        var propertyAreaId = $("#PropertyArea").val();
        var TalukaId = $("#talukaDropdownDC").val();
        var LandClassificationId = $("#LandClassificationUrban").val();
       
        $("#KhasraUrban").val("");
        $("#squareNoUrban").val("");
        $("#qilaNoUrban").val("");

        var arg = {
                    
            paID: propertyAreaId,
            tID: TalukaId,
            LandClassificationId: LandClassificationId
        };


        $("#squareNoUrbanHierarchyDiv").hide();
        $("#bothKandSqNHeirachySelectionDiv").hide();
        $('#khasraUrbanDiv').hide();
        //$("#KhasraUrban").data("kendoAutoComplete").value("");
        $("#KhasraUrban").val("");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllCategoriesByLandClassifications?PropertyAreaId=' + $("#PropertyArea").val() + "&talukaId=" + TalukaId + "&landClassificationId=" + LandClassificationId, SelectLandCategoryText, "CategoriesUrban");

      
    }


    function         populateCategoriesByLandClassificationMultiStory() {
        // ResetTextBox("PropertyAreaQuantity");

        var propertyAreaId = $("#PropertyArea").val();
        var TalukaId = $("#talukaDropdownDC").val();
        var LandClassificationId = $("#LandClassificationUrbanMultiproperty").val();

      

        var arg = {

            paID: propertyAreaId,
            tID: TalukaId,
            LandClassificationId: LandClassificationId
        };


        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllCategoriesByLandClassifications?PropertyAreaId=' + $("#PropertyArea").val() + "&talukaId=" + TalukaId + "&landClassificationId=" + LandClassificationId, SelectLandCategoryText, "CategoriesUrbanMultiproperty");


    }






    function populateLandClassificationByPropertyArea() {
       // ResetTextBox("PropertyAreaQuantity");
        var PropertyAreaId = $('#PropertyArea').val();
        var revenueCircleId = $("#RevenueCircle").val();
        var propertyAreaId = $("#PropertyArea").val();
        var TalukaId = $("#talukaDropdownDC").val();
        
        $("#KhasraUrban").val("");
        $("#squareNoUrban").val("");
        $("#qilaNoUrban").val("");


     
        if (isDCValueNotFirst) {
            var userProvidedLandValueNew = sanitizeNumericValue(userProvidedLandValue);
            var userProvidedConstructedValueNew = sanitizeNumericValue(userProvidedConstructuedValue);
        }
        var arg = {
            paName: PropertyAreaId,
            rcID: revenueCircleId,
            paID: propertyAreaId,
            tID: TalukaId,
          
        };
      
        if (isDCValueNotFirst) {
            if (isExchangeOfProperty) {
                if (isDCNextFirstScreen) {
                    if (!challan.propertyInfo.IsSquareNoAvailable && !challan.propertyInfo.IsKhasraAvailable) {         //mostly this will be the case. So checking it first for efficiency
                        $("#squareNoUrbanHierarchyDiv").hide();
                        $("#bothKandSqNHeirachySelectionDiv").hide();
                        $('#khasraUrbanDiv').hide();
                        //$("#KhasraUrban").data("kendoAutoComplete").value("");
                        $("#KhasraUrban").val("");
                        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + PropertyAreaId + "&talukaId=" + TalukaId + "&LandValue=" + userProvidedLandValueNew + "&constructedValue=" + userProvidedConstructedValueNew, selectlandClassificationText, "LandClassificationUrban");
                    }
                    else {
                        if ((challan.propertyInfo.IsSquareNoAvailable && challan.propertyInfo.IsKhasraAvailable) || (challan.propertyInfo.IsPropertyDetailAvailable && challan.propertyInfo.IsKhasraAvailable) || (challan.propertyInfo.IsSquareNoAvailable && challan.propertyInfo.IsPropertyDetailAvailable) || (challan.propertyInfo.IsSquareNoAvailable && challan.propertyInfo.IsPropertyDetailAvailable && challan.propertyInfo.IsKhasraAvailable)) {
                            
                            $("#bothKandSqNHeirachySelectionDiv").show();
                            if (challan.propertyInfo.IsKhasraAvailable) {
                                $("#Khasra1").show();
                            }
                            else {
                                $("#Khasra1").hide();
                            }
                            if (challan.propertyInfo.IsSquareNoAvailable) {
                                $("#Square").show();
                            }
                            else {
                                $("#Square").hide();
                            }
                            if (challan.propertyInfo.IsPropertyDetailAvailable) {
                                $("#Property").show();
                            }
                            else {
                                $("#Property").hide();
                            }
                            $("#squareNoUrbanHierarchyDiv").hide();
                            $('#khasraUrbanDiv').hide();
                        }
                        else {
                            $("#bothKandSqNHeirachySelectionDiv").hide();
                        }
                        if (challan.propertyInfo.IsKhasraAvailable && !bothKandSqN_IsSqNoHierarchy && !bothKandSqN_IsPropertyHierarchy) {
                            $("#squareNoUrbanHierarchyDiv").hide();
                            challan.propertyInfo.IsSquareNoAvailable = false;
                            challan.propertyInfo.isSquareNoHierarchy = false;
                            challan.propertyInfo.IsPropertyDetailAvailable = false;
                            $("#squareNoUrbanHierarchyDiv").hide();
                            $('#khasraUrbanDiv').show();
                            getKhasrasUrban(arg);
                        }
                        else if (challan.propertyInfo.IsSquareNoAvailable && !bothKandSqN_IsKhasraHierarchy && !bothKandSqN_IsPropertyHierarchy) {
                            $('#khasraUrbanDiv').hide();
                            challan.propertyInfo.IsKhasraAvailable = false;
                            challan.propertyInfo.IsPropertyDetailAvailable = false;
                            $("#squareNoUrbanHierarchyDiv").show();
                            getSquareNoUrban(arg);
                        }
                        else if (challan.propertyInfo.IsPropertyDetailAvailable && !bothKandSqN_IsKhasraHierarchy && !bothKandSqN_IsSqNoHierarchy) {
                            $('#khasraUrbanDiv').hide();
                            $("#squareNoUrbanHierarchyDiv").hide();
                            challan.propertyInfo.IsKhasraAvailable = false;
                            challan.propertyInfo.IsSquareNoAvailable = false;
                            challan.propertyInfo.isSquareNoHierarchy = false;
                            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + encodeURIComponent(PropertyAreaId) + "&talukaId=" + TalukaId , selectlandClassificationText, "LandClassificationUrban");

                        }
                    }
                }
                else {
                    $('#KhasraUrban').val("");
                    $('#squareNoUrban').val("");
                    $('#qilaNoUrban').val("");
                    
                    if (!challan.propertyInfo2.IsSquareNoAvailable && !challan.propertyInfo2.IsKhasraAvailable) {         //mostly this will be the case. So checking it first for efficiency
                        $("#bothKandSqNHeirachySelectionDiv").hide();
                        $("#squareNoUrbanHierarchyDiv").hide();
                        $('#khasraUrbanDiv').hide();

                        //$("#KhasraUrban").data("kendoAutoComplete").value("");
                        $("#KhasraUrban").val("");

                        var userProvidedLandValueNewProperty2 =  sanitizeNumericValue(($("#landProperty2").val()));
                        var userProvidedConstructedValueNewProperty2 = sanitizeNumericValue(($("#constructedStructureValueSecond").val()));

                        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + encodeURIComponent(PropertyAreaId) + "&talukaId=" + TalukaId+ "&LandValue=" + userProvidedLandValueNewProperty2 + "&constructedValue=" + userProvidedConstructedValueNewProperty2 , selectlandClassificationText, "LandClassificationUrban");
                    }
                    else {
                        if ((challan.propertyInfo2.IsSquareNoAvailable && challan.propertyInfo2.IsKhasraAvailable) || (challan.propertyInfo2.IsPropertyDetailAvailable && challan.propertyInfo2.IsKhasraAvailable) || (challan.propertyInfo2.IsSquareNoAvailable && challan.propertyInfo2.IsPropertyDetailAvailable) || (challan.propertyInfo2.IsSquareNoAvailable && challan.propertyInfo2.IsPropertyDetailAvailable && challan.propertyInfo2.IsKhasraAvailable)) {

                            $("#bothKandSqNHeirachySelectionDiv").show();
                            if (challan.propertyInfo2.IsKhasraAvailable) {
                                $("#Khasra1").show();
                            }
                            else {
                                $("#Khasra1").hide();
                            }
                            if (challan.propertyInfo2.IsSquareNoAvailable) {
                                $("#Square").show();
                            }
                            else {
                                $("#Square").hide();
                            }
                            if (challan.propertyInfo2.IsPropertyDetailAvailable) {
                                $("#Property").show();
                            }
                            else {
                                $("#Property").hide();
                            }
                            $("#squareNoUrbanHierarchyDiv").hide();
                            $('#khasraUrbanDiv').hide();
                        }
                        else {
                            $("#bothKandSqNHeirachySelectionDiv").hide();
                        }
                        if (challan.propertyInfo2.IsKhasraAvailable && !bothKandSqN_IsSqNoHierarchy && !bothKandSqN_IsPropertyHierarchy) {
                            challan.propertyInfo2.IsSquareNoAvailable = false;
                            challan.propertyInfo2.isSquareNoHierarchy = false;
                            challan.propertyInfo2.IsPropertyDetailAvailable = false;
                            $("#squareNoUrbanHierarchyDiv").hide();
                            $('#khasraUrbanDiv').show();
                            getKhasrasUrban(arg);
                        }
                        else if (challan.propertyInfo2.IsSquareNoAvailable && !bothKandSqN_IsKhasraHierarchy && !bothKandSqN_IsPropertyHierarchy) {
                            challan.propertyInfo2.IsKhasraAvailable = false;
                            challan.propertyInfo2.IsPropertyDetailAvailable = false;
                            $("#squareNoUrbanHierarchyDiv").show();
                            $('#khasraUrbanDiv').hide();
                            getSquareNoUrban(arg);
                        }
                        else if (challan.propertyInfo2.IsPropertyDetailAvailable && !bothKandSqN_IsKhasraHierarchy && !bothKandSqN_IsSqNoHierarchy) {
                            $('#khasraUrbanDiv').hide();
                            $("#squareNoUrbanHierarchyDiv").hide();
                            challan.propertyInfo2.IsKhasraAvailable = false;
                            challan.propertyInfo2.IsSquareNoAvailable = false;
                            challan.propertyInfo2.isSquareNoHierarchy = false;
                            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + encodeURIComponent(PropertyAreaId) + "&talukaId=" + TalukaId, selectlandClassificationText, "LandClassificationUrban");

                        }
                    }

                }
            }
            else {
                debugger; 

                if (!challan.propertyInfo.IsSquareNoAvailable && !challan.propertyInfo.IsKhasraAvailable) {         //mostly this will be the case. So checking ti first for efficiency
                    $("#squareNoUrbanHierarchyDiv").hide();
                    $("#bothKandSqNHeirachySelectionDiv").hide();
                    $('#khasraUrbanDiv').hide();
                    //$("#KhasraUrban").data("kendoAutoComplete").value("");
                    $("#KhasraUrban").val("");
                    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + PropertyAreaId + "&talukaId=" + TalukaId + "&LandValue=" + userProvidedLandValueNew + "&constructedValue=" + userProvidedConstructedValueNew, selectlandClassificationText, "LandClassificationUrban");
                }
                else {
                    if ((challan.propertyInfo.IsSquareNoAvailable && challan.propertyInfo.IsKhasraAvailable) || (challan.propertyInfo.IsPropertyDetailAvailable && challan.propertyInfo.IsKhasraAvailable) || (challan.propertyInfo.IsSquareNoAvailable && challan.propertyInfo.IsPropertyDetailAvailable) || (challan.propertyInfo.IsSquareNoAvailable && challan.propertyInfo.IsPropertyDetailAvailable && challan.propertyInfo.IsKhasraAvailable)) {

                        $("#bothKandSqNHeirachySelectionDiv").show();
                        if (challan.propertyInfo.IsKhasraAvailable) {
                            $("#Khasra1").show();
                        }
                        else {
                            $("#Khasra1").hide();
                        }
                        if (challan.propertyInfo.IsSquareNoAvailable) {
                            $("#Square").show();
                        }
                        else {
                            $("#Square").hide();
                        }
                        if (challan.propertyInfo.IsPropertyDetailAvailable) {
                            $("#Property").show();
                        }
                        else {
                            $("#Property").hide();
                        }
                        $("#squareNoUrbanHierarchyDiv").hide();
                        $('#khasraUrbanDiv').hide();
                    }
                    else {
                        $("#bothKandSqNHeirachySelectionDiv").hide();
                    }
                    if (challan.propertyInfo.IsKhasraAvailable && !bothKandSqN_IsSqNoHierarchy && !bothKandSqN_IsPropertyHierarchy) {
                        challan.propertyInfo.IsSquareNoAvailable = false;
                        challan.propertyInfo.isSquareNoHierarchy = false;
                        challan.propertyInfo.IsPropertyDetailAvailable = false;
                        $("#squareNoUrbanHierarchyDiv").hide();
                        $('#khasraUrbanDiv').show();
                        getKhasrasUrban(arg);
                    }
                    else if (challan.propertyInfo.IsSquareNoAvailable && !bothKandSqN_IsKhasraHierarchy && !bothKandSqN_IsPropertyHierarchy) {
                        challan.propertyInfo.IsKhasraAvailable = false;
                        challan.propertyInfo.IsPropertyDetailAvailable = false;
                        $('#khasraUrbanDiv').hide();
                        $("#squareNoUrbanHierarchyDiv").show();
                        getSquareNoUrban(arg);
                    }
                    else if (challan.propertyInfo.IsPropertyDetailAvailable && !bothKandSqN_IsKhasraHierarchy && !bothKandSqN_IsSqNoHierarchy) {
                        $('#khasraUrbanDiv').hide();
                        $("#squareNoUrbanHierarchyDiv").hide();
                        challan.propertyInfo.IsKhasraAvailable = false;
                        challan.propertyInfo.IsSquareNoAvailable = false;
                        challan.propertyInfo.isSquareNoHierarchy = false;
                        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + PropertyAreaId + "&talukaId=" + TalukaId, selectlandClassificationText, "LandClassificationUrban");

                    }

                }
            }

           
        }

        else {
            if (!isKhasraAvailableRateOfChallan && !isSquareNoHierarchyRateOfChallan) {         //mostly this will be the case. So checking ti first for efficiency
                $("#squareNoUrbanHierarchyDiv").hide();
                $("#bothKandSqNHeirachySelectionDiv").hide();
                $('#khasraUrbanDiv').hide();
                //$("#KhasraUrban").data("kendoAutoComplete").value("");
                $("#KhasraUrban").val("");
                initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + PropertyAreaId + "&talukaId=" + TalukaId, selectlandClassificationText, "LandClassificationUrban");
            }
            else {
                if ((isSquareNoHierarchyRateOfChallan && isKhasraAvailableRateOfChallan) || (isPropertyAreaAvailableRateOfChallan && isKhasraAvailableRateOfChallan) || (isSquareNoHierarchyRateOfChallan && isPropertyAreaAvailableRateOfChallan) || (isSquareNoHierarchyRateOfChallan && isPropertyAreaAvailableRateOfChallan && isKhasraAvailableRateOfChallan)) {

                    $("#bothKandSqNHeirachySelectionDiv").show();
                    if (isKhasraAvailableRateOfChallan) {
                        $("#Khasra1").show();
                    }
                    else {
                        $("#Khasra1").hide();
                    }
                    if (isSquareNoHierarchyRateOfChallan) {
                        $("#Square").show();
                    }
                    else {
                        $("#Square").hide();
                    }
                    if (isPropertyAreaAvailableRateOfChallan) {
                        $("#Property").show();
                    }
                    else {
                        $("#Property").hide();
                    }
                    $("#squareNoUrbanHierarchyDiv").hide();
                    $('#khasraUrbanDiv').hide();
                }
                else {
                    $("#bothKandSqNHeirachySelectionDiv").hide();
                }
                if (isKhasraAvailableRateOfChallan && !bothKandSqN_IsSqNoHierarchy && !bothKandSqN_IsPropertyHierarchy) {
                    isSquareNoHierarchyRateOfChallan = false;
                    isPropertyAreaAvailableRateOfChallan = false;
                    $("#squareNoUrbanHierarchyDiv").hide();
                    $('#khasraUrbanDiv').show();
                    getKhasrasUrban(arg);
                }
                else if (isSquareNoHierarchyRateOfChallan && !bothKandSqN_IsKhasraHierarchy && !bothKandSqN_IsPropertyHierarchy) {
                    $('#khasraUrbanDiv').hide();
                    isKhasraAvailableRateOfChallan = false;
                    isPropertyAreaAvailableRateOfChallan = false;
                    $("#squareNoUrbanHierarchyDiv").show();
                    getSquareNoUrban(arg);

                }
                else if (isPropertyAreaAvailableRateOfChallan && !bothKandSqN_IsKhasraHierarchy && !bothKandSqN_IsSqNoHierarchy) {
                    $('#khasraUrbanDiv').hide();
                    $("#squareNoUrbanHierarchyDiv").hide();
                    isKhasraAvailableRateOfChallan = false;
                    isSquareNoHierarchyRateOfChallan = false;
                   
                    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + encodeURIComponent(PropertyAreaId) + "&talukaId=" + TalukaId, selectlandClassificationText, "LandClassificationUrban");

                }


            }

            //if (isKhasraAvailableRateOfChallan && isKhasraAvailableRateOfChallan) {
            //    $('#khasraUrbanDiv').show();
            //    getKhasrasUrban(arg);
            //}
            //else {
            //    $('#khasraUrbanDiv').hide();
            //    $("#KhasraUrban").data("kendoAutoComplete").value("");
            //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + encodeURIComponent(PropertyAreaId) + "&revenueCircleId=" + revenueCircleId, selectlandClassificationText, "LandClassificationUrban");
            //    $("#LandClassificationUrban").data("kendoDropDownList").value(selectlandClassificationText);
            //}
        }
    }



    function updateLandClassificationDropdown(valuesToRemove) {
        var $dropdown = $("#LandClassificationUrban");
        console.log(valuesToRemove);
        // Remove specified options
        for (var i = 0; i < valuesToRemove.length; i++) {
            var value = valuesToRemove[i];
            $dropdown.find(`option[value='${value}']`).remove();
        }

        // Ensure the first option (default) is selected
       // $dropdown.val("");
        console.log($dropdown.html());
    }
    function handleLandClassificationFocusNew() {
        debugger;
        alert("Dropdown is focused or about to open!");
    }
    function handleLandClassificationFocus() {
        alert("testing"); // For testing the event trigger

        var userProvidedLandValue = parseInt($("#userProvidedLandValue").val()) || 0;
        var userProvidedConstructedValue = parseInt($("#userProvidedConstructedValue").val()) || 0;

        if (userProvidedLandValue > 0 && userProvidedConstructedValue <= 0) {
            // Retain only land-related options
            updateLandClassificationDropdown(["8", "9", "10"]); // Commercial Built Up, Flats/Apartments, Residential Built Up
        } else if (userProvidedLandValue <= 0 && userProvidedConstructedValue > 0) {
            // Retain built-up-related options
            updateLandClassificationDropdown(["2", "7", "5"]); // Commercial Open Plot, Residential Open Plot, Industrial
        } else {
            // Show all options (do not remove any)
            updateLandClassificationDropdown([]);
        }
    }

    function callBackFunction(_callback) {
        _callback();
    }

    var ajaxCall = false;
    var selectedSqUrbanId = 0;
    function getSquareNoUrban(arg) {
       
        $("#LandClassificationUrban").data("kendoDropDownList").value(selectlandClassificationText);
        //make ajax call to get all khasrasUrban from KhasraUrbanByPropertyArea then create an autocomplete with returned data THEN on it change get LANDCLASSIFICATIONS :)
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/Locations/SquareNoUrbanByPropertyArea?TehsilID=' + arg.tID + '&town=' + arg.town + '&RevenueCircleId=' + arg.rcID + '&PropertyAreaID='+arg.paID ,
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            success: function (listOfSquareNoUrban) {

                var autocomplete = $("#squareNoUrban").data("kendoAutoComplete");
                if (autocomplete != null) {
                    autocomplete.destroy();
                }
                var validForSqNo = false;
                $("#squareNoUrban").kendoAutoComplete({
                    dataTextField: "Name",
                    dataSource: listOfSquareNoUrban,
                    filter: "startswith",
                    //placeholder: "Select Khasra",
                    highlightFirst: true,
                    select: function (e) {
                        validForSqNo = true;
                        var selectedOne = this.dataItem(e.item.index());
                        console.log(kendo.stringify(selectedOne));
                        SquareNoUrbanId = selectedOne.Id;
                        selectedSqUrbanId = selectedOne.Id;
                        getQilaNoUrbanBySquareNoId(arg, SquareNoUrbanId);
                        ajaxCall = true;
                        //var GMapString = selectedOne.GMapSearchKey;//Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
                        //var DefaultGMapString = null;//Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
                        //var KmlDBUrl = selectedOne.DB_KML_URL;
                        //LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
                        //populateLandClassificationByKhasraUrban(arg.rcID, arg.paID, selectedOne.Name);

                    },
                    open: function (e) {
                        validForSqNo = false;
                    },
                    close: function (e) {
                        $('#qilaNoUrban').val('');
                        // if no valid selection - clear input
                        if (!validForSqNo && !ajaxCall) {
                            this.value('');
                        }
                        validForSqNo = false;
                        ajaxCall = false;
                        if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
                            $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
                        if ($('#Location').data("kendoDropDownList") != null)
                            $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
                    },
                    change: function (e) {
                        if (!validForSqNo && !ajaxCall) this.value('');
                    },
                });
            },
            error: function (data) {

            }
        });

    }



    function getQilaNoUrbanBySquareNoId(arg, sqNoId) {
        $("#LandClassificationUrban").data("kendoDropDownList").value(selectlandClassificationText);
        //make ajax call to get all khasrasUrban from KhasraUrbanByPropertyArea then create an autocomplete with returned data THEN on it change get LANDCLASSIFICATIONS :)
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/Locations/QilaNoUrbanBySquareNoId?TehsilID=' + arg.tID + '&town=' + arg.town + '&RevenueCircleId=' + arg.rcID + '&PropertyAreaID='+arg.paID+ '&squareNoID=' + sqNoId,
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            success: function (listOfQilaNoUrban) {
                
                var autocomplete = $("#qilaNoUrban").data("kendoAutoComplete");
                if (autocomplete != null) {
                    autocomplete.destroy();
                }
                var validForQilaUrban = false;
                $("#qilaNoUrban").kendoAutoComplete({
                    dataTextField: "Name",
                    dataSource: listOfQilaNoUrban,
                    filter: "startswith",
                    //placeholder: "Select Khasra",
                    highlightFirst: true,
                    select: function (e) {
                        validForQilaUrban = true;
                        var selectedOne = this.dataItem(e.item.index());
                        console.log(kendo.stringify(selectedOne));
                        QilaNoUrbanId = selectedOne.Id;
                        var GMapString = selectedOne.GMapSearchKey;//Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
                        var DefaultGMapString = null;//Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
                        var KmlDBUrl = selectedOne.DB_KML_URL;
                        //LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
                        populateLandClassificationByQilaNoUrban(arg.tID, arg.town,arg.rcID, arg.paID, sqNoId, selectedOne.Name);

                        var landUnit = selectedOne.PropertyAreaRateUnit;

                        if (landUnit != null) {
                            setLandUnitUrbanFromDB(landUnit);
                        }


                    },
                    open: function (e) {
                        validForQilaUrban = false;
                    },
                    close: function (e) {
                        // if no valid selection - clear input
                        if (!validForQilaUrban) this.value('');
                        validForQilaUrban = false;
                        ajaxCall = false;
                        if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
                            $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
                        if ($('#Location').data("kendoDropDownList") != null)
                            $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
                    },
                    change: function (e) {
                        if (!validForQilaUrban) this.value('');

                    },

                });

            },
            error: function (data) {

            }
        });

    }



    function getKhasrasUrban(arg) {
        $("#LandClassificationUrban").data("kendoDropDownList").value(selectlandClassificationText);
        //make ajax call to get all khasrasUrban from KhasraUrbanByPropertyArea then create an autocomplete with returned data THEN on it change get LANDCLASSIFICATIONS :)
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/Locations/KhasraUrbanByPropertyArea?TehsilID=' + arg.tID + '&town=' + arg.town + '&RevenueCircleId=' + arg.rcID + '&PropertyAreaID=' + arg.paID,
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            success: function (listOfKhasrasUrban) {

                var autocomplete = $("#KhasraUrban").data("kendoAutoComplete");
                if (autocomplete != null) {
                    autocomplete.destroy();
                }
                var validForKhasraUrban = false;
                $("#KhasraUrban").kendoAutoComplete({
                    dataTextField: "Name",
                    dataSource: listOfKhasrasUrban,
                    filter: "startswith",
                    //placeholder: "Select Khasra",
                    highlightFirst: true,
                    select: function (e) {
                        validForKhasraUrban = true;
                        var selectedOne = this.dataItem(e.item.index());
                        console.log(kendo.stringify(selectedOne));
                        KhasraUrbanId = selectedOne.Id;
                        var GMapString = selectedOne.GMapSearchKey;//Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
                        var DefaultGMapString = null;//Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
                        var KmlDBUrl = selectedOne.DB_KML_URL;
                        // LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
                        populateLandClassificationByKhasraUrban(arg.rcID, arg.paID, selectedOne.Name,arg.tID,arg.town);

                    },
                    open: function (e) {
                        validForKhasraUrban = false;
                    },
                    close: function (e) {
                        // if no valid selection - clear input
                        if (!validForKhasraUrban) this.value('');
                        validForKhasraUrban = false;
                        if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
                            $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
                        if ($('#Location').data("kendoDropDownList") != null)
                            $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
                    },
                    change: function (e) {
                        if (!validForKhasraUrban) this.value('');

                    },

                });

            },
            error: function (data) {

            }
        });

    }


    



    function populateLandClassificationByQilaNoUrban(tID, town,rcID, paID, sqNoId,qilaUrbanNo) {
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByQilaNoUrban?TehsilId=' + tID +'&town='+ town+'&revenueCircleId=' + rcID+'&PropertyAreaID=' + paID+"&squareNoId=" + sqNoId+ '&qilaUrbanNo=' + qilaUrbanNo   , selectlandClassificationText, "LandClassificationUrban");
        $("#LandClassificationUrban").data("kendoDropDownList").value(selectlandClassificationText);
    }

    function actionOnLandClassificationUrbanChanged() {
        $('#LandClassificationU_validationMessage').hide();
        if ($('#Location').data("kendoDropDownList") != null)
            $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
        //$('#Khasra').val('');
        //$('#squareNo').val('');
        //$('#qilaNo').val('');
        var PropertyAreaId = $('#PropertyArea').data("kendoDropDownList").text();
        var revenueCircleId = $("#RevenueCircle").val();
        var propertyAreaId = $("#PropertyArea").val();
        var TehsilId = $("#talukaDropdownDC").val();
        var ClassificationId = $("#LandClassificationUrban").val();
       // var town = $('#townDropdownDC').data("kendoDropDownList").text();
      

        //$("#KhasraUrban").val("");
        //$("#squareNoUrban").val("");
        //$("#qilaNoUrban").val("");

        var arg = {
            paName: PropertyAreaId,
            rcID: revenueCircleId,
            paID: propertyAreaId,
            tID: TehsilId,
          //  town: town,
            clId: ClassificationId
        };

        if (isDCValueNotFirst) {
            if (isExchangeOfProperty) {
                if (isDCNextFirstScreen) {
                    if (challan.propertyInfo.IsKhasraAvailable) {
                        populateLocationByKhasra(arg);
                    }
                    else if (!challan.propertyInfo.IsSquareNoAvailable) {
                        populateLocationByPropertyArea(arg);
                    }
                    else if (challan.propertyInfo.IsSquareNoAvailable) {
                        populateLocationBySquareNo(arg);
                    }
                }
                else {
                    if (challan.propertyInfo2.IsKhasraAvailable) {
                        populateLocationByKhasra(arg);
                    }
                    else if (!challan.propertyInfo2.IsSquareNoAvailable) {
                        populateLocationByPropertyArea(arg);
                    }
                    else if (challan.propertyInfo2.IsSquareNoAvailable) {
                        populateLocationBySquareNo(arg);
                    }
                }
            }
            else {
                if (challan.propertyInfo.IsKhasraAvailable) {
                    populateLocationByKhasra(arg);
                }
                else if (!challan.propertyInfo.IsSquareNoAvailable) {
                    populateLocationByPropertyArea(arg);
                }
                else if (challan.propertyInfo.IsSquareNoAvailable) {
                    populateLocationBySquareNo(arg);
                }
            }
        }
        else {
            if (isKhasraAvailableRateOfChallan) {
                populateLocationByKhasra(arg);
            }
            else if (!isSquareNoHierarchyRateOfChallan) {
                populateLocationByPropertyArea(arg);
            }
            else if (isSquareNoHierarchyRateOfChallan) {
                populateLocationBySquareNo(arg);
            }
        }

    }

    function populateLocationByKhasra(arg) {
        var khasraNoUrban = $('#KhasraUrban').val();
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaIdHavingKhasraNo?tehsilId=' + arg.tID + '&town=' + arg.town + '&PropertyAreaID=' + arg.paID + '&revenueCircleId=' + arg.rcID + "&landClassificationId=" + arg.clId + "&KhasraNo=" + khasraNoUrban, selectLocationText, "LocationUrban");
        $("#LocationUrban").data("kendoDropDownList").value(selectLocationText);
    }

    function populateLocationBySquareNo(arg) {
        var sqNoUrban = $('#squareNoUrban').val();
        var qilaNoUrban = $('#qilaNoUrban').val();
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaIdHavingSquareNo?tehsilId=' + arg.tID + '&town=' + arg.town + '&PropertyAreaID=' + arg.paID + '&revenueCircleId=' + arg.rcID + "&landClassificationId=" + arg.clId + "&squareNo=" + sqNoUrban + "&qilaNo=" + qilaNoUrban, selectLocationText, "LocationUrban");
        $("#LocationUrban").data("kendoDropDownList").value(selectLocationText);
    }

    //function populateLocationByPropertyArea(arg) {
    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaId?tehsilId=' + arg.tID + '&town=' + arg.town + '&PropertyAreaID=' + arg.paID + '&revenueCircleId=' + arg.rcID + "&landClassificationId=" + arg.clId, selectLocationText, "LocationUrban");
    //    $("#LocationUrban").data("kendoDropDownList").value(selectLocationText);
    //}

    //function actionOnLandClassificationUrbanChangedOLD() {
    //    $('#LandClassificationU_validationMessage').hide();
    //    if ($('#Location').data("kendoDropDownList") != null)
    //        $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
    //    $('#Khasra').val('');
    //    $('#squareNo').val('');
    //    $('#qilaNo').val('');

    //    if (isDCValueNotFirst) {
    //        if (isExchangeOfProperty) {
    //            if (isDCNextFirstScreen) {
    //                if (challan.propertyInfo.IsKhasraAvailable) {
    //                    khasraUrbanRateUnit();
    //                }
    //                else if (!challan.propertyInfo.IsSquareNoAvailable) {
    //                    PropertyAreaRateUnit();
    //                }
    //            }
    //            else {
    //                if (challan.propertyInfo2.IsKhasraAvailable) {
    //                    khasraUrbanRateUnit();
    //                }
    //                else if (!challan.propertyInfo2.IsSquareNoAvailable) {
    //                    PropertyAreaRateUnit();
    //                }
    //            }
    //        }
    //        else {
    //            if (challan.propertyInfo.IsKhasraAvailable) {
    //                khasraUrbanRateUnit();
    //            }
    //            else if (!challan.propertyInfo.IsSquareNoAvailable) {
    //                PropertyAreaRateUnit();
    //            }
    //        }
    //    }
    //    else {
    //        if (isKhasraAvailableRateOfChallan) {
    //            khasraUrbanRateUnit();
    //        }
    //        else if (!isSquareNoHierarchyRateOfChallan) {
    //            PropertyAreaRateUnit();
    //        }
    //    }
       
    //}

  


   




    function PropertyAreaRateUnit() {

        var PropertyAreaid = $("#PropertyArea").val();
      
        var LandClassificationid = $("#LandClassificationUrban").val();
        // var Locationid = $("#LocationUrban").val();
        var AreaName = $('#PropertyArea').data("kendoDropDownList").text();

        var propertyAreaViewModel = {
            PropertyAreaId: PropertyAreaid,
            RevenueCircleId: RevenueCircleid,
            LandClassificationId: LandClassificationid,
            //  LocationId: Locationid,
            PropertyAreaId: AreaName
        }

        $.ajax({
            url: base_url_service_layer + '/api/Proxy/Locations/PropertyAreaRateUnitByLandInfo',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(
                propertyAreaViewModel
            ),

            success: function (rateUnit) {

                setLandUnitUrbanFromDB(rateUnit);


            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');

                document.getElementById("LandUnit").innerHTML = "&nbsp;";
               // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";

            }
        });

    }

    function setLandUnitUrbanFromDB(rateUnit) {
        disableFindRateButton();

        if (rateUnit != null && rateUnit != "") {

            document.getElementById("LandUnit").innerHTML = "&nbsp;per&nbsp;" + rateUnit;
           // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;" + rateUnit;
        }
        else {
            document.getElementById("LandUnit").innerHTML = "&nbsp;";
          //  document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        }

    }



   
   

    function resetAll() {
        //enableDDropDownlists();
        ShowInfoByLandType();
       
        bothKandSqN_IsKhasraHierarchy = false;
        bothKandSqN_IsSqNoHierarchy = false;
        dropdownIdentifier = 0;
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        $("#PropertyAreaQuantity").val('');
        $("#BasementCoveredAreaQuantity").val('');
        $("#CoveredAreaQuantity").val(''); 
        $("#CoveredAreaQuantity").val('');
       
        $("input[name='Covered Area (Excluding Basements)']").val(0);
        if (id == "Rural") {
            $("#CoveredValueResult").hide(); 
            $("#btnMultipleLandClassification").hide(); 
            $("#MultiStoreyTypeRadioButtonDiv").hide(); 
            $("#BasementDropdownDCDiv").hide();
            $("#FLDropdownDCDiv").hide();
            $("#PropertyAreaQuantity").show(); 
            $("#CoveredAreaRateBasements").hide();
        } else {
            $("#MultiStoreyTypeRadioButtonDiv").show();
            $("#BasementDropdownDCDiv").show();
            $("#FLDropdownDCDiv").show();
            $("#CoveredAreaRateBasements").show();
        }
       
        $('#DCRateNotFoundLabel').hide();
        $('#SQFRateNotFoundLabel').hide(); 
        $('#RateRuralNotFoundLabel').hide();
        
       

        $('#CoveredAreaRate').hide();
       // $('#PropertyAreaRate').hide(); 

        $("#DCValueError").hide();
        $(".k-invalid-msg").hide();
        if (isDCValueNotFirst) {
            //if($('#District').data("kendoDropDownList") != null)
            //    $('#District').data("kendoDropDownList").value(selectDistrictText);
            
            if ($('#districtDropdownDC').data("kendoDropDownList") != null)
                $("#districtDropdownDC").val("").data("kendoDropDownList").text(selectDistrictText);
            if ($('#talukaDropdownDC').data("kendoDropDownList") != null)
                $("#talukaDropdownDC").val("").data("kendoDropDownList").text(selectTehsilText);
            if ($('#PropertyArea').data("kendoDropDownList") != null)
                $("#PropertyArea").val("").data("kendoDropDownList").text("");
           
            //To chech town field refresh
           // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?id=' + Tehsil_id, selectTownText, "townDropdownDC");
           // document.getElementById("DistrictName").innerHTML = challan.DistrictString;
           // document.getElementById("TehsilName").innerHTML = challan.TehsilString;
           
            if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                if (queryStringName == "PayCVTandReg") {
                    document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.propertyInfo.LandPropertyValue);
                }
                else {
                    document.getElementById("PropertyValuationId").innerHTML = $("#landProperty").val();
                }
                if (challan.propertyInfo.IsKhasraAvailable != null && challan.propertyInfo.IsKhasraAvailable) {
                    //$("#KhasraUrban").data("kendoAutoComplete").value("");
                    $("#KhasraUrban").val("");
                    $('#khasraUrbanDiv').hide();
                }
                if (challan.propertyInfo.isSquareNoHierarchy != null && challan.propertyInfo.isSquareNoHierarchy) {
                    $("#squareNo").data("kendoAutoComplete").value("");
                    $("#qilaNo").data("kendoAutoComplete").value("");
                    $('#squareNoHierarchyDiv').hide();
                    $('#btnMultipleSquareQila').hide();
                }
            }
            else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                document.getElementById("DCRateSqFt2").innerHTML = 0; 
                document.getElementById("StructureValueId").innerHTML = 0;
               
               
                if (queryStringName == "PayCVTandReg") {
                    document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.propertyInfo2.LandPropertyValue);
                }
                else {
                    document.getElementById("PropertyValuationId").innerHTML = $("#landProperty2").val();
                    userProvidedConstructuedValue2 = returnCommas($('#constructedStructureValueSecond').val());
                    document.getElementById("CSValueUserProvidedRate").innerHTML = returnCommas(userProvidedConstructuedValue2);
                }
                if (challan.propertyInfo2.IsKhasraAvailable) {
                    $("#KhasraUrban").data("kendoAutoComplete").value("");
                    $('#khasraUrbanDiv').hide();
                }
                if (challan.propertyInfo2.isSquareNoHierarchy) {
                    $("#squareNo").data("kendoAutoComplete").value("");
                    $("#qilaNo").data("kendoAutoComplete").value("");
                    $('#squareNoHierarchyDiv').hide();
                    $('#btnMultipleSquareQila').hide();
                }
            }
            else {
                if (queryStringName == "PayCVTandReg") {
                    document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.TotalAmount);
                }
                else {
                    document.getElementById("PropertyValuationId").innerHTML = $("#landProperty").val();
                }
                if (challan.propertyInfo.IsKhasraAvailable != null && challan.propertyInfo.IsKhasraAvailable) {
                    $("#KhasraUrban").data("kendoAutoComplete").value("");
                    $('#khasraUrbanDiv').hide();
                }
                if (challan.propertyInfo.isSquareNoHierarchy) {
                    if (challan.propertyInfo.SquareUrbanID != null && challan.propertyInfo.SquareUrbanID != "") {
                        $("#squareNoUrban").data("kendoAutoComplete").value("");
                        //$("#qilaNoUrban").data("kendoAutoComplete").value("");
                        $('#squareNoUrbanHierarchyDiv').hide();
                    }
                    else {
                        $("#squareNo").data("kendoAutoComplete").value("");
                        $("#qilaNo").data("kendoAutoComplete").value("");
                        $('#squareNoHierarchyDiv').hide();
                        $('#btnMultipleSquareQila').hide();
                    }
                }
            }
            //document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.TotalAmount);
            if ($('#LandClassification').data("kendoDropDownList") != null)
                $("#LandClassification").val("").data("kendoDropDownList").text("");
            if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
                $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
            if ($('#LocationUrban').data("kendoDropDownList") != null)
                $("#LocationUrban").val("").data("kendoDropDownList").text(selectLocationText);

            if ($('#Mouza').data("kendoDropDownList") != null)
                $("#Mouza").val("").data("kendoDropDownList").text("");
            if ($('#PropertyArea').data("kendoDropDownList") != null)
                $("#PropertyArea").val("").data("kendoDropDownList").text("");
        }
        else {
            if ($('#districtDropdownDC').data("kendoDropDownList") != null)
                $("#districtDropdownDC").val("").data("kendoDropDownList").text(selectDistrictText);
            if ($('#talukaDropdownDC').data("kendoDropDownList") != null)
                $("#talukaDropdownDC").val("").data("kendoDropDownList").text(selectTehsilText);
            if ($('#townDropdownDC').data("kendoDropDownList") != null)
                $("#townDropdownDC").val("").data("kendoDropDownList").text("");
            if ($('#RevenueCircle').data("kendoDropDownList") != null)
                $("#RevenueCircle").val("").data("kendoDropDownList").text("");
            if ($('#Qanoongoee').data("kendoDropDownList") != null)
                $("#Qanoongoee").val("").data("kendoDropDownList").text("");
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=', selectQanoongoeeText, "Qanoongoee");
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=', selectRevenueCircleText, "RevenueCircle");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC");
            ////initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTehsilText, "talukaDropdownDC");
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/GetTownsByTehsil?id=', selectTownText, "townDropdownDC");
        }

        

        if ($('#PropertyArea').data("kendoDropDownList") != null)
            $("#PropertyArea").val("").data("kendoDropDownList").text(selectPropertyAreaText);
        if ($('#LandClassificationUrban').data("kendoDropDownList") != null)
            $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);

        if ($('#CategoriesUrban').data("kendoDropDownList") != null)
            $("#CategoriesUrban").val("").data("kendoDropDownList").text(SelectLandCategoryText);

        disableFindRateButton();
      //  $("#Location").val("").data("kendoDropDownList").text("");
       // $("#LocationUrban").val("").data("kendoDropDownList").text("");
      //  ResetTextBox("PropertyAreaQuantity");
      
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + "&talukaId=" , selectlandClassificationText, "LandClassificationUrban");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllCategoriesByLandClassifications?PropertyAreaId=' + "&talukaId=" + "&landClassificationId=" , SelectLandCategoryText, "CategoriesUrban");
       // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?RevenueCircleId=', selectPropertyAreaText, "PropertyArea");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=&QanoonGoId=&landClassificationId=', selectLocationText, "Location");
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaId?Tehsil=&Town=&PropertyAreaId&revenueCircleId&landClassificationId=', selectLocationText, "LocationUrban");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByTalukaId?TalukaId=', selectPropertyAreaText, "PropertyArea");

        document.getElementById("rateValue").innerHTML = "0";
        document.getElementById("LandUnit").innerHTML = "&nbsp;";
       // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        document.getElementById("DCValueId").innerHTML = "0";
        if (isDCValueNotFirst) {
            if (!isDCNextFirstScreen) {
                document.getElementById("DCRateSqFt").innerHTML = "Rs. 0";
            }
        }
        //document.getElementById("mapembed").innerHTML = "<iframe id='embeddedMapiframe' width='660' height='580' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/place?q=gujranwala%20district%2Cpakistan&key=AIzaSyBO-pBF5k74nHsaZJfXamcgWKQ7Gze_1PE' allowfullscreen></iframe>"
        

        if (url.indexOf("RateOfChallanView") == -1) {
            var time = new Date();
          
                $("#map").hide();
                $("#mapembed").show();

           
            
        }
        else {
            console.log("in else");
        }
        //resetAddMultipleKhasrasScreen();
        //resetMultipleKhasraScreen();

        $("#LandClassificationCVTDiv").hide();
        
      //  initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassifications', "Select Land Classifications", "LandClassificationCVT");
        //$("#checkBoxesCVT").hide();
        ResetTextBox("constructedAreaCVT");
        //ResetTextBox("PayableCVTCVTDiv");
        $('#propertyConstructed').attr('checked', false);
        $('#govPropertyExchangeOfPropertyCheckbox').attr('checked', false);
        $("#multiStoryBuilding").hide();
        $('#multiStoryBuilding').attr('checked', false);
        $("#legalHeirs").hide();
        $('#legalHeirs').attr('checked', false);
        $('#constructedAreaCVTDiv').hide();
        ResetTextBox("PayableCVTValue");
        ResetTextBox("PayCVTValueMultipleProperties");
        ResetTextBox("payableStampDutyandCVTGenerateChallan");
        //if ($("#LandClassificationCVT").val("").data("kendoDropDownList") != null) {
        //    $("#LandClassificationCVT").val("").data("kendoDropDownList").text("Select Location");
        //}
    }

    function setIsDCValuationFirstValue() {
        DCValueInitialDiv = document.getElementById("DCValuationInitialValue");
        if (DCValueInitialDiv) {
            if (DCValueInitialDiv.innerHTML == 'true') {
                isDCValueNotFirst = true;
            }
            else if (DCValueInitialDiv.innerHTML == 'false') {
                isDCValueNotFirst = false;
            }
        }
    }

    function setIsDCValuationAdminValue() {
        DCValueAdminDiv = document.getElementById("DCValueAdmin");
        if (DCValueAdminDiv) {
            if (DCValueAdminDiv.innerHTML == 'true')
            { isDCValueAdmin = true; }
            else if (DCValueAdminDiv.innerHTML == 'false') {
                isDCValueAdmin = false;
            }
        }
    }


    function initialize() {
       
        dropdownIdentifier = 0;
        $("#DCValueError").hide();
        setIsDCValuationFirstValue();
        setIsDCValuationAdminValue();
       
     
            $("#districtLabelDiv").hide();
            $("#tehsilLabelDiv").hide();
            $("#townLabelDiv").hide();
            $("#districtDropdownDCDiv").show();
            $("#talukaDropdownDCDiv").show();
            $("#confirmfromUserProvided").hide();
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTehsilText, "talukaDropdownDC");
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?id=', selectTownText, "townDropdownDC");
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=', selectQanoongoeeText, "Qanoongoee");
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=', selectRevenueCircleText, "RevenueCircle");
      
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTehsilText, "talukaDropdownDC");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=', selectMouzaText, "Mouza");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=&QanoonGoId=', selectlandClassificationText, "LandClassification");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + "&talukaId=" , selectlandClassificationText, "LandClassificationUrban");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllCategoriesByLandClassifications?PropertyAreaId='  + "&talukaId="  + "&landClassificationId=" , SelectLandCategoryText, "CategoriesUrban");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/KarachiAgricultureSP?TalukaId=', selectDehText, "KarachiAgriculture");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukaLandTypeSP?PropertyAreaId=' + "&talukaId=", selectTulkaLandTypeText, "TalukaLandType");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/ModeofIrrigationSP?TalukaId=', selectModeofIrrigationText, "modeofIrrigation");
       
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/LandTypeStampDuty', selectLandTypeStamp, "LandClassificationStamp_new");

        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?RevenueCircleId=', selectPropertyAreaText, "PropertyArea");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByTalukaId?TalukaId=', selectPropertyAreaText, "PropertyArea");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=&QanoonGoId=&landClassificationId=', selectLocationText, "Location");
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByTalukaId?TalukaId=', selectPropertyAreaText, "PropertyArea");
        // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaId?Tehsil=&Town=&PropertyAreaId&revenueCircleId&landClassificationId=', selectLocationText, "LocationUrban");
        // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyArea?PropertyAreaId=' + "&revenueCircleId=&landClassificationId=", selectLocationText, "LocationUrban");
       // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/GetFloors?RevenueCircleId=', selectFloorText, "Floor");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/GetFloors', selectFloorText, "FlDropdownDC");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/GetBasements', selectBasementText, "BasementsDropdownDC");
        document.getElementById("rateValue").innerHTML = "0";
        document.getElementById("LandUnit").innerHTML = "&nbsp;";
       // document.getElementById("DCRateSqFt").innerHTML = "Rs. 0";
        //   mapstring=  challan.propertyInfo.DistrictString + " , " + "Pakistan";
        //if (isCVTandNotDC == true) {
        //    $("#confirmfromUserProvided").hide();
        //}
        //else {
        //    $("#confirmfromUserProvided").show();
        //}
    }
    function AgriLandClassificationChange() {
        var $radio = $('input[name=AgricultureRateType]:checked');
        var id = $radio.attr('id');
        if (isDCValueNotFirst) {
            var dropdown = $("#LandClassificationStamp").data("kendoDropDownList");
        }

        if (id === 'Unsurvey') {
            if (isDCValueNotFirst) {
                challan.rate_type_agriculture = 'Unsurvey';
            }
        } else if (id === 'MuncipalLimits') {
            if (isDCValueNotFirst) {
                challan.rate_type_agriculture = 'MuncipalLimits';
            }
        }
        else {
            if (isDCValueNotFirst) {
                challan.rate_type_agriculture = 'Survey';
            }
        }
        if (isDCValueNotFirst) {
            // Clear the existing options
            dropdown.dataSource.data([]);
        }

        if (id === 'Unsurvey' || id === 'MuncipalLimits') {
            if (isDCValueNotFirst) {
                if (id === 'MuncipalLimits') {
                    dropdown.dataSource.add({ text: 'Normal - As Per Stamp Duty', value: '2' });
                } else {
                    dropdown.dataSource.add({ text: 'Select Land Type', value: '' });
                    dropdown.dataSource.add({ text: 'Banjar Jadeed - 1/4', value: '4' });
                    dropdown.dataSource.add({ text: 'Banjar Qadeem - 1/8', value: '1' });
                    dropdown.dataSource.add({ text: 'Barani Soil - 1/4', value: '3' });
                    dropdown.dataSource.add({ text: 'Ghair Mumkin - 1/16', value: '5' });
                    dropdown.dataSource.add({ text: 'Normal - As Per Stamp Duty', value: '2' });
                }

            }
            $("#ModeofIrrigationDiv").hide();
        } else {
            $("#ModeofIrrigationDiv").show();
        }

        // Trigger change event on the select element
        dropdown.trigger('change');
    }
    //function initializeDropDowns() {
    //    setIsDCValuationFirstValue();
    //    if (isDCValueNotFirst) {

    //        if (challan != null) {
    //            Tehsil_id = $("#Tehsil").val();

    //            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + Tehsil_id, selectQanoongoeeText, "Qanoongoee");

    //            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=' + Tehsil_id, selectRevenueCircleText, "RevenueCircle");
    //        }
    //        else {
    //            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC");

    //            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTehsilText, "talukaDropdownDC");

    //            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=', selectQanoongoeeText, "Qanoongoee");

    //            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=', selectRevenueCircleText, "RevenueCircle");
    //        }
    //    }

    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=', selectMouzaText, "Mouza");

    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=&QanoonGoId=', selectlandClassificationText, "LandClassification");
    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + "&revenueCircleId=", selectlandClassificationText, "LandClassificationUrban");

    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?RevenueCircleId=', selectPropertyAreaText, "PropertyArea");

    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=&QanoonGoId=&landClassificationId=', selectLocationText, "Location");

    //}

    function initializeDCValuation() {
        if ($('#PropertyArea').data("kendoDropDownList") != null)
            $("#PropertyArea").val("").data("kendoDropDownList").text(selectPropertyAreaText);
        if (lang == "ur")
        {
            $("#amountLabelRateOfChallan").css("direction", "rtl");
            $("#amountLabelRateOfChallan").css("font-size", "18px");
            $("#amountLabelRateOfChallan").css("font-weight", "300");
        }

        $("#DCValueError").hide();
       // initializeGoogleMapByAdminValue();
        setIsDCValuationFirstValue();
        if (isDCValueNotFirst) {
            // OLD LOGIC
            /*
            $("#districtLabelDiv").show();
            $("#tehsilLabelDiv").show();
            $("#districtDropdownDCDiv").hide();
            $("#talukaDropdownDCDiv").hide();
            */
            $("#districtLabelDiv").hide();
            $("#tehsilLabelDiv").hide();
            $("#townLabelDiv").hide();
            $("#districtDropdownDCDiv").show();
            $("#talukaDropdownDCDiv").show();
            $("#confirmfromUserProvided").show(); // show
            if (challan != null) {
                var deedidChk = $("#TransactionName").val();
                if (deedidChk == immoveableDeedId)
                {
                    //$("#Rural").hide();
                    //$("#ruralLblDcScreen").hide();
                    $("#RuralRadio").hide();
                }
                else
                {
                    $("#RuralRadio").show();
                    //$("#Rural").show();
                    //$("#ruralLblDcScreen").show();
                }
                isExchangeOfProperty = challan.isExchangeOfProperty;
                document.getElementById("DistrictName").innerHTML = challan.DistrictString;
              //  document.getElementById("TehsilName").innerHTML = challan.TehsilString;
                //$("#districtDropdownDC").val(challan.DistrictId).data("kendoDropDownList").text(challan.DistrictString);
                //$('#talukaDropdownDC').val(challan.TehsilId).data("kendoDropdownList").text(challan.TehsilString);
            //    getTehsilDetails(challan.TehsilId); // By Default, Load Tehsil on Google Maps
                if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                    isLeaseDeed = false;
                    document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                    $("#confirmfromUserProvided").show();
                    userProvidedLandValue = returnCommas(challan.propertyInfo.LandPropertyValue);
                    userProvidedConstructuedValue = returnCommas($('#constructedStructureValueGenerateChallan').val());
                    //document.getElementById("PropertyValuationId").innerHTML = userProvidedLandValue;
                    document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                    document.getElementById("CSValueUserProvidedRate").innerHTML = returnCommas(userProvidedConstructuedValue);
                    if (queryStringName == "PayCVTandReg") {
                        document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.propertyInfo.LandPropertyValue);
                        $("#confirmfromUserProvided").hide();
                    }
                    else {
                        document.getElementById("PropertyValuationId").innerHTML = $("#landProperty").val();
                        $("#confirmfromUserProvided").show();
                    }
                }
                else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                    isLeaseDeed = false;
                    document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                    $("#confirmfromUserProvided").show();
                    userProvidedLandValue = returnCommas(challan.propertyInfo2.LandPropertyValue);
                    userProvidedConstructuedValue = returnCommas($('#constructedStructureValueSecond').val());
                    //document.getElementById("PropertyValuationId").innerHTML = userProvidedLandValue;
                    document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                    document.getElementById("CSValueUserProvidedRate").innerHTML = returnCommas(userProvidedConstructuedValue);
                    if (queryStringName == "PayCVTandReg") {
                        document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.propertyInfo2.LandPropertyValue);
                        $("#confirmfromUserProvided").hide();
                    }
                    else {
                        document.getElementById("PropertyValuationId").innerHTML = $("#landProperty2").val();
                        userProvidedConstructuedValue2 = returnCommas($('#constructedStructureValueSecond').val());
                        document.getElementById("CSValueUserProvidedRate").innerHTML = returnCommas(userProvidedConstructuedValue2);
                        $("#confirmfromUserProvided").show();
                    }
                }
                else {
                    if (queryStringName == "PayCVTandReg") {
                        if (challan.TransactionName != PowerOfAttorneyDeedId) { //get deed ID
                            //$("#confirmfromUserProvided").show();
                            document.getElementById("PropertyValuationId").innerHTML = returnCommas(/*challan.TotalAmount*/);
                            document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                        }
                        else{
                            $("#confirmfromUserProvided").hide();
                        }
                    }
                    else {
                        var deedid = $("#TransactionName").val();
                        var leaseCheck = false;
                        for (i = 0; i < leaseDeeds.length; i++) {
                            if (deedid == leaseDeeds[i]) {
                                isLeaseDeed = true;
                                leaseCheck = true;
                                break;
                            }
                        }
                        if (!leaseCheck) {
                            isLeaseDeed = false;
                        }
                        if ((challan.propertyInfo.IsLandAndConstructed && challan.ActualDCValue) || (deedid != releaseDeedId && deedid != certificateOfSaleDeedId && !isLeaseDeed)) {

                            if ($("#TransactionName").val() == 51) {

                                $("#PartitionUserProvidedValue").show();
                                $("#UserProvidedResultSet").hide();
                                userProvidedLandValue = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""));
                                document.getElementById("PropertyValuationIdPartition").innerHTML = returnCommas(userProvidedLandValue);
                                document.getElementById("amountLabelRateOfChallan").innerHTML = returnCommas(LandValueUserProvided);
                               
                            }
                            else {
                                $("#confirmfromUserProvided").show();
                                userProvidedLandValue = returnCommas(challan.propertyInfo.LandPropertyValue);
                                userProvidedConstructuedValue = returnCommas($('#constructedStructureValueGenerateChallan').val());
                                document.getElementById("PropertyValuationId").innerHTML = returnCommas(userProvidedLandValue);
                                document.getElementById("amountLabelRateOfChallan").innerHTML = returnCommas(LandValueUserProvided);
                                document.getElementById("CSValueUserProvidedRate").innerHTML = returnCommas(userProvidedConstructuedValue);

                            }
                         }
                        else {
                            userProvidedLandValue = returnCommas(challan.TotalAmount);
                            $("#confirmfromUserProvided").hide(); //document.getElementById("amountLabelRateOfChallan").innerHTML = challan.AmountLabelText;
                        }
                        //if (deedid != PowerOfAttorneyDeedId) {
                        //    $("#confirmfromUserProvided").show();
                        //    document.getElementById("PropertyValuationId").innerHTML = $("#PropertyValuationGenerateChallan").val();
                        //}
                        //else {
                        //    $("#confirmfromUserProvided").hide();
                        //}
                        
                        //if (isLeaseDeed == true) {
                        //    document.getElementById("PropertyValuationId").innerHTML = $("#TotalLeaseMoneyGenerateChallan").val();
                        //    document.getElementById("amountLabelRateOfChallan").innerHTML = "Total Lease Money";
                        //}
                        //else {
                        //    document.getElementById("PropertyValuationId").innerHTML = $("#PropertyValuationGenerateChallan").val();
                        //    document.getElementById("amountLabelRateOfChallan").innerHTML = challan.AmountLabelText;
                        //    isLeaseDeed == true;
                        //}
                    }
                }
                //Tehsil_id = challan.TehsilId;
               
                //if ($("#Qanoongoee").val() == "" || $("#Qanoongoee").val() == null)
                //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + Tehsil_id, selectQanoongoeeText, "Qanoongoee");
                //if ($("#townDropdownDC").val() == "" || $("#townDropdownDC").val() == null)
                //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?Id=' + Tehsil_id, selectTownText, "townDropdownDC");
                //if ($("#RevenueCircle").val() == "" || $("#RevenueCircle").val() == null)
                //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=&town=', selectRevenueCircleText, "RevenueCircle");
                
            }
            //if (queryStringName == "PayCVTandReg") {
            //    if (challan.propertyInfo != null) {
            //        populateFirstScreenWhenComingBackFromSecondScreenDC();
            //    }
            //}

        }
        else {
            $("#districtLabelDiv").hide();
            $("#tehsilLabelDiv").hide();
            $("#townLabelDiv").hide();
            $("#districtDropdownDCDiv").show();
            $("#talukaDropdownDCDiv").show();
           // $("#townDropdownDCDiv").show();
            $("#confirmfromUserProvided").hide();
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTehsilText, "talukaDropdownDC");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=', selectQanoongoeeText, "Qanoongoee");
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=', selectRevenueCircleText, "RevenueCircle");

            //following line should be uncomment
            // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?Id=' + Tehsil_id, selectTownText, "townDropdownDC");

            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=&town=', selectRevenueCircleText, "RevenueCircle");
        }
       
        //if ($("#RevenueCircle").val() == "" || $("#RevenueCircle").val() == null)
        //            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=&town=', selectRevenueCircleText, "RevenueCircle");
        //if ($("#Mouza").val() == "" || $("#Mouza").val() == null)
        //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=', selectMouzaText, "Mouza");
        if (($("#LandClassificationUrban").val() == "" || $("#LandClassificationUrban").val() == null)) {
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=&QanoonGoId=', selectlandClassificationText, "LandClassification");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + "&talukaId=", selectlandClassificationText, "LandClassificationUrban");
        }
        if (($("#LandClassificationUrban").val() == "" || $("#LandClassificationUrban").val() == null)) {
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=&QanoonGoId=', selectlandClassificationText, "LandClassification");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllCategoriesByLandClassifications?PropertyAreaId=' +  "&talukaId="  + "&landClassificationId=" , SelectLandCategoryText, "CategoriesUrban");
        }
        //if ($("#PropertyArea").val() == "" || $("#PropertyArea").val() == null)
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?RevenueCircleId=', selectPropertyAreaText, "PropertyArea");
        if ($("#LocationUrban").val() == "" || $("#LocationUrban").val() == null) {
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=&QanoonGoId=&landClassificationId=', selectLocationText, "Location");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyArea?PropertyAreaId=' + "&revenueCircleId=&&landClassificationId=", selectLocationText, "LocationUrban");
        }
        if ($("#LandClassification").val() == "" || $("#LandClassification").val() == null) {
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=&QanoonGoId=', selectlandClassificationText, "LandClassification");
            //var dropdownlist3 = $("#LandClassification").data("kendoDropDownList");
            //dropdownlist3.value(challan.propertyInfo.LandClassificationId);
        }
        //if ($("#Location").val() == "" || $("#Location").val() == null) {
        //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=&QanoonGoId=&landClassificationId=', selectLocationText, "Location");
        //    //initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=' + challan.propertyInfo.MouzaString + "&QanoonGoId=" + challan.propertyInfo.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, selectLocationText, "Location", challan.propertyInfo.LocationString);
        //}
        if ($("#rateValue").val() == "00.00" || $("#rateValue").val() == "0") {
            document.getElementById("rateValue").innerHTML = "0";
        }
        document.getElementById("LandUnit").innerHTML = "&nbsp;";
        if ($("#PropertyAreaQuantity").val() == "") {
            $("#PropertyAreaQuantity").val("");
        }

     //   if ($("#Floor").val() == "" || $("#Floor").val() == null)
       //     initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/GetFloors', selectFloorText, "FloorsDropdownDC");
        //   mapstring=  challan.propertyInfo.DistrictString + " , " + "Pakistan";
        //if (isCVTandNotDC == true) {
        //    $("#confirmfromUserProvided").hide();
        //}
        //else {
        //    $("#confirmfromUserProvided").show();
        //}
    }
    function sanitizeNumericValue(value) {
        if (typeof value === "string") {
            return parseFloat(value.replace(/,/g, '')) || 0; // Remove commas and convert to number
        }
        return value || 0; // Return the value if already a number or default to 0
    }
    function initializeDCValuationForNextBtn() {

        if (lang == "ur")
        {
            $("#amountLabelRateOfChallan").css("direction", "rtl");
            $("#amountLabelRateOfChallan").css("font-size", "18px");
            $("#amountLabelRateOfChallan").css("font-weight", "300");
        }

        $("#DCValueError").hide();
      //  initializeGoogleMapByAdminValue();
        setIsDCValuationFirstValue();
        if (isDCValueNotFirst) {
            // OLD LOGIC
            /*
            $("#districtLabelDiv").show();
            $("#tehsilLabelDiv").show();
            $("#districtDropdownDCDiv").hide();
            $("#talukaDropdownDCDiv").hide();
            */
            $("#districtLabelDiv").hide();
            $("#tehsilLabelDiv").hide();
            $("#townLabelDiv").hide();
            $("#districtDropdownDCDiv").show();
            $("#talukaDropdownDCDiv").show();
            $("#confirmfromUserProvided").hide(); // show
            if (challan != null) {
                isExchangeOfProperty = challan.isExchangeOfProperty;
                document.getElementById("DistrictName").innerHTML = challan.DistrictString;
                document.getElementById("TehsilName").innerHTML = challan.TehsilString;
             //   getTehsilDetails(challan.TehsilId); // By Default, Load Tehsil on Google Maps
                if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                    isLeaseDeed = false;
                    document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                    $("#confirmfromUserProvided").show();
                    userProvidedLandValue = returnCommas(challan.propertyInfo.LandPropertyValue);
                    //document.getElementById("PropertyValuationId").innerHTML = userProvidedLandValue;
                    document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                    if (queryStringName == "PayCVTandReg") {
                        document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.propertyInfo.LandPropertyValue);
                        $("#confirmfromUserProvided").hide();
                    }
                    else {
                        document.getElementById("PropertyValuationId").innerHTML = $("#landProperty").val();
                        $("#confirmfromUserProvided").show();
                    }
                }
                else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                    isLeaseDeed = false;
                    document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                    $("#confirmfromUserProvided").show();
                    userProvidedLandValue = returnCommas(challan.propertyInfo2.LandPropertyValue);
                    //document.getElementById("PropertyValuationId").innerHTML = userProvidedLandValue;
                    document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                    if (queryStringName == "PayCVTandReg") {
                        document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.propertyInfo2.LandPropertyValue);
                        $("#confirmfromUserProvided").hide();
                    }
                    else {
                        document.getElementById("PropertyValuationId").innerHTML = $("#landProperty2").val();
                        userProvidedConstructuedValue2 = returnCommas($('#constructedStructureValueSecond').val());
                        document.getElementById("CSValueUserProvidedRate").innerHTML = returnCommas(userProvidedConstructuedValue2);
                        $("#confirmfromUserProvided").show();
                    }
                }
                else {
                    if (queryStringName == "PayCVTandReg") {
                        if (challan.TransactionName != PowerOfAttorneyDeedId) { //get deed ID
                            //$("#confirmfromUserProvided").show();
                            document.getElementById("PropertyValuationId").innerHTML = returnCommas(/*challan.TotalAmount*/);
                            document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                        }
                        else{
                            $("#confirmfromUserProvided").hide();
                        }
                    }
                    else {
                        var deedid = $("#TransactionName").val();
                        var leaseCheck = false;
                        for (i = 0; i < leaseDeeds.length; i++) {
                            if (deedid == leaseDeeds[i]) {
                                isLeaseDeed = true;
                                leaseCheck = true;
                                break;
                            }
                        }
                        if (!leaseCheck) {
                            isLeaseDeed = false;
                        }
                        if ((challan.propertyInfo.IsLandAndConstructed && challan.ActualDCValue) || (deedid != releaseDeedId && deedid != certificateOfSaleDeedId && !isLeaseDeed)) {
                            $("#confirmfromUserProvided").show();
                            userProvidedLandValue = returnCommas(challan.propertyInfo.LandPropertyValue);
                            document.getElementById("PropertyValuationId").innerHTML = userProvidedLandValue;
                            document.getElementById("amountLabelRateOfChallan").innerHTML = LandValueUserProvided;
                        }
                        else {
                            userProvidedLandValue = returnCommas(challan.TotalAmount);
                            $("#confirmfromUserProvided").hide(); //document.getElementById("amountLabelRateOfChallan").innerHTML = challan.AmountLabelText;
                        }
                      
                    }
                }
                //Tehsil_id = challan.TehsilId;
               
                //if ($("#Qanoongoee").val() == "" || $("#Qanoongoee").val() == null)
                //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + Tehsil_id, selectQanoongoeeText, "Qanoongoee");
                //if ($("#townDropdownDC").val() == "" || $("#townDropdownDC").val() == null)
                //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?Id=' + Tehsil_id, selectTownText, "townDropdownDC");
                //if ($("#RevenueCircle").val() == "" || $("#RevenueCircle").val() == null)
                //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=&town=', selectRevenueCircleText, "RevenueCircle");
                
            }
          

        }
        else {
            $("#districtLabelDiv").hide();
            $("#tehsilLabelDiv").hide();
            $("#townLabelDiv").hide();
            $("#districtDropdownDCDiv").show();
            $("#talukaDropdownDCDiv").show();
           // $("#townDropdownDCDiv").show();
            $("#confirmfromUserProvided").hide();
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTehsilText, "talukaDropdownDC");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=', selectQanoongoeeText, "Qanoongoee");
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=', selectRevenueCircleText, "RevenueCircle");

            //following line should be uncomment
           //  initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?Id=' + Tehsil_id, selectTownText, "townDropdownDC");

            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=&town=', selectRevenueCircleText, "RevenueCircle");
        }
       
       
        if (($("#LandClassificationUrban").val() == "" || $("#LandClassificationUrban").val() == null)) {
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=&QanoonGoId=', selectlandClassificationText, "LandClassification");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaId=' + "&talukaId=" , selectlandClassificationText, "LandClassificationUrban");
        }
        if (($("#CategoriesUrban").val() == "" || $("#CategoriesUrban").val() == null)) {
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=&QanoonGoId=', selectlandClassificationText, "LandClassification");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllCategoriesByLandClassifications?PropertyAreaId=' + encodeURIComponent(PropertyAreaId) + "&talukaId=" + TalukaId + "&landClassificationId=" + LandClassificationId, SelectLandCategoryText, "CategoriesUrban");
        }
       // if ($("#PropertyArea").val() == "" || $("#PropertyArea").val() == null)
       // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?RevenueCircleId=', selectPropertyAreaText, "PropertyArea");
        if ($("#LocationUrban").val() == "" || $("#LocationUrban").val() == null) {
            //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=&QanoonGoId=&landClassificationId=', selectLocationText, "Location");
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyArea?PropertyAreaId=' + "&revenueCircleId=&&landClassificationId=", selectLocationText, "LocationUrban");
        }
        if ($("#LandClassification").val() == "" || $("#LandClassification").val() == null) {
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=&QanoonGoId=', selectlandClassificationText, "LandClassification");
            //var dropdownlist3 = $("#LandClassification").data("kendoDropDownList");
            //dropdownlist3.value(challan.propertyInfo.LandClassificationId);
        }
        if ($("#Location").val() == "" || $("#Location").val() == null) {
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=&QanoonGoId=&landClassificationId=', selectLocationText, "Location");
            //initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=' + challan.propertyInfo.MouzaString + "&QanoonGoId=" + challan.propertyInfo.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, selectLocationText, "Location", challan.propertyInfo.LocationString);
        }
        if ($("#rateValue").val() == "00.00" || $("#rateValue").val() == "0") {
            document.getElementById("rateValue").innerHTML = "0";
        }
        document.getElementById("LandUnit").innerHTML = "&nbsp;";
        if ($("#PropertyAreaQuantity").val() == "") {
            $("#PropertyAreaQuantity").val("");
        }

        if ($("#Floor").val() == "" || $("#Floor").val() == null)
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/GetFloors?RevenueCircleId=', selectFloorText, "Floor");
        //   mapstring=  challan.propertyInfo.DistrictString + " , " + "Pakistan";
        //if (isCVTandNotDC == true) {
        //    $("#confirmfromUserProvided").hide();
        //}
        //else {
        //    $("#confirmfromUserProvided").show();
        //}
    }

    function resetdistrict() {
        $("#DistrictDropdown").data('kendoDropDownList').select(0);
    }


    function FindRate() {
        debugger;
        if ($('#District').val() == "0")
        {
            $('#District_validationMessage').show();
            $('#District_validationMessage').html(SelectavalidDistrict);
        }
        if ($('#talukaDropdownDC').val() == "0") {
            $('#Taluka_validationMessage').show();
            $('#Taluka_validationMessage').html(SelectavalidTehsil);
        }
       
        if ($('#PropertyArea').val() == "0") {
            $('#PropertyArea_validationMessage').show();
            $('#PropertyArea_validationMessage').html(SelectavalidPropertyArea);
        }
        
        if ($('#LandClassificationUrban').val() == "0") {
            $('#LandClassification_validationMessage').show();
            $('#LandClassification_validationMessage').html(SelectavalidLandClassification);
        }
      
        if ($('#CategoriesUrban').val() == "0") {
            $('#Categories_validationMessage').show();
            $('#Categories_validationMessage').html('Select a valid Category');
        }
        if ($("#LandClassificationUrban  option:selected").text() == "Commercial Built Up" || $("#LandClassificationUrban  option:selected").text() == "Commercial Open Plot") {
        
            if ($('#PropertyAreaRate').val() == "0") {
                $('#PropertyAreaQuantity_validationMessage').show();
                $('#PropertyAreaQuantity_validationMessage').html('Add Land Value');
            }
            if ($('#CoveredAreaRate').val() == "0") {
                $('#CoveredAreaQuantity_validationMessage').show();
                $('#CoveredAreaQuantity_validationMessage').html('Add Covered Value');
            }

        }
        $("#DCValueError").hide();
        var $radio = $('input[name=LandType]:checked');

        var id = $radio.attr('id');

        var res4 = true;
        var res5 = true;

        if (isDCValueNotFirst)
        {
            //res4 = true;
            //res5 = true;
            //Change to fix production bug
            res4 = $('#districtDropdownDC').kendoValidator().data('kendoValidator').validate();
            res5 = $('#talukaDropdownDC').kendoValidator().data('kendoValidator').validate();
        }
        else
        {
            res4 = $('#districtDropdownDC').kendoValidator().data('kendoValidator').validate();
            res5 = $('#talukaDropdownDC').kendoValidator().data('kendoValidator').validate();

        }

        if (id == "Urban") {
           var res1 = $('#PropertyAreaQuantity').kendoValidator().data('kendoValidator').validate();
        //    var res2 = $('#UrbanDiv').kendoValidator().data('kendoValidator').validate();
            var res3 = $('#landclassificationurbandiv').kendoValidator().data('kendoValidator').validate();
            var res12 = $('#categoriesurbandiv').kendoValidator().data('kendoValidator').validate();
          //  var res8 = $('#townDropdownDC').kendoValidator().data('kendoValidator').validate();
           

            if ( res3 && res12) {

                if (isDCValueNotFirst) {
                    $("#DcValuationRateNextButton").removeAttr("disabled");
                }

                getRateOfPropertyArea();
                // LoadMapEmbed(id);
            }
            else {

                getRateOfPropertyArea();
            }

           // getRateOfPropertyArea();
        }


        if (id == "Rural") {
            var res1 = $('#modeofIrrigation').kendoValidator().data('kendoValidator').validate();
          
            var res6;
            var res7;

            if (isDCValueNotFirst) {
                $("#DcValuationRateNextButton").removeAttr("disabled");
            }

            getRateOfPropertyArea();
        }

    }



    function findDCValue(rate)
    {
     
        var propertyAreaQuantity = $("#PropertyAreaQuantity").val();
    
        if (isDCValueNotFirst) {
            if ((multipleKhasrasSelected || multipleSquareQilaSelected) && allRatesAppliedFlag) {
                var DCValue = rate;
            }
            else if (challan.propertyInfo.ConstructedStructureValue != null || challan.propertyInfo.ConstructedStructureValue != "") {
                var DCValue = rate * propertyAreaQuantity;
            }
            else {
                var DCValue = rate * propertyAreaQuantity;
            }
        }
        else {
            if ((multipleKhasrasSelected || multipleSquareQilaSelected) && allRatesAppliedFlag) {
                var DCValue = rate;
            }
            else {
                var DCValue = rate * propertyAreaQuantity;
            }
        }

        if (DCValue > 0) {
            document.getElementById("DCValueId").innerHTML = returnCommas(DCValue);
        }
        else {
            DCValue="0"
            document.getElementById("DCValueId").innerHTML = "0";
        }
    }


    function findCabnitRate(Cabnitrate, StructureRate) {

        //alert("CabniteRate" + Cabnitrate + "StructureRate" + StructureRate);
        $("#waitModalForSave").modal();
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        var DCValueStructure = 0; 
        if (id == "Urban") {
            if (!isDCValueNotFirst) {
               
                  //  challan.propertyInfo.StructureSqFtRateUnit = proeprtyAreaViewModel.SqftRateUnit;
                 //   challan.propertyInfo.rateUnit = proeprtyAreaViewModel.DCRateUnit;
            
                var DCValue = 0;
                var DCValueStructure = 0; 
                if (StructureRate != 0 && Cabnitrate == 0) {
                    debugger;
                        var propertyAreaQuantity = $("#CoveredAreaQuantity").val();
                        var DCValueStructure = StructureRate * propertyAreaQuantity;
                        //alert(DCValueStructure); 
                        var Floor_rate = 0;
                        var Basement_rate = 0;
                        var DC_Initial_val = DCValueStructure;
                        if ($("#LandClassificationUrban  option:selected").text() == "Residential Built Up") {
                            if ($("#FlDropdownDC").val() > 0) {

                                Floor_rate = DCValueStructure * 25 / 100;
                                DCValueStructure += (Floor_rate * $("#FlDropdownDC").val());
                                // alert(DCValue);
                            }

                            if ($("#BasementsDropdownDC").val() > 0) {
                                Basement_rate = DC_Initial_val * 25 / 100;
                                DCValueStructure += (Basement_rate * $("#BasementsDropdownDC").val());
                                // alert(DCValue);

                            }

                        

                        }
                        
                    //Condtion Applied for Karachi and Other Dist. 
                        if ($("#LandClassificationUrban  option:selected").text() == "Commercial Built Up") {
                            var Floor_Basment_Rate = 0;
                            var BasementCovered_Rate = 0; 
                            var Covererd_Area_Quantity = $("#CoveredAreaQuantity").val();
                            var Basement_Area_Quantity = $("#BasementCoveredAreaQuantity").val();
                           
                            if ($('#districtDropdownDC').val() == 1 && ($("#CategoriesUrban  option:selected").text() == "I" || $("#CategoriesUrban  option:selected").text() == "II" || $("#CategoriesUrban  option:selected").text() == "III" || $("#CategoriesUrban  option:selected").text() == "IV")) {
                               
                                //changes for fromula updated : 

                                var Sum_Val = 0;
                                var FloorCount = 0 ; 
                                if ($("#FlDropdownDC").val() > 0) {
                                    FloorCount++;
                                    Floor_Basment_Rate = DCValueStructure * 100 / 100;
                                    Sum_Val += (Floor_Basment_Rate * $("#FlDropdownDC").val());
                                    // alert(DCValue);
                                }
                                if (Sum_Val == 0 && FloorCount == 0) {
                                    Sum_Val = DCValueStructure;

                                }
                                if ($("#BasementsDropdownDC").val() > 0) {
                                    BasementCovered_Rate = 13500 * Basement_Area_Quantity;
                                    Sum_Val += parseFloat(returnCommas(BasementCovered_Rate).replace(/,/g, ''));

                                    // alert(DCValue);

                                }

                                DCValueStructure = parseFloat(returnCommas(Sum_Val).replace(/,/g, ''));





                               
                            }
                                //for Every other district and cotegory greater than 5 
                            else {
                                var Sum_Val = 0
                                if ($("#FlDropdownDC").val() > 0) {

                                    Floor_Basment_Rate = DCValueStructure * 100 / 100;
                                    Sum_Val += (Floor_Basment_Rate * $("#FlDropdownDC").val());
                                    // alert(DCValue);
                                }

                                if ($("#BasementsDropdownDC").val() > 0) {
                                    Floor_Basment_Rate = DCValueStructure * 100 / 100;
                                    Sum_Val += (Floor_Basment_Rate * $("#BasementsDropdownDC").val());
                                    // alert(DCValue);

                                }

                                DCValueStructure += parseFloat(returnCommas(Sum_Val).replace(/,/g, ''));
                                
                            }
                        }

                        document.getElementById("DCValueId").innerHTML = returnCommas(DCValueStructure);
                        //document.getElementById("DCValueId").innerHTML = 0;
                        if ($("#TransactionName").val() == 51) {
                            var sharedPercentage = $("#SharedPercent").val();
                            DCValue = DCValue * sharedPercentage / 100;
                            document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML = returnCommas(DCValue);

                        }

                    
                   



                }

                else if (StructureRate != 0 && Cabnitrate != 0) {

                    if ( $("#LandClassificationUrban  option:selected").text() == "Industrial") {
                        var propertyAreaQuantity1 = $("#PropertyAreaQuantity").val();
                        var propertyAreaQuantity2 = $("#CoveredAreaQuantity").val();
                        var DCValue = (Cabnitrate * propertyAreaQuantity1);
                        DCValueStructure = (StructureRate * propertyAreaQuantity2);
                        if ($("#TransactionName").val() == 51) {
                            DCValue = DCValue + DCValueStructure;
                            var sharedPercentage = $("#SharedPercent").val();
                            DCValue = DCValue * sharedPercentage / 100;

                        }
                    }
                }
                else {
                    
                    var propertyAreaQuantity = $("#PropertyAreaQuantity").val();
                       DCValue = Cabnitrate * propertyAreaQuantity;
                        


                }
                //else if (StructureRate != 0 && Cabnitrate == 0) {

                //    var propertyAreaQuantity = $("#CoveredAreaQuantity").val();
                //  //  var DCValue = StructureRate * propertyAreaQuantity;
                //    var DCValue = 0;
                //    DCValueStructure = StructureRate * propertyAreaQuantity;

                //}

                if (DCValue > 0 && DCValueStructure == 0) {
                    document.getElementById("DCValueId").innerHTML = returnCommas(DCValue);
                }
                else if (DCValue == 0 && DCValueStructure > 0) {
                    document.getElementById("DCValueId").innerHTML = returnCommas(DCValueStructure);
                }
                else if (DCValue > 0 && DCValueStructure > 0) {
                    document.getElementById("DCValueId").innerHTML = parseFloat(returnCommas(DCValue).replace(/,/g, '')) +  parseFloat(returnCommas(DCValueStructure).replace(/,/g, '')) ;
                    //parseFloat(returnCommas(DCValue).replace(/,/g, ''));
                   // document.getElementById("StructureValueId").innerHTML = ;

                }
                else {
                    DCValue = "0";
                    DCValueStructue = 0; 
                    document.getElementById("DCValueId").innerHTML = "0";
                   // document.getElementById("StructureValueId").innerHTML = 0;
                }

            }
                //For AddChallan DC Screen
            else {

                if (StructureRate != 0 && Cabnitrate == 0) {
                    debugger;
                        var propertyAreaQuantity = $("#CoveredAreaQuantity").val();
                        var DCValue = StructureRate * propertyAreaQuantity;
                        var Floor_rate = 0;
                        var Basement_rate = 0;
                        var DC_Initial_val = DCValue;
                        if ($("#LandClassificationUrban  option:selected").text() == "Residential Built Up") {
                            if ($("#FlDropdownDC").val() > 0) {

                                Floor_rate = DCValue * 25 / 100;
                                DCValue += (Floor_rate * $("#FlDropdownDC").val());
                                // alert(DCValue);
                            }

                            if ($("#BasementsDropdownDC").val() > 0) {
                                Basement_rate = DC_Initial_val * 25 / 100;
                                DCValue += (Basement_rate * $("#BasementsDropdownDC").val());
                                // alert(DCValue);

                            }

                        

                        }
                        
                    //Condtion Applied for Karachi and Other Dist. 
                        if ($("#LandClassificationUrban  option:selected").text() == "Commercial Built Up") {
                            var Floor_Basment_Rate = 0;
                            var BasementCovered_Rate = 0;
                            var Covererd_Area_Quantity = $("#CoveredAreaQuantity").val();
                            var Basement_Area_Quantity = $("#BasementCoveredAreaQuantity").val();
                            if ($('#districtDropdownDC').val() == 1 && ($("#CategoriesUrban  option:selected").text() == "I" || $("#CategoriesUrban  option:selected").text() == "II" || $("#CategoriesUrban  option:selected").text() == "III" || $("#CategoriesUrban  option:selected").text() == "IV")) {

                                //changes for fromula updated : 

                                var Sum_Val = 0;
                                var FloorCount = 0;
                                if ($("#FlDropdownDC").val() > 0) {
                                    FloorCount++;
                                    Floor_Basment_Rate = DCValue * 100 / 100;
                                    Sum_Val += (Floor_Basment_Rate * $("#FlDropdownDC").val());
                                    // alert(DCValue);
                                }

                                if (Sum_Val == 0 && FloorCount == 0) {
                                    Sum_Val = DCValue;

                                }
                                if ($("#BasementsDropdownDC").val() > 0) {
                                    BasementCovered_Rate = 13500 * Basement_Area_Quantity;
                                    Sum_Val += parseFloat(returnCommas(BasementCovered_Rate).replace(/,/g, ''));

                                    // alert(DCValue);

                                }

                                DCValue = parseFloat(returnCommas(Sum_Val).replace(/,/g, ''));






                            }
                                //for Every other district and cotegory greater than 5 
                            else {
                                var Sum_Val = 0
                                if ($("#FlDropdownDC").val() > 0) {

                                    Floor_Basment_Rate = DCValue * 100 / 100;
                                    Sum_Val += (Floor_Basment_Rate * $("#FlDropdownDC").val());
                                    // alert(DCValue);
                                }

                                if ($("#BasementsDropdownDC").val() > 0) {
                                    Floor_Basment_Rate = DCValue * 100 / 100;
                                    Sum_Val += (Floor_Basment_Rate * $("#BasementsDropdownDC").val());
                                    // alert(DCValue);

                                }

                                DCValue += parseFloat(returnCommas(Sum_Val).replace(/,/g, ''));
                                
                            }
                        }

                        if ($("#TransactionName").val() == 51) {
                            var sharedPercentage = $("#SharedPercent").val();
                            DCValue = DCValue * sharedPercentage / 100;
                            document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML = returnCommas(DCValue);
                           // $("#PropertyValuationIdPartitionOercentage").hide();

                        }



                        document.getElementById("StructureValueId").innerHTML = returnCommas(parseFloat(DCValue));
                        document.getElementById("DCValueId").innerHTML = 0;
                       

                    
                   



                }




                if (Cabnitrate != 0 && StructureRate == 0) {

                    var propertyAreaQuantity = $("#PropertyAreaQuantity").val();
                    var DCValue = Cabnitrate * propertyAreaQuantity;

                    if ($("#TransactionName").val() == 51) {
                        var sharedPercentage = $("#SharedPercent").val();
                        DCValue = DCValue * sharedPercentage / 100;
                       // $("#PropertyValuationIdPartitionOercentage").hide(); 
                       document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML = returnCommas(DCValue);

                    }


                    document.getElementById("DCValueId").innerHTML = returnCommas(parseFloat(DCValue));
                    document.getElementById("StructureValueId").innerHTML = 0;
                   

                    
                }
                else if (StructureRate != 0 && Cabnitrate != 0) {

                    if ($("#LandClassificationUrban  option:selected").text() == "Industrial" || $("#LandClassificationUrban  option:selected").text() == "Commercial Built Up") {
                        var propertyAreaQuantity1 = $("#PropertyAreaQuantity").val();
                        var propertyAreaQuantity2 = $("#CoveredAreaQuantity").val();
                        if ($("#TransactionName").val() != 51) {
                            var DC_1 = returnCommas(Cabnitrate * propertyAreaQuantity1);
                            var DC_2 = returnCommas(StructureRate * propertyAreaQuantity2);
                        } else {
                            var DC_1 = Cabnitrate * propertyAreaQuantity1;
                            var DC_2 = StructureRate * propertyAreaQuantity2;

                        }

                      



                        document.getElementById("DCValueId").innerHTML = DC_1;
                        document.getElementById("StructureValueId").innerHTML = DC_2;
                       
                        if ($("#TransactionName").val() == 51) {
                            var sharedPercentage = $("#SharedPercent").val();
                            var DC_3 = DC_1 + DC_2
                            DC_3 = DC_3 * sharedPercentage / 100;
                            document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML = returnCommas(DC_3);
                        }


                       // var DCValue = (Cabnitrate * propertyAreaQuantity2) + (StructureRate * propertyAreaQuantity1);
                    }
                }
                //else if (StructureRate != 0 && Cabnitrate == 0) {

                //    var propertyAreaQuantity = $("#CoveredAreaQuantity").val();
                //    var DCValue = StructureRate * propertyAreaQuantity;
                //    document.getElementById("StructureValueId").innerHTML = returnCommas4DecimalPrecision(DCValue);
                //    document.getElementById("DCValueId").innerHTML = 0;
                //}

                //if (DCValue > 0) {
                //    document.getElementById("DCValueId").innerHTML = returnCommas4DecimalPrecision(DCValue);
                //}
                //else {
                //    DCValue = "0"
                //    document.getElementById("DCValueId").innerHTML = "0";
                //}







            }
            // For DC Valuation Screen Only 

        } else {
            var DistrictID = $("#districtDropdownDC").val();
            if (DistrictID == 1) {

                var propertyAreaQuantity = $("#PropertyAreaQuantity").val();

                var DCValue = Cabnitrate * propertyAreaQuantity;
                if (DCValue > 0) {
                    document.getElementById("DCValueRuralId").innerHTML = returnCommas(DCValue);
                    if ($("#TransactionName").val() == 51) {
                        var sharedPercentage = $("#SharedPercent").val();
                        DCValue = DCValue * sharedPercentage / 100;
                        document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML = returnCommas(DCValue);

                    }
                }
                else {
                    DCValue = "0"
                    document.getElementById("DCValueRuralId").innerHTML = "0";
                }


            }
            else {
                var propertyAreaQuantity = $("#PropertyAreaQuantity").val();

                var DCValue = Cabnitrate * propertyAreaQuantity * StructureRate;
                if (DCValue > 0) {
                    document.getElementById("DCValueRuralId").innerHTML = returnCommas(DCValue);
                    if ($("#TransactionName").val() == 51) {
                        var sharedPercentage = $("#SharedPercent").val();
                        DCValue = DCValue * sharedPercentage / 100;
                        document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML = returnCommas(DCValue);

                    }
                }
                else {
                    DCValue = "0"
                    document.getElementById("DCValueRuralId").innerHTML = "0";
                }
            }
        }
        $("#waitModalForSave").modal('hide');
    }

    

    function findCabnitRateUnservyed(Cabnitrate) {
        debugger; 
        //alert("CabniteRate" + Cabnitrate + "StructureRate" + StructureRate);
        $("#waitModalForSave").modal();
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        var DCValueStructure = 0;
      
            var DistrictID = $("#districtDropdownDC").val();
       
                var propertyAreaQuantity = $("#PropertyAreaQuantity").val();

                var DCValue = Cabnitrate * propertyAreaQuantity ;
                if (DCValue > 0) {
                    document.getElementById("DCValueRuralId").innerHTML = returnCommas(DCValue);
                    if ($("#TransactionName").val() == 51) {
                        var sharedPercentage = $("#SharedPercent").val();
                        DCValue = DCValue * sharedPercentage / 100;
                        document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML = returnCommas(DCValue);

                    }
                }
                else {
                    DCValue = "0"
                    document.getElementById("DCValueRuralId").innerHTML = "0";
                }
           
      
        $("#waitModalForSave").modal('hide');
    }
    function compareDCValue()

    {

        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        if (id == "Urban") {
            var stampduty = 0;
            var Stampduty2 = 0;
            var dcvalue = document.getElementById("DCValueId").innerHTML;
            var Structurevalue = document.getElementById("StructureValueId").innerHTML;
            var stampduty = "";



            if (queryStringName == "PayCVTandReg") {

                stampduty = challan.TotalAmount;

                if (parseFloat(dcvalue.replace(/,/g, '')) <= parseFloat(stampduty)) {
                    $("#DCValueError").hide();
                    return true;
                }

                return false;

            } else {

                // Merger of Duties, No more Comparision on DC Screen in case of Lease Deeds and release Deed
                if (isLeaseDeed || challan.TransactionName == releaseDeedId || challan.TransactionName == certificateOfSaleDeedId || challan.TransactionName == PowerofAttowrney) {

                    return false;
                }
                //if (isLeaseDeed == true && (challan.DeedId == leaseDeedsWithAdvanceMoney[0] || challan.DeedId == leaseDeedsWithAdvanceMoney[1])) {
                //    var totalLeaseMoney = 0;

                //    totalLeaseMoney = challan.TotalLeaseMoney;
                //    if (parseFloat(dcvalue.replace(/,/g, '')) <= parseFloat(totalLeaseMoney.replace(/,/g, ''))) {
                //        $("#DCValueError").hide();
                //        return true;
                //    }
                //}
                //else {

               
                if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {

                    // stampduty = $("#landProperty").val();
                    if (parseFloat(dcvalue.replace(/,/g, '')) > 0 && parseFloat(Structurevalue.replace(/,/g, '')) == 0) {
                        stampduty = userProvidedLandValue;
                        if (parseFloat(dcvalue.replace(/,/g, '')) < parseFloat(stampduty.replace(/,/g, ''))) {
                            $("#DCValueError").hide();
                            return true;
                        }

                    }

                    else if (parseFloat(Structurevalue.replace(/,/g, '')) > 0 && parseFloat(dcvalue.replace(/,/g, '')) == 0) {
                        stampduty = document.getElementById("CSValueUserProvidedRate").innerHTML;//$("#StructureValueId").val();
                        if (parseFloat(Structurevalue.replace(/,/g, '')) < parseFloat(stampduty.replace(/,/g, ''))) {
                            $("#DCValueError").hide();
                            return true;
                        }

                    }

                    else if (parseFloat(Structurevalue.replace(/,/g, '')) > 0 && parseFloat(dcvalue.replace(/,/g, '')) > 0) {


                        stampduty = userProvidedLandValue;
                        Stampduty2 = document.getElementById("CSValueUserProvidedRate").innerHTML;//$("#StructureValueId").val();
                        if ((parseFloat(dcvalue.replace(/,/g, '')) < parseFloat(stampduty.replace(/,/g, ''))) || parseFloat(Structurevalue.replace(/,/g, '')) < parseFloat(Stampduty2.replace(/,/g, ''))) {
                            $("#DCValueError").hide();
                            return true;
                        }



                    }


                }
                else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                    //stampduty = $("#landProperty2").val();
                    if (parseFloat(dcvalue.replace(/,/g, '')) > 0 && parseFloat(Structurevalue.replace(/,/g, '')) == 0) {
                        // stampduty = userProvidedLandValue;
                        stampduty = document.getElementById("PropertyValuationId").innerHTML;
                        if (parseFloat(dcvalue.replace(/,/g, '')) < parseFloat(stampduty.replace(/,/g, ''))) {
                            $("#DCValueError").hide();
                            return true;
                        }

                    }

                    else if (parseFloat(Structurevalue.replace(/,/g, '')) > 0 && parseFloat(dcvalue.replace(/,/g, '')) == 0) {
                        stampduty = document.getElementById("CSValueUserProvidedRate").innerHTML;//$("#StructureValueId").val();
                        if (parseFloat(Structurevalue.replace(/,/g, '')) < parseFloat(stampduty.replace(/,/g, ''))) {
                            $("#DCValueError").hide();
                            return true;
                        }

                    }

                    else if (parseFloat(Structurevalue.replace(/,/g, '')) > 0 && parseFloat(dcvalue.replace(/,/g, '')) > 0) {
                        stampduty = document.getElementById("PropertyValuationId").innerHTML;
                        Stampduty2 = document.getElementById("CSValueUserProvidedRate").innerHTML;//$("#StructureValueId").val();
                        if ((parseFloat(dcvalue.replace(/,/g, '')) < parseFloat(stampduty.replace(/,/g, ''))) || parseFloat(Structurevalue.replace(/,/g, '')) < parseFloat(Stampduty2.replace(/,/g, ''))) {
                            $("#DCValueError").hide();
                            return true;
                        }



                    }

                }
                else if($("#TransactionName").val() == 51){
                    stampduty = userProvidedLandValue;
                    comparison_value = document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML;
                    if (parseFloat(comparison_value.replace(/,/g, '')) > stampduty) {
                        $("#DCValueError").hide();
                        return true;
                    }
                }
                else {
                    /*
                    //here 2
                    if (challanModel.TransactionName == "5")
                    {
                        stampduty = challanModel.TotalAmount;
                    }
                    else {
                        stampduty = userProvidedLandValue;
                    }*/

                    if (parseFloat(dcvalue.replace(/,/g, '')) > 0 && parseFloat(Structurevalue.replace(/,/g, '')) == 0) {
                        stampduty = userProvidedLandValue;
                        if ($("#TransactionName").val() == 55) {
                            if (parseFloat(dcvalue.replace(/,/g, '')) > parseFloat(stampduty.replace(/,/g, ''))) {
                                $("#DCValueError").hide();
                                return true;
                            }
                        } else {
                            if (parseFloat(dcvalue.replace(/,/g, '')) < parseFloat(stampduty.replace(/,/g, ''))) {
                                $("#DCValueError").hide();
                                return true;
                            }


                        }
                        

                    }
                    else if (parseFloat(Structurevalue.replace(/,/g, '')) > 0 && parseFloat(dcvalue.replace(/,/g, '')) == 0) {
                        stampduty = document.getElementById("CSValueUserProvidedRate").innerHTML;//$("#StructureValueId").val();

                        if ($("#TransactionName").val() == 55) {
                            if (parseFloat(Structurevalue.replace(/,/g, '')) > parseFloat(stampduty.replace(/,/g, ''))) {
                                $("#DCValueError").hide();
                                return true;
                            }

                        } else {


                            if (parseFloat(Structurevalue.replace(/,/g, '')) < parseFloat(stampduty.replace(/,/g, ''))) {
                                $("#DCValueError").hide();
                                return true;
                            }
                        }

                    }

                    else if (parseFloat(Structurevalue.replace(/,/g, '')) > 0 && parseFloat(dcvalue.replace(/,/g, '')) > 0) {
                        stampduty = userProvidedLandValue;
                        Stampduty2 = document.getElementById("CSValueUserProvidedRate").innerHTML;//$("#StructureValueId").val();
                        if ($("#TransactionName").val() == 55) {
                            if ((parseFloat(dcvalue.replace(/,/g, '')) > parseFloat(stampduty.replace(/,/g, ''))) || parseFloat(Structurevalue.replace(/,/g, '')) > parseFloat(Stampduty2.replace(/,/g, ''))) {
                                $("#DCValueError").hide();
                                return true;
                            }

                        } else {

                            if ((parseFloat(dcvalue.replace(/,/g, '')) < parseFloat(stampduty.replace(/,/g, ''))) || parseFloat(Structurevalue.replace(/,/g, '')) < parseFloat(Stampduty2.replace(/,/g, ''))) {
                                $("#DCValueError").hide();
                                return true;
                            }

                        }

                        



                    }
                   

                }

                //if (parseFloat(dcvalue.replace(/,/g, '')) > parseFloat(stampduty.replace(/,/g, ''))) {
                //    $("#DCValueError").hide();
                //    return true;
                //}

                return false;
                // }
            }


            return false;
        } else {
               if (challan.TransactionName == PowerofAttowrney) {

                    return false;
                }
            if ($("#TransactionName").val() != 51) {
                var dcvalue = document.getElementById("DCValueRuralId").innerHTML;
                var UserProvidedValueLand = document.getElementById("PropertyValuationId").innerHTML;
                var UserProvidedValueConstructed = document.getElementById("CSValueUserProvidedRate").innerHTML;
                var stampduty = "";
                stampduty = parseFloat(UserProvidedValueLand.replace(/,/g, '')) + parseFloat(UserProvidedValueConstructed.replace(/,/g, ''))
                if (parseFloat(dcvalue.replace(/,/g, '')) < stampduty) {
                    $("#DCValueError").hide();
                    return true;
                } else {
                    return false;
                }
            } else {
                var UserProvidedvalue = parseFloat(document.getElementById("PropertyValuationIdPartition").innerHTML.replace(/,/g, ''));
              
                var stampduty = "";
                var percentageValue = document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML;
                stampduty = parseFloat(percentageValue.replace(/,/g, ''))
                var dcvalue = stampduty; 
                if (stampduty > UserProvidedvalue) {
                    $("#DCValueError").hide();
                    return true;
                } else {
                    return false;
                }




            }

        }

    }

    
    function ResetSelectedValues()
    {
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        if (id == "Urban") {
            $("#LandClassificationUrban").val("").data("kendoDropDownList").text(selectlandClassificationText);
            $("#PropertyAreaQuantity").val(null);
            $("#RateErrorWindow").data("kendoWindow").title(RateErrorLabel).close();
            $("#PropertyAreaQuantity").removeClass("empty");
            $("#PropertyAreaQuantity").addClass("empty");
            $("#KhasraUrban").val(null);
            $("#KhasraUrban").removeClass("empty");
            $("#KhasraUrban").addClass("empty");
            $("#RuralResultDiv").hide();
            $("#UrbanResultDiv").show();
        }
        else {
            $("#Location").val("").data("kendoDropDownList").text(selectLocationText);
            $("#LandClassification").val("").data("kendoDropDownList").text(selectlandClassificationText);
            $("#PropertyAreaQuantity").val(null);
            $("#RateErrorWindow").data("kendoWindow").title(RateErrorLabel).close();
            $("#PropertyAreaQuantity").removeClass("empty");
            $("#PropertyAreaQuantity").addClass("empty");
            $("#Khasra").val(null);
            $("#Khasra").removeClass("empty");
            $("#khasra").addClass("empty");
            $("#RuralResultDiv").show();
            $("#UrbanResultDiv").hide();
        }
    }

    function ValidateNextConfirmationAfterRate() {
       // alert('nxtscreen')
        debugger;
   
      
        var a = challan;
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        if (id == "Urban") {

            var selectedClassification = $("#LandClassificationUrban").data("kendoDropDownList").text();

            var landAreaAdded = $("#PropertyAreaQuantity").val();
            
                var LandCategory = $("#CategoriesUrban option:selected").text();
                challan.LandCategory = LandCategory;

                var LandCategoryID = $("#CategoriesUrban option:selected").val();
                challan.CATEGORY_ID = LandCategoryID;

                var FlDropdownDC = $("#FlDropdownDC option:selected").text();
                challan.FlDropdownDC = FlDropdownDC;

                var BasementsDropdownDC = $("#BasementsDropdownDC option:selected").text();
                challan.BasementsDropdownDC = BasementsDropdownDC;

                var StructureValueId = $("#StructureValueId").text();
                challan.StructureValue = StructureValueId;
                challan.propertyInfo.ConstructedStructureValue = $("#StructureValueId").text();

                debugger;
                var DCRateSqFt2 = $("#DCRateSqFt2").text();
                challan.StructureSqFtRateInds = DCRateSqFt2;
                challan.propertyInfo.StructureSqFtRate = DCRateSqFt2;
                //challan.propertyInfo.StructureSqFtRateUnit = 

                var rateValue = $("#rateValue").text();
                challan.ValuationRateInds = rateValue;
                challan.propertyInfo.Rate = rateValue;
                challan.propertyInfo.LAND_RATE = rateValue;
                 
               // alert('Land Rate'+challan.propertyInfo.LAND_RATE); 

                var LandClassificationUrban = $("#LandClassificationUrban option:selected").text();
                challan.LandClassificationUrbanInds = LandClassificationUrban;

                

                var DCValueId = $("#DCValueId").text();
                challan.DCLandValue = DCValueId;
                challan.propertyInfo.LAND_Valuation_Amount = DCValueId;
                //alert('Land Valuation Amount' + challan.propertyInfo.LAND_Valuation_Amount); 
                var PropertyAreaQuantity = $("#PropertyAreaQuantity").val();
                challan.PropertyAreaQuantity = PropertyAreaQuantity;

                var BasementCoveredAreaQuantity = $("#BasementCoveredAreaQuantity").val();
                challan.BasementCoveredAreaQuantity = BasementCoveredAreaQuantity;

                if (challan.BasementCoveredAreaQuantity == "" || challan.BasementCoveredAreaQuantity == null) {
                    challan.BasementCoveredAreaQuantity = 0;
                }
              
                var CoveredAreaQuantity = $("#CoveredAreaQuantity").val();
                challan.CoveredAreaQuantity = CoveredAreaQuantity;
                if (challan.CoveredAreaQuantity == "" || challan.CoveredAreaQuantity == null) {
                    challan.CoveredAreaQuantity = 0;
                }

                challan.CoveredAreaQuantity = parseFloat(challan.BasementCoveredAreaQuantity) + parseFloat(challan.CoveredAreaQuantity);
                if (challan.propertyInfo.CoveredAreaQuantity!=null) {
                    challan.propertyInfo.CoveredAreaQuantity = parseFloat(challan.BasementCoveredAreaQuantity) + parseFloat(challan.propertyInfo.CoveredAreaQuantity);

                }


                if (challan.propertyInfo.ConstructedAreaInSqFeet == "") {
                    challan.propertyInfo.Area = "";
                }
                else {
                    if (challan.propertyInfo.ConstructedAreaInSqFeet == "" || challan.propertyInfo.ConstructedAreaInSqFeet == null) {
                        challan.propertyInfo.ConstructedAreaInSqFeet = 0;
                    }
                    challan.propertyInfo.ConstructedAreaInSqFeet = parseFloat(challan.BasementCoveredAreaQuantity) + parseFloat(challan.propertyInfo.ConstructedAreaInSqFeet);
                }
                if (challan.MultipleLandClassification == true) {

                    challan.propertyInfo.StructureSqFtRateUnit = challan.propertyInfo.rateUnit;
                    challan.propertyInfo.ConstructedStructureValue = $("#constructedStructureValueGenerateChallan").val().replace(/,/g, "");
                }
               // challan.propertyInfo.ConstructedStructureValue = $("#constructedStructureValueGenerateChallan").val().replace(/,/g, "");
                if (isExchangeOfProperty) {
                    if (challan.propertyInfo.DistrictId == "" || challan.propertyInfo.DistrictId == null) {
                    var LandCategory = $("#CategoriesUrban option:selected").text();
                    challan.propertyInfo.LandCategory = LandCategory;

                    var LandCategoryID = $("#CategoriesUrban option:selected").val();
                    challan.propertyInfo.CATEGORY_ID = LandCategoryID;


                    var FlDropdownDC = $("#FlDropdownDC option:selected").text();
                    challan.propertyInfo.FlDropdownDC = FlDropdownDC;

                    var BasementsDropdownDC = $("#BasementsDropdownDC option:selected").text();
                    challan.propertyInfo.BasementsDropdownDC = BasementsDropdownDC;
                    var StructureValueId = $("#StructureValueId").text();
                    challan.propertyInfo.StructureValue = StructureValueId;

                    var DCRateSqFt2 = $("#DCRateSqFt2").text();
                    challan.propertyInfo.StructureSqFtRateInds = DCRateSqFt2;
                    challan.propertyInfo.StructureSqFtRate = DCRateSqFt2;

                    var rateValue = $("#rateValue").text();
                    challan.propertyInfo.ValuationRateInds = rateValue;

                    var LandClassificationUrban = $("#LandClassificationUrban option:selected").text();
                    challan.propertyInfo.LandClassificationUrbanInds = LandClassificationUrban;

                  
                    var DCValueId = $("#DCValueId").text();
                    challan.propertyInfo.DCLandValue = DCValueId;

                    var PropertyAreaQuantity = $("#PropertyAreaQuantity").val();
                    challan.propertyInfo.PropertyAreaQuantity = PropertyAreaQuantity;

                    var BasementCoveredAreaQuantity = $("#BasementCoveredAreaQuantity").val();
                    challan.propertyInfo.BasementCoveredAreaQuantity = BasementCoveredAreaQuantity;
                    if (challan.propertyInfo.BasementCoveredAreaQuantity == "" || challan.propertyInfo.BasementCoveredAreaQuantity == null) {
                        challan.propertyInfo.BasementCoveredAreaQuantity = 0;
                    }

                    var CoveredAreaQuantity = $("#CoveredAreaQuantity").val();
                    challan.propertyInfo.CoveredAreaQuantity = CoveredAreaQuantity;
                    if (challan.propertyInfo.CoveredAreaQuantity == "") {
                        challan.propertyInfo.CoveredAreaQuantity = 0;
                    }
                    challan.propertyInfo.CoveredAreaQuantity = parseFloat(challan.propertyInfo.BasementCoveredAreaQuantity) + parseFloat(challan.propertyInfo.CoveredAreaQuantity);

                    if (challan.propertyInfo.ConstructedAreaInSqFeet == "") {
                        challan.propertyInfo.Area = "";
                    }
                    else {
                        if (challan.propertyInfo.ConstructedAreaInSqFeet == "") {
                            challan.propertyInfo.ConstructedAreaInSqFeet = 0;
                        }
                        challan.propertyInfo.ConstructedAreaInSqFeet = parseFloat(challan.BasementCoveredAreaQuantity) + parseFloat(challan.propertyInfo.ConstructedAreaInSqFeet);
                    }
                }

                    else if (challan.propertyInfo2.DistrictId == "" || challan.propertyInfo2.DistrictId ==null) {
                    var LandCategory = $("#CategoriesUrban option:selected").text();
                    challan.propertyInfo2.LandCategory = LandCategory;

                    var LandCategoryID = $("#CategoriesUrban option:selected").val();
                    challan.propertyInfo2.CATEGORY_ID = LandCategoryID;


                    var FlDropdownDC = $("#FlDropdownDC option:selected").text();
                    challan.propertyInfo2.FlDropdownDC = FlDropdownDC;

                    var BasementsDropdownDC = $("#BasementsDropdownDC option:selected").text();
                    challan.propertyInfo2.BasementsDropdownDC = BasementsDropdownDC;
                    var StructureValueId = $("#StructureValueId").text();
                    challan.propertyInfo2.StructureValue = StructureValueId;

                    var DCRateSqFt2 = $("#DCRateSqFt2").text();
                    challan.propertyInfo2.StructureSqFtRateInds = DCRateSqFt2;

                    var rateValue = $("#rateValue").text();
                    challan.propertyInfo2.ValuationRateInds = rateValue;

                    var LandClassificationUrban = $("#LandClassificationUrban option:selected").text();
                    challan.propertyInfo2.LandClassificationUrbanInds = LandClassificationUrban;

                    var StructureValueId = $("#StructureValueId").text();
                    challan.propertyInfo2.StructureValue = StructureValueId;

                    var DCValueId = $("#DCValueId").text();
                    challan.propertyInfo2.DCLandValue = DCValueId;

                    var PropertyAreaQuantity = $("#PropertyAreaQuantity").val();
                    challan.propertyInfo2.PropertyAreaQuantity = PropertyAreaQuantity;

                    var BasementCoveredAreaQuantity = $("#BasementCoveredAreaQuantity").val();
                    challan.propertyInfo2.BasementCoveredAreaQuantity = BasementCoveredAreaQuantity;

                    if (challan.propertyInfo2.BasementCoveredAreaQuantity == "" || challan.propertyInfo2.BasementCoveredAreaQuantity == null) {
                        challan.propertyInfo2.BasementCoveredAreaQuantity = 0;
                    }

                    var CoveredAreaQuantity = $("#CoveredAreaQuantity").val();
                    challan.propertyInfo2.CoveredAreaQuantity = CoveredAreaQuantity;
                    challan.propertyInfo2.CoveredAreaQuantity = parseFloat(challan.propertyInfo2.BasementCoveredAreaQuantity) + parseFloat(challan.propertyInfo2.CoveredAreaQuantity);

                    if (challan.propertyInfo2.ConstructedAreaInSqFeet == "") {
                        challan.propertyInfo2.Area = "";
                    }
                    else {
                        challan.propertyInfo2.ConstructedAreaInSqFeet = parseFloat(challan.propertyInfo2.BasementCoveredAreaQuantity) + parseFloat(challan.propertyInfo2.ConstructedAreaInSqFeet);
                    }

                }
               // var LandCategory = $("#CategoriesUrban option:selected").text();
               // challan.LandCategory = LandCategory;

                //var LandCategoryID = $("#CategoriesUrban option:selected").val();
               // challan.CATEGORY_ID = LandCategoryID;

                //var FlDropdownDC = $("#FlDropdownDC option:selected").text();
                //challan.FlDropdownDC = FlDropdownDC;

                //var BasementsDropdownDC = $("#BasementsDropdownDC option:selected").text();
                //challan.BasementsDropdownDC = BasementsDropdownDC;

               // var StructureValueId = $("#StructureValueId").text();
                //challan.StructureValue = StructureValueId;


                debugger;
                var DCRateSqFt2 = $("#DCRateSqFt2").text();
                challan.StructureSqFtRateInds = DCRateSqFt2;

                var rateValue = $("#rateValue").text();
                challan.ValuationRateInds = rateValue;

                var LandClassificationUrban = $("#LandClassificationUrban option:selected").text();
                challan.LandClassificationUrbanInds = LandClassificationUrban;

                var StructureValueId = $("#StructureValueId").text();
                challan.StructureValue = StructureValueId;
                challan.propertyInfo.ConstructedStructureValue = challan.StructureValue; 

                var DCValueId = $("#DCValueId").text();
                challan.DCLandValue = DCValueId;

                var PropertyAreaQuantity = $("#PropertyAreaQuantity").val();
                challan.PropertyAreaQuantity = PropertyAreaQuantity;

                var CoveredAreaQuantity = $("#CoveredAreaQuantity").val();
                challan.CoveredAreaQuantity = CoveredAreaQuantity;

                if (challan.propertyInfo.ConstructedAreaInSqFeet == "") {
                    challan.propertyInfo.Area = "";
                }
            }
            
            // var landUnitAreaText = $("#LandUnitOfArea").text().trim();
            /*
            if (selectedClassification == "Agricultural" && landUnitAreaText == "Acre" && parseFloat(landAreaAdded) <= 0.25)
            {
                //here
                $("#RateErrorWindow").data("kendoWindow").title(RateErrorLabel).center().open();
                $("#div_RateErrorWindow").text(RateErrorUrbanAcre);
                return;
            }
            else if (selectedClassification == "Agricultural" && landUnitAreaText == "Kanal" && parseFloat(landAreaAdded) <= 2) {
                //here
                $("#RateErrorWindow").data("kendoWindow").title(RateErrorLabel).center().open();
                $("#div_RateErrorWindow").text(RateErrorUrbanKanal);
                return;
            }
            */


            var resTehsil = $('#talukaDropdownDC').kendoValidator().data('kendoValidator').validate();
            var resDistrict = $('#districtDropdownDC').kendoValidator().data('kendoValidator').validate();
            var res1 = $('#PropertyAreaQuantity').kendoValidator().data('kendoValidator').validate();
           // var res2 = $('#UrbanDiv').kendoValidator().data('kendoValidator').validate();
          //  var res3 = $('#landclassificationurbandiv').kendoValidator().data('kendoValidator').validate();
            if ( resDistrict && resTehsil) {
                //here 1
                if (challanModel.TransactionName == "51" || (challan.propertyInfo.IsLandAndConstructed && challan.ActualDCValue)) {
                    if (!compareDCValue()) {
                        if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                            isP1DCGreater = false;
                        }
                        else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                            isP2DCGreater2 = false;
                        }
                        else {
                            isDCGreater = false;
                        }
                        //populateChallanPropertyInfo();
                        //rendenChallan();
                        //NextConfirmationAfterRate();
                        // This is the case
                        // Recalculate duties on Next
                        $("#waitModalForSave").modal();
                        proceedToConfirmFromDCValuation();
                    }
                    else {
                        if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                            isP1DCGreater = true;
                        }
                        else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                            isP2DCGreater2 = true;
                        }
                        else {
                            isDCGreater = true;
                        }
                        if (queryStringName != "PayCVTandReg" ){
                            if ($("#TransactionName").val() != 55 && $("#TransactionName").val() != 51) {
                                openDCValueConfirmationWindow();
                            } else {
                                proceedToConfirmFromDCValuation();
                            }
                        }
                        else{
                            proceedToConfirmFromDCValuation(); 
                        }
                    }
                }
                else {
                    proceedToConfirmFromDCValuation();
                }
            }
        }
        else {

            var landAreaAdded = $("#PropertyAreaQuantity").val();                    

            var PropertyAreaQuantity = $("#PropertyAreaQuantity").val();
            challan.PropertyAreaQuantity = PropertyAreaQuantity;
            challan.propertyInfo.Area = PropertyAreaQuantity;

            var CoveredAreaQuantity = $("#CoveredAreaQuantity").val();
            challan.CoveredAreaQuantity = CoveredAreaQuantity;
            
           

          
            var AcreValue = 0;
            var GhuntaValue = 0;
            var SqrYardValue = 0;
            AcreValue = $("#AcreAreaQuantity").val(); 
            challan.propertyInfo.AcreValue = AcreValue;
            GhuntaValue = $("#GhantasAreaQuantity").val();
            challan.propertyInfo.GhuntaValue = GhuntaValue;
            SqrYardValue = $("#SqYardsAreaQuantity").val();
            challan.propertyInfo.SqrYardValue = SqrYardValue;
            var karachiRate = $("#KarachiAgricultureAMountValue").text(); 
            challan.KarachiRate = karachiRate;
            var KarachiRateUnit = $("#KarachiAgricultureUnit").text();
            challan.KarachiRateUnit = KarachiRateUnit; 
            var ProduceIndexValue = $("#ProduceIndexValue").text();
            challan.ProduceIndexValue = ProduceIndexValue;
            challan.propertyInfo.PRODUCE_INDEX = ProduceIndexValue;

            var ProduceIndex = $("#ProduceIndex").text();
            challan.ProduceIndexUnit = ProduceIndex;
            challan.propertyInfo.PRODUCE_INDEX_UNIT = ProduceIndex;

            var produceIndexUnitAmount = $("#produceIndexUnitAmount").text();
            challan.produceIndexUnitAmount = produceIndexUnitAmount;
           


            var ProduceIndexUnitValue = $("#ProduceIndexUnitValue").text();
            challan.ProduceIndexUnitValue = ProduceIndexUnitValue;
          
           // var selectedClassification = $("#LandClassification").data("kendoDropDownList").text();
            var landAreaAdded = $("#PropertyAreaQuantity").val();
            challan.landAreaAddedForRural = landAreaAdded;
           // var landUnitAreaText = $("#LandUnitOfArea").text().trim();

            

                var unit = document.getElementById("LandUnit").innerHTML;
                var  landUnitAreaText = unit;
                //if (landUnitAreaText == "")
                //{
                //    var unit = document.getElementById("LandUnit").innerHTML;
                //    unit = unit.replace("&nbsp;", '');
                //    unit = unit.replace("Per ", '');
                //    landUnitAreaText = unit;
                //}
                /*
                if (selectedClassification == "Agricultural" && landUnitAreaText == "Acre" && parseFloat(landAreaAdded) <= 0.125) {
                    //here
                    $("#RateErrorWindow").data("kendoWindow").title(RateErrorLabel).center().open();
                    $("#div_RateErrorWindow").text(RateErrorRuralAcre);
                    return;
                }
                else if (selectedClassification == "Agricultural" && landUnitAreaText == "Kanal" && parseFloat(landAreaAdded) <= 1) {
                    //here
                    $("#RateErrorWindow").data("kendoWindow").title(RateErrorLabel).center().open();
                    $("#div_RateErrorWindow").text(RateErrorRuralKanal);
                    return;
                }
                */
            }

         //   var LandClassificationSelectedString = $("#LandClassification").data("kendoDropDownList").text();
            var resTehsil = $('#talukaDropdownDC').kendoValidator().data('kendoValidator').validate();
            var resDistrict = $('#districtDropdownDC').kendoValidator().data('kendoValidator').validate();
            //if (challan.TransactionName == GiftDeedId && LandClassificationSelectedString == "Agricultural" && challan.applyStampDutyForGiftDeed == true && $("#TransactionName").val() != PowerOfAttorneyDeed48b) {
            //    challan.applyStampDuty = false;
            //}
           // else {
            challan.applyStampDuty = true;
          
            var res3;
            var res1;
            res1 = $('#PropertyAreaQuantity').kendoValidator().data('kendoValidator').validate();
            
           
            var res2 = $('#RuralDiv').kendoValidator().data('kendoValidator').validate();
           
            if (res1 && resTehsil && resDistrict) {
                var StampDutyType = 1.0;
                challan.propertyInfo.StampDutyTypeString = '';
                challan.propertyInfo.StampDutyType = StampDutyType;
                if ($("#districtDropdownDC").val() != 1) {

                    Landid = $("#LandClassificationStamp").val();
                    challan.propertyInfo.LandTypeStampId = Landid;
                    $.ajax({
                        url: base_url_service_layer + '/api/Proxy/Locations/GetLandTypeStampById?LandId=' + Landid,
                        type: 'POST',
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            //alert(data[0]);
                            LandTypeModel = data;

                            if (data[0].DutyPercentage != 0) {
                                StampDutyType = data[0].DutyPercentage;
                                challan.propertyInfo.StampDutyType = StampDutyType;
                                challan.propertyInfo.StampDutyTypeString = data[0].Name;
                            }
                            else {
                                StampDutyType = 1;
                                challan.propertyInfo.StampDutyType = StampDutyType;
                                challan.propertyInfo.StampDutyTypeString = '';
                            }
                        },
                        error: function (data) {
                        }
                    });
                }

                if (!compareDCValue()) {
                    if (isExchangeOfProperty == true && isDCNextFirstScreen == true) { 
                        isP1DCGreater = false;
                    }
                    else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                        isP2DCGreater2 = false;
                    }
                    else {
                        isDCGreater = false;
                    }
                   // populateChallanPropertyInfo();
                   // rendenChallan();
                   // NextConfirmationAfterRate();
                    $("#waitModalForSave").modal();
                    proceedToConfirmFromDCValuation();
                }
                else {
                    if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                        isP1DCGreater = true;
                    }
                    else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                        isP2DCGreater2 = true;
                    }
                    else {
                        isDCGreater = true;
                    }
                    openDCValueConfirmationWindow();
                }
            }
        
    }


    function setMultipleKhasraInChallanProperty(challanProperty)
    {
        // Multiple Khasras
        console.log("Multiple Khasra List : " + multipleKhasraList.length);
        challanProperty.MultipleKhasras = multipleKhasraList;
        challanProperty.MultipleKhasraDCRateType = multipleKhasraDCRateType;
        if (challanProperty.MultipleKhasras != null && challanProperty.MultipleKhasras.length > 0)
        {
            var i;
            var treatAsUrban = false;
            var landClassificationString = "";
            var dcRate = 0;
            for (i = 0; i < challanProperty.MultipleKhasras.length; i++) {
                if (challanProperty.MultipleKhasras[i] != null) {

                    if (multipleKhasraDCRateType == allRatesApplied)
                    {
                        // All Rate Appplied
                        treatAsUrban = challanProperty.MultipleKhasras[i].TreatAsUrban;
                        landClassificationString = challanProperty.MultipleKhasras[i].LandClassification;

                        if (treatAsUrban == true) break;
                    }
                    else if (multipleKhasraDCRateType == highestRateApplied) {
                        // Highest Rate applied
                        var khasraString = challanProperty.MultipleKhasras[i].KhasraRate + '';
                        var khasraRate = parseFloat(khasraString.replace(/,/g, ""));
                        if (khasraRate > dcRate)
                        {
                            dcRate = khasraRate;
                            treatAsUrban = challanProperty.MultipleKhasras[i].TreatAsUrban;
                            landClassificationString = challanProperty.MultipleKhasras[i].LandClassification;
                        }
                    }

                    
                }
            }

            challanProperty.treatAsUrban = treatAsUrban;
            challanProperty.LandClassificationString = landClassificationString;
        }
        
    }


    function setMultipleSquareQilasInChallanProperty(challanProperty) {
        // Multiple Qilas
        console.log("Multiple Qilas List : " + multipleSquareQilaList.length);
        challanProperty.MultipleQilas = multipleSquareQilaList;
        challanProperty.MultipleSquareQilaDCRateType = multipleSquareQilaDCRateType;

        if (challanProperty.MultipleQilas != null && challanProperty.MultipleQilas.length > 0) {
            var i;
            var treatAsUrban = false;
            var landClassificationString = "";
            var dcRate = 0;
            for (i = 0; i < challanProperty.MultipleQilas.length; i++) {
                if (challanProperty.MultipleQilas[i] != null) {

                    if (multipleSquareQilaDCRateType == allRatesApplied) {
                        // All Rate Appplied
                        treatAsUrban = challanProperty.MultipleQilas[i].TreatAsUrban;
                        landClassificationString = challanProperty.MultipleQilas[i].LandClassification;

                        if (treatAsUrban == true) break;
                    }
                    else if (multipleSquareQilaDCRateType == highestRateApplied) {
                        // Highest Rate applied
                        var qilaString = challanProperty.MultipleQilas[i].QilaNoRate + '';
                        var qilaRate = parseFloat(qilaString.replace(/,/g, ""));
                        if (qilaRate > dcRate) {
                            dcRate = qilaRate;
                            treatAsUrban = challanProperty.MultipleQilas[i].TreatAsUrban;
                            landClassificationString = challanProperty.MultipleQilas[i].LandClassification;
                        }
                    }


                }
            }

            challanProperty.treatAsUrban = treatAsUrban;
            challanProperty.LandClassificationString = landClassificationString;
        }

    }

    function populateChallanPropertyInfo()
    {
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        challan.propertyInfo.LandClassificationString = '';
        
        if (id == "Urban") {
            challan.propertyInfo.isUrban = true;
            challan.propertyInfo.MultipleKhasras = [];
            debugger; 
            if (multipleKhasrasSelected) {
                challan.propertyInfo.MultipleKhasras = multipleKhasraList;
                challan.MultipleLandClassification = true;
            } else {
                challan.MultipleLandClassification = false;
            }
            //  challan.propertyInfo.MultipleKhasraDCRateType = "";
            //  challan.propertyInfo.MultipleQilas = [];
            // challan.propertyInfo.MultipleSquareQilaDCRateType = "";
            //  var RevenueCircleName = $("#RevenueCircle").data("kendoDropDownList").text();
            //  var RevenueCircleid = $("#RevenueCircle").val();
            var PropertyAreaId = $("#PropertyArea").data("kendoDropDownList").text();
            var PropertyAreaid = $("#PropertyArea").val();

            

            var LandClassificationName = $("#LandClassificationUrban").data("kendoDropDownList").text();
            var LandClassificationid = $("#LandClassificationUrban").val();

            // var FloorName = $("#Floor").data("kendoDropDownList").text();
            // var FloorId = $("#Floor").val();

            // challan.propertyInfo.FloorString = FloorName;
            // challan.propertyInfo.FloorId = FloorId;
            // var LocationName = $("#LocationUrban").data("kendoDropDownList").text();
            // var Locationid = $("#LocationUrban").val();
            challan.propertyInfo.DistrictString = $("#districtDropdownDC").data("kendoDropDownList").text();
            challan.propertyInfo.DistrictId = $("#districtDropdownDC").val();
            challan.propertyInfo.TehsilString = $("#talukaDropdownDC").data("kendoDropDownList").text();
            challan.propertyInfo.TehsilId = $("#talukaDropdownDC").val();
            challan.StampDutyType = 1.0;
            // challan.propertyInfo.TownString = $("#townDropdownDC").data("kendoDropDownList").text();
            //challan.propertyInfo.TownId = $("#townDropdownDC").val();
            //  challan.propertyInfo.LocationUrbanString = $("#LocationUrban").data("kendoDropDownList").text();
            //challan.propertyInfo.LocationUrbanId = $("#LocationUrban").val();
            //challan.propertyInfo.RevenueCircleString=RevenueCircleName;
            //challan.propertyInfo.RevenueCircleId = RevenueCircleid;
            challan.propertyInfo.PropertyAreaString = PropertyAreaId;
            challan.propertyInfo.PropertyAreaId = PropertyAreaid;
            challan.propertyInfo.LandClassificationString = LandClassificationName;
            challan.propertyInfo.LandClassificationId = LandClassificationid;
            if (challan.propertyInfo.IsKhasraAvailable) {
                var KhasraNumber = $('#KhasraUrban').val();
                challan.propertyInfo.KhasraUrbanID = KhasraUrbanId;

                //if (challan.propertyInfo.KhasraUrbanID == 0) {
                   
                //}
                challan.propertyInfo.KhasraUrbanNo = KhasraNumber;
                challan.propertyInfo.SquareNoUrban = null;
                challan.propertyInfo.SquareUrbanID = 0;
                challan.propertyInfo.QilaUrbanID = 0;
                challan.propertyInfo.QilaNoUrban = null;
            }
            else if (challan.propertyInfo.IsSquareNoAvailable) {
                var SquareNumberUrban = $('#squareNoUrban').val();
                challan.propertyInfo.SquareUrbanID = SquareNoUrbanId;
                //if (challan.propertyInfo.SquareUrbanID == 0) {
                    
                //}
                challan.propertyInfo.SquareNoUrban = SquareNumberUrban;
                var QilaNumberUrban = $('#qilaNoUrban').val();
                challan.propertyInfo.QilaUrbanID = QilaNoUrbanId;
                //if (challan.propertyInfo.QilaUrbanID == 0) {
                    
                //}
                challan.propertyInfo.QilaNoUrban = QilaNumberUrban;
                challan.propertyInfo.KhasraUrbanID = 0;
                challan.propertyInfo.KhasraUrbanNo = null;
            }
            //challan.propertyInfo.LocationString = LocationName;
            //challan.propertyInfo.LocationId = Locationid;
        }
        else {
            challan.propertyInfo.isUrban = false;

            var DehSelected = $("#KarachiAgriculture").data("kendoDropDownList").text();
            var DehSelectedId = $("#KarachiAgriculture").val();



            var TalukaLandTypeId = $("#TalukaLandType").val();
            var TalukaLandTypeString = $("#TalukaLandType").data("kendoDropDownList").text();
            challan.propertyInfo.TalukaLandType = TalukaLandTypeString;
            challan.propertyInfo.TalukaLandTypeID = TalukaLandTypeId;

            var ModeOfIrrigation = $("#modeofIrrigation").data("kendoDropDownList").text();
            var ModeOfIrrigationId = $("#modeofIrrigation").val();
            // var QanoongoeeName = $("#Qanoongoee").data("kendoDropDownList").text();
            // var Qanoongoeeid = $("#Qanoongoee").val();
            //  var MouzaName = $("#Mouza").data("kendoDropDownList").text();
            //   var Mouzaid = $("#Mouza").val();
            //   var LandClassificationName = $("#LandClassification").data("kendoDropDownList").text();
            // var LandClassificationid = $("#LandClassification").val();
            //  var LocationName = $("#Location").data("kendoDropDownList").text();
            // var Locationid = $("#Location").val();
            //new
            
            challan.propertyInfo.DistrictString = $("#districtDropdownDC").data("kendoDropDownList").text();
            challan.propertyInfo.DistrictId = $("#districtDropdownDC").val();
            challan.propertyInfo.TehsilString = $("#talukaDropdownDC").data("kendoDropDownList").text();
            challan.propertyInfo.TehsilId = $("#talukaDropdownDC").val();
            //  challan.propertyInfo.QanoongoeeString = QanoongoeeName;
            //  challan.propertyInfo.QanoongoeeId = Qanoongoeeid;
            //  challan.propertyInfo.MouzaString = MouzaName;
            //  challan.propertyInfo.MouzaId = Mouzaid;
            challan.propertyInfo.LandClassificationString = LandClassificationName;
            challan.propertyInfo.LandClassificationId = LandClassificationid;
           
                challan.propertyInfo.PropertyAreaString = DehSelected;
                challan.propertyInfo.PropertyAreaId = DehSelectedId;
           
                challan.propertyInfo.IrrigationMode = ModeOfIrrigation;
                challan.propertyInfo.IrrigationModeId = ModeOfIrrigationId;
           
            
           
          
        }
        if (id == "Urban") {
                var both = 0;
                var DC_Land = 0;
                var CS_Cal = 0;
                var declaredAmount = "";
                var UserProvidedValueConstructed = 0; 
                var UserProvidedValueLand = document.getElementById("PropertyValuationId").innerHTML;
                if ($("#TransactionName").val() != 51) {
                     UserProvidedValueConstructed = document.getElementById("CSValueUserProvidedRate").innerHTML;
                }
                else if ($("#TransactionName").val() == 51) {
                    UserProvidedValueConstructed = document.getElementById("PropertyValuationIdPartition").innerHTML;
                }
                if (queryStringName == "PayCVTandReg") {
                    declaredAmount = parseFloat(challan.TotalAmount);
                    //document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.TotalAmount);
                }
                else {
            

                    declaredAmount = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""));
                    // This code is added for the purpose to maintain which one higher
                    if ($("#LandClassificationUrban option:selected").text() == 'Commercial Open Plot' || $("#LandClassificationUrban option:selected").text() == 'Residential Open Plot') {
                        structure_rate_dc = 0; 
                    }
                    if ($("#LandClassificationUrban option:selected").text() == 'Commercial Built Up' || $("#LandClassificationUrban option:selected").text() == 'Residential Built Up') {
                        cabinet_rate_dc = 0;
                    }
                }
                var DC_Cabnite_Rate = 0;
                var DC_Structure_Rate = 0;
                DC_Cabnite_Rate = document.getElementById("rateValue").innerHTML;
                DC_Cabnite_Rate = parseFloat(DC_Cabnite_Rate.replace(/,/g, ''));
                DC_Structure_Rate = document.getElementById("DCRateSqFt2").innerHTML
                DC_Structure_Rate = parseFloat(DC_Structure_Rate.replace(/,/g, ''));
                //  alert("DC_Cabnite_Rate =" + DC_Cabnite_Rate);
                // alert("DC_Structure_Rate =" + DC_Structure_Rate);
                if (DC_Cabnite_Rate > 0 && DC_Structure_Rate == 0 && $("#TransactionName").val() != 51) {
                    rateString = DC_Cabnite_Rate;
                    declaredAmount = parseFloat(UserProvidedValueLand.replace(/,/g, ''));
                    cabinet_rate_dc = 1; 
                }
                else if (DC_Cabnite_Rate == 0 && DC_Structure_Rate > 0 && $("#TransactionName").val() != 51) {
                    rateString = DC_Structure_Rate;
                    if ($("#TransactionName").val() != 51) {
                        declaredAmount = parseFloat(UserProvidedValueConstructed.replace(/,/g, ''));
                    }
                   
                    structure_rate_dc = 1;
                   // alert('yes3')
                    debugger;
                    challan.propertyInfo.ConstructedAreaInSqFeet = $("#CoveredAreaQuantity").val();;
                    challan.propertyInfo.ConstructedAreaInSqFeet = parseFloat(challan.BasementCoveredAreaQuantity) + parseFloat(challan.propertyInfo.ConstructedAreaInSqFeet);
                }
                else {
                //    rateString = document.getElementById("DCRateSqFt2").innerHTML + document.getElementById("DCRateSqFt2").innerHTML;
                    cabinet_rate_dc = 1;
                  structure_rate_dc = 1;
                }
                var AreaQuantityString = $("#PropertyAreaQuantity").val();
                if (cabinet_rate_dc == 1 && structure_rate_dc == 0) {
                    var DCValueString = document.getElementById("DCValueId").innerHTML;
                    var unit = document.getElementById("LandUnit").innerHTML;
                    unit = unit.replace("&nbsp;", '');
                    unit = unit.replace("Per ", '');
                    challan.propertyInfo.rateUnit = unit.trim();
                   challan.propertyInfo.AreaUnit = unit.trim();
                }
                else if (structure_rate_dc == 1 && cabinet_rate_dc == 0) {
                    var DCValueString = document.getElementById("StructureValueId").innerHTML;
                    var unit = document.getElementById("LandUnit").innerHTML;
                    unit = unit.replace("&nbsp;", '');
                    unit = unit.replace("Per ", '');
                    challan.propertyInfo.rateUnit = unit.trim();
                    challan.propertyInfo.StructureSqFtRateUnit = unit.trim();
                }
                else if (structure_rate_dc == 1 && cabinet_rate_dc == 1) {
                    var DCValueString = 0 ; 
                    var DCValueStringStructure = 0; 
                    DC_Value = document.getElementById("DCValueId").innerHTML;
                    Structure_Value_DC = document.getElementById("StructureValueId").innerHTML;
                  
                    var unit = document.getElementById("LandUnit").innerHTML;
                  
                    unit = unit.replace("&nbsp;", '');
                    unit = unit.replace("Per ", '');
                    challan.propertyInfo.rateUnit = unit.trim();
                    if ($("#TransactionName").val() != 51) {
                        if (parseFloat(UserProvidedValueLand.replace(/,/g, '')) > parseFloat(DC_Value.replace(/,/g, ''))) {

                            DCValueString = parseFloat(DC_Value.replace(/,/g, ''));
                            DC_Land = 1;
                        } else {
                            DCValueString = parseFloat(DC_Value.replace(/,/g, ''));
                            DC_Land = 0;

                        }
                        if (parseFloat(UserProvidedValueConstructed.replace(/,/g, '')) > parseFloat(Structure_Value_DC.replace(/,/g, ''))) {

                            DCValueStringStructure = parseFloat(Structure_Value_DC.replace(/,/g, ''));
                            CS_Cal = 1;
                        } else {
                            DCValueStringStructure = parseFloat(Structure_Value_DC.replace(/,/g, ''));
                            CS_Cal = 0;
                        }
                        if (DC_Land == 1 && CS_Cal == 1) {

                            both = 1;

                        }
                    }
                }
                //} else {
                //    var DCValueString = document.getElementById("StructureValueId").innerHTML + document.getElementById("DCValueId").innerHTML;
                //    var unit = document.getElementById("LandUnit").innerHTML;
                //    unit = unit.replace("&nbsp;", '');
                //    unit = unit.replace("Per ", '');
                //    challan.propertyInfo.rateUnit = unit.trim();


                //}
                //challan.propertyInfo.DistrictId = challan.DistrictId;
                //challan.propertyInfo.TehsilId = challan.TehsilId;
        // Testing for condition
              //  challan.propertyInfo.Rate = rateString;
             challan.propertyInfo.Area = AreaQuantityString;
               
                if (both == 0 && DC_Land == 1 && CS_Cal == 0 && structure_rate_dc == 1 && cabinet_rate_dc == 1 && $("#TransactionName").val() != 51) {
                     if ($("#TransactionName").val() == 51) {
                         challan.propertyInfo.FinalRate = parseFloat(Structure_Value_DC.replace(/,/g, ''));
                         declaredAmount =  parseFloat(DC_Value.replace(/,/g, ''));
                         
                     } else {

                          //FinalRate = DCValueString + DCValueStringStructure; //parseFloat(Structure_Value_DC.replace(/,/g, ''));
                         // challan.propertyInfo.FinalRate = returnCommas(FinalRate); 
                         // declaredAmount = parseFloat(UserProvidedValueConstructed.replace(/,/g, '')) + parseFloat(DC_Value.replace(/,/g, ''));


                         // Change for the constructed Smaller and Land Higher in case of UserProvided Value .... 

                         FinalRate = parseFloat(UserProvidedValueLand.replace(/,/g, '')) + DCValueStringStructure;
                         challan.propertyInfo.FinalRate = returnCommas(FinalRate);
                         declaredAmount = DCValueString + parseFloat(UserProvidedValueConstructed.replace(/,/g, '')); 

                     }
                }
                else if (both == 0 && DC_Land == 0 && CS_Cal == 1 && structure_rate_dc == 1 && cabinet_rate_dc == 1 && $("#TransactionName").val() != 51) {

                  //  FinalRate = DCValueString + DCValueStringStructure; //parseFloat(Structure_Value_DC.replace(/,/g, ''));
                   // challan.propertyInfo.FinalRate = returnCommas(FinalRate);
                    //   declaredAmount = parseFloat(UserProvidedValueLand.replace(/,/g, '')) + parseFloat(Structure_Value_DC.replace(/,/g, ''));

                    // Change for the constructed Smaller and Land Higher in case of UserProvided Value .... 
                    FinalRate = parseFloat(UserProvidedValueConstructed.replace(/,/g, '')) + DCValueString;
                    challan.propertyInfo.FinalRate = returnCommas(FinalRate);
                    declaredAmount = DCValueStringStructure + parseFloat(UserProvidedValueLand.replace(/,/g, ''));

                }
                else if (both == 0 && $("#LandClassificationUrban option:selected").text() != 'Industrial' && $("#LandClassificationUrban option:selected").text() != "Commercial Built Up" && $("#TransactionName").val() != 51) {
                     //if (DCValueString.indexOf(',') > -1) {
                     //    challan.propertyInfo.FinalRate = DCValueString.replace(/,/g, "");
                     //} else
                     //    challan.propertyInfo.FinalRate = DCValueString;
                    if (!multipleKhasrasSelected) {
                        challan.propertyInfo.FinalRate = DCValueString;  //DCValueString.replace(/,/g, "");
                    } else {
                        FinalRate = DCValueString + DCValueStringStructure; //parseFloat(Structure_Value_DC.replace(/,/g, ''));
                        challan.propertyInfo.FinalRate = returnCommas(FinalRate);
                        declaredAmount = parseFloat(returnCommas(UserProvidedValueLand).replace(/,/g, '')) + parseFloat(returnCommas(UserProvidedValueConstructed).replace(/,/g, ''));
                    }

                }
                else if ($("#TransactionName").val() == 51) {
                   var  final_value =  document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML
                   challan.propertyInfo.FinalRate = parseFloat(final_value.replace(/,/g, ''));
                   declaredAmount = parseFloat(UserProvidedValueConstructed.replace(/,/g, ''));
                   
                       challan.propertyInfo.declaredAmount = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));
                       challan.propertyInfo.DeclaredAmount = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));
                  
                }
                

                else {

                   FinalRate = DCValueString + DCValueStringStructure;
                   challan.propertyInfo.FinalRate = returnCommas(FinalRate); 
                }
                if ($("#LandClassificationUrban option:selected").text() == 'Flats/Appartments' && $("#TransactionName").val() != 51) {
                    debugger; 
                    if ($("#TransactionName").val() != 51) {
                         var User_Provided_Structure_Rate = document.getElementById("CSValueUserProvidedRate").innerHTML;
                         User_Provided_Structure_Rate = parseFloat(User_Provided_Structure_Rate.replace(/,/g, ''));
                         declaredAmount = User_Provided_Structure_Rate;
                         challan.propertyInfo.DeclaredAmount = declaredAmount;
                         challan.propertyInfo.declaredAmount = declaredAmount;
                         //Applying For Floating Formula
                         var User_Provided_value = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));
                         var DC_Valuation_Amount = parseFloat(returnCommas(challan.propertyInfo.FinalRate).replace(/,/g, ''));
                         //alert(challan.stampduty); 
                         if (User_Provided_value > DC_Valuation_Amount) {
                             debugger;
                            // var R1 = (DC_Valuation_Amount / User_Provided_value) * 1 / 100;
                            // var R2 = R1 * User_Provided_value;
                            // var R3 = R2 * 100;  //To CalCulate Stampduty;
                             challan.propertyInfo.declaredAmount = User_Provided_value;
                             challan.propertyInfo.DeclaredAmount = User_Provided_value;
                             // added  for the flat case. 
                             challan.propertyInfo.FinalRate = User_Provided_value; 
                             //  challan.TotalAmount = R3;
                             challan.TotalAmount = User_Provided_value;

                         } else {

                             challan.propertyInfo.declaredAmount = DC_Valuation_Amount;
                             challan.propertyInfo.DeclaredAmount = DC_Valuation_Amount;
                             challan.TotalAmount = DC_Valuation_Amount;


                         }


                     } 

                }
                else {
                     if (parseFloat(returnCommas(challan.propertyInfo.FinalRate).replace(/,/g, '') ) > declaredAmount) {
                         challan.propertyInfo.declaredAmount = parseFloat(returnCommas(challan.propertyInfo.FinalRate).replace(/,/g, ''));
                         challan.propertyInfo.DeclaredAmount = parseFloat(returnCommas(challan.propertyInfo.FinalRate).replace(/,/g, ''));
                         challan.TotalAmount = parseFloat(returnCommas(challan.propertyInfo.FinalRate).replace(/,/g, ''));

                        


                     } else {

                         // Appling Floating Formula for Greater User Provided Value. 
                         var User_Provided_value = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));
                         var DC_Valuation_Amount = parseFloat(returnCommas(challan.propertyInfo.FinalRate).replace(/,/g, ''));
                         if ($("#TransactionName").val() == 55 || $("#TransactionName").val() == 51) {

                             if ($("#TransactionName").val() == 51 || $("#TransactionName").val() == 55 ) {

                                 if (User_Provided_value > DC_Valuation_Amount) {
                                     challan.propertyInfo.declaredAmount = User_Provided_value;
                                     challan.propertyInfo.DeclaredAmount = User_Provided_value;
                                     challan.TotalAmount = User_Provided_value;
                                 } else {
                                     challan.propertyInfo.declaredAmount = DC_Valuation_Amount;
                                     challan.propertyInfo.DeclaredAmount = DC_Valuation_Amount;
                                     challan.TotalAmount = DC_Valuation_Amount;


                                 }


                             } else {
                                 challan.propertyInfo.declaredAmount = User_Provided_value;
                                 challan.propertyInfo.DeclaredAmount = User_Provided_value;
                                 challan.TotalAmount = User_Provided_value;
                             }

                         } else {
                             debugger;
                         //    var R1 = (DC_Valuation_Amount / User_Provided_value) * 1 / 100;
                           //  var R2 = R1 * User_Provided_value;
                           //  var R3 = R2 * 100;  //To CalCulate Stampduty;
                             challan.propertyInfo.declaredAmount = User_Provided_value;
                             challan.propertyInfo.DeclaredAmount = User_Provided_value;
                             //  challan.TotalAmount = R3;
                             challan.TotalAmount = User_Provided_value;
                         }

                     }
                     
                }

        }
        if (id == "Rural") {
            debugger
            if ($("#TransactionName").val() != 51) {
                var dcvalue = document.getElementById("DCValueRuralId").innerHTML;

               
                challan.propertyInfo.LAND_Valuation_Amount = dcvalue; 
                challan.propertyInfo.ConstructedStructureValue = 0; 


                challan.propertyInfo.Rate = parseFloat(dcvalue.replace(/,/g, ''));
                //challan.StampDutyType = StampDutyType; 
                var UserProvidedValueLand = document.getElementById("PropertyValuationId").innerHTML;
                var UserProvidedValueConstructed = document.getElementById("CSValueUserProvidedRate").innerHTML;
                var declaredAmount = 0;
                declaredAmount = parseFloat(UserProvidedValueLand.replace(/,/g, '')) + parseFloat(UserProvidedValueConstructed.replace(/,/g, ''))
                challan.propertyInfo.DeclaredAmount = declaredAmount;
                challan.propertyInfo.rateUnit = "Acre";
                challan.propertyInfo.FinalRate = parseFloat(dcvalue.replace(/,/g, ''));

                //Applying For Floating Formula
                var User_Provided_value = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));
                var DC_Valuation_Amount = parseFloat(returnCommas(challan.propertyInfo.FinalRate).replace(/,/g, ''));
                //Condition Added for Power of Attorney. 
                if ($("#TransactionName").val() == 55) {
                    if (User_Provided_value > DC_Valuation_Amount) {
                        challan.propertyInfo.declaredAmount = User_Provided_value;
                        challan.propertyInfo.DeclaredAmount = User_Provided_value;
                        challan.TotalAmount = User_Provided_value;
                    } else {
                        challan.propertyInfo.declaredAmount = DC_Valuation_Amount;
                        challan.propertyInfo.DeclaredAmount = DC_Valuation_Amount;
                        challan.TotalAmount = DC_Valuation_Amount;


                    }
                } else {

                    debugger;
                    //var R1 = (DC_Valuation_Amount / User_Provided_value) * 1 / 100;
                    //var R2 = R1 * User_Provided_value;
                    //var R3 = R2 * 100;  //To CalCulate Stampduty;
                   
                 //   challan.propertyInfo.declaredAmount = User_Provided_value;
                  //  challan.propertyInfo.DeclaredAmount = User_Provided_value;
                    // challan.TotalAmount = R3;
                    //  challan.TotalAmount = User_Provided_value;

                    if (User_Provided_value > DC_Valuation_Amount) {
                        challan.propertyInfo.declaredAmount = User_Provided_value;
                        challan.propertyInfo.DeclaredAmount = User_Provided_value;
                        challan.TotalAmount = User_Provided_value;
                    } else {
                        challan.propertyInfo.declaredAmount = DC_Valuation_Amount;
                        challan.propertyInfo.DeclaredAmount = DC_Valuation_Amount;
                        challan.TotalAmount = DC_Valuation_Amount;


                    }
                }




            } else {

                var dcvalue = document.getElementById("DCValueRuralId").innerHTML;
                challan.propertyInfo.LAND_Valuation_Amount = dcvalue;
                challan.propertyInfo.ConstructedStructureValue = 0; 
                challan.propertyInfo.Rate = parseFloat(dcvalue.replace(/,/g, ''));
                var UserProvidedValueLand = document.getElementById("PropertyValuationId").innerHTML;
                var declaredAmount = 0;
                challan.propertyInfo.DeclaredAmount = dcvalue;
                challan.propertyInfo.rateUnit = "Acre";
                challan.propertyInfo.FinalRate = parseFloat(dcvalue.replace(/,/g, ''));

            }
        }
    }


    function populateChallanPropertyInfo2() {
        var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        if (id == "Urban") {
           challan.propertyInfo2.isUrban = true;
           // challan.propertyInfo2.MultipleKhasras = [];
           // challan.propertyInfo2.MultipleKhasraDCRateType = "";
           var PropertyAreaId = $("#PropertyArea").data("kendoDropDownList").text();
           var PropertyAreaid = $("#PropertyArea").val();
           var LandClassificationName = $("#LandClassificationUrban").data("kendoDropDownList").text();
           var LandClassificationid = $("#LandClassificationUrban").val();

           if (multipleKhasrasSelected) {
               challan.propertyInfo2.MultipleKhasras = multipleKhasraList;
               challan.MultipleLandClassification = true;
           } else {
               challan.MultipleLandClassification = false;
           }


            //challan.propertyInfo2.FloorString = FloorName;
            //challan.propertyInfo2.FloorId = FloorId;

            ////var LocationName = $("#LocationUrban").data("kendoDropDownList").text();
            ////var Locationid = $("#LocationUrban").val();
            //challan.propertyInfo2.DistrictString = $("#districtDropdownDC").data("kendoDropDownList").text();
            //challan.propertyInfo2.DistrictId = $("#districtDropdownDC").val();
            //challan.propertyInfo2.TehsilString = $("#talukaDropdownDC").data("kendoDropDownList").text();
            //challan.propertyInfo2.TehsilId = $("#talukaDropdownDC").val();
            //challan.propertyInfo2.TownString = $("#townDropdownDC").data("kendoDropDownList").text();
            //challan.propertyInfo2.TownId = $("#townDropdownDC").val();
            //challan.propertyInfo2.LocationUrbanString = $("#LocationUrban").data("kendoDropDownList").text();
            //challan.propertyInfo2.LocationUrbanId = $("#LocationUrban").val();
            //challan.propertyInfo2.RevenueCircleString = RevenueCircleName;
            //challan.propertyInfo2.RevenueCircleId = RevenueCircleid;
            //challan.propertyInfo2.PropertyAreaString = PropertyAreaId;
            //challan.propertyInfo2.PropertyAreaId = PropertyAreaid;
            //challan.propertyInfo2.LandClassificationString = LandClassificationName;
            //challan.propertyInfo2.LandClassificationId = LandClassificationid;

           challan.propertyInfo2.DistrictString = $("#districtDropdownDC").data("kendoDropDownList").text();
           challan.propertyInfo2.DistrictId = $("#districtDropdownDC").val();
           challan.propertyInfo2.TehsilString = $("#talukaDropdownDC").data("kendoDropDownList").text();
           challan.propertyInfo2.TehsilId = $("#talukaDropdownDC").val();
             challan.propertyInfo2.PropertyAreaString = PropertyAreaId;
             challan.propertyInfo2.PropertyAreaId = PropertyAreaid;
             challan.propertyInfo2.LandClassificationString = LandClassificationName;
             challan.propertyInfo2.LandClassificationId = LandClassificationid;




          
            //challan.propertyInfo2.LocationString = LocationName;
            console.log(challan.propertyInfo2);
           //challan.propertyInfo2.LocationId = Locationid; 
        }
        else {
            challan.propertyInfo2.isUrban = false;
            // var QanoongoeeName = $("#Qanoongoee").data("kendoDropDownList").text();
            // var Qanoongoeeid = $("#Qanoongoee").val();
            //  var MouzaName = $("#Mouza").data("kendoDropDownList").text();
            //   var Mouzaid = $("#Mouza").val();
            //   var LandClassificationName = $("#LandClassification").data("kendoDropDownList").text();
            // var LandClassificationid = $("#LandClassification").val();
            //  var LocationName = $("#Location").data("kendoDropDownList").text();
            // var Locationid = $("#Location").val();
            //new
            challan.propertyInfo2.DistrictString = $("#districtDropdownDC").data("kendoDropDownList").text();
            challan.propertyInfo2.DistrictId = $("#districtDropdownDC").val();
            challan.propertyInfo2.TehsilString = $("#talukaDropdownDC").data("kendoDropDownList").text();
            challan.propertyInfo2.TehsilId = $("#talukaDropdownDC").val();
            //  challan.propertyInfo.QanoongoeeString = QanoongoeeName;
            //  challan.propertyInfo.QanoongoeeId = Qanoongoeeid;
            //  challan.propertyInfo.MouzaString = MouzaName;
            //  challan.propertyInfo.MouzaId = Mouzaid;
            challan.propertyInfo2.LandClassificationString = LandClassificationName;
            challan.propertyInfo2.LandClassificationId = LandClassificationid;

            var DehSelected2 = $("#KarachiAgriculture").data("kendoDropDownList").text();
            var DehSelectedId2 = $("#KarachiAgriculture").val();
            challan.propertyInfo2.PropertyAreaString = DehSelected2;
            challan.propertyInfo2.PropertyAreaId = DehSelectedId2;


        }
        if (id == "Urban") {
            var both = 0;
            var DC_Land = 0;
            var CS_Cal = 0;
            var declaredAmount = "";
            var UserProvidedValueConstructed = 0;
            var UserProvidedValueLand = document.getElementById("PropertyValuationId").innerHTML;
            if ($("#TransactionName").val() != 51) {
                UserProvidedValueConstructed = document.getElementById("CSValueUserProvidedRate").innerHTML;
            }
            else if ($("#TransactionName").val() == 51) {
                UserProvidedValueConstructed = document.getElementById("PropertyValuationIdPartition").innerHTML;
            }
            if (queryStringName == "PayCVTandReg") {
                declaredAmount = parseFloat(challan.TotalAmount);
                //document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.TotalAmount);
            }
            else {


                declaredAmount = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""));
            }
            var DC_Cabnite_Rate = 0;
            var DC_Structure_Rate = 0;
            DC_Cabnite_Rate = document.getElementById("rateValue").innerHTML;
            DC_Cabnite_Rate = parseFloat(DC_Cabnite_Rate.replace(/,/g, ''));
            DC_Structure_Rate = document.getElementById("DCRateSqFt2").innerHTML
            DC_Structure_Rate = parseFloat(DC_Structure_Rate.replace(/,/g, ''));
            //  alert("DC_Cabnite_Rate =" + DC_Cabnite_Rate);
            // alert("DC_Structure_Rate =" + DC_Structure_Rate);
            if (DC_Cabnite_Rate > 0 && DC_Structure_Rate == 0 && $("#TransactionName").val() != 51) {
                rateString = DC_Cabnite_Rate;
                declaredAmount = parseFloat(UserProvidedValueLand.replace(/,/g, ''));
                cabinet_rate_dc = 1;
            }
            else if (DC_Cabnite_Rate == 0 && DC_Structure_Rate > 0 && $("#TransactionName").val() != 51) {
                rateString = DC_Structure_Rate;
                if ($("#TransactionName").val() != 51) {
                    declaredAmount = parseFloat(UserProvidedValueConstructed.replace(/,/g, ''));
                }

                structure_rate_dc = 1;
                challan.propertyInfo2.ConstructedAreaInSqFeet = $("#CoveredAreaQuantity").val();;
            }
            else {
                //    rateString = document.getElementById("DCRateSqFt2").innerHTML + document.getElementById("DCRateSqFt2").innerHTML;
                cabinet_rate_dc = 1;
                structure_rate_dc = 1;
            }
            var AreaQuantityString = $("#PropertyAreaQuantity").val();
            if (cabinet_rate_dc == 1 && structure_rate_dc == 0) {
                var DCValueString = document.getElementById("DCValueId").innerHTML;
                var unit = document.getElementById("LandUnit").innerHTML;
                unit = unit.replace("&nbsp;", '');
                unit = unit.replace("Per ", '');
                challan.propertyInfo2.rateUnit = unit.trim();
            }
            else if (structure_rate_dc == 1 && cabinet_rate_dc == 0) {
                var DCValueString = document.getElementById("StructureValueId").innerHTML;
                var unit = document.getElementById("LandUnit").innerHTML;
                unit = unit.replace("&nbsp;", '');
                unit = unit.replace("Per ", '');
                challan.propertyInfo2.rateUnit = unit.trim();
            }
            else if (structure_rate_dc == 1 && cabinet_rate_dc == 1) {
                var DCValueString = 0;
                var DCValueStringStructure = 0;
                DC_Value = document.getElementById("DCValueId").innerHTML;
                Structure_Value_DC = document.getElementById("StructureValueId").innerHTML;

                var unit = document.getElementById("LandUnit").innerHTML;

                unit = unit.replace("&nbsp;", '');
                unit = unit.replace("Per ", '');
                challan.propertyInfo2.rateUnit = unit.trim();
                if ($("#TransactionName").val() != 51) {
                    if (parseFloat(UserProvidedValueLand.replace(/,/g, '')) > parseFloat(DC_Value.replace(/,/g, ''))) {

                        DCValueString = parseFloat(DC_Value.replace(/,/g, ''));
                        DC_Land = 1;
                    } else {
                        DCValueString = parseFloat(DC_Value.replace(/,/g, ''));
                        DC_Land = 0;

                    }
                    if (parseFloat(UserProvidedValueConstructed.replace(/,/g, '')) > parseFloat(Structure_Value_DC.replace(/,/g, ''))) {

                        DCValueStringStructure = parseFloat(Structure_Value_DC.replace(/,/g, ''));
                        CS_Cal = 1;
                    } else {
                        DCValueStringStructure = parseFloat(Structure_Value_DC.replace(/,/g, ''));
                        CS_Cal = 0;
                    }
                    if (DC_Land == 1 && CS_Cal == 1) {

                        both = 1;

                    }
                }
            }
            //} else {
            //    var DCValueString = document.getElementById("StructureValueId").innerHTML + document.getElementById("DCValueId").innerHTML;
            //    var unit = document.getElementById("LandUnit").innerHTML;
            //    unit = unit.replace("&nbsp;", '');
            //    unit = unit.replace("Per ", '');
            //    challan.propertyInfo.rateUnit = unit.trim();


            //}
            //challan.propertyInfo.DistrictId = challan.DistrictId;
            //challan.propertyInfo.TehsilId = challan.TehsilId;

            challan.propertyInfo2.Rate = rateString;
            challan.propertyInfo2.Area = AreaQuantityString;

            if (both == 0 && DC_Land == 1 && CS_Cal == 0 && structure_rate_dc == 1 && cabinet_rate_dc == 1 && $("#TransactionName").val() != 51) {
                if ($("#TransactionName").val() == 51) {
                    challan.propertyInfo2.FinalRate = parseFloat(Structure_Value_DC.replace(/,/g, ''));
                    declaredAmount = parseFloat(DC_Value.replace(/,/g, ''));

                } else {

                    FinalRate = DCValueString + DCValueStringStructure; //parseFloat(Structure_Value_DC.replace(/,/g, ''));
                    challan.propertyInfo2.FinalRate = returnCommas(FinalRate);
                    declaredAmount = parseFloat(UserProvidedValueConstructed.replace(/,/g, '')) + parseFloat(DC_Value.replace(/,/g, ''));

                }
            }
            else if (both == 0 && DC_Land == 0 && CS_Cal == 1 && structure_rate_dc == 1 && cabinet_rate_dc == 1 && $("#TransactionName").val() != 51) {

                FinalRate = DCValueString + DCValueStringStructure; //parseFloat(Structure_Value_DC.replace(/,/g, ''));
                challan.propertyInfo2.FinalRate = returnCommas(FinalRate);
                declaredAmount = parseFloat(UserProvidedValueLand.replace(/,/g, '')) + parseFloat(Structure_Value_DC.replace(/,/g, ''));
            }
            else if (both == 0 && $("#LandClassificationUrban option:selected").text() != 'Industrial' && $("#LandClassificationUrban option:selected").text() != "Commercial Built Up" && $("#TransactionName").val() != 51) {
                //if (DCValueString.indexOf(',') > -1) {
                //    challan.propertyInfo.FinalRate = DCValueString.replace(/,/g, "");
                //} else
                //    challan.propertyInfo.FinalRate = DCValueString;

                challan.propertyInfo2.FinalRate = DCValueString;  //DCValueString.replace(/,/g, "");

            }
            else if ($("#TransactionName").val() == 51) {
                var final_value = document.getElementById("PropertyValuationIdPartitionOercentage").innerHTML
                challan.propertyInfo2.FinalRate = parseFloat(final_value.replace(/,/g, ''));
                declaredAmount = parseFloat(UserProvidedValueConstructed.replace(/,/g, ''));
                challan.propertyInfo2.declaredAmount = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));
                challan.propertyInfo2.DeclaredAmount = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));

            }


            else {

                FinalRate = DCValueString + DCValueStringStructure;
                challan.propertyInfo2.FinalRate = returnCommas(FinalRate);
            }
            if ($("#LandClassificationUrban option:selected").text() == 'Flats/Appartments' && $("#TransactionName").val() != 51) {
                if ($("#TransactionName").val() != 51) {
                    var User_Provided_Structure_Rate = document.getElementById("CSValueUserProvidedRate").innerHTML;
                    User_Provided_Structure_Rate = parseFloat(User_Provided_Structure_Rate.replace(/,/g, ''));
                    declaredAmount = User_Provided_Structure_Rate;
                    challan.propertyInfo2.DeclaredAmount = declaredAmount;
                    challan.propertyInfo2.declaredAmount = declaredAmount;
                    //Applying For Floating Formula
                    var User_Provided_value = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));
                    var DC_Valuation_Amount = parseFloat(returnCommas(challan.propertyInfo2.FinalRate).replace(/,/g, ''));
                    debugger;
                   // var R1 = (DC_Valuation_Amount / User_Provided_value) * 1 / 100;
                   // var R2 = R1 * User_Provided_value;
                   // var R3 = R2 * 100;  //To CalCulate Stampduty;
                    challan.propertyInfo2.declaredAmount = User_Provided_value;
                    challan.propertyInfo2.DeclaredAmount = User_Provided_value;
                    challan.TotalAmount = R3;
                    challan.TotalAmount = User_Provided_value;

                }

            }
            else {
                if (parseFloat(returnCommas(challan.propertyInfo2.FinalRate).replace(/,/g, '')) > declaredAmount) {
                    challan.propertyInfo2.declaredAmount = parseFloat(returnCommas(challan.propertyInfo2.FinalRate).replace(/,/g, ''));
                    challan.propertyInfo2.DeclaredAmount = parseFloat(returnCommas(challan.propertyInfo2.FinalRate).replace(/,/g, ''));
                    challan.TotalAmount = parseFloat(returnCommas(challan.propertyInfo2.FinalRate).replace(/,/g, ''));




                } else {

                    // Appling Floating Formula for Greater User Provided Value. 
                    var User_Provided_value = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));
                    var DC_Valuation_Amount = parseFloat(returnCommas(challan.propertyInfo2.FinalRate).replace(/,/g, ''));
                    if ($("#TransactionName").val() == 55 || $("#TransactionName").val() == 51) {
                        challan.propertyInfo2.declaredAmount = User_Provided_value;
                        challan.propertyInfo2.DeclaredAmount = User_Provided_value;
                        challan.TotalAmount = User_Provided_value;

                    } else {
                        debugger;
                       // var R1 = (DC_Valuation_Amount / User_Provided_value) * 1 / 100;
                       // var R2 = R1 * User_Provided_value;
                       // var R3 = R2 * 100;  //To CalCulate Stampduty;
                        challan.propertyInfo2.declaredAmount = User_Provided_value;
                        challan.propertyInfo2.DeclaredAmount = User_Provided_value;
                        // challan.TotalAmount = R3;
                        challan.TotalAmount = User_Provided_value;
                    }

                }

            }

        }
        if (id == "Rural") {
            if ($("#TransactionName").val() != 51) {
                var dcvalue = document.getElementById("DCValueRuralId").innerHTML;
                var StampDutyType = 1.0;
                challan.propertyInfo2.StampDutyType = StampDutyType;
                if ($("#districtDropdownDC").val() != 1) {

                    Landid = $("#LandClassificationStamp").val();
                    challan.prpropertyInfo2.LandTypeStampId = Landid;
                    $.ajax({
                        url: base_url_service_layer + '/api/Proxy/Locations/GetLandTypeStampById?LandId=' + Landid,
                        type: 'POST',
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                          //  alert(data[0]); 
                            LandTypeModel = data;

                            if (data[0].DutyPercentage != 0) {
                                StampDutyType = data[0].DutyPercentage;
                                challan.prpropertyInfo2.StampDutyType = StampDutyType;
                            }
                            else {
                                StampDutyType = 1;
                                challan.prpropertyInfo2.StampDutyType = StampDutyType;
                            }
                        },
                        error: function (data) {
                        }
                    });
                }



             
                challan.propertyInfo2.StampDutyType = StampDutyType;
                challan.propertyInfo2.Rate = parseFloat(dcvalue.replace(/,/g, ''));
                var UserProvidedValueLand = document.getElementById("PropertyValuationId").innerHTML;
                var UserProvidedValueConstructed = document.getElementById("CSValueUserProvidedRate").innerHTML;
                var declaredAmount = 0;
                declaredAmount = parseFloat(UserProvidedValueLand.replace(/,/g, '')) + parseFloat(UserProvidedValueConstructed.replace(/,/g, ''))
                challan.propertyInfo2.DeclaredAmount = declaredAmount;
                challan.propertyInfo2.rateUnit = "Acre";
                challan.propertyInfo2.FinalRate = parseFloat(dcvalue.replace(/,/g, ''));

                //Applying For Floating Formula
                var User_Provided_value = parseFloat(returnCommas(declaredAmount).replace(/,/g, ''));
                var DC_Valuation_Amount = parseFloat(returnCommas(challan.propertyInfo2.FinalRate).replace(/,/g, ''));
                debugger;
               // var R1 = (DC_Valuation_Amount / User_Provided_value) * 1 / 100;
               // var R2 = R1 * User_Provided_value;
               // var R3 = R2 * 100;  //To CalCulate Stampduty;
                challan.propertyInfo2.declaredAmount = User_Provided_value;
                challan.propertyInfo2.DeclaredAmount = User_Provided_value;
               // challan.TotalAmount = R3;
                challan.TotalAmount = User_Provided_value;




            } else {

                var dcvalue = document.getElementById("DCValueRuralId").innerHTML;
                challan.propertyInfo2.Rate = parseFloat(dcvalue.replace(/,/g, ''));
                var UserProvidedValueLand = document.getElementById("PropertyValuationId").innerHTML;
                var declaredAmount = 0;
                challan.propertyInfo2.DeclaredAmount = dcvalue;
                challan.propertyInfo2.rateUnit = "Acre";
                challan.propertyInfo2.FinalRate = parseFloat(dcvalue.replace(/,/g, ''));

            }
        }
    }

/*

        function LoadMap(landType) {


            var district = $("#DistrictDropdown option:selected").text();

            var tehsil = $("#TehsilDropdown option:selected").text();

            var tehsilval = $("#TehsilDropdown option:selected").val();

            var searchString0 = "";

            var searchString1 = "";

            var searchString2 = "";


            var searchString = "";
            

            if (landType == "Urban") {


                var revenueCircle = $("#RevenueCircle option:selected").text();

                var propertyArea = $("#PropertyArea option:selected").text();






                searchString = propertyArea + ", " + revenueCircle + ", " + tehsil + ", " + district + ", " + "Pakistan";
                searchString1 = tehsil + ", " + district + ", " + "Pakistan";
                searchString2 = revenueCircle + ", " + tehsil + ", " + district + ", " + "Pakistan";
                searchString0 = district + ", " + "Pakistan";


            }

            else {

                var qanoongoh = $("#Qanoongoee option:selected").text();
                var mouza = $("#Mouza option:selected").text();

                searchString = mouza + ", " + qanoongoh + ", " + tehsil + ", " + district + ", " + "Pakistan";
                searchString1 = tehsil + ", " + district + ", " + "Pakistan";
                searchString2 = qanoongoh + ", " + tehsil + ", " + district + ", " + "Pakistan";
                searchString0 = district + ", " + "Pakistan";

            }

            var MapStatus = "";


            GMaps.geocode({

                address: searchString,
                callback: function (results, status) {
                    map.removeMarkers();
                    alert("SearchString  " + searchString);
                    MapStatus = status;
                    if (status == 'OK') {
                        
                        var latlng = results[0].geometry.location;

                        map.setCenter(latlng.lat(), latlng.lng());
                        var value = $("#markers").val();
                        if (value == "") {
                            value += latlng.lat() + "-" + latlng.lng();
                        }
                        else {
                            value += "," + latlng.lat() + "-" + latlng.lng();
                        }

                        map.addMarker({
                            lat: latlng.lat(),
                            lng: latlng.lng()
                        });
                    }

                    map.setCenter(latlng.lat(), latlng.lng());
                    map.setZoom(14);
                }
            });


        }
        */

//        function loadGMapByString(GmapString)
//    {
//            zoomLevel=  map.getZoom();

//            GMaps.geocode({

//                address: GmapString,
//                callback: function (results, status) {

////                    alert(results[0].address_components[0].long_name + " , " + results[0].address_components[1].long_name + " , " + results[0].address_components[2].long_name + " , " + results[0].address_components[3].long_name + " , " + results[0].address_components[4].long_name)
//                   var locationString = "";
//                   for (i = 0; i < results[0].address_components.length; i++)
//                    {
//                       locationString += results[0].address_components[i].long_name + " , "
//                   }

//               //     alert(locationString);




//                    map.removeMarkers();
                   
//                    MapStatus = status;
//                    if (status == 'OK') {

//                        var latlng = results[0].geometry.location;

//                        map.setCenter(latlng.lat(), latlng.lng());
//                        var value = $("#markers").val();
//                        if (value == "") {
//                            value += latlng.lat() + "-" + latlng.lng();
//                        }
//                        else {
//                            value += "," + latlng.lat() + "-" + latlng.lng();
//                        }

//                        map.addMarker({
//                            lat: latlng.lat(),
//                            lng: latlng.lng()
//                        });
//                    }

//                    map.setCenter(latlng.lat(), latlng.lng());
//                    map.setZoom(zoomLevel);
//                }
//            });

           

//        }


        function LoadMapEmbed(landType) {
            

            var district = $("#DistrictDropdown option:selected").text();

            var tehsil = $("#TehsilDropdown option:selected").text();

            var tehsilval = $("#TehsilDropdown option:selected").val();


        

            var searchString0 = "";

            var searchString1 = "";

            var searchString2 = "";


            var searchString = "";
          

            if (landType == "Urban") {


                var revenueCircle = $("#RevenueCircle option:selected").text();

                var propertyArea = $("#PropertyArea option:selected").text();






                //   searchString = propertyArea + ", " + revenueCircle + ", " + tehsil + ", " + district + ", " + "Pakistan";
                searchString = propertyArea + ", " + revenueCircle + ", " + tehsil + ", " + district + ", " + "Pakistan";
                searchString1 = tehsil + ", " + district + ", " + "Pakistan";
                searchString2 = revenueCircle + ", " + tehsil + ", " + district + ", " + "Pakistan";
                searchString0 = district + ", " + "Pakistan";
                searchString4 = revenueCircle + ", " + district + ", " + "Pakistan";

            }

            else {

                var qanoongoh = $("#Qanoongoee option:selected").text();
                var mouza = $("#Mouza option:selected").text();

                searchString = mouza + ", " + qanoongoh + ", " + tehsil + ", " + district + ", " + "Pakistan";
                searchString1 = tehsil + ", " + district + ", " + "Pakistan";
                searchString2 = qanoongoh + ", " + tehsil + ", " + district + ", " + "Pakistan";
                searchString0 = district + ", " + "Pakistan";
                searchString4 = mouza + ", " + district + ", " + "Pakistan";

            }

            document.getElementById("mapembed").innerHTML = "<iframe width='660' height='580' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/place?q=" + searchString4 + "&key=AIzaSyBO-pBF5k74nHsaZJfXamcgWKQ7Gze_1PE' allowfullscreen></iframe>"


        }

        function getKhasrasOrSquareNo() {
            $('#Khasra').val('');
            $('#squareNo').val('');
            $('#qilaNo').val('');
            /*$('#KhasraUrban').val('');
            $('#squareNoUrban').val('');
            $('#qilaNoUrban').val('');
            */
            $('#Location_validationMessage').hide();
            if (isDCValueNotFirst) {
                if (isExchangeOfProperty) {
                    if (isDCNextFirstScreen) {
                        if (challan.propertyInfo.isKhasraHierarchy) {
                            getKhasras();
                        }
                        else if (challan.propertyInfo.isSquareNoHierarchy) {
                            getSquareNo();
                        }
                    }
                    else {
                        if (challan.propertyInfo2.isKhasraHierarchy) {
                            getKhasras();
                        }
                        else if (challan.propertyInfo2.isSquareNoHierarchy) {
                            getSquareNo();
                        }
                    }
                }
                else {
                    if (challan.propertyInfo.isKhasraHierarchy) {
                        getKhasras();
                    }
                    else if (challan.propertyInfo.isSquareNoHierarchy) {
                        getSquareNo();
                    }
                }
            }
            else {
                if (isKhasraHierarchyRateOfChallan) {
                    getKhasras();
                }
                else {
                    getSquareNo();
                }
            }
        }

        function getSquareNo() {
            var Mouzaid = $("#Mouza").val();
            var Qanoongoid = $("#Qanoongoee").val();
            var LandClassificationid = $("#LandClassification").val();
            var LocationString = $("#Location").data("kendoDropDownList").text()
            var MouzaName = $('#Mouza').data("kendoDropDownList").text();
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
                success: function (listofSquareNumbers) {
                    var validForSqNoR = false;
                    var autocomplete = $("#squareNo").data("kendoAutoComplete");
                    if (autocomplete != null) {
                        autocomplete.destroy();
                    }
                    $("#squareNo").kendoAutoComplete({
                        dataTextField: "SquareNo",
                        dataSource: listofSquareNumbers,
                        filter: "startswith",
                        //placeholder: "Select Khasra",
                        highlightFirst: true,
                        select: function (e) {
                            validForSqNoR = true;
                            var selectedOne = this.dataItem(e.item.index());
                            console.log(kendo.stringify(selectedOne));
                            SquareNoId = selectedOne.SquareNoId;
                            var GMapString = selectedOne.GMapSearchKey;//Data.dataSource.data()[Data.selectedIndex - 1].GMapSearchKey;
                            var DefaultGMapString = null;//Data.dataSource.data()[Data.selectedIndex - 1].KML_URL;
                            var KmlDBUrl = selectedOne.DB_KML_URL;
                            //LoadKmlOrSearch(GMapString, DefaultGMapString, KmlDBUrl);
                            //onKhasraNumberChange();

                        },
                        open: function (e) {
                            validForSqNoR = false;
                        },
                        close: function (e) {
                            // if no valid selection - clear input
                            $('#qilaNo').val('');
                            if (!validForSqNoR) this.value('');
                            validForSqNoR = false;
                        },
                        change: function (e) {
                            if (!validForSqNoR) this.value('');

                        },
                    });
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    //   alert(response);
                }
            });
        }

     
       
 



        function propertyAreaRate() {
            debugger
            var $radio = $('input[name=LandType]:checked');
        var id = $radio.attr('id');
        if (id == "Urban") {
           
            $("#RuralResultDiv").hide();
            $("#UrbanResultDiv").show();
            var Talukaid = $("#talukaDropdownDC").val();
            var PropertyAreaId = $("#PropertyArea").val();
            var LandClassificationid = $("#LandClassificationUrban").val();
            var Categoriesid = $("#CategoriesUrban").val();
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


                    document.getElementById("rateValue").innerHTML = returnCommas(rate);
                    document.getElementById("LandUnit").innerHTML = "&nbsp;Per " + proeprtyAreaViewModel.DCRateUnit;
                   
                    if (isDCValueNotFirst) {
                     challan.propertyInfo.AreaUnit = proeprtyAreaViewModel.DCRateUnit; 
                        challan.propertyInfo.rateUnit = proeprtyAreaViewModel.DCRateUnit;
                    }
                    document.getElementById("LandUnitStructure").innerHTML = "&nbsp;Per " + proeprtyAreaViewModel.SqftRateUnit;
                    if (isDCValueNotFirst) {
                        challan.propertyInfo.StructureSqFtRateUnit = proeprtyAreaViewModel.SqftRateUnit;
                    }
                    document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; " + proeprtyAreaViewModel.DCRateUnit;
                    document.getElementById("LandUnitOfAreaCovered").innerHTML = "&nbsp; " + proeprtyAreaViewModel.SqftRateUnit;

                   // $("#DCRateSqFt2").html("hello");
                   // document.getElementById("LandUnitOfArea").innerHTML = proeprtyAreaViewModel.DCRateUnit;
                    //document.getElementById("LandUnitOfAreaCovered").innerHTML = proeprtyAreaViewModel.DCRateUnit;
                    // document.getElementById("DCRateSqFt").html('<h4><span>"Rs.&nbsp;"' + returnCommas(proeprtyAreaViewModel.SqFtRateString) +' "&nbsp;" '+ PerSqftRateDCRs+'</span></h4>');

                    // $("#DCRateSqFt").html('<h4><span>"Rs.&nbsp;"' + returnCommas(proeprtyAreaViewModel.SqFtRateString) + ' "&nbsp;" ' + PerSqftRateDCRs + '</span></h4>');
                    if (!isDCValueNotFirst) {
                        document.getElementById("DCRateSqFt").innerHTML = returnCommas(proeprtyAreaViewModel.SqFtRateString);
                    }
                    else {
                       // $("#DCRateSqFt2").html("Rs.&nbsp;"+returnCommas(proeprtyAreaViewModel.SqFtRateString) + "&nbsp;Per sq. feet");
                        document.getElementById("DCRateSqFt2").innerHTML = returnCommas(proeprtyAreaViewModel.SqFtRateString);
                      //  document.getElementById("LandUnitStructure").innerHTML = "&nbsp;Per " + proeprtyAreaViewModel.DCRateUnit;
                    }
                     
                     $("#waitModalForSave").modal();
                     findCabnitRate(rate, structureRate);
                     $("#waitModalForSave").modal('hide');
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    //   alert(response);

                }
            });

        }
        else {
            $("#RuralResultDiv").show();
            $("#UrbanResultDiv").hide();
            var Districtid = $("#districtDropdownDC").val(); 
            var Talukaid = $("#talukaDropdownDC").val();

           

            var $radio_rate_type = $('input[name=AgricultureRateType]:checked');
            var id_rate = $radio_rate_type.attr('id');
        

            if (id_rate == 'Unsurvey') {
                if (isDCValueNotFirst) {
                    challan.rate_type_agriculture = 'Unsurvey'; 
                }
                var Talukaid = $("#talukaDropdownDC").val();
                var DehPropertyId = $("#KarachiAgriculture").val();
                $("#modeofIrrigation").prop('required', false);
                
                var propertyAreaViewModel = {
                    Talukaid: Talukaid,
                    DehPropertyId: DehPropertyId,
                }

                $.ajax({
                    url: base_url_service_layer + '/api/Proxy/Locations/PropertyAreaRateByUnserveyed',
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(
                        propertyAreaViewModel
                    ),

                    success: function (proeprtyAreaViewModel) {
                            
                        $("#ProduceIndexUnitDiv").hide();
                        $("#ProduceIndexRateDiv").hide();
                        $("#UnserveryedDiv").show();
                        $("#MuncipalLandDiv").hide();
                            rate = proeprtyAreaViewModel.DCRateString;
                            structureRate = 0;
                            if (isDCValueNotFirst) {
                                challan.propertyInfo.RATE = rate;
                                challan.propertyInfo.RATE_UNIT = "Index Unit";
                               // alert('Unserveyed' + challan.propertyInfo.RATE); 
                            }
                          
                            document.getElementById("UnserveyedValue").innerHTML = returnCommas(rate);
                            document.getElementById("UnserveyedLandUnit").innerHTML = "&nbsp;Per " + proeprtyAreaViewModel.DCRateUnit;
                          
                            findCabnitRateUnservyed(rate);


                       
                    },
                    error: function (data) {
                        var response = data.responseText.replace(/"/g, '');
                        //   alert(response);

                    }
                });



            }
            else if (id_rate == 'MuncipalLimits') {
                var Talukaid = $("#talukaDropdownDC").val();
                var DehPropertyId = $("#KarachiAgriculture").val();
                if (isDCValueNotFirst) {
                    challan.rate_type_agriculture = 'MuncipalLimits';
                }
                $("#modeofIrrigation").prop('required', false);
                var propertyAreaViewModel = {
                    Talukaid: Talukaid,
                    DehPropertyId: DehPropertyId,
                }

                $.ajax({
                    url: base_url_service_layer + '/api/Proxy/Locations/PropertyAreaRateByMuncipalLand',
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(
                        propertyAreaViewModel
                    ),

                    success: function (proeprtyAreaViewModel) {

                        $("#ProduceIndexUnitDiv").hide();
                        $("#ProduceIndexRateDiv").hide();
                        $("#UnserveryedDiv").hide();
                        $("#MuncipalLandDiv").show(); 
                        rate = proeprtyAreaViewModel.DCRateString;
                        structureRate = 0;
                        if (isDCValueNotFirst) {
                            challan.propertyInfo.RATE = rate;
                            challan.propertyInfo.RATE_UNIT = "Index Unit";

                           // alert('MuncipalLimits' + challan.propertyInfo.RATE);
                        }

                        document.getElementById("MuncipalLandRateValue").innerHTML = returnCommas(rate);
                        document.getElementById("MuncipalLandRateUnit").innerHTML = "&nbsp;Per " + proeprtyAreaViewModel.DCRateUnit;

                        findCabnitRateUnservyed(rate);



                    },
                    error: function (data) {
                        var response = data.responseText.replace(/"/g, '');
                        //   alert(response);

                    }
                });



            }

            else {
                // Other than Karachi
                $("#ProduceIndexUnitDiv").show();
                $("#ProduceIndexRateDiv").show();
                $("#UnserveryedDiv").hide();
                $("#MuncipalLandDiv").hide();
                if (isDCValueNotFirst) {
                    challan.rate_type_agriculture = 'Survey';
                }
                $("#modeofIrrigation").prop('required', true);
                if (Districtid != 1 && Districtid != 2 && Districtid != 18 && Districtid != 24 && Districtid != 21 && Districtid != 16 && Districtid != 23 && Districtid != 11 && Districtid != 13 && Districtid != 22 && Districtid != 12 && Districtid != 26 && Districtid != 7 && Districtid != 25 && Districtid != 5 && Districtid != 15 && Districtid != 3 && Districtid != 14 && Districtid != 10) {
                    var IrrigationModeID = $("#modeofIrrigation").val();
                    var TalukaLandTypeID = $("#TalukaLandType").val();
                    var AreaName = $('#PropertyArea').data("kendoDropDownList").text();
                    var propertyAreaViewModel = {
                        Talukaid: Talukaid,
                        IrrigationModeID: IrrigationModeID,
                        TalukaLandTypeID: TalukaLandTypeID
                    }

                    $.ajax({
                        url: base_url_service_layer + '/api/Proxy/Locations/PropertyAreaRateByModeofIrragtion',
                        type: 'POST',
                        dataType: 'json',
                        contentType: "application/json;charset=utf-8",
                        data: JSON.stringify(
                            propertyAreaViewModel
                        ),

                        success: function (proeprtyAreaViewModel) {

                            rate = proeprtyAreaViewModel.DCRateString;
                            structureRate = proeprtyAreaViewModel.SqFtRateString;
                            if (isDCValueNotFirst) {
                                challan.propertyInfo.RATE = structureRate;
                                challan.propertyInfo.RATE_UNIT = "Index Unit";
                            }
                            document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; " + proeprtyAreaViewModel.DCRateUnit;
                            document.getElementById("ProduceIndexValue").innerHTML = returnCommas(rate);
                            document.getElementById("ProduceIndex").innerHTML = "&nbsp;Per " + proeprtyAreaViewModel.DCRateUnit;
                            //  document.getElementById("LandUnitOfArea").innerHTML = proeprtyAreaViewModel.DCRateUnit;
                            //  document.getElementById("DCRateSqFt").innerHTML = "Rs.&nbsp;" + returnCommas(proeprtyAreaViewModel.SqFtRateString) + "&nbsp;Per sq. feet";
                            if (proeprtyAreaViewModel != null && (proeprtyAreaViewModel.SqFtRateString != "" && proeprtyAreaViewModel.SqFtRateString != null)) {
                                document.getElementById("produceIndexUnitAmount").innerHTML = "Rs.&nbsp;" + returnCommas(proeprtyAreaViewModel.SqFtRateString) + "&nbsp; Per Index Unit";
                            }
                            else {
                                $('#produceIndexUnitAmount').html('<h4><span>Not Found&nbsp;</span></h4>');
                                //document.getElementById("DCRateSqFt").innerHTML = "Rs.&nbsp;0&nbsp;Per sq. feet";
                            }
                            findCabnitRate(rate, structureRate);
                        },
                        error: function (data) {
                            var response = data.responseText.replace(/"/g, '');
                            //   alert(response);

                        }
                    });

                } else {
                    // for Karachi Only 

                    var DehPropertyId = $("#KarachiAgriculture").val();
                    var AreaName = $('#PropertyArea').data("kendoDropDownList").text();
                    var IrrigationModeID = 0;
                    if (Districtid != 1) {
                        var IrrigationModeID = $("#modeofIrrigation").val();
                    }
                    var TalukaLandTypeID = $("#TalukaLandType").val();
                    var propertyAreaViewModel = {
                        Talukaid: Talukaid,
                        DehPropertyId: DehPropertyId,
                        IrrigationModeID: IrrigationModeID,
                        TalukaLandTypeID: TalukaLandTypeID

                    }

                    $.ajax({
                        url: base_url_service_layer + '/api/Proxy/Locations/PropertyAreaRateByKarachiAgriculture',
                        type: 'POST',
                        dataType: 'json',
                        contentType: "application/json;charset=utf-8",
                        data: JSON.stringify(
                            propertyAreaViewModel
                        ),

                        success: function (proeprtyAreaViewModel) {
                            if (Districtid == 1) {
                                rate = proeprtyAreaViewModel.DCRateString;
                                structureRate = 0;


                                document.getElementById("KarachiAgricultureAMountValue").innerHTML = returnCommas(rate);
                                document.getElementById("KarachiAgricultureUnit").innerHTML = "&nbsp;Per " + proeprtyAreaViewModel.DCRateUnit;
                                //  document.getElementById("LandUnitOfArea").innerHTML = proeprtyAreaViewModel.DCRateUnit;
                                //  document.getElementById("DCRateSqFt").innerHTML = "Rs.&nbsp;" + returnCommas(proeprtyAreaViewModel.SqFtRateString) + "&nbsp;Per sq. feet";
                                if (proeprtyAreaViewModel != null && (proeprtyAreaViewModel.SqFtRateString != "" && proeprtyAreaViewModel.SqFtRateString != null)) {
                                    document.getElementById("produceIndexUnitAmount").innerHTML = "Rs.&nbsp;" + returnCommas(proeprtyAreaViewModel.SqFtRateString) + "&nbsp; Per Acre";
                                }
                                else {
                                    $('#produceIndexUnitAmount').html('<h4><span>Not Found&nbsp;</span></h4>');
                                    //document.getElementById("DCRateSqFt").innerHTML = "Rs.&nbsp;0&nbsp;Per sq. feet";
                                }
                                findCabnitRate(rate, structureRate);
                            }
                            else {

                                rate = proeprtyAreaViewModel.DCRateString;
                                structureRate = proeprtyAreaViewModel.SqFtRateString;
                                if (isDCValueNotFirst) {
                                    challan.propertyInfo.RATE = structureRate;
                                    challan.propertyInfo.RATE_UNIT = "Index Unit";
                                }
                                document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; " + proeprtyAreaViewModel.DCRateUnit;
                                document.getElementById("ProduceIndexValue").innerHTML = returnCommas(rate);
                                document.getElementById("ProduceIndex").innerHTML = "&nbsp;Per " + proeprtyAreaViewModel.DCRateUnit;
                                //  document.getElementById("LandUnitOfArea").innerHTML = proeprtyAreaViewModel.DCRateUnit;
                                //  document.getElementById("DCRateSqFt").innerHTML = "Rs.&nbsp;" + returnCommas(proeprtyAreaViewModel.SqFtRateString) + "&nbsp;Per sq. feet";
                                if (proeprtyAreaViewModel != null && (proeprtyAreaViewModel.SqFtRateString != "" && proeprtyAreaViewModel.SqFtRateString != null)) {
                                    document.getElementById("produceIndexUnitAmount").innerHTML = "Rs.&nbsp;" + returnCommas(proeprtyAreaViewModel.SqFtRateString) + "&nbsp; Per Index Unit";
                                }
                                else {
                                    $('#produceIndexUnitAmount').html('<h4><span>Not Found&nbsp;</span></h4>');
                                    //document.getElementById("DCRateSqFt").innerHTML = "Rs.&nbsp;0&nbsp;Per sq. feet";
                                }
                                findCabnitRate(rate, structureRate);


                            }
                        },
                        error: function (data) {
                            var response = data.responseText.replace(/"/g, '');
                            //   alert(response);

                        }
                    });





                }
            }

        }

        }

      
        function getRateOfPropertyArea() {

            propertyAreaRate();
         
        }


        function disableFindRateButton()
        {

            $("#DcValuationRateNextButton").attr("disabled", true);
            $("#findRateButton").attr("disabled", true);
            AllowFindRate(); 
        }
       
        function disableFindRateButtonMultiproperty() {

            $("#DcValuationRateNextButton").attr("disabled", true);
            $("#findRateButton").attr("disabled", true);
            AllowFindRate();
        }


        function setLandUnit() {
            disableFindRateButton();


            var $radio = $('input[name=LandType]:checked');

            var rid = $radio.attr('id');


            if (rid == "Urban") {


                var id2 = $("#LandClassificationUrban").val();

                if (id2 == 0) {
                    document.getElementById("LandUnit").innerHTML = "&nbsp;";
                    //document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
                }
                else if (id2 == 1) {
                    document.getElementById("LandUnit").innerHTML = spacePerAcre;
                  //  document.getElementById("LandUnitOfArea").innerHTML = spacespaceAcre;
                }
                else if (id2 == 2) {
                    document.getElementById("LandUnit").innerHTML = spacePerMarla;
                   // document.getElementById("LandUnitOfArea").innerHTML = spacespaceMarla;
                }
                else if (id2 == 3) {
                    document.getElementById("LandUnit").innerHTML = spacePerKanal;
                    //document.getElementById("LandUnitOfArea").innerHTML = spacespaceKanal;
                }
                else if (id2 == 4) {
                    document.getElementById("LandUnit").innerHTML = spacePerMarla;
                    //document.getElementById("LandUnitOfArea").innerHTML = spacespaceMarla;
                }
                else {
                    document.getElementById("LandUnit").innerHTML = "&nbsp;";
                   // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
                }
            }

            else {

                var id = $("#LandClassification").val();

                if (id == 0) {
                    document.getElementById("LandUnit").innerHTML = "&nbsp;";
                   // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
                }
                else if (id == 1) {
                    document.getElementById("LandUnit").innerHTML = spacePerAcre;
                  //  document.getElementById("LandUnitOfArea").innerHTML = spacespaceAcre;
                }
                else if (id == 2) {
                    document.getElementById("LandUnit").innerHTML = spacePerMarla;
                  //  document.getElementById("LandUnitOfArea").innerHTML = spacespaceMarla;
                }
                else if (id == 3) {
                    document.getElementById("LandUnit").innerHTML = spacePerKanal;
                  //  document.getElementById("LandUnitOfArea").innerHTML = spacespaceKanal;
                }
                else if (id == 4) {
                    document.getElementById("LandUnit").innerHTML = spacePerMarla;
                  //  document.getElementById("LandUnitOfArea").innerHTML = spacespaceMarla;
                }
                else {
                    document.getElementById("LandUnit").innerHTML = "&nbsp;";
                  //  document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
                }
            }
        }




        function NextConfirmationAfterRate()
        {
            if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                $("#leasePeriodWarningCVT").hide();
                document.getElementById("DCHeading").innerHTML = DCValuationforSecondProperty;
                $("#step2pending").attr("src", "../Images/steps-completed.png");
                $("#waitModalForSave").modal('hide');
                resetAll();
                isDCNextFirstScreen = false;
                if (queryStringName == "PayCVTandReg") {
                   // populateFirstScreenWhenComingBackFromSecondScreenDC2();
                }
                payCVTRegDC2FirstTime = false;
                if (queryStringName != "PayCVTandReg") {
                    document.getElementById("PropertyValuationId").innerHTML = $("#landProperty2").val();
                 //   populateFirstScreenWhenComingBackFromSecondScreenDC2();
                }
                else {
                    document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.propertyInfo2.LandPropertyValue);
                }
                if (challan.propertyInfo2 == null || challan.propertyInfo2.DistrictId == null || challan.propertyInfo2.DistrictId == "") {
                        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC", challan.DistrictId);
                      initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.DistrictId, selectTehsilText, "talukaDropdownDC", challan.TehsilId);
                      //  initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?id=' + challan.TehsilId, selectTownText, "townDropdownDC");
                      // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=' + challan.TehsilId, selectRevenueCircleText, "RevenueCircle");
                }
            }
            else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                $("#leasePeriodWarningCVT").hide();
                $("#RateOfChallan").hide();
                var isCVTCheckBox = $('#CVTTax').is(":checked");
                $("#step3pending").attr("src", "../Images/steps-completed.png");
                if ((isCVTApplicable == true && isCVTCheckBox == true) || cvtCheck == true) {

                    $("#step3pending").attr("src", "../Images/steps-completed.png");

                    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassifications', selectLocationText, "LandClassificationCVT");
                    $("#CVTView").show();

                    document.getElementById("cvtHeading").innerHTML = ValueOfStructureFirstParty;//CVTforFirstProperty;


                    $("#waitModalForSave").modal('hide');
                   // resetAll();
                    calculateCVTTaxAmount();
                    populateCVTFields();
                    


                }
                else {
                    rendenChallan();
                    $("#confirmfrom").show();
                    setTimeout(function () {
                        $("#waitModalForSave").modal('hide');
                    }, 1000);

                }
            }
            else {

                $("#RateOfChallan").hide();
                var isCVTCheckBox = $('#CVTTax').is(":checked");

                $("#step2pending").attr("src", "../Images/steps-completed.png");

                if (isCVTApplicable == true && isCVTCheckBox == true) {

                    $("#step2pending").attr("src", "../Images/steps-completed.png");

                 //   initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassifications', "Select Location", "LandClassificationCVT");
                    $("#CVTView").show();

                    document.getElementById("cvtHeading").innerHTML = ValueOfStructure;//"Value of Structure Calculation";

                   
                    //create function to compare PV and system calculated DC, called on condition
                    $("#waitModalForSave").modal('hide');
                    
                    calculateCVTTaxAmount();
                    populateCVTFields();
                   


                }
                else if (exemptCVTforGiftDeed) // for Constructed Structure Rate only even If CVT is not applicable, like Gift Deed, exempt stamp Duty checked
                {
                    $("#step2pending").attr("src", "../Images/steps-completed.png");
                    $("#CVTView").show();
                    isCVTApplicable = true; // To Refresh it to true. Todo, check why it sets false.
                    challan.applyCVT = false; // Todo, check why it sets true.
                    document.getElementById("cvtHeading").innerHTML = ValueOfStructure;//"Value of Structure Calculation";
                    $("#waitModalForSave").modal('hide');
                    calculateCVTTaxAmount();
                    populateCVTFields();
                }
                else {
                    rendenChallan();
                    $("#confirmfrom").show();
                    setTimeout(function () {
                        $("#waitModalForSave").modal('hide');
                    }, 1000);

                   

                    
                }
            }
        }

        var ruralCheck = false;

        //function checkIfKhasraIsTreatedAsUrban(propertyInfo)
        //{
        //    var khasraTreatAsUrban = false;
        //    if (propertyInfo.MultipleKhasras == null) {
        //        //  for Single Khasras
        //        if (propertyInfo.treatAsUrban) {
        //            khasraTreatAsUrban = true;
        //        }
        //    }
        //    else
        //    {

        //    }

        //    return khasraTreatAsUrban;
            
        //}

        function populateCVTFields()
        {

            if (isExchangeOfProperty == true && isCVTNextFirstScreen == true) {
                if (challan.isMultiplePropertiesExchageOfProperty) {
                    $("#LandClassificationCVTDiv").show();
                    $("#LandTypeCVTReadOnlyDiv").hide();
                    $("#LandTypeCVTdiv").show();
                    var landClassificationId;
                    var $radio = $('input[name=LandType]:checked');

                    var id = challan.propertyInfo.isUrban;

                    var checkForTreatAsUrban = false;

                    if (!id) {
                        if (challan.propertyInfo.treatAsUrban) {
                            checkForTreatAsUrban = true;
                        }
                        $('#RuralCVT').prop('checked', true);
                        $('#UrbanCVT').attr('checked', false);
                    }
                    else {
                        $('#RuralCVT').attr('checked', false);
                        $('#UrbanCVT').prop('checked', true);
                    }

                    if (id || checkForTreatAsUrban) {
                        ruralCheck = false;
                        challan.applyCVT = true;
                        $('#ruralAreaWarning').hide();
                    }
                    else {                       
                        ruralCheck = true;
                    }
                }
                else {
                    $("#LandClassificationCVTDiv").hide();
                    $("#LandTypeCVTdiv").hide();
                    $("#LandTypeCVTReadOnlyDiv").show();

                    var landClassificationId;
                    var $radio = $('input[name=LandType]:checked');

                    var id = challan.propertyInfo.isUrban;
                    var checkForTreatAsUrban = false;

                    if (!id) {
                        if (challan.propertyInfo.treatAsUrban) {
                            checkForTreatAsUrban = true;
                        }
                    }

                    if (id || checkForTreatAsUrban) {
                        ruralCheck = false;
                        challan.applyCVT = true;
                        $('#ruralAreaWarning').hide();

                        if (id) {
                            document.getElementById("LandTypeCVTReadOnly").innerHTML = Urban;
                        }
                        else {
                            document.getElementById("LandTypeCVTReadOnly").innerHTML = Rural;
                        }
                    }
                    else {
                        document.getElementById("LandTypeCVTReadOnly").innerHTML = "Rural";
                        ruralCheck = true;
                    }


                    document.getElementById("LandClassificationCVTReadOnly").innerHTML = challan.propertyInfo.LandClassificationString;  //$('#LandClassificationUrban').data("kendoDropDownList").text();

                    $('#checkBoxesCVT').show();
                    $('#PayableCVTCVTDiv').show();
                    if (challan.propertyInfo.IsConstructed == true || $('#constructedStructureValueGenerateChallan').val() != "0") {


                        $('#constructedAreaCVTDiv').show();
                        $('#propertyConstructed').attr('checked', true);
                        $('#propertyConstructed').prop('checked', true);
                        $('#constructedAreaCVT').attr("required", "required");
                      //  $('#constructedAreaCVT').val(challan.propertyInfo.ConstructedAreaInSqFeet);
                        $("#SqFtDiv").show();
                        $("#constructedAreaCVTDiv").show();
                    }
                    else {
                        $('#propertyConstructed').prop('checked', false);
                        $('#constructedAreaCVT').removeAttr("required");
                        $("#SqFtDiv").hide();
                        $("#constructedAreaCVTDiv").hide();
                        $('#constructedAreaCVT').val('');
                        document.getElementById("CSValueDCCalculated").innerHTML = "";
                    }
                    if(challan.propertyInfo.IsGovProperty == true )
                    {
                        $('#govPropertyExchangeOfPropertyCheckbox').attr('checked', true);
                        $('#govPropertyExchangeOfPropertyCheckbox').prop('checked', true);
                    }
                    else
                    {
                        $('#govPropertyExchangeOfPropertyCheckbox').prop('checked', false);
                    }

                }                        
                          
            }
            else if (isExchangeOfProperty == true && isCVTNextFirstScreen == false) {

                $("#LandClassificationCVTDiv").hide();
              //  $("#LandTypeCVTdiv").show();

                var landClassificationId;
                var $radio = $('input[name=LandType]:checked');

                var id = challan.propertyInfo2.isUrban;

                if (id) {
                    $('#RuralCVT').attr('checked', false);
                    $('#UrbanCVT').prop('checked', true);
                }
                else {
                    $('#RuralCVT').prop('checked', true);
                    $('#UrbanCVT').attr('checked', false);
                }

                var checkForTreatAsUrban = false;
                checkForTreatAsUrban = challan.propertyInfo2.treatAsUrban;

                if (challan.propertyInfo2.IsMultiStory) {
                    $('#multiStoryBuilding').prop('checked', true);
                }
                else {
                    $('#multiStoryBuilding').prop('checked', false);
                }

                if (challan.isMultiplePropertiesExchageOfProperty) {
                    $("#LandClassificationCVTDiv").show();
                    $('#PayableCVTCVTDiv').hide();
                    $("#LandTypeCVTdiv").show();
                    $("#LandTypeCVTReadOnlyDiv").hide();
                    $("#LandClassificationCVTReadOnly").hide();

                    if (id == true || checkForTreatAsUrban) {
                        challan.applyCVT = true;
                        $('#ruralAreaWarning').hide();
                        $('#payableCVTExchagneOfPropertyDiv').show();


                    }
                    else {

                        var ruralCheckSecondProperty = true;

                        $("#LandClassificationCVTDiv").hide();
                      //  $("#LandTypeCVTdiv").show();
                        if (ruralCheck && ruralCheckSecondProperty) {
                            challan.applyCVT = false;
                            challan.PayableCvtString = null;
                        }
                        else {
                            challan.applyCVT = true;
                        }                      
                    }
                }
                else {
                    //$("#LandClassificationCVTDiv").hide();
                    //$('#PayableCVTCVTDiv').show();
                    //$("#LandTypeCVTdiv").hide();
                    //$("#LandTypeCVTReadOnlyDiv").show();
                    //$("#LandClassificationCVTReadOnly").show();
                    //$('#LandClassificationCVTExchangeOfPropertyDiv').hide();
                    //$('#LandAreaCVTExchangeOfPropertyDiv').hide();

                    var checkForTreatAsUrban = challan.propertyInfo2.treatAsUrban;

                    if (id || checkForTreatAsUrban) {
                        challan.applyCVT = true;
                        $('#ruralAreaWarning').hide();

                        $('#checkBoxesCVT').show();

                        if (id) {
                            document.getElementById("LandTypeCVTReadOnly").innerHTML = Urban;
                        }
                        else {
                            document.getElementById("LandTypeCVTReadOnly").innerHTML = Rural;
                        }
                        
                        document.getElementById("LandClassificationCVTReadOnly").innerHTML = challan.propertyInfo2.LandClassificationString;  //$('#LandClassificationUrban').data("kendoDropDownList").text();
                    }
                    else {
                        document.getElementById("LandTypeCVTReadOnly").innerHTML = Rural;
                        document.getElementById("LandClassificationCVTReadOnly").innerHTML = challan.propertyInfo2.LandClassificationString; //$('#LandClassification').data("kendoDropDownList").text();
                        var ruralCheckSecondProperty = true;
                        $('#multiStoryBuilding').prop('checked', false);

                        $('#PayableCVTValue').val("");

                        if (ruralCheck && ruralCheckSecondProperty) {
                            challan.applyCVT = false;
                            challan.PayableCvtString = null;
                        }
                        else {
                            challan.applyCVT = true;
                        }
                    }
                }

                if (challan.propertyInfo2.IsConstructed == true || $('#constructedStructureValueSecond').val() != "0") {


                    $('#constructedAreaCVTDiv').show();
                    $('#propertyConstructed').attr('checked', true);
                    $('#propertyConstructed').prop('checked', true);
                    $('#constructedAreaCVT').attr("required", "required");
                  //  $('#constructedAreaCVT').val(challan.propertyInfo.ConstructedAreaInSqFeet);
                    $("#SqFtDiv").show();
                    $("#constructedAreaCVTDiv").show();
                }
                else {
                    $('#propertyConstructed').prop('checked', false);
                    $('#constructedAreaCVT').removeAttr("required");
                    $("#SqFtDiv").hide();
                    $("#constructedAreaCVTDiv").hide();
                    $('#constructedAreaCVT').val('');
                    document.getElementById("CSValueDCCalculated").innerHTML = "";
                }
                if (challan.propertyInfo2.IsGovProperty == true) {
                    $('#govPropertyExchangeOfPropertyCheckbox').attr('checked', true);
                    $('#govPropertyExchangeOfPropertyCheckbox').prop('checked', true);
                }
                else {
                    $('#govPropertyExchangeOfPropertyCheckbox').prop('checked', false);
                }

            }
            else {

                $("#LandClassificationCVTDiv").hide();
                $("#LandTypeCVTdiv").hide();
                $("#LandTypeCVTReadOnlyDiv").show();

                var landClassificationId;
                var $radio = $('input[name=LandType]:checked');
                var id = challan.propertyInfo.isUrban;
                var checkForTreatAsUrban = false;

                if (!id) {
                    if (challan.propertyInfo.treatAsUrban) {
                        checkForTreatAsUrban = true;
                    }
                }

                if ((id || checkForTreatAsUrban) && !isLeaseDeed && challan.DeedNameId != releaseDeedId) {
                    $("#LandAreaCVTDiv").hide();
                    challan.applyCVT = true;
                    $('#ruralAreaWarning').hide();

                    if (id)
                        document.getElementById("LandTypeCVTReadOnly").innerHTML = Urban;
                    else
                        document.getElementById("LandTypeCVTReadOnly").innerHTML = Rural;

                    document.getElementById("LandClassificationCVTReadOnly").innerHTML = challan.propertyInfo.LandClassificationString;  //$('#LandClassificationUrban').data("kendoDropDownList").text();

                    $('#checkBoxesCVT').show();
                    $('#PayableCVTCVTDiv').show();
                    if (challan.propertyInfo.IsConstructed == true || $('#constructedStructureValueGenerateChallan').val() != "0") {

                        $('#constructedAreaCVTDiv').show();
                        $('#propertyConstructed').attr('checked', true);
                        $('#propertyConstructed').prop('checked', true);
                        $('#constructedAreaCVT').attr("required", "required");
                      //  $('#constructedAreaCVT').val(challan.propertyInfo.ConstructedAreaInSqFeet);
                        $("#SqFtDiv").show();
                        $("#constructedAreaCVTDiv").show();
                    }
                    else {
                        $('#propertyConstructed').prop('checked', false);
                        $('#constructedAreaCVT').removeAttr("required");
                        $("#SqFtDiv").hide();
                        $("#constructedAreaCVTDiv").hide();
                        $('#constructedAreaCVT').val('');
                        document.getElementById("CSValueDCCalculated").innerHTML = "";
                    }                   

                }
                else if (isLeaseDeed || challan.DeedNameId == releaseDeedId) {

                    if (id)
                        document.getElementById("LandTypeCVTReadOnly").innerHTML = "Urban";
                    else
                        document.getElementById("LandTypeCVTReadOnly").innerHTML = "Rural";

                    document.getElementById("LandClassificationCVTReadOnly").innerHTML = challan.propertyInfo.LandClassificationString;

                    $('#checkBoxesCVT').hide();
                    $('#PayableCVTCVTDiv').hide();
                    $('#constructedAreaCVTDiv').hide();
                    $('#propertyConstructed').prop('checked', false);
                    $('#constructedAreaCVT').removeAttr("required");
                    $('#multiStoryBuilding').prop('checked', false);

                    $('#PayableCVTValue').val("");
                    challan.PayableCvtString = null;
                }
                else {
                    document.getElementById("LandTypeCVTReadOnly").innerHTML = "Rural";
                    document.getElementById("LandClassificationCVTReadOnly").innerHTML = challan.propertyInfo.LandClassificationString; //$('#LandClassification').data("kendoDropDownList").text();
                    challan.applyCVT = false;

                    //  $('#checkBoxesCVT').hide();
                    $('#PayableCVTCVTDiv').hide();
                    //  $('#constructedAreaCVTDiv').hide();
                    $('#propertyConstructed').prop('checked', false);
                    $('#constructedAreaCVT').removeAttr("required");
                    $('#multiStoryBuilding').prop('checked', false);

                    $('#PayableCVTValue').val("");
                    challan.PayableCvtString = null;

                    // $('#ruralAreaWarning').show();
                }


                if (exemptCVTforGiftDeed)
                {
                 //   document.getElementById("LandTypeCVTReadOnly").innerHTML = "Rural";
                    document.getElementById("LandClassificationCVTReadOnly").innerHTML = challan.propertyInfo.LandClassificationString; //
                    challan.applyCVT = false;

                    $('#checkBoxesCVT').show();
                    $('#PayableCVTCVTDiv').show();

                    if (challan.propertyInfo.IsConstructed == true || $('#constructedStructureValueGenerateChallan').val() != "0") {

                        $('#constructedAreaCVTDiv').show();
                        $('#propertyConstructed').attr('checked', true);
                        $('#propertyConstructed').prop('checked', true);
                        $('#constructedAreaCVT').attr("required", "required");
                       // $('#constructedAreaCVT').val(challan.propertyInfo.ConstructedAreaInSqFeet);
                        $("#SqFtDiv").show();
                        $("#constructedAreaCVTDiv").show();
                    }
                    else {
                        $('#propertyConstructed').prop('checked', false);
                        $('#constructedAreaCVT').removeAttr("required");
                        $("#SqFtDiv").hide();
                        $("#constructedAreaCVTDiv").hide();
                        $('#constructedAreaCVT').val('');
                        document.getElementById("CSValueDCCalculated").innerHTML = "";
                    }
                }
                if(challan.DeedNameId == certificateOfSaleDeedId)
                {
                    $('#checkBoxesCVT').hide();                    
                    $('#propertyConstructed').prop('checked', false);
                    $('#propertyConstructed').removeAttr("required");
                }
                $('#govPropertyExchangeOfPropertyCheckboxDiv').hide();
                $('#govPropertyExchangeOfPropertyCheckbox').prop('checked', false);
            }
        }




        function loadEmbedMap(mapstring)
        {

            if (mapstring != null && mapstring != "") {
                var $iframe = $('#embeddedMapiframe');
                $iframe.attr('src', "https://www.google.com/maps/embed/v1/place?q=" + mapstring + "&key=AIzaSyBO-pBF5k74nHsaZJfXamcgWKQ7Gze_1PE");
            }

          //  document.getElementById("mapembed").innerHTML = "<iframe id='embeddedMapiframe' width='660' height='580' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/place?q=" + mapstring + "&key=AIzaSyBO-pBF5k74nHsaZJfXamcgWKQ7Gze_1PE' allowfullscreen></iframe>"

        }


        function openDCValueConfirmationWindow()
        {

            $("#DCconfirmationwindow").data("kendoWindow").title(DCValuationconfirmation).center().open();

        }


        function NextAfterDcValueConfirmation()
        {
            $("#waitModalForSave").modal();
            challan.isDCNextFirstScreen = true; 
            var challanModeltoSend = jQuery.extend(true, {}, challan)
           // populateChallanPropertyInfo();
            

            if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {

                populateChallanPropertyInfo();
                challanModeltoSend.TotalAmount = challan.propertyInfo.DeclaredAmount;
                //challan.propertyInfo.ValuationAmount = challan.propertyInfo.FinalRate;
                challanModeltoSend.propertyInfo.ValuationAmount = challan.propertyInfo.DeclaredAmount;
                challanModeltoSend.propertyInfo = challan.propertyInfo;
                isDCGreater = false;
            }
            else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                populateChallanPropertyInfo2();
                challanModeltoSend.TotalAmount = challan.propertyInfo2.DeclaredAmount;
                //ChallanModeltoSend.isDCNextFirstScreen = false; 
                isDCGreater2 = false;
                //challan.propertyInfo2.ValuationAmount = challan.propertyInfo2.FinalRate;
                challanModeltoSend.propertyInfo2.ValuationAmount = challan.propertyInfo2.DeclaredAmount;
                challanModeltoSend.propertyInfo2 = challan.propertyInfo2;
                challanModeltoSend.propertyInfo = challan.propertyInfo;

            }
            else {
                populateChallanPropertyInfo();
                debugger; 
                // challanModeltoSend.TotalAmount = challan.propertyInfo.FinalRate;
                challanModeltoSend.TotalAmount = challan.TotalAmount; 
                if (challan.propertyInfo.DeclaredAmount > challan.propertyInfo.FinalRate) {
                    challanModeltoSend.propertyInfo.ValuationAmount = challan.propertyInfo.DeclaredAmount;
                    isDCGreater = true;
                } else {
                    isDCGreater = false;
                    challanModeltoSend.TotalAmount = challan.propertyInfo.FinalRate;
                    challanModeltoSend.propertyInfo.ValuationAmount = challan.propertyInfo.FinalRate;
                }
                //challan.propertyInfo.ValuationAmount = challan.propertyInfo.FinalRate;
               
                challanModeltoSend.propertyInfo = challan.propertyInfo;
            }

            if (isLeaseDeed == true) {
                var deedid = $("#TransactionName").val();
                var totalAmount = challan.propertyInfo.FinalRate;
                var id = "";
                if (isDCValuationFlag == true) {
                    id = challan.propertyInfo.LandClassificationId;
                }
                //} else {
                //    id = $("#LandClassificationCVT").val();
                //}
                var leasePeriod = challan.leasePeriod;
                var TotalLeaseMoney = challan.TotalLeaseMoney;
                var constructedArea = $("#constructedAreaCVT").val();
                var ispropertyConstructedBox = $('#propertyConstructed').is(":checked");
                var ismultiStoryBuildingBox = $('#multiStoryBuilding').is(":checked");
                if (challan.propertyInfo.IsConstructed == true || $('#constructedStructureValueGenerateChallan').val() != "0") {

                    $('#constructedAreaCVTDiv').show();
                    $('#propertyConstructed').attr('checked', true);
                    $('#propertyConstructed').prop('checked', true);
                    $('#constructedAreaCVT').attr("required", "required");
                   // $('#constructedAreaCVT').val(challan.propertyInfo.ConstructedAreaInSqFeet);
                }
                else {
                    $('#propertyConstructed').prop('checked', false);
                    $('#constructedAreaCVT').removeAttr("required");
                }
                var islegalHeirsBox = $('#legalHeirs').is(":checked");
                islegalHeirsBox = false;
                var DCVal = 0;
                var cvtModel =
                    {
                        TransactionId: deedid,

                        Amount: totalAmount,

                        isConstructed: ispropertyConstructedBox,

                        isMultiStory: false,
                        isLegalHeir: islegalHeirsBox,

                        ConstructedArea: constructedArea,
                        LeasePeriod: leasePeriod,

                        LandClassification: id,

                        DCFinalRate: DCVal,

                        TotalLeaseMoney: TotalLeaseMoney,

                        LandArea: challan.propertyInfo.Area,

                        isDCValuation: isDCValuationFlag
                    }

                $.ajax({
                    url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateCVTTaxAmount',
                    type: 'POST',
                    data: JSON.stringify(cvtModel),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {

                        proceedToConfirmFromDCValuation();
                        rendenChallan();
                        

                    },
                    error: function (data) {
                        var response = data.responseText.replace(/"/g, '');
                        //  alert(response);

                    }
                });
            }
            else {
                if (challan.TransactionName == "40" && challan.propertyInfo.StampDutyTypeString == "Normal") {
                    challan.propertyInfo.StampDutyType = 0.2;
                }
               // alert("FirstTIme");
                $.ajax({
                    url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateDuties',
                    type: 'POST',
                    data: JSON.stringify(challanModeltoSend),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {


                        //challan.PayableCvtString = data.PayableCvtString;

                        if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {

                            challan.PayableStampDutyString = data.PayableStampDutyString;
                            challan.RegistrationFeeString = data.RegistrationFeeString;
                        }
                        else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                            debugger;
                            //alert("First Stamp Duty Calculated" + parseFloat(challan.PayableStampDutyString.replace(/,/g, "")));
                            //alert("Second Stamp Duty Calculated" + parseFloat(data.PayableStampDutyString.replace(/,/g, "")));
                            if (parseFloat(challan.PayableStampDutyString.replace(/,/g, "")) < parseFloat(data.PayableStampDutyString.replace(/,/g, ""))) {
                                challan.PayableStampDutyString = data.PayableStampDutyString;

                            }
                            if (data.RegistrationFeeString != null) {
                                if (parseFloat(challan.RegistrationFeeString.replace(/,/g, "")) < parseFloat(data.RegistrationFeeString.replace(/,/g, ""))) {
                                    challan.RegistrationFeeString = data.RegistrationFeeString;

                                }
                            }

                        }
                        else {
                            challan.PayableStampDutyString = data.PayableStampDutyString;
                            challan.RegistrationFeeString = data.RegistrationFeeString;
                            /*
                            //here 3
                            if (challan.TransactionName == "5" && (parseFloat(challan.propertyInfo.FinalRate.replace(/,/g, "")) > parseFloat(challan.TotalAmount.replace(/,/g, ""))))
                            {
                                var value = [];
                                value.push(parseFloat(challan.propertyInfo.FinalRate.replace(/,/g, "")));
                                var stampModel = {
                                    TransactionId: challan.TransactionName,
                                    Amount: value

                                }

                                $.ajax({
                                    url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateRegistrationFee',
                                    type: 'POST',
                                    async: false,
                                    data: JSON.stringify(stampModel),
                                    contentType: "application/json;charset=utf-8",
                                    success: function (data) {
                                       
                                        if (data >= 0) {
                                            challan.RegistrationFeeString = parseFloat(data);
                                            //$("#registrationFeeGenerateChallan").val(returnCommas(data));
                                        }
                                        else {
                                            //$("#registrationFeeGenerateChallan").val("");
                                        }
                                        //$("#registrationFeeGenerateChallan").removeClass("empty");

                                    },
                                    error: function (data) {
                                        //var response = data.responseText.replace(/"/g, '');
                                       // $("#registrationFeeGenerateChallan").val("");
                                        //$("#registrationFeeGenerateChallan").removeClass("empty");
                                        //$("#registrationFeeGenerateChallan").addClass("empty");
                                    }
                                });

                            }
                            */

                            
                            

                        }



                        proceedToConfirmFromDCValuation();




                        rendenChallan();
                        
                    },
                    error: function (data) {
                        var response = data.responseText.replace(/"/g, '');
                        //  alert(response);

                    }
                });
            }
            

           // proceedToConfirmFromDCValuation();

            $("#DCconfirmationwindow").data("kendoWindow").title(DCValuationconfirmation).close();
            

        }

        function CancelAfterDcValueConfirmation()
        {
            $("#DCconfirmationwindow").data("kendoWindow").title(DCValuationconfirmation).close();


        }

        function proceedToConfirmFromDCValuation() {
            debugger;
            //populateChallanPropertyInfo();
           // calculateUpdatedSD();
            if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                populateChallanPropertyInfo();
                if (queryStringName == "PayCVTandReg") {
                    document.getElementById("PropertyValuationId").innerHTML = returnCommas(challan.propertyInfo.LandPropertyValue);
                }
                else {
                    document.getElementById("PropertyValuationId").innerHTML = $("#landProperty2").val();
                    userProvidedConstructuedValue2 = returnCommas($('#constructedStructureValueSecond').val());
                    document.getElementById("CSValueUserProvidedRate").innerHTML = returnCommas(userProvidedConstructuedValue2);
                }
            }
            else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
               populateChallanPropertyInfo2();
            }
            else {
                populateChallanPropertyInfo();
                //console.log(challan);
            }
            // Calculate Challan Payable Duty
            challan.isDCFirstScreen = isDCNextFirstScreen;
            challan.DeedNameId = $("#TransactionName").val();
            $.ajax({
                url: base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartialRateOfChallan',
                type: 'POST',
                data: JSON.stringify(challan),
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    debugger;
                    // Recaluclate stamp and registration duties
                    if ($("#TransactionName").val() == 51) {
                        challan.propertyInfo.IsLandAndConstructed = true; 
                    }
                    if (challan.TransactionName == "40" && challan.propertyInfo.StampDutyTypeString == "Normal") {
                        challan.propertyInfo.StampDutyType = 0.2;
                    }
                    
                    if (challan.propertyInfo.IsLandAndConstructed && challan.ActualDCValue) {
                       
                        //alert("SecondTIme");
                        $.ajax({
                            
                            url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateDuties',
                            type: 'POST',
                            data: JSON.stringify(challan),
                            contentType: "application/json;charset=utf-8",
                            success: function (data) {
                                if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                                    challan.PayableStampDutyString = data.PayableStampDutyString;
                                    challan.RegistrationFeeString = data.RegistrationFeeString;
                                }
                                else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
                                    debugger;
                                   // alert("First Stamp Duty Calculated" + parseFloat(challan.PayableStampDutyString.replace(/,/g, "")));
                                   // alert("Second Stamp Duty Calculated" + parseFloat(data.PayableStampDutyString.replace(/,/g, "")));


                                    if (parseFloat(challan.PayableStampDutyString.replace(/,/g, "")) < parseFloat(data.PayableStampDutyString.replace(/,/g, ""))) {
                                        challan.PayableStampDutyString = data.PayableStampDutyString;
                                    }
                                    if (data.RegistrationFeeString != null) {
                                        if (parseFloat(challan.RegistrationFeeString.replace(/,/g, "")) < parseFloat(data.RegistrationFeeString.replace(/,/g, ""))) {
                                            challan.RegistrationFeeString = data.RegistrationFeeString;
                                        }
                                    }
                                }
                                else {
                                    challan.PayableStampDutyString = data.PayableStampDutyString;
                                    challan.RegistrationFeeString = data.RegistrationFeeString;
                                }
                                NextConfirmationAfterRate();

                            },
                            error: function (data) {
                                var response = data.responseText.replace(/"/g, '');
                                //alert(response);
                            }
                        });
                    }
                    else {
                        //calculateCVTTaxAmount();
                        NextConfirmationAfterRate();
                        //$.ajax({
                        //    url: base_url_service_layer + '/api/Proxy/ChallanForm/calculateCVTTaxAmount',
                        //    type: 'POST',
                        //    data: JSON.stringify(challan),
                        //    contentType: "application/json;charset=utf-8",
                        //    success: function (data) {

                        //        //if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {

                        //        //    challan.PayableStampDutyString = data.PayableStampDutyString;
                        //        //    challan.RegistrationFeeString = data.RegistrationFeeString;
                        //        //}
                        //        //else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {

                        //        //    if (parseFloat(challan.PayableStampDutyString.replace(/,/g, "")) < parseFloat(data.PayableStampDutyString.replace(/,/g, ""))) {
                        //        //        challan.PayableStampDutyString = data.PayableStampDutyString;

                        //        //    }
                        //        //    if (data.RegistrationFeeString != null) {
                        //        //        if (parseFloat(challan.RegistrationFeeString.replace(/,/g, "")) < parseFloat(data.RegistrationFeeString.replace(/,/g, ""))) {
                        //        //            challan.RegistrationFeeString = data.RegistrationFeeString;

                        //        //        }
                        //        //    }

                        //        //}
                        //        //else {
                        //        //    challan.PayableStampDutyString = data.PayableStampDutyString;
                        //        //    challan.RegistrationFeeString = data.RegistrationFeeString;
                        //        //}

                        //        NextConfirmationAfterRate();

                        //    },
                        //    error: function (data) {
                        //        var response = data.responseText.replace(/"/g, '');
                        //        //  alert(response);

                        //    }
                        //});
                    }
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    $("#purchaserSectionError").css("color", "red");
                }
            });
        }



        function ResetTextBox(id) {

            $("#" + id).val("");
            $("#" + id).removeClass("empty");
            $("#" + id).addClass("empty");
        }



////////////Gmap Api/////////////
        var map;
        var arry = [];
        var polygon;
        var arry2 = [];
        var isfirstmarker = false;
        var zoomLevel = 8;
        var gmaplat=32.1500;
        var gmaplong=74.1833;



        function removeMarkers()
        {
            var i = arry.length - 1
           
            map.removeMarkers();
            if (i >= 0)
            {
                map.addMarker({
                    lat: arry[0][0],
                    lng: arry[0][1],
                    icon: "/Content/googlemaps/StartMarker.png",
                    click: function (e) {
                       
                        arry.push([arry[0][0], arry[0][1]]);
                        arry2.push("1");
                        drawpolylines();
                       

                        map.removeMarkers();

                        map.addMarker({
                            lat: arry[0][0],
                            lng: arry[0][1],
                           
                        });



                    },

                });



            }



        }


//        function initializeGmaps() {
//            map = new GMaps({
//                div: '#map',
//                lat: gmaplat,
//                lng: gmaplong,
//                rightclick: function (e)
//                {
//                    var latitude = e.latLng.lat();
//                    var longitude = e.latLng.lng();
//                    loadGMapByString(latitude + "," + longitude);
//                },
//                click: function (e) {
//                    var latitude = e.latLng.lat();
//                    var longitude = e.latLng.lng();
//                    removeMarkers();
//                    if (!isfirstmarker) {
//                        map.addMarker({
//                            lat: latitude,
//                            lng: longitude,
//                            icon: "/Content/googlemaps/StartMarker.png",
//                            click: function (e) {
//                                arry.push([latitude, longitude]);
//                                arry2.push("1");
//                                drawpolylines();
//                            },
//                            draggable: true,
//                            drag: function (edrag) {

//                                arry.push([edrag.latLng.lat(), edrag.latLng.lng()]);
//                                drawpolylines();
//                                arry2.push("0");

//                            },
//                            dragend: function (edragend) {
//                                arry.push([edragend.latLng.lat(), edragend.latLng.lng()]);
//                                arry2.push("1");
                                
//                                removeMarkers();
//                                addMarkersToGMap();
//                                // alert("arry1 count "+arry.length+"  arry2 count "+arry2.length)
//                            }
//                        });
//                        isfirstmarker = true;
//                        arry.push([latitude, longitude]);
//                        arry2.push("1");
//                    }
//                    else {
//                        map.addMarker({
//                            lat: latitude,
//                            lng: longitude,
//                            draggable: true,
//                            drag: function (edrag) {
//                                arry.push([edrag.latLng.lat(), edrag.latLng.lng()]);
//                                drawpolylines();
//                                arry2.push("0");
//                            },
//                            dragend: function (edragend) {
//                                arry.push([edragend.latLng.lat(), edragend.latLng.lng()]);
//                                arry2.push("1");
//                                // alert("arry1 count "+arry.length+"  arry2 count "+arry2.length)
//                            }

//                        });
//                        arry.push([latitude, longitude]);
//                        arry2.push("1");
//                        drawpolylines();
//                    }
//                },
//                zoom: zoomLevel,
//            });
//            //////////
//                map.addControl({
//                    position: 'top_right',
//                    content: 'Remove Marker',
//                    style: {
//                        margin: '5px',
//                        padding: '1px 6px',
//                        border: 'solid 1px #717B87',
//                        background: '#fff'
//                    },
//                    events: {
//                        click: function () {
//                           // alert(arry.length);
//                            removeMarkers();
//                            var i = arry.length - 1;
//                            var cond = true;
//                            if (i > 0) {
//                                arry.pop();
//                                arry2.pop();
//                                while (cond) {
//                                    if (arry2[i] == "0") {
//                                        arry.pop();
//                                        arry2.pop();

//                                    }
//                                    else if (arry2[i] == "1") {
//                                        cond = false;
//                                        i++;
//                                    }
//                                    i--;
//                                }
//                                zoomLevel = map.getZoom();
//                                //resetGmaps(arry[i][0], arry[i][1]);
//                                map.removePolylines();
//                            }
//                            else if (i == 0 ) {
//                                isfirstmarker = false;
//                                arry.pop();
//                                arry2.pop();
//                                zoomLevel = map.getZoom();
//                                //initializeGmaps();
//                                map.removePolylines();
//                                removeMarkers();
//                            }
//                            //arry.pop();
//                            //  initializeGmaps();
//                            addMarkersToGMap();
//                            // drawpolylines();
//                        }
//                    }
//                });
//                map.addControl({
//                    position: 'top_right',
//                    content: 'Generate KML',
//                    style: {
//                        margin: '5px',
//                        padding: '1px 6px',
//                        border: 'solid 1px #717B87',
//                        background: '#fff'
//                    },
//                    events: {
//                        click: function () {
//                            kml();
//                        }
//                    }
//                });
//                map.addControl({
//                    position: 'top_right',
//                    content: 'Reset Map',
//                    style: {
//                        margin: '5px',
//                        padding: '1px 6px',
//                        border: 'solid 1px #717B87',
//                        background: '#fff'
//                    },
//                    events: {
//                        click: function () {
//                            ResetGoogleMaps();
//                        }
//                    }
//                });
///////////
//        }



        function resetGmaps(latitude, longitude) {

            map = new GMaps({
                div: '#map',
                lat: latitude,
                lng: longitude,

                click: function (e) {
                    var latitude = e.latLng.lat();
                    var longitude = e.latLng.lng();
                    removeMarkers();
                    if (!isfirstmarker) {

                      
                        map.addMarker({
                            lat: latitude,
                            lng: longitude,
                            icon: "/Content/googlemaps/StartMarker.png",
                            click: function (e) {
                                arry.push([latitude, longitude]);
                                arry2.push("1");
                                drawpolylines();
                            },
                            draggable: true,
                            drag: function (edrag) {

                                arry.push([edrag.latLng.lat(), edrag.latLng.lng()]);
                                drawpolylines();
                                arry2.push("0");

                            },
                            dragend: function (edragend) {
                                arry.push([edragend.latLng.lat(), edragend.latLng.lng()]);
                                arry2.push("1");
                                removeMarkers();
                                addMarkersToGMap();
                               
                            }
                        });
                        isfirstmarker = true;
                        arry.push([latitude, longitude]);
                        arry2.push("1");
                    }

                    else {
                        map.addMarker({
                            lat: latitude,
                            lng: longitude,
                            draggable: true,
                            drag: function (edrag) {

                                arry.push([edrag.latLng.lat(), edrag.latLng.lng()]);
                                drawpolylines();
                                arry2.push("0");

                            },
                            dragend: function (edragend) {
                                arry.push([edragend.latLng.lat(), edragend.latLng.lng()]);
                                arry2.push("1");

                                // alert("arry1 count "+arry.length+"  arry2 count "+arry2.length)
                            }

                        });
                        arry.push([latitude, longitude]);
                        arry2.push("1");

                        drawpolylines();
                    }
                },

                zoom: zoomLevel,
            });


            //////////////
           
                map.addControl({
                    position: 'top_right',
                    content: 'Remove Marker',
                    style: {
                        margin: '5px',
                        padding: '1px 6px',
                        border: 'solid 1px #717B87',
                        background: '#fff'
                    },
                    events: {
                        click: function () {


                            removeMarkers();

                            var i = arry.length - 1;
                            var cond = true;
                            if (i > 0) {

                                arry.pop();
                                arry2.pop();

                                while (cond) {
                                    if (arry2[i] == "0") {
                                        arry.pop();
                                        arry2.pop();

                                    }
                                    else if (arry2[i] == "1") {
                                        cond = false;

                                        i++;

                                    }

                                    i--;
                                }

                                zoomLevel = map.getZoom();
                               // resetGmaps(arry[i][0], arry[i][1]);
                                map.removePolylines();
                            }
                            else if (i == 0) {

                                isfirstmarker = false;
                                arry.pop();
                                arry2.pop();
                                zoomLevel = map.getZoom();
                                //initializeGmaps();
                                map.removePolylines();
                            }

                            //arry.pop();


                            addMarkersToGMap();
                            //  drawpolylines();



                        }
                    }
                });


                map.addControl({
                    position: 'top_right',
                    content: 'Generate KML',
                    style: {
                        margin: '5px',
                        padding: '1px 6px',
                        border: 'solid 1px #717B87',
                        background: '#fff'
                    },
                    events: {
                        click: function () {
                            kml();




                        }
                    }
                });

                map.addControl({
                    position: 'top_right',
                    content: 'Reset Map',
                    style: {
                        margin: '5px',
                        padding: '1px 6px',
                        border: 'solid 1px #717B87',
                        background: '#fff'
                    },
                    events: {
                        click: function () {
                            ResetGoogleMaps();




                        }
                    }
                });

           
            
            /////////////////

        }



        function addMarkersToGMap() {

            var  i = arry.length - 1;
//            for (var i = 0; i < arry.length; i++) {

            if (i >= 0) {

                if (i > 0) {
                    map.addMarker({
                        lat: arry[i][0],
                        lng: arry[i][1],
                        draggable: true,
                        drag: function (edrag) {

                            arry.push([edrag.latLng.lat(), edrag.latLng.lng()]);
                            drawpolylines();
                            arry2.push("0");

                        },
                        dragend: function (edragend) {
                            arry.push([edragend.latLng.lat(), edragend.latLng.lng()]);
                            arry2.push("1");

                            // alert("arry1 count "+arry.length+"  arry2 count "+arry2.length)
                        }

                    });




                    map.addMarker({
                        lat: arry[0][0],
                        lng: arry[0][1],
                        icon: "/Content/googlemaps/StartMarker.png",
                        click: function (e) {

                            arry.push([arry[0][0], arry[0][1]]);
                            arry2.push("1");
                            drawpolylines();




                            map.addMarker({
                                lat: arry[0][0],
                                lng: arry[0][1],

                            });



                        },
                    });

                }
                    ///////////////////
                else if (i == 0)
                {

                    map.addMarker({
                        lat: arry[0][0],
                        lng: arry[0][1],
                       // icon: "/Content/googlemaps/StartMarker.png",
                        draggable: true,
                        drag: function (edrag) {

                            arry.push([edrag.latLng.lat(), edrag.latLng.lng()]);
                            drawpolylines();
                            arry2.push("0");

                        },
                        dragend: function (edragend) {
                            arry.push([edragend.latLng.lat(), edragend.latLng.lng()]);
                            arry2.push("1");

                            // alert("arry1 count "+arry.length+"  arry2 count "+arry2.length)
                        }
                    });





                }


                
                    ////////////////////

                }
            //  }




            drawpolylines();

        }


        function drawpolylines() {



            polygon = map.drawPolyline({
                path: arry, // pre-defined polygon shape
                strokeColor: '#5858FA',
                strokeOpacity: 1,
                strokeWeight: 2,
                //  fillColor: '#BBD8E9',
                // fillOpacity: 0.6
            });

            //polygon.setMap(map);

        }



       
        function kml() {
            if (checkIfKmlClosed()) {
                var KmlUrl = "";
                var KmlDir = "";
                var Tablename = "";
                var Id;
                var kmlName = "";
                if (dropdownIdentifier == 1) {
                    KmlUrl = $('#districtDropdownDC').data("kendoDropDownList").text() + "_" + $("#districtDropdownDC").val();
                    KmlDir = "Districts";
                    Tablename = "District";
                    Id = $("#districtDropdownDC").val();
                    kmlName = $('#districtDropdownDC').data("kendoDropDownList").text();
                }
                else if (dropdownIdentifier == 2) {
                    KmlUrl = $('#talukaDropdownDC').data("kendoDropDownList").text() + "_" + $("#talukaDropdownDC").val();
                    KmlDir = "Tehsils";
                    Tablename = "Tehsil";
                    Id = $("#talukaDropdownDC").val();
                    kmlName = $('#talukaDropdownDC').data("kendoDropDownList").text();
                }
                else if (dropdownIdentifier == 3) {
                    KmlUrl = $('#Qanoongoee').data("kendoDropDownList").text() + "_" + $("#Qanoongoee").val();
                    KmlDir = "Qanoongooees";
                    Tablename = "Qanoongooee";
                    Id = $("#Qanoongoee").val();
                    kmlName = $('#Qanoongoee').data("kendoDropDownList").text();
                }
                else if (dropdownIdentifier == 4) {
                    KmlUrl = $('#Mouza').data("kendoDropDownList").text() + "_" + $("#Mouza").val();
                    KmlDir = "Mouzas";
                    Tablename = "Mouza";
                    Id = $("#Mouza").val();
                    kmlName = $('#Mouza').data("kendoDropDownList").text();
                }
                else if (dropdownIdentifier == 5) {
                    KmlUrl = $('#RevenueCircle').data("kendoDropDownList").text() + "_" + $("#RevenueCircle").val();
                    KmlDir = "RevenueCircles";
                    Tablename = "RevenueCircle";
                    Id = $("#RevenueCircle").val();
                    kmlName = $('#RevenueCircle').data("kendoDropDownList").text();
                }
                else if (dropdownIdentifier == 6) {
                    KmlUrl = $('#PropertyArea').data("kendoDropDownList").text() + "_" + $("#PropertyArea").val();
                    KmlDir = "PropertyAreas";
                    Tablename = "PropertyArea";
                    Id = $("#PropertyArea").val();
                    kmlName = $('#PropertyArea').data("kendoDropDownList").text();
                }
                KmlUrl = KmlUrl.replace(/ /g, '');
                var kmlfile = {
                    coordinates: arry,
                    fileName: KmlUrl,
                    DirFolderName: KmlDir,
                    tablename: Tablename,
                    id: Id
                }
                $.ajax({
                    url: '../api/KMLFile/CreateKMLFile', // This has to be in Citizen Portal Web API controller
                    type: 'POST',
                    data: JSON.stringify(kmlfile),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        console.log(data);
                        SaveKMLUrl(kmlfile, kmlName);
                    },
                    error: function (data) {
                        var response = data.responseText.replace(/"/g, '');
                        console.log(response);
                    }
                });
                //latlng.lat(),
                // lng: latlng.lng()
                //gmaplat = map.latlng.lat();
                // gmaplong = map.latlng.lng();
                //ResetGoogleMaps();
            }
            else {
                alert("Please draw a closed shape.")
            }
            map.removeMarkers();
            map.removePolylines();
            arry = [];
            arry2 = [];
            isfirstmarker = false;
            zoomLevel = map.getZoom();
        }

        function SaveKMLUrl(kmlfile, kmlName)
        {
            $.ajax({
                url: base_url_service_layer + '/api/Proxy/KMLFile/SaveKMLURLInDB',
                type: 'POST',
                data: JSON.stringify(kmlfile),
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    LoadKml(data);
                    alert("KML Generated Succesfully for " + kmlName);

                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');


                }
            });
        }



        function checkIfKmlClosed()
        {
            var i = arry.length - 1;

            if (i > 0)
            {

                if (arry[0][0] == arry[i][0] && arry[0][1] == arry[i][1])
                {

                    return true;

                }


            }


            return false;


        }



        function ResetGoogleMaps()
        {
            arry = [];
            arry2 = [];
            isfirstmarker = false;
           // zoomLevel = map.getZoom();
         //   initializeGoogleMapByAdminValue();
        }



        function LoadKml(KmlUrl)
        {
            KmlUrl = encodeURI(kml_server_location_url + KmlUrl);
            console.log(KmlUrl);

            var d = new Date();
            var n = d.getTime();

           

            map.loadFromKML({

                url: KmlUrl + '.kml?rand=' + n,
                //preserveViewport:true ,
              
               /* events: {
///////////////////////////////////////////////

                     click: function (e) {
                    var latitude = e.latLng.lat();
                    var longitude = e.latLng.lng();
                    removeMarkers();
                    if (!isfirstmarker) {

                      
                        map.addMarker({
                            lat: latitude,
                            lng: longitude,
                            icon: "~/Content/googlemaps/StartMarker.png",
                            click: function (e) {
                                arry.push([latitude, longitude]);
                                arry2.push("1");
                                drawpolylines();
                            },
                            draggable: true,
                            drag: function (edrag) {

                                arry.push([edrag.latLng.lat(), edrag.latLng.lng()]);
                                drawpolylines();
                                arry2.push("0");

                            },
                            dragend: function (edragend) {
                                arry.push([edragend.latLng.lat(), edragend.latLng.lng()]);
                                arry2.push("1");
                                removeMarkers();
                                addMarkersToGMap();
                               
                            }
                        });
                        isfirstmarker = true;
                        arry.push([latitude, longitude]);
                        arry2.push("1");
                    }

                    else {
                        map.addMarker({
                            lat: latitude,
                            lng: longitude,
                            draggable: true,
                            drag: function (edrag) {

                                arry.push([edrag.latLng.lat(), edrag.latLng.lng()]);
                                drawpolylines();
                                arry2.push("0");

                            },
                            dragend: function (edragend) {
                                arry.push([edragend.latLng.lat(), edragend.latLng.lng()]);
                                arry2.push("1");

                                // alert("arry1 count "+arry.length+"  arry2 count "+arry2.length)
                            }

                        });
                        arry.push([latitude, longitude]);
                        arry2.push("1");

                        drawpolylines();
                    }
                }
//////////////////////////////////////////////

                }*/
                


            });

        }




        //function LoadKmlOrSearch(GmapString, DefaultGmapString, KmlDBUrl) {
        //    // Reset map so that old KML gets removed
        //    ResetGoogleMaps();
        //    //$("#districtDropdownDC option:selected").text()
        //    // Ignore KmlUrl parameter. It is coming always as null
        //    console.log("LoadKmlOrSearch( User provided GmapString:" + GmapString + ", DefaultGmapString:" + DefaultGmapString + ", KmlDBUrl:" + KmlDBUrl + " )");

        //    if (KmlDBUrl != null) {
        //        if (KmlDBUrl != "") {
        //            LoadKml(KmlDBUrl);
        //            console.log("GMap tried to load KML");
        //        }
        //    }
        //    else if (GmapString != null) {
        //        if (GmapString != "") {
        //           // ResetGoogleMaps();
        //            loadGMapByString(GmapString);
        //            console.log("GMap tried to load User provided GMap string");
        //        }
        //    }
        //    else if (DefaultGmapString != null) {
        //        if (DefaultGmapString != "") {
        //            loadGMapByString(DefaultGmapString);
        //            console.log("GMap tried to load Default GMap string");
        //        }
        //    }
        //    else
        //    {
        //        console.log("Can't load using GMap. Not GMap search criteria available.");
        //    }


        //}


        //function initializeGoogleMapByAdminValue()
        //{
        //    if (!isDCValueAdmin) {
        //        map = new GMaps({
        //            div: '#map',
        //            lat: gmaplat,
        //            lng: gmaplong,
        //            zoom: zoomLevel,
        //        });
        //    }
        //    else { initializeGmaps();}
        //}
        /*var meters2degress = function (x, y) {
            var lon = (x / 20037508.34) * 180;
            var lat = (y / 20037508.34) * 180;
            lat = 180/Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
            return [lat, lon]
        }
        */
        function initializeDropDown(url, placeholder, elementId) {
            $("#" + elementId).kendoDropDownList({
                dataTextField: "Name",
                optionLabel: placeholder,
                dataValueField: "Id",
                autoBind:false,
                dataSource: {
                    transport: {
                        read: {
                            url: url,
                            dataType: 'json',
                            type: 'POST',                            
                        },
                    },
                }
            });
        }
 
  function initializeDropDownPropertyArea(url, placeholder, elementId) {
            $("#" + elementId).kendoDropDownList({
                dataTextField: "PROPERTY_AREA_NAME",
                optionLabel: placeholder,
                dataValueField: "ID",
                autoBind:false,
                dataSource: {
                    transport: {
                        read: {
                            url: url,
                            dataType: 'json',
                            type: 'POST',                            
                        },
                    },
                }
            });
        }


     

        function addCommasGeneric4DecimalPrecision(ParamObject) {
            //debugger;
            $("#" + $(ParamObject).attr("id")).val(returnCommas4DecimalPrecision(ParamObject.value));
        }
        function returnCommas4DecimalPrecision(nStr) {


            nStr += ''; nStr = nStr.replace(/,/g, "");
            if (nStr == "" || nStr == null) return "";

            var isFloatingNumber = false;

            var floatNumber = parseFloat(nStr);
            if (isNaN(floatNumber)) return nStr;
            if (floatNumber == 0) return "0";
            if (!(floatNumber % 1 == 0)) {
                // Has some decimal points
                isFloatingNumber = true;
                floatNumber = Math.round(floatNumber * 10000) / 10000; // Round to 4 decimal places at the most.
            }
            else {
                // Does not have decimal points
                isFloatingNumber = false;
            }

            nStr = floatNumber.toString();

            x = nStr.split('.');
            x1 = x[0]; x2 = '';
            if (isFloatingNumber) x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            //if (x2 == "")
            //    x2 = ".00";
            if (x1 == "")
                x2 = "";

            var returnValue = x1 + x2;
            console.log("returnCommas parameter type : " + typeof (nStr) + " value: " + nStr + " returnValue : " + returnValue + " typeof returnValue: " + typeof (returnValue));
            return returnValue;
        }




        function returnCommas(nStr) {

            
            nStr += ''; nStr = nStr.replace(/,/g, "");
            if (nStr == "" || nStr == null) return "";

            var isFloatingNumber = false;

            var floatNumber = parseFloat(nStr);
            if (isNaN(floatNumber)) return nStr;
            if (floatNumber == 0) return "0";
            if (!(floatNumber % 1 == 0)) {
                // Has some decimal points
                isFloatingNumber = true;
                floatNumber = Math.round(floatNumber * 100) / 100; // Round to 2 decimal places at the most.
            }
            else {
                // Does not have decimal points
                isFloatingNumber = false;
            }

            nStr = floatNumber.toString();

            x = nStr.split('.');
            x1 = x[0]; x2 = '';
            if (isFloatingNumber) x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            //if (x2 == "")
            //    x2 = ".00";
            if (x1 == "")
                x2 = "";

            var returnValue = x1 + x2;
            console.log("returnCommas parameter type : " + typeof (nStr) + " value: " + nStr + " returnValue : " + returnValue + " typeof returnValue: " + typeof (returnValue));
            return returnValue;
        }

        function onChangeSquareNo() {

            var squareNumber = $("#squareNo").val();
            var Mouzaid = $("#Mouza").val();
            var Qanoongoid = $("#Qanoongoee").val();
            var LandClassificationid = $("#LandClassification").val();
            var LocationString = $("#Location").data("kendoDropDownList").text()
            var MouzaName = $('#Mouza').data("kendoDropDownList").text();

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

                success: function (listofQilaNumbers) {
                    var valid = false;
                    var autocomplete = $("#qilaNo").data("kendoAutoComplete");
                    if (autocomplete != null) {
                        autocomplete.destroy();
                    }

                    $("#qilaNo").kendoAutoComplete({
                        dataTextField: "QilaNo",
                        dataSource: listofQilaNumbers,
                        filter: "startswith",
                        //placeholder: "Select Khasra",
                        highlightFirst: true,
                        select: function (e) {
                            valid = true;
                            var selectedOne = this.dataItem(e.item.index());
                            console.log(kendo.stringify(selectedOne));

                            var landUnit = selectedOne.QilaNoRateUnit;

                            QilaNoId = selectedOne.QilaNoId; 
                            TreatAsUrban = selectedOne.TreatAsUrban;

                            if (isDCValueNotFirst) {
                                if (isExchangeOfProperty && isDCNextFirstScreen) {
                                    challan.propertyInfo.treatAsUrban = TreatAsUrban
                                }
                                else if (isExchangeOfProperty && !isDCNextFirstScreen) {
                                    challan.propertyInfo2.treatAsUrban = TreatAsUrban
                                }
                                else {
                                    challan.propertyInfo.treatAsUrban = TreatAsUrban
                                }
                            }
                            else {

                            }

                            if (landUnit != null) {
                                setLandUnitUrbanFromDB(landUnit);
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

                        },

                    });

                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    //   alert(response);

                }
            });

        }


        function singleLandSelect() {
            $("#landclassificationurbandiv").show();
            $("#landclassifictaionruraldiv").show();
            $("#categoriesurbandiv").show();
            $("#PropertyAreaRate").show();
            $("#CoveredAreaRate").show();
            $("#CoveredAreaRate2").show();
            $("#CoveredAreaRateBasements").show();
            $("#btnMultipleLandClassification").hide();
            multipleKhasrasSelected = false;
            resetMultipleKhasraFileds();
            $("#rateOfChallanMultipleKhasraError").html('');
            KhasraType = SINGLE_LAND;
        }

        function resetMultipleKhasraFileds() {
            resetMultipleKhasraScreen();
            resetAddMultipleKhasrasScreen();
        }

        function multipleLandSelect() {
            LandType = MULTIPLE_LAND;
            $("#landclassificationurbandiv").hide();
            $("#landclassifictaionruraldiv").hide();
            $("#categoriesurbandiv").hide();           
            $("#PropertyAreaRate").hide();
            $("#CoveredAreaRate").hide();
            $("#CoveredAreaRate2").hide();
            $("#CoveredAreaRateBasements").hide();
            $("#FLDropdownDCDiv").hide();
            $("#BasementDropdownDCDiv").hide();
            $("#btnMultipleLandClassification").show();
            multipleLandSelected = true;
            resetSingleLandFileds();
            //$("#btnMultipleSquareQila").show();
        }

        

        function resetSingleLandFileds() {
            resetKendoDropDown("LandClassificationUrban", selectlandClassificationText);
            resetKendoDropDown("CategoriesUrban", SelectLandCategoryText);
          
            $("#PropertyAreaQuantity").val('');
            $("#CoveredAreaQuantity").val('');
            $(".k-invalid-msg").hide();
            $("#LandUnitOfArea").html('');
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

        function urduToEnglish_RateOfChallan() {
            sessionStorage["currentLanguage"] = "English";
            $("#landTypeLblDcScreen").html('Land Type');
            $("#urbanLblDcScreen").html('Urban');
            $("#ruralLblDcScreen").html('Rural');
            $("#districtLblDcScreen").html('District');
            $("#talukaLblDcScreen").html('Taluka');
            $("#qanoonGoeeLblDcScreen").html('Qanoongoee');
            $("#mouzaLblDcScreen").html('Mouza');
            $("#revenueCircleLblDcScreen").html('Revenue Circle');
            $("#propertyAreaLblDcScreen").html('Property Area');
            $("#khasraUrbanLblDcScreen").html('Khasra');
            $("#squareNoUrbanLblDcScreen").html('Square No');
            $("#qilaNoUrbanLblDcScreen").html('Qila Number');
            $("#landClassificationUrbanLblDcScreen").html('Land Classification');
            $("#landClassificationLblDcScreen").html('Land Classification');
            $("#locationLblDcScreen").html('Location');
            $("#khasraLblDcScreen").html('Khasra');
            $("#squareNoLblDcScreen").html('Square Number');
            $("#qilaNumberLblDcScreen").html('Qila Number');
            $("#dcRateLblDcScreen").html('DC Rate');
            if ($("#landValueUserLblDcScreen").length) {
                $("#landValueUserLblDcScreen").html('Land Value (User Provided)'); /* only exists in rateofchallanview */
            }
            $("#landValueDCLblDcScreen").html('Land Value (DC)');               
            //if ($("#PropertyAreaQuantityLabel").length) {
                //$("#PropertyAreaQuantityLabel").html('Land Area');  
            //}
            if ($("#PropertyAreaQuantity").length) {
                changeFloatingLabelOfElement("PropertyAreaQuantity", "Land Area"); 
            }
            if ($("#amountLabelRateOfChallan").length) {
                $("#amountLabelRateOfChallan").html('Land Value (User Provided)'); /* only exists in rateofchallan.cshtml */
            }
            $("#bothKandSqNIsKhasraSelectedLblDcScreen").html('Use Khasra for DC Value');
            $("#bothKandSqNIsSqNoSelectedLblDcScreen").html('Use Square No for DC Value');
            $("#bothKandSqNIsPropertySelectedLblDcScreen").html('Use Property Area for DC Value');
            $("#KhasraTypeSingleKhasraLblDcScreen").html('Single Khasra');
            $("#KhasraTypeMultipleKhasraLblDcScreen").html('Multiple Khasra');
            $("#SquareQilaTypeSingleLblDcScreen").html('Single Qila');
            $("#SquareQilaTypeMultipleLblDcScreen").html('Multiple Qila');
            urduToEnglish_Layout();
            urduToEnglish_FindArea();
            urduToEnglish_AreaCalculator();
            urduToEnglish_MultipleKhasra();
            urduToEnglish_AddMultipleKhasra();
            urduToEnglish_MultipleSquareQila();
            urduToEnglish_AddMultipleSquareQila();
        }
        function AllowFindRate() {

            var $radio = $('input[name=LandType]:checked');
            $("#CoveredAreaRate2").hide();
            var id = $radio.attr('id');

            if (id == "Urban") {
                var district = $("#districtDropdownDC").val();
                var Taluka = $("#talukaDropdownDC").val();
                var PropertyArea = $("#PropertyArea").val();
                var LandClassification = $("#LandClassificationUrban").val();
                var Categories = $("#CategoriesUrban").val();
              
                $("#CoveredAreaRate2").hide();
                // alert("district" + district + "Taluka" + Taluka + "PropertyArea" + PropertyArea + "LandClassification" + LandClassification + "Categories" + Categories); 
                if (district > 0 && Taluka > 0 && PropertyArea > 0 && LandClassification > 0 && Categories > 0) {

                    if ($("#LandClassificationUrban  option:selected").text() == "Commercial Built Up") {

                        if ($('#districtDropdownDC').val() == 1 && ($("#CategoriesUrban  option:selected").text() == "I" || $("#CategoriesUrban  option:selected").text() == "II" || $("#CategoriesUrban  option:selected").text() == "III" || $("#CategoriesUrban  option:selected").text() == "IV")) {

                            // For Resetting value . 

                            $("#CoveredAreaRateBasements").show();
                            $("#CoveredAreaRate").hide();
                            $("#CoveredAreaRate2").show();
                            //  $("#CoveredAreaQuantity").attr("placeholder", "Covered Area Excluding Basements");



                        }

                    } else {


                        $("#CoveredAreaRateBasements").hide();
                        if ($("#LandClassificationUrban  option:selected").text() == "Commercial Built Up" || $("#LandClassificationUrban  option:selected").text() == "Residential Built Up" || $("#LandClassificationUrban  option:selected").text() == "Flats/Appartments" || $("#LandClassificationUrban  option:selected").text() == "Industrial") {

                            $("#CoveredAreaRate").show();
                            $("#CoveredAreaRate2").hide();
                        }



                        else {
                            $("#CoveredAreaRate").hide();
                            $("#CoveredAreaRate2").hide();
                        }


                    }






                    $('#findRateButton').prop("disabled", false);
                }




            }
            else {
                var district = $("#districtDropdownDC").val();
                var Taluka = $("#talukaDropdownDC").val();
                var LandValue = $("#PropertyAreaQuantity").val();
                if (LandValue > 0 && Taluka > 0 && district > 0) {
                    $('#findRateButton').prop("disabled", false);
                }

            }




        }
        function englishToUrdu_RateOfChallan() {
            sessionStorage["currentLanguage"] = "Urdu";
            $("#landTypeLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%; ">زمین کی قسم</label>');
            $("#urbanLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%; padding-left:0px;">شہری</label>');
            $("#ruralLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;padding-left:0px;">دیہاتی</label>');
            $("#districtLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">ضلع</label>');
            $("#talukaLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">تعلقہ</label>');
            $("#qanoonGoeeLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">قانون گو</label>');
            $("#mouzaLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">موضع</label>');
            $("#revenueCircleLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">ریونیو سرکل</label>');
            $("#propertyAreaLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">پراپرٹی ایریا</label>');
            $("#khasraUrbanLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">خسرہ</label>');
            $("#squareNoUrbanLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">اسکوائر نمبر</label>');
            $("#qilaNoUrbanLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">قلعہ نمبر</label>');
            $("#landClassificationUrbanLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">زمین کی درجہ بندی</label>');
            $("#landClassificationLblDcScreen").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">زمین کی درجہ بندی</span>');
            $("#locationLblDcScreen").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">مقام</span>');
            $("#khasraLblDcScreen").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">خسرہ</span>');
            $("#squareNoLblDcScreen").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">اسکوائر نمب</span>ر');
            $("#qilaNumberLblDcScreen").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">قلعہ نمبر</span>');
            $("#dcRateLblDcScreen").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ڈی سی قیمت</span>');
            if ($("#landValueUserLblDcScreen").length) {
                $("#landValueUserLblDcScreen").html('<span style="font-family:MehrNastaliqWeb; font-size:120%; direction:rtl;">(زمین کی قیمت (صارف کے مطابق</span>'); /* only exists in rateofchallanview.cshtml */
            }
            $("#landValueDCLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;">(زمین کی قیمت (ڈی سی</label>');
            if ($("#PropertyAreaQuantityLabel").length) {
                changeFloatingLabelOfElement("PropertyAreaQuantityLabel",'زمین کارقبہ');  
            }
            if ($("#PropertyAreaQuantity").length) {
                changeFloatingLabelOfElement("PropertyAreaQuantity", "زمین کارقبہ");
            }
            if ($("#amountLabelRateOfChallan").length) {
                $("#amountLabelRateOfChallan").html('<span style="font-family:MehrNastaliqWeb; font-size:120%; direction:rtl">(زمین کی قیمت (صارف کے مطابق </span>'); /* only exists in rateofchallan.cshtml */
            }
            $("#bothKandSqNIsKhasraSelectedLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%; padding-left:0px;">ڈی سی قیمت  کے لئےخسرہ استعمال کریں</label>');
            $("#bothKandSqNIsSqNoSelectedLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%; padding-left:0px;">ڈی سی قیمت  کے لئےاسکوائر نمبراستعمال کریں</label>');
            $("#bothKandSqNIsPropertySelectedLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%; padding-left:0px;">ڈی سی ویلیو کیلئے پراپرٹی ایریا کا استعمال کریں</label>');
            $("#KhasraTypeSingleKhasraLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;padding-left:0px;">ایک خسرہ</label>');
            $("#KhasraTypeMultipleKhasraLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;padding-left:0px;">ایک سے زیادہ خسرہ</label>');
            $("#SquareQilaTypeSingleLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;padding-left:0px;">ایک قلعہ</label>');
            $("#SquareQilaTypeMultipleLblDcScreen").html('<label style="font-family:MehrNastaliqWeb; font-size:120%;padding-left:0px;">ایک سے زیادہ قلعہ</label>');
            englishToUrdu_Layout();
            englishToUrdu_FindArea();
            englishToUrdu_AreaCalculator();
            englishToUrdu_MultipleKhasra();
            englishToUrdu_AddMultipleKhasra();
            englishToUrdu_MultipleSquareQila();
            englishToUrdu_AddMultipleSquareQila();
        }