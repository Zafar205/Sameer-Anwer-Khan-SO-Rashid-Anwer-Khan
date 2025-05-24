var district_id = 1; 
var acre_to_kanal = 8;
var kanal_to_marla = 20;
var marla_to_sqFt = 272;

var input_acre = 0;
var input_kanal = 0;
var input_marla = 0;
var input_sqFt = 0;

var output_acre = 0;
var output_kanal = 0;
var output_marla = 0;
var output_sqFt = 0;



function initializeAcreDropDow() {
    var data = [
        { text: "1 Acre = 8 Kanal ", value: "8" },
        { text: "1 Acre = 9 Kanal 13 Marla", value: "9.65" },
        { text: "1 Acre = 9 Kanal 16 Marla", value: "9.8" }
    ];

    $("#acreValueDropDown").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        index: 0,
    });

}

function initializeMarlaDropDow() {
    var data = [
        { text: "1 Marla = 272 Sq ft", value: "272" },
        { text: "1 Marla = 225 Sq ft", value: "225" },
    ];

    $("#marlaValueDropDown").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        index: 0,

    });

}




$(document).ready(function () {

    initializeAcreDropDow();
    initializeMarlaDropDow();
    console.log("In document.ready of AreaCalculator.js");
    if(acre_to_kanal == null || acre_to_kanal == undefined
        ||kanal_to_marla == null || kanal_to_marla == undefined
        ||marla_to_sqFt == null || marla_to_sqFt == undefined
        )
    {
        // Call jax to retrieve these info from database
    }

    $("#tooltip_Acre").kendoTooltip({
        content: "Enter Area in Acre",
        position: "top"
    });

    $("#tooltip_Kanal").kendoTooltip({
        content: "Enter Area in Kanal",
        position: "top"
    });

    $("#tooltip_Marla").kendoTooltip({
        content: "Enter Area in Marla",
        position: "top"
    });

    $("#tooltip_SqFt").kendoTooltip({
        content: "Enter Area in Square feet",
        position: "top"
    });

    resetAreaCalculator();
    
});



function ConvertLandArea(ParamObject) {

    //console.log(ParamObject);

    var fieldValidity = ParamObject.validity.valid;

    console.log("Field Validity : " + fieldValidity);
    if (fieldValidity == false)
    {
        var title = $(ParamObject).attr("title");
        console.log("Title of Field: " + title);

        var id = $(ParamObject).attr("id");
        console.log("Id of Field: " + id);

        console.log("Container: " + $(ParamObject).parent().parent().parent());

        $(ParamObject).parent().parent().parent().find(".field-validation-error").remove();
        $(ParamObject).parent().parent().parent().append('<span class="k-widget k-tooltip k-tooltip-validation k-invalid-msg field-validation-error" data-for="PropertyAreaQuantity" data-valmsg-for="' + id + '" id="' + id + '_validationMessage" role="alert"><span class="k-icon k-warning"> </span>' + title + '</span>');
    }
    else
    {
        $(ParamObject).parent().parent().parent().find(".field-validation-error").remove();
    }
    

}

function CalculateLandArea()
{
    //var $radio = $('input[name=marlaInSqFt]:checked');
    //radioButtonId = $radio.attr('id');
    marla_to_sqFt = $("#marlaValueDropDown").val();
    acre_to_kanal = $("#acreValueDropDown").val();

    input_acre = $("#AcreId").val();
    input_kanal =$("#KanalId").val();
    input_marla = $("#MarlaId").val();
    input_sqFt = $("#SqFtId").val();

    ConvertLandAreaUnits(input_acre, input_kanal, input_marla, input_sqFt);

    $("#outputLandAreaAcreId").html(output_acre);
    $("#outputLandAreaKanalId").html(output_kanal);
    $("#outputLandAreaMarlaId").html(output_marla);
    $("#outputLandAreaSqFtId").html(output_sqFt);
   
}

function onFocusOfLandAreaField(ParamObject) {
    //debugger;

    var v = ParamObject.value;
    if (v == "0" || v == 0) {
        $("#" + $(ParamObject).attr("id")).val("");
    }
}

function onBlurOfLandAreaField(ParamObject) {

    var v = ParamObject.value;
    if (v == "" || v == undefined) {
        $("#" + $(ParamObject).attr("id")).val("0");
    }
}

function onAreaCalculatorClose()
{
    resetAreaCalculator();
}

function onAreaCalculatorCloseActivate() {
    
}

function resetAreaCalculator()
{
    $("#AcreId").val("0");
    $("#KanalId").val("0");
    $("#MarlaId").val("0");
    $("#SqFtId").val("0");

    $("#outputLandAreaAcreId").html(0);
    $("#outputLandAreaKanalId").html(0);
    $("#outputLandAreaMarlaId").html(0);
    $("#outputLandAreaSqFtId").html(0);
}

function ConvertLandAreaUnits(in_acre, in_kanal, in_marla, in_sqFt)
{
    // Validate all input are valid numbers
    if (isNaN(in_acre)) in_acre = 0; else in_acre = parseFloat(in_acre);
    if (isNaN(in_kanal)) in_kanal = 0; else in_kanal = parseFloat(in_kanal);
    if (isNaN(in_marla)) in_marla = 0; else in_marla = parseFloat(in_marla);
    if (isNaN(in_sqFt)) in_sqFt = 0; else in_sqFt = parseFloat(in_sqFt);

    

    // Prepare Output Acre
    output_acre = in_acre;
    output_acre += (in_kanal / acre_to_kanal); // Convert Kanal to Acre
    output_acre += ((in_marla / kanal_to_marla) / acre_to_kanal); // Convert Marla to Kanal -> Kanal to Acre
    output_acre += (((in_sqFt / marla_to_sqFt) / kanal_to_marla) / acre_to_kanal); // Convert SqFt -> Marla to Kanal -> Kanal to Acre

    output_acre = Math.round(output_acre * 10000) / 10000; // Round to two decimal places

    // Prepare Output Kanal
    output_kanal = in_kanal;
    output_kanal += (in_acre * acre_to_kanal); // Convert Acre to Kanals
    output_kanal += ((in_marla / kanal_to_marla)); // Convert Marla to Kanal 
    output_kanal += ((in_sqFt / marla_to_sqFt) / kanal_to_marla); // Convert SqFt -> Marla to Kanal 

    output_kanal = Math.round(output_kanal * 10000) / 10000; // Round to two decimal places

    // Prepare Output Marla
    output_marla = in_marla;
    output_marla += (in_kanal * kanal_to_marla); // Convert Kanals to Marlas
    output_marla += ((in_acre * acre_to_kanal) * kanal_to_marla); // Convert Acre to Kanals -> Kanals to Marlas
    output_marla += (in_sqFt / marla_to_sqFt); // Convert SqFt -> Marlas

    output_marla = Math.round(output_marla * 10000) / 10000; // Round to two decimal places

    // Prepare Output SquareFoot
    output_sqFt = in_sqFt;
    output_sqFt += (in_marla * marla_to_sqFt); // Convert Marlas to Sq Ft
    output_sqFt += ((in_kanal * kanal_to_marla) * marla_to_sqFt); // Convert Kanals to marks and then to Square Feet
    output_sqFt += (((in_acre * acre_to_kanal) * kanal_to_marla) * marla_to_sqFt); // Convert Acre to Kanal and then kanal to marla and then marla to SqFt

    output_sqFt = Math.round(output_sqFt * 10000) / 10000; // Round to two decimal places
}

function CloseWindowAreaCalculator() {
    //$('input[name="' + name + '"][value="' + SelectdValue + '"]').prop('checked', true);
    //$('input[name="marlaInSqFt"][value="272"]').prop('checked', true);
    $("#areaCalcWindow").data("kendoWindow").close();
}

function OpenWindow() {
    if ($('#acreValueDropDown').data("kendoDropDownList") != null)
        $('#acreValueDropDown').data("kendoDropDownList").value("8");

    if ($('#marlaValueDropDown').data("kendoDropDownList") != null)
        $('#marlaValueDropDown').data("kendoDropDownList").value("272");
    hideAllErrorMessages();
    $("#areaCalcWindow").data("kendoWindow").center().open();
}

function hideAllErrorMessages() {
    $("#AcreId_validationMessage").hide();
    $("#KanalId_validationMessage").hide();
    $("#MarlaId_validationMessage").hide();
    $("#SqFtId_validationMessage").hide();
}

function urduToEnglish_AreaCalculator() {
    changeFloatingLabelOfElement("AcreId", "Enter Acre");
    changeFloatingLabelOfElement("Kanal", "Enter Kanal");
    changeFloatingLabelOfElement("MarlaId", "Enter Marla");
    changeFloatingLabelOfElement("SqFtId", "Enter Square Feet");
    $("#landAreaAreaLblCalculator").html('Land Area');
    $("#acreLblAreaCalculator").html('Acre');
    $("#kanalLblAreaCalculator").html('Kanal');
    $("#marlaLblAreaCalculator").html('Marla');
    $("#squareFeetLblAreaCalculator").html('Sq Ft.');
}

function englishToUrdu_AreaCalculator() {
    changeFloatingLabelOfElement("AcreId", "ایکڑدرج کریں");
    changeFloatingLabelOfElement("Kanal", "کنال درج کریں");
    changeFloatingLabelOfElement("MarlaId", "مرلہ درج کریں");
    changeFloatingLabelOfElement("SqFtId", "مربع فیٹ درج کریں");
    $("#landAreaAreaLblCalculator").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">زمین کارقبہ</span>');
    $("#acreLblAreaCalculator").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ایکڑ</span>');
    $("#kanalLblAreaCalculator").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">کنال</span>');
    $("#marlaLblAreaCalculator").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">مرلہ</span>');
    $("#squareFeetLblAreaCalculator").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">مربع فیٹ</span>');
}