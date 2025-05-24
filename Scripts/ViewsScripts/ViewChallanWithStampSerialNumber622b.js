var stampNumber;

$(document).ready(function () {
    $('#ExpiryMsg').hide();
    $('#ValidExpiryNote').hide();
    debugger;
  
});
function makePersonObject(challan) {
   
    var ApplicantData = [{
        PersonName: challan.NAME_STRING,
       // IsPrimary: true,
       // IsThroughPowerOfAttorney: false,
        PersonCnic: challan.CNIC,
        PersonEmail: challan.EMAIL,
        PersonAddress: challan.ADDRESS,
       // PersonPhone: challan.CONTACT_NO,
      //  RelationName: challan.RELATION_NAME,
      //  RelationId: challan.RELATION_ID,
      //  RelationString: challan.RELATION_STRING,
      //  NameString: challan.NAME + " " + challan.RELATION_STRING + " " + challan.RELATION_NAME,
      //  IsPrimaryString: true
    }]
    return ApplicantData;
}

function makeDenominationObject(challan) {
    stampNumber = challan.STAMP_NUMBER;
   
    var DenominationData = [{
        DenominationName: challan.AMOUNT_STRING,
        Serial: "1",
        // IsPrimary: true,
        // IsThroughPowerOfAttorney: false,
        DenominationPurpose: challan.STAMP_PURPOSE,
        StampSerial: challan.STAMP_NUMBER,
       // PersonAddress: challan.ADDRESS,
        // PersonPhone: challan.CONTACT_NO,
        //  RelationName: challan.RELATION_NAME,
        //  RelationId: challan.RELATION_ID,
        //  RelationString: challan.RELATION_STRING,
        //  NameString: challan.NAME + " " + challan.RELATION_STRING + " " + challan.RELATION_NAME,
        //  IsPrimaryString: true
    }]
    return DenominationData;
}

function toDate(stringDate) {
    return new Date(stringDate);
}

function formatDate(stringDate){
    var d = toDate(stringDate);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var date = day + "/" + month + "/" + year;
    return date;
}

function rendenChallanForSerial(challanForStampVendor) {

    //License Details
    document.getElementById("SmartCardFeeValues").innerHTML = challanForStampVendor.AMOUNT_STRING;
    //document.getElementById("tehsilText2").innerHTML = challanForStampVendor.TEHSIL_NAME;
    //document.getElementById("StampVendorLocationValue").innerHTML = challanForStampVendor.VENDING_AREA;
    //document.getElementById("LicenseNoValue").innerHTML = challanForStampVendor.LICENSE_NUMBER;
    //document.getElementById("CommissionValue").innerHTML = challanForStampVendor.COMMISSION + "%";

    ////if (challanForStampVendor.TREASURY_NUMBER != null && challanForStampVendor.TREASURY_NUMBER != "")
    ////    document.getElementById("TreasuryNoValue").innerHTML = challanForStampVendor.TREASURY_NUMBER;
    ////else
    //    document.getElementById("TreasuryNoValue").innerHTML = "-";
    //if (challanForStampVendor.ISSUE_DATE != null)
    //    document.getElementById("LicenseIssueDateValue").innerHTML = formatDate(challanForStampVendor.ISSUE_DATE);
    //else
    //    document.getElementById("LicenseIssueDateValue").innerHTML = challanForStampVendor.ISSUE_DATE;

    //if (challanForStampVendor.LICENSE_EXPIRY_DATE != null)
    //    document.getElementById("LicenseExpiryDateValue").innerHTML = formatDate(challanForStampVendor.LICENSE_EXPIRY_DATE);
    //else
    //    document.getElementById("LicenseExpiryDateValue").innerHTML = challanForStampVendor.LICENSE_EXPIRY_DATE;
    //document.getElementById("applicantQualificationText").innerHTML = challanForStampVendor.QUALIFICATION;


    //var totalPayableAmount = 0;
    ////Payable Amount
    //if ((challanForStampVendor.APPLY_NEW_ENROLLMENT_FEE != null && challanForStampVendor.APPLY_NEW_ENROLLMENT_FEE == true) ||
    //   ( challanForStampVendor.APPLY_TRANSFER_FEE != null && challanForStampVendor.APPLY_TRANSFER_FEE == true)) {
    //    document.getElementById("firstTimeRegfeeValue").innerHTML = returnCommas(challanForStampVendor.APPLY_NEW_ENROLLMENT_FEE_Value);
    //    $('#firstTimeRegfeeValues').show();
    //    $('#firstTimeRegfeeDiv').show();
    //    totalPayableAmount += challanForStampVendor.APPLY_NEW_ENROLLMENT_FEE_Value;
    //}
    //else {
    //    $('#firstTimeRegfeeValues').hide();
    //    $('#firstTimeRegfeeDiv').hide();
    //}
    //if (challanForStampVendor.APPLY_RENEWAL_FEE != null && challanForStampVendor.APPLY_RENEWAL_FEE == true) {
    //    document.getElementById("RenewalFeeValue").innerHTML = returnCommas(challanForStampVendor.APPLY_RENEWAL_FEE_Value);
    //    $('#RenewalFeeDiv').show();
    //    $('#RenewalFeeValues').show();
    //    totalPayableAmount += challanForStampVendor.APPLY_RENEWAL_FEE_Value;
    //}
    //else {
    //    $('#RenewalFeeDiv').hide();
    //    $('#RenewalFeeValues').hide();
    //}
    //if (challanForStampVendor.APPLY_SMART_CARD_FEE != null && challanForStampVendor.APPLY_SMART_CARD_FEE == true) {
    //    document.getElementById("SmartCardFeeValue").innerHTML = returnCommas(challanForStampVendor.APPLY_SMART_CARD_FEE_Value);
    //    $('#SmartCardFeeDiv').show();
    //    $('#SmartCardFeeValues').show();
    //    totalPayableAmount += challanForStampVendor.APPLY_SMART_CARD_FEE_Value;
    //}
    //else {
    //    $('#SmartCardFeeDiv').hide();
    //    $('#SmartCardFeeValues').hide();
    //}
    var totalPayableAmount = 0;
    totalPayableAmount = challanForStampVendor.AMOUNT_STRING;
    document.getElementById("totalPayableAmountText_1").innerHTML = returnCommas(totalPayableAmount);
    if (challanForStampVendor.STAMP_STATUS == "VENDOR ISSUED")
    {
        challanForStampVendor.STAMP_STATUS = "Stamp Issued"
    } 
    
    document.getElementById("issueDateText_1").innerHTML = challanForStampVendor.STAMP_ISSUE_DATE;
    document.getElementById("stampStatusText_1").innerHTML =challanForStampVendor.STAMP_STATUS;
    document.getElementById("stampExpiryText_1").innerHTML = challanForStampVendor.STAMP_EXPIRY_DATE;

    document.getElementById("VendorName").innerHTML = challanForStampVendor.VENDOR_NAME;
    document.getElementById("VendorLicense").innerHTML = challanForStampVendor.VENDOR_LICENSE_NUMBER;
    debugger;
    //Applicant Details
    var Party1 = makePersonObject(challanForStampVendor);
    $('#ApplicantDataGridForSerial').kendoGrid({
        columns: [{ title: Name, field: "PersonName", width: "250px" },
            { title: CNIC, field: "PersonCnic", width: "250px" },
            //{ field: "PersonPhone", title: Contact, width: "250px" },
            {
                command: [{
                    text: "",
                    name: "edit",
                    className: "edit-btn-center-adjustment",
                    imageClass: "fa fa-eye",
                    click: applicantDetails
                }
                ], width: "50px"
                , attributes: { class: "ob-center" }
            }
        ],

        dataSource: {
            data: Party1
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false
    });

   

    var Denomination = makeDenominationObject(challanForStampVendor); 
    $('#DenominationDataGridForSerial').kendoGrid({
        columns: [{ title: "Serial #", field: "Serial", width: "250px" },
             { title: "Stamp Serial Number", field: "StampSerial", width: "250px" },
            { title: "Denomination", field: "DenominationName", width: "250px" },
            //{ title: "Purpose", field: "DenominationPurpose", width: "250px" },

            //{
            //    command: [{
            //        text: "",
            //        name: "edit",
            //        className: "edit-btn-center-adjustment",
            //        imageClass: "fa fa-eye",
            //        click: applicantDetails
            //    }
            //    ], width: "50px"
            //    , attributes: { class: "ob-center" }
            //}
        ],

        dataSource: {
            data: Denomination
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false
    });

    //return totalPayableAmount;
}

function applicantDetails(d) {
    var grid = $('#ApplicantDataGridForSerial').data("kendoGrid");

    d.preventDefault();
    debugger;
    var dataItem = this.dataItem($(d.currentTarget).closest("tr"));
   
    document.getElementById("applicantNameText").innerHTML = dataItem.PersonName;
    document.getElementById("applicantCNICText").innerHTML = dataItem.PersonCnic;
    //document.getElementById("applicantContactText").innerHTML = dataItem.PersonPhone;
  //  document.getElementById("applicantEmailText").innerHTML = dataItem.PersonAddress;
   

    $("#applicantDetailedWindow").data("kendoWindow").title(applicantInfoLabel).center().open();
}


function PrintChallan() {  
    
    //  var myWindow = window.open('../GeneratePDF/Challan/' + serial, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
 // window.location = '/GeneratePDF/Challan1/?id=' + serial + '&AdhesiveStamp=abc';
 
     //   window.location = '../GeneratePDF/Challan1/' + serial;
   // }
    //myWindow.focus();        //myWindow.print();
    //myWindow.close();
    window.location = '../GeneratePDF/Challan1/' + stampNumber;
}

function addDashesInCNIC(f) {
    f = f.substr(0, 5) + "-" + f.substr(5, 7) + "-" + f.substr(12, 1);
    return f;
}
function addDashesInContact(f) {
    f = f.substr(0, 4) + "-" + f.substr(4, 7);
    return f;
}
function isValid() {
    var res = true;
    var captchaObj = $("#CaptchaCode").get(0).Captcha;
    if ($("#CaptchaCode").val() == "") {
        captchaObj.ReloadImage();
        $("#captchaError").show();
        document.getElementById("captchaError").innerHTML = CaptchaisRequired;
        res = false;
    }
    if (!res) {
        return;
    }

    // get client-side Captcha object instance
    var captchaObj = $("#CaptchaCode").get(0).Captcha;
    if ($("#CaptchaCode").val() == "") {
        captchaObj.ReloadImage();
        $("#captchaError").show();
        document.getElementById("captchaError").innerHTML = CaptchaisRequired;
        res = false;
    }
    else {
        // gather data required for Captcha validation
        var params = {}
        params.CaptchaId = captchaObj.Id;
        params.InstanceId = captchaObj.InstanceId;
        params.UserInput = $("#CaptchaCode").val();

        // make asynchronous Captcha validation request
        $.getJSON('../ChallanFormView/CheckCaptcha', params, function (result) {
            console.log("Result : " + result);
            if (true === result) {
                $("#captchaError").show();
                document.getElementById("captchaError").innerHTML = "";

                var challanModel = getChallanModel(challan);
                SubmitChallan(challanModel);

            } else {
                $("#captchaError").show();
                document.getElementById("captchaError").innerHTML = InvalidCodeEntered;
                // always change Captcha code if validation fails
                captchaObj.ReloadImage();
                res = false;
            }
        });
    }
    console.log("Final : " + res);
    return res;
}

function saveChallan() {
    isValid();
}

function SubmitChallan(challanModel) {

    $("#waitModalForSave").modal();
    $.ajax({
        type: 'POST',
        url: base_url_service_layer + '/api/Proxy/StampVendor/AddChallan?licenseNumber=' + licenseNumber + '&cnic=' + vendorCNIC,
        data: JSON.stringify(challanModel),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            console.log("" + data.ChallanNumber);
           
            $('#searchChallandiv').hide();
            $('#confirmChallan').show();

            printSerial = data.ChallanNumber;
            document.getElementById("serialNum").innerHTML = printSerial;
            console.log(printSerial);
            $("#waitModalForSave").modal('hide');
        },
        error: function (data) {
            var response = data.responseText.replace(/"/g, '');
            alert(response);
            $("#waitModalForSave").modal('hide');
        }
    });
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

function getChallanModel(challanFromDB) {
    
    var ApplicantData = [{
        PersonName: challanFromDB.NAME,
        IsPrimary: true,
        IsThroughPowerOfAttorney: false,
        PersonCnic: challanFromDB.CNIC,
        PersonEmail: challanFromDB.EMAIL,
        PersonAddress: challanFromDB.ADDRESS,
        PersonPhone: challanFromDB.CONTACT_NO,
        RelationName: challanFromDB.RELATION_NAME,
        RelationId: challanFromDB.RELATION_ID,
        RelationString: challanFromDB.RELATION_STRING,
        NameString: challanFromDB.NAME + " " + challanFromDB.RELATION_STRING + " " + challanFromDB.RELATION_NAME,
        IsPrimaryString: true
    }]
    var deedInfoModel = {
        IsCalculateSum: false
    };
    var challan1 = {
        AgentName: "",
        AgentCnic: "",
        AgentEmail: "",
        AgentCell: "",
        RegistrationFeeString: "",
        PayableCvtString: "",
        PayableStampDutyString: "",
        SuitFor: "",
        TransactionType: "",
        TransactionTypeString: "",
        TransactionName: "",
        TransactionNameString: "",

        DistrictId: challanFromDB.DISTRICT_ID,
        DistrictString: challanFromDB.DISTRICT_NAME,
        TehsilId: challanFromDB.TEHSIL_ID,
        TehsilString: challanFromDB.TEHSIL_NAME,
        
        applyRegistrationDuty: false,
        applyCVT: false,
        applyStampDuty: false, 
        DCValuationType: false,
        ActualDCValue: false,

        numberOfStampPapers: null,                            
        leasePeriod: "",                                    
        TotalLeaseMoney: null,
        deficientAmount: "",                                
        penalty: "",                                         
        totalDeficient: "",                                 
        ChallanAmountPaidByString: null,
        StampDutyPaidBy: "",
        Party2: null,
        Party1: ApplicantData,
        TotalAmount: "",
        stampModel: null,
        propertyInfo: null,
        propertyInfo2: null,
        AdvanceMoney: "",
        Premium: "",
        TotalAmountOfDuties: 0,
        ChallanType: "Stamp Vendor",
        isPurchaser: false,
        AmountLabelText: "",
        isPropertyInfoApplicable: false,
        isCVTandNotDC: false,
        isPowerOfAttorney: false,
        visitorNumber: null,
        lstTaxAmountValue: AmountsData,
        DeedInfo: deedInfoModel,
        isMultiplePropertiesExchageOfProperty: false,
        isExchangeOfProperty: false,
        RegistryFeeString: "",
        RegistryFee: null,
        isRegistryFeeCheck: false,
        isDCFirstScreen: false,
        oldRegistryDate: "",
        oldRegistryNumber: null,
        isLeaseYearLessThan20: false
    }
    challan1.RegistrationFeeString = null;
    challan1.PayableCvtString = null;
    challan1.PayableStampDutyString = null;
    challan1.isOldRegistryChallan = false;
    return challan1;
   

}
