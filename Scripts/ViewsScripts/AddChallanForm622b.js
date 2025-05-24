var queryStringName = "";
var queryStringvCount = -1;

var Party1Label = FirstParty;
var Party2Label = SecondParty;
//Global Variables
var isDCValuationFlag = false;
var isAhleCommissionFlag = false;
var origianlDCValue = false;
var challan;
var deficientCVTDivVisible = false;
var deficientRegisDivVisible = false;
var challanFromDB;
var challanModel;
var printSerial = ";"
var count_of_seller = 1;
var count_of_purchaser = 1;
var TypeFlag = "";

var circleName = getUrlParameter('name');

var numberOfStampsdata = [
                            { Name: "2", Id: "2" },
                            { Name: "3", Id: "3" },
                            { Name: "4", Id: "4" },

];
var Id;
var exemptCVTforGiftDeed = false;
var updateFlag = false;
var isCVTApplicable = false;
var isLeasePeriod = false;
var isLegalHeir = false;
var TotalAmountLabel = "Property Valuation";
var isRegFeeApplicable = false;
var isPropertyInfo = false;
var leasePeriodDeeds = [];// Merger of Duties change. No more Lease Period now;  //[85, 87, 90, 91, 92, 94, 115];
var isRegFeeMandatory = false;
var isTotalLeaseMoney = false;
var TotalLeaseMoneyDeeds = [];// Merger of Duties change. No more Total Lease Money now; now; [85, 86, 87, 90, 91, 92, 94];

//var isDCGreater = true;
//var isDCGreater2 = false;

var isDCGreater = true;
var isDCGreater2 = false;

var AdvanceMoneyDeedId = 92;
var PremiumDeedId = 94;

var leaseDeedsWithAdvanceMoney = [92]; // Deed 90 is removed because Advance Money field is treated as Main field PropertyValuationGenerateChallan;
// Merger of Duties Change // [83, 84, 85, 86, 87, 91, 92, 93, 94];

var ResidentialId = 4;
var legalHeirDeeds = [41];//0 [82, 106, 107];//0 Legal Hier Deed removed

var exchangeOfPropertyDeedId = 31;

var Lease353ADeedId = 92;
var Lease353BDeedId = 94;

var PartitionDeed = 51;

var isExchangeOfProperty = false;
var isDCNextFirstScreen = true;
var isCVTNextFirstScreen = true;
var judicialID = 1;
var isPowerOfAttorney = false;
var IsOverseas = false;
var PowerOfAttorneyDeedId = 107;
var agreementRelatingtoDeposit6ai = 48;
var PowerOfAttorneyDeed48bbId = 108;
var deficientRegCheck;
var regCheck;

var cvtCheck;
var deficientCvtCheck;

var isCVTandNotDC = false;
var isFixedStamp = false;
var FixedStampValue = "";
var isFixedRegistration = false;
var FixedRegistrationValue = "";
var firstTenYears = [86, 87];

var deedAmountsModel;
var numberOfAmounts = 0;
var IsLandAndConstructed = false;
var isLease35c = false;
var Lease35cDeeds = [92, 94, 83, 84, 85, 86, 87, 91, 93]; // 90 is not included as Advance Money is already generated as part of primary amount.
var isLeaseOtherThan35c = false;
var LeaseOtherThan35c = [85, 86, 87, 90, 91];
var SecondAmountLeaseOtherThan35c = [85, 87, 90, 91];
var isSecondAmountLeaseOtherThan35c = false;
var maxJudicialAmount = 15000;
var minJudicialAmount = 21;
var isMultiplePropertiesExchageOfProperty = false;
var isLeaseYearLessThan20 = false;
var LandValueLabel = landValueRs;//'Land Value';
var GiftDeedId = 111111111;
//var isCalculateSum = false;
var ispurchaser = false;

var isLegalHeirForGiftDeed = false;

var AmountsData = [

];

var SellerData = [

];
var PurchaserData = [

];

var secondPropertyIDCounter = 0;
var secondPropertyIDArray = [

];

var firstProperty = FirstProperty;
var secondProperty = SecondProperty;
var areDeedDetailsFieldsCreated = false;
var CVTCheckForStepBarOnly = false;
var isChallanFirst = true;
var tempLandValue = 0;
var isRegistryFeeCheck = false;
var isAhleCommissionFeeCheck = false;
var DigitalScaningFee = false;
var MutationFee = false;
var RegFeeNew = false;
var challanPaidStatus = ChallanPaid;
var challanRefundCancelled = RefundCancelled;
var challanRefundInitiated = RefundInitiated;
var challanRefundCompleted = RefundCompleted;
var challanGenerated = ChallanGenerated;
var oralMutationDeedId = "1000000091";
var cvtRegistrationDeedId = "1000000099";
var certificateOfSaleDeedId = "63";
var DebentureDeed = "18"
var TransferaDeed = "64"
var LifeInsuranceDeed = "76"
var cvtDutyStatus = "";
var regFeeDutyStatus = "";
var defCvtDutyStatus = "";
var defRegFeeDutyStatus = "";
var oldRegDateSelected;
//var awardDeedId = "51";
var challanHighestTotal = 0;
var challanPropertyValue = 0;
var immoveableDeedId = "116";

// 
var ePay_GetToken_API_url = "https://stagingapi.epay.punjab.gov.pk:8448/sindhGateway/api/open";
var ePay_GetToken_API_SecretKey = "wsgaNy1Kshca7BWadkvbsUsO017a2jWxLswpvJogZUGuiiKuXKhzQwQxd8eY";
var ePay_GetToken_API_ClientId = "pXqYKTn7Y5b";
var ePay_GetPSID_API_url = "https://stagingapi.epay.punjab.gov.pk:8448/sindhGateway/api/protected";


//
function PrintChallan() {
    window.location = '../GeneratePDF/Challan/' + printSerial;
}

function GeneratePSIDOriginal() {

    debugger
    var testModel;
    var ePaytoken;
    // var time = new Date().getTime(1713775467000); // get your number

    // Ajax call to get the Saved challan data
    $.ajax({
        type: "GET",
        url: base_url_service_layer + '/api/Proxy/WhitePaper/GetWhitePaperChallan?ChallanNumber=' + $('#serialNum').text(),
        headers: {
            "Content-Type": "application/json",
            'api-key': '2D125F921B486B31EE87AF9229963'
        },
        success: function (data) {
            debugger
            testModel = data;
            var postingObj = {};
            var tokenDbExpiryDate = testModel.Token_Expiry_DateTime;
            var chkdate;
            var currentDate = new Date();

            if (tokenDbExpiryDate != null && tokenDbExpiryDate != "") {
                chkdate = new Date(tokenDbExpiryDate);

                if (chkdate >= currentDate) {
                    console.log("valid token;")
                }
                else {
                    console.log("expire token;")
                }
            }
            if (testModel.PSID_Token && chkdate >= currentDate) {//if token is not empty
                debugger
                if (testModel != null) {
                    postingObj = {
                        deptTransactionId: testModel.ChallanNumber,
                        consumerName: testModel.Party1[0].PersonName,
                        mobileNo: testModel.Party1[0].PersonPhone.replace(/-/g, ''),
                        firstPartyCNIC: testModel.Party1[0].PersonCnic.replace(/-/g, ''),
                        secondPartyCNIC: "",
                        agentCNIC: "",
                        firstPartyName: testModel.Party1[0].PersonName,
                        secondPartyName: "",
                        agentPartyName: "",
                        districtID: testModel.DistrictId,
                        email: testModel.Party1[0].PersonEmail,
                        amountWithinDueDate: testModel.TotalAmountOfDuties,//100,
                        expiryDate: testModel.challanExpiryDate.split("T")[0],//"2024-12-05",
                        amountBifurcation: [
                            {
                                accountHeadName: "Stamp",
                                accountNumber: testModel.DutiesApplied[0].DutyAccountHead,
                                amountToTransfer: testModel.TotalAmountOfDuties,//100
                            }
                        ]
                    };
                }

                // Ajax call to get PSID using the token
                $.ajax({
                    type: "POST",
                    url: ePay_GetPSID_API_url,
                    data: JSON.stringify(postingObj),
                    contentType: "application/json",  // Specify the content type
                    dataType: "json",  // Specify the expected data type
                    headers: {
                        'Authorization': "Bearer " + testModel.PSID_Token,
                    },

                    success: function (data) {
                        debugger;
                        if (data != null && data.content[0].consumerNumber != null) {
                            var PSID = data.content[0].consumerNumber;
                            var date = new Date(testModel.Token_Expiry_DateTime);
                            date = date.toLocaleString();
                            //$('#PSIDString').text(PSID)
                            document.getElementById("PSIDString").innerHTML = "Your PSID is: " + " <span style=\"color:red;\">\"" + PSID + "\"</span>  ";

                            // Ajax call to get the Update the challan data PSID column
                            $.ajax({
                                type: "POST",
                                url: base_url_service_layer + '/api/Proxy/WhitePaper/UpdatePSIDByePayAPI?ChallanNumber=' + $('#serialNum').text() + "&PSID=" + PSID + "&Token=" + testModel.PSID_Token + "&TokenExpiry=" + date,//testModel.Token_Expiry_DateTime,

                                success: function (data) {

                                },
                                error: function (xhr, status, error) {
                                    alert(error)
                                    console.error(error);
                                }
                            });

                        }
                    },
                    error: function (xhr, status, error) {
                        debugger
                        alert(error)
                        console.log(error);
                    }
                });
            }  //token if ends here

            else {  // if token is empty
                var obj = {
                    clientId: "pXqYKTn7Y5b",
                    clientSecretKey: "wsgaNy1Kshca7BWadkvbsUsO017a2jWxLswpvJogZUGuiiKuXKhzQwQxd8eY"
                }
                // Ajax call to get the token
                $.ajax({
                    type: "POST",
                    url: "https://stagingapi.epay.punjab.gov.pk:8448/sindhGateway/api/open",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": "2D125F921B486B31EE87AF9229963" // This is where api-key header is set
                    },
                    data: JSON.stringify(obj),
                    contentType: "application/json",  // Specify the content type
                    dataType: "json",  // Specify the expected data type
                    crossDomain: true, // Enable CORS
                    success: function (data) {
                        debugger;
                        if (data != null && data.content[0].token.accessToken != null) {
                            var accessToken = data.content[0].token.accessToken;
                            var accessTokenExpiry = data.content[0].expiryDate;
                            // var date = testModel.challanExpiryDate.split("T")[0];

                            // Storing token
                            localStorage.setItem('ePaytoken', accessToken);

                            // Retrieving token



                            if (testModel != null) {
                                postingObj = {
                                    deptTransactionId: testModel.ChallanNumber,
                                    consumerName: testModel.Party1[0].PersonName,
                                    mobileNo: testModel.Party1[0].PersonPhone.replace(/-/g, ''),
                                    firstPartyCNIC: testModel.Party1[0].PersonCnic.replace(/-/g, ''),
                                    secondPartyCNIC: "",
                                    agentCNIC: "",
                                    firstPartyName: testModel.Party1[0].PersonName,
                                    secondPartyName: "",
                                    agentPartyName: "",
                                    districtID: testModel.DistrictId,
                                    email: testModel.Party1[0].PersonEmail,
                                    amountWithinDueDate: testModel.DutiesApplied[0].DutyAmount,//100,
                                    expiryDate: testModel.challanExpiryDate.split("T")[0],//"2024-12-05",
                                    amountBifurcation: [
                                        {
                                            accountHeadName: "Stamp",
                                            accountNumber: testModel.DutiesApplied[0].DutyAccountHead,
                                            amountToTransfer: testModel.DutiesApplied[0].DutyAmount,//100
                                        }
                                    ]
                                };
                            }

                            // Ajax call to get PSID using the token
                            $.ajax({
                                type: "POST",
                                url: ePay_GetPSID_API_url,
                                data: JSON.stringify(postingObj),
                                contentType: "application/json",  // Specify the content type
                                dataType: "json",  // Specify the expected data type
                                headers: {
                                    'Authorization': "Bearer " + accessToken,
                                },

                                success: function (data) {
                                    debugger;
                                    if (data != null && data.content[0].consumerNumber != null) {
                                        var PSID = data.content[0].consumerNumber;

                                        //$('#PSIDString').text(PSID)
                                        document.getElementById("PSIDString").innerHTML = "Your PSID is: " + " <span style=\"color:red;\">\"" + PSID + "\"</span>  ";

                                        // Ajax call to get the Update the challan data PSID column
                                        $.ajax({
                                            type: "POST",
                                            url: base_url_service_layer + '/api/Proxy/WhitePaper/UpdatePSIDByePayAPI?ChallanNumber=' + $('#serialNum').text() + "&PSID=" + PSID + "&Token=" + accessToken + "&TokenExpiry=" + accessTokenExpiry,

                                            success: function (data) {

                                            },
                                            error: function (xhr, status, error) {
                                                alert(error)
                                                console.error(error);
                                            }
                                        });

                                    }
                                },
                                error: function (xhr, status, error) {
                                    debugger
                                    alert(error)
                                    //console.error(error);
                                }
                            });
                        } else {

                        }
                    },
                    error: function (xhr, status, error) {
                        debugger
                        alert(error)
                        console.error(error);
                    }
                });
            }//token else ends here

        },
        error: function (xhr, status, error) {
            debugger
            alert(error)
            console.error(error);
        }
    });

}


function GeneratePSIDSample() {
    var obj = {
        clientId: "pXqYKTn7Y5b",
        clientSecretKey: "wsgaNy1Kshca7BWadkvbsUsO017a2jWxLswpvJogZUGuiiKuXKhzQwQxd8eY"
    }
    debugger;
    $.ajax({
        type: "POST",
        url: "../Test/ProxyPostRequest",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType: "json",

        crossDomain: true,
        success: function (data) {
            // Code for success
            console.log(data);
            if (data != null && data.content[0].token.accessToken != null) {
                var accessToken = data.content[0].token.accessToken;
                var accessTokenExpiry = data.content[0].expiryDate;
                // var date = testModel.challanExpiryDate.split("T")[0];

                // Storing token
                localStorage.setItem('ePaytoken', accessToken);

                // Retrieving token



                if (testModel != null) {
                    postingObj = {
                        deptTransactionId: testModel.ChallanNumber,
                        consumerName: testModel.Party1[0].PersonName,
                        mobileNo: testModel.Party1[0].PersonPhone.replace(/-/g, ''),
                        firstPartyCNIC: testModel.Party1[0].PersonCnic.replace(/-/g, ''),
                        secondPartyCNIC: "",
                        agentCNIC: "",
                        firstPartyName: testModel.Party1[0].PersonName,
                        secondPartyName: "",
                        agentPartyName: "",
                        districtID: testModel.DistrictId,
                        email: testModel.Party1[0].PersonEmail,
                        amountWithinDueDate: testModel.DutiesApplied[0].DutyAmount,//100,
                        expiryDate: testModel.challanExpiryDate.split("T")[0],//"2024-12-05",
                        amountBifurcation: [
                            {
                                accountHeadName: "Stamp",
                                accountNumber: testModel.DutiesApplied[0].DutyAccountHead,
                                amountToTransfer: testModel.DutiesApplied[0].DutyAmount,//100
                            }
                        ]
                    };
                }

                // Ajax call to get PSID using the token
                $.ajax({
                    type: "POST",
                    url: ePay_GetPSID_API_url,
                    data: JSON.stringify(postingObj),
                    contentType: "application/json",  // Specify the content type
                    dataType: "json",  // Specify the expected data type
                    headers: {
                        'Authorization': "Bearer " + accessToken,
                    },

                    success: function (data) {
                        debugger;
                        if (data != null && data.content[0].consumerNumber != null) {
                            var PSID = data.content[0].consumerNumber;

                            //$('#PSIDString').text(PSID)
                            document.getElementById("PSIDString").innerHTML = "Your PSID is: " + " <span style=\"color:red;\">\"" + PSID + "\"</span>  ";

                            // Ajax call to get the Update the challan data PSID column
                            $.ajax({
                                type: "POST",
                                url: base_url_service_layer + '/api/Proxy/WhitePaper/UpdatePSIDByePayAPI?ChallanNumber=' + $('#serialNum').text() + "&PSID=" + PSID + "&Token=" + accessToken + "&TokenExpiry=" + accessTokenExpiry,

                                success: function (data) {

                                },
                                error: function (xhr, status, error) {
                                    alert(error)
                                    console.error(error);
                                }
                            });

                        }
                    },
                    error: function (xhr, status, error) {
                        debugger
                        alert(error)
                        //console.error(error);
                    }
                });
            } else {

            }

        },
        error: function (xhr, status, error) {
            alert(error);
            // Code for error
        }
    });

}

function removeSpecificSubstring(inputString) {
    // Define the pattern to remove "B-02701" and any dashes
    var pattern = /B-02701|-/g;

    // Replace the pattern with an empty string
    var result = inputString.replace(pattern, '');

    return result;
}

function GeneratePSID() {

    debugger
    var testModel;
    var ePaytoken;
    // var time = new Date().getTime(1713775467000); // get your number
    $("#PrintChallanBtn").hide();
    // Ajax call to get the Saved challan data
    //$("#waitModalForSave").modal('show');
    $.ajax({
        type: "GET",
        url: base_url_service_layer + '/api/Proxy/WhitePaper/GetWhitePaperChallan?ChallanNumber=' + $('#serialNum').text(),
        headers: {
            "Content-Type": "application/json",
            'api-key': '2D125F921B486B31EE87AF9229963'
        },
        success: function (data) {
            debugger;
            testModel = data;
            var postingObj = {};
            var tokenDbExpiryDate = testModel.Token_Expiry_DateTime;
            var accessToken = testModel.PSID_Token;
            var chkdate;
            var currentDate = new Date();

            if (tokenDbExpiryDate != null && tokenDbExpiryDate != "") {
                chkdate = new Date(tokenDbExpiryDate);

                if (chkdate >= currentDate) {
                    console.log("valid token;")
                }
                else {
                    console.log("expire token;")
                }
            }
            if (testModel.PSID_Token && chkdate >= currentDate) {//if token is not empty
                if (testModel != null) {
                    var cnic = "";
                    var phone = "";
                    var secondPartyCinc = "";
                    if (testModel.Party1[0].person_type != "Company") {
                        cnic = testModel.Party1[0].PersonCnic.replace(/-/g, '');
                        phone = testModel.Party1[0].PersonPhone.replace(/-/g, '');
                    }
                    else {
                        cnic = testModel.Party1[0].NTN;
                        phone = "11111111111";
                    }

                    if (testModel.Party2[0].person_type != "Company") {
                        secondPartyCinc = testModel.Party2[0].PersonCnic.replace(/-/g, '');
                    }
                    debugger;
                    postingObj = {
                        accessToken: testModel.PSID_Token,
                        deptTransactionId: testModel.ChallanNumber,
                        consumerName: testModel.Party1[0].PersonName,
                        mobileNo: phone,
                        firstPartyCNIC: cnic,
                        secondPartyCNIC: secondPartyCinc,
                        agentCNIC: testModel.AgentCnic,
                        firstPartyName: testModel.Party1[0].PersonName,
                        secondPartyName: testModel.Party2[0].PersonName,
                        agentPartyName: testModel.AgentName,
                        districtID: testModel.DistrictId,
                        email: testModel.Party1[0].PersonEmail,
                        amountWithinDueDate: testModel.TotalAmountOfDuties,//100,
                        expiryDate: testModel.challanExpiryDate.split("T")[0],//"2024-12-05",
                        amountBifurcation: []

                    };

                    // Loop through the DutiesApplied array
                    for (let i = 0; i < testModel.DutiesApplied.length; i++) {
                        //var str = testModel.DutiesApplied[i].DutyAccountHead; // Example string
                        //var result = str.includes("B-") ? str.replace("B-", "B") : str;
                        postingObj.amountBifurcation.push({
                            accountHeadName: testModel.DutiesApplied[i].DutyType,
                            accountNumber: testModel.DutiesApplied[i].ADCAccountNumber,//testModel.DutiesApplied[i].DutyAccountHead.replace(/-/g, ''),
                            amountToTransfer: testModel.DutiesApplied[i].DutyAmount
                            //ADCAccountNumber: testModel.DutiesApplied[i].ADCAccountNumber
                        });

                        // Sum up the amountWithinDueDate
                        // postingObj.amountWithinDueDate += testModel.DutiesApplied[i].DutyAmount;
                    }
                }



                // Ajax call to get PSID using the token
                $.ajax({
                    type: "POST",
                    url: "../Test/ProxyPostRequestPSID",
                    data: JSON.stringify(postingObj),
                    contentType: "application/json",  // Specify the content type
                    dataType: "json",  // Specify the expected data type                

                    success: function (data) {
                        debugger;
                        if (data.error != null) {

                            if (data.error == 'Response status code does not indicate success: 401 ().') {
                                $("#PSIDMessage").show();
                                document.getElementById("PSIDString").innerHTML = "Un-Athorized Access Need to Generate Token Again";
                                $("#waitModalForSave").modal('hide');
                            } else { 
                                $("#PSIDMessage").show();
                            //    document.getElementById("PSIDString").innerHTML = "Error generating PSID. Please regenerate the challan without selecting the \"Online\" payment option. This will allow you to proceed with an alternative payment method.";
                                var psidStringElement = document.getElementById("PSIDString");
                                psidStringElement.innerHTML = "Error generating PSID. Please regenerate the challan without selecting the \"Online\" payment option. This will allow you to proceed with an alternative payment method.";
                                psidStringElement.style.color = "red"; // Change the text color to red
                                $("#waitModalForSave").modal('hide');
                                $("#PrintChallanBtn").hide(); 

                            }
                        }
                        else {
                            $("#PrintChallanBtn").show();
                            var jsonData = JSON.parse(data);
                          

                            if (jsonData != null && jsonData.content[0].consumerNumber != null) {
                                var PSID = jsonData.content[0].consumerNumber;

                                //$('#PSIDString').text(PSID)
                                $("#PSIDMessage").show();
                                document.getElementById("PSIDString").innerHTML = "Your PSID is: " + " <span style=\"color:red;\">\"" + PSID + "\"</span>  ";
                                $("#waitModalForSave").modal('hide');
                                $("#waitModalForSave").modal('hide');
                                // Ajax call to get the Update the challan data PSID column
                                $.ajax({
                                    type: "POST",
                                    url: base_url_service_layer + '/api/Proxy/WhitePaper/UpdatePSIDByePayAPI?ChallanNumber=' + $('#serialNum').text() + "&PSID=" + PSID + "&Token=" + accessToken + "&TokenExpiry=" + tokenDbExpiryDate,

                                    success: function (data) {

                                    },
                                    error: function (xhr, status, error) {
                                        alert(error)
                                        console.error(error);
                                    }
                                });

                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        debugger
                        alert(error)
                        //console.error(error);
                    },
                    complete: function (xhr, status) {
                        // Code that runs regardless of success or error (optional)
                        console.log("Request completed with status: abc");
                        $("#waitModalForSave").modal('hide');
                    }
                });
            }  //token if ends here

            else {  // if token is empty
                var obj = {
                    clientId: "QseFrZwX4!5",
                    clientSecretKey: "4!bgtQ1Kshca7BWad58nYvRO017a2jWxLswpvJogZUGuiiKuXKhzQw6BygfR"
                }
                debugger;
                $.ajax({
                    type: "POST",
                    url: "../Test/ProxyPostRequest",
                    data: JSON.stringify(obj),
                    contentType: "application/json",
                    dataType: "json",

                    crossDomain: true,
                    success: function (data) {
                        // Code for success
                       


                        if (data.error != null) {
                            $("#PSIDMessage").show();
                            document.getElementById("PSIDString").innerHTML = "Error generating PSID. Please regenerate the challan without selecting the \"Online\" payment option. This will allow you to proceed with an alternative payment method.";
                            $("#waitModalForSave").modal('hide');
                            $("#PrintChallanBtn").hide(); 


                        }
                       // $("#PrintChallanBtn").show();
                        console.log(data);
                        var jsonData = JSON.parse(data);

                        if (jsonData != null && jsonData.content[0].token.token != null) {

                            var accessToken = jsonData.content[0].token.token;
                            var accessTokenExpiry = jsonData.content[0].expiryDate;
                            // var date = testModel.challanExpiryDate.split("T")[0];

                            // Storing token
                            localStorage.setItem('ePaytoken', accessToken);

                            // Retrieving token



                            if (testModel != null) {
                                var cnic = "";
                                var phone = "";
                                var secondPartyCinc = "";
                                if (testModel.Party1[0].person_type != "Company") {
                                    cnic = testModel.Party1[0].PersonCnic.replace(/-/g, '');
                                    phone = testModel.Party1[0].PersonPhone.replace(/-/g, '');
                                }
                                else {
                                    cnic = testModel.Party1[0].NTN;
                                    phone = "11111111111";
                                }

                                if (testModel.Party2[0].person_type != "Company") {
                                    secondPartyCinc = testModel.Party2[0].PersonCnic.replace(/-/g, '');
                                }
                                debugger;
                                debugger;
                                postingObj = {
                                    accessToken: accessToken,
                                    deptTransactionId: testModel.ChallanNumber,
                                    consumerName: testModel.Party1[0].PersonName,
                                    mobileNo: phone,
                                    firstPartyCNIC: cnic,
                                    secondPartyCNIC: secondPartyCinc,
                                    agentCNIC: testModel.AgentCnic,
                                    firstPartyName: testModel.Party1[0].PersonName,
                                    secondPartyName: testModel.Party2[0].PersonName,
                                    agentPartyName: testModel.AgentName,
                                    districtID: testModel.DistrictId,
                                    email: testModel.Party1[0].PersonEmail,
                                    amountWithinDueDate: testModel.TotalAmountOfDuties,//100,
                                    expiryDate: testModel.challanExpiryDate.split("T")[0],//"2024-12-05",
                                    amountBifurcation: []

                                };

                                // Loop through the DutiesApplied array
                                for (let i = 0; i < testModel.DutiesApplied.length; i++) {
                                    //var str = testModel.DutiesApplied[i].DutyAccountHead; // Example string
                                    //var result = str.includes("B-") ? str.replace("B-", "B") : str;
                                    postingObj.amountBifurcation.push({
                                        accountHeadName: testModel.DutiesApplied[i].DutyType,
                                        accountNumber: testModel.DutiesApplied[i].ADCAccountNumber,//testModel.DutiesApplied[i].DutyAccountHead.replace(/-/g, ''),
                                        amountToTransfer: testModel.DutiesApplied[i].DutyAmount
                                        //ADCAccountNumber: testModel.DutiesApplied[i].ADCAccountNumber
                                    });
                                    // Sum up the amountWithinDueDate
                                    // postingObj.amountWithinDueDate += testModel.DutiesApplied[i].DutyAmount;
                                }
                            }

                            // Ajax call to get PSID using the token
                            $.ajax({
                                type: "POST",
                                url: "../Test/ProxyPostRequestPSID",
                                data: JSON.stringify(postingObj),
                                contentType: "application/json",  // Specify the content type
                                dataType: "json",  // Specify the expected data type
                                headers: {
                                    'Authorization': "Bearer " + accessToken,
                                },

                                success: function (data) {
                                    if (data.error != null) {
                                        $("#waitModalForSave").modal('hide');
                                        if (data.error == "Response status code does not indicate success: 400 ().") {
                                            $("#PSIDMessage").show();
                                            document.getElementById("PSIDString").innerHTML = "Un-Athorized Access Need to Generate Token Again";
                                            $("#waitModalForSave").modal('hide');
                                        } else {
                                            $("#PSIDMessage").show();
                                            document.getElementById("PSIDString").innerHTML = "Error generating PSID. Please regenerate the challan without selecting the \"Online\" payment option. This will allow you to proceed with an alternative payment method.";
                                            $("#waitModalForSave").modal('hide');
                                            $("#PrintChallanBtn").hide(); 


                                        }
                                    }
                                    else {
                                        debugger;
                                        $("#PrintChallanBtn").show();
                                        var jsonData = JSON.parse(data);
                                        if (jsonData != null && jsonData.content[0].consumerNumber != null) {
                                            var PSID = jsonData.content[0].consumerNumber;

                                            //$('#PSIDString').text(PSID)
                                            $("#PSIDMessage").show();
                                            document.getElementById("PSIDString").innerHTML = "Your PSID is: " + " <span style=\"color:red;\">\"" + PSID + "\"</span>  ";
                                            $("#waitModalForSave").modal('hide');
                                            // Ajax call to get the Update the challan data PSID column
                                            $.ajax({
                                                type: "POST",
                                                url: base_url_service_layer + '/api/Proxy/WhitePaper/UpdatePSIDByePayAPI?ChallanNumber=' + $('#serialNum').text() + "&PSID=" + PSID + "&Token=" + accessToken + "&TokenExpiry=" + accessTokenExpiry,

                                                success: function (data) {
                                                    debugger;
                                                },
                                                error: function (xhr, status, error) {
                                                    alert(error)
                                                    console.error(error);
                                                }
                                            });

                                        }
                                    }
                                },
                                error: function (xhr, status, error) {
                                    debugger
                                    alert(error)
                                    //console.error(error);
                                },
                                complete: function (xhr, status) {
                                    // Code that runs regardless of success or error (optional)
                                    console.log("Request completed with status: abc");
                                    $("#waitModalForSave").modal('hide');
                                }
                            });
                        }
                    

                        else {
                            alert("not in condition");
                        }

                    },
                    error: function (xhr, status, error) {
                        alert(error);
                        // Code for error
                    }
                });
            }//token else ends here

        },
        error: function (xhr, status, error) {
            debugger
            alert(error)
            console.error(error);
        }
    });

}

function englishToUrdu_AddChallan() {
    $('#districtFloatingLbl').html('ضلع');
    $('#tehsilFloatingLbl').html('تحصیل');
    $('#stampPaperTypeFloatingLbl').html('اسٹامپ پیپرکی قسم');
    $('#deedNameFloatingLbl').html('Deed Name');
    $('#saleDeedNoteLbl').html(ForSaleDeedpleaseuseConveyance);
    $('#districtFloatingLblReadOnly').html('District');
    $('#tehsilFloatingLblReadOnly').html('Tehsil');
    $('#stampPaperTypeFloatingLblReadOnly').html('Stamp Paper Type');
    $('#deedNameFloatingLblReadOnly').html('Deed Name');
    $('#oldRegNumFloatingLbl').html('Old Registry Number');
    $('#oldRegDateFloatingLbl').html('Old Registry Date');
    $('#agentNameFloatingLbl').html('Agent Name');
    $('#agentCnicFloatingLbl').html('Agent CNIC');
    $('#agentContactFloatingLbl').html('Agent Contact');
    $('#agentEmailFloatingLbl').html('Agent Email');
}
function urduToEnglish_AddChallan() {
    $('#districtFloatingLbl').html('District');
    $('#tehsilFloatingLbl').html('Tehsil');
    $('#stampPaperTypeFloatingLbl').html('Stamp Paper Type');
    $('#deedNameFloatingLbl').html('Deed Name');
    $('#saleDeedNoteLbl').html(ForSaleDeedpleaseuseConveyance);
    $('#districtFloatingLblReadOnly').html('District');
    $('#tehsilFloatingLblReadOnly').html('Tehsil');
    $('#stampPaperTypeFloatingLblReadOnly').html('Stamp Paper Type');
    $('#deedNameFloatingLblReadOnly').html('Deed Name');
    $('#oldRegNumFloatingLbl').html('Old Registry Number');
    $('#oldRegDateFloatingLbl').html('Old Registry Date');
    $('#agentNameFloatingLbl').html('Agent Name');
    $('#agentCnicFloatingLbl').html('Agent CNIC');
    $('#agentContactFloatingLbl').html('Agent Contact');
    $('#agentEmailFloatingLbl').html('Agent Email');
}


function showDeeds() {

    $.ajax({
        url: base_url_service_layer + '/api/Proxy/ChallanForm/GetDeedsList',
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        success: function (data) {

            var DeedsList = [];

            for (i = 0; i < data.length; i++) {
                var deedsListdata =
                    {
                        StampActArticle: data[i].StampActArticle,
                        DeedName: data[i].DeedName,
                        Description: data[i].Description,
                        StampDutyRuleInAct: data[i].StampDutyRuleInAct
                    }
                DeedsList.push(deedsListdata);
            }
            initilizeDeedDetailsGrids(DeedsList);
            //  $('#deedsListGrid').data('kendoGrid').refresh();
            $('#deedsListGrid').data('kendoGrid').dataSource.data(DeedsList);
            $('#deedsListGrid').data('kendoGrid').refresh();

            $("#deedsWindow").data("kendoWindow").center().open();
            $('#deedsListGrid').show();

        },
        error: function (data) {
            $('#deedsListGrid').hide();
        }
    });
}

function initilizeDeedDetailsGrids(DeedsList) {
    // var DeedsList = [];
    $("#deedsListGrid").kendoGrid({

        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false,
        height: 650,

        columns: [
             { field: "StampActArticle", title: "Stamp Act Article", width: "200px", encoded: false },
            { field: "DeedName", title: "Deed Name", width: "250px", encoded: false },
           { field: "Description", title: "Description", width: "250px", encoded: false },
           { field: "StampDutyRuleInAct", title: "Stamp Duty Rule", width: "250px", encoded: false },

        ]
        ,
        dataSource: {
            data: DeedsList,
            schema: {
                model: {
                    fields: {
                        StampActArticle: { type: "string" },
                        DeedName: { type: "string" },
                        Description: { type: "string" },
                        StampDutyRuleInAct: { type: "string" }
                    }
                }
            },
            //pageSize: 5
        },

    });


}

function PersonTypeChange() {
    var $radio = $('input[name=PersonType]:checked');
    var id = $radio.attr('id');
    var personAddress = document.getElementById('PersonAddress');
    
    ResetPersonForm();

    if (id == 'Company') {
        $("#ContactEmailDivRow").hide();
        $("#RelationsRowDiv").hide();
        $("#overSeasDiv").hide();
        $("#throughAttorneyDiv").hide();
        $("#cnicPersonEditForm").hide();
        //$("#cnicPersonEditForm").hide();
        $("#NTNEditForm").show();
        $("#ThroughPowerOfAttorenySpan").hide();
      //  $("#PersonAddress").attr('required', true);
        personAddress.setAttribute("required", "required");   
    } else {
        $("#NTN_validationMessage").hide();
        $("#ContactEmailDivRow").show();
        $("#RelationsRowDiv").show();
        $("#overSeasDiv").show();
        $("#throughAttorneyDiv").show();
        $("#cnicPersonEditForm").show();
        //$("#cnicPersonEditForm").show();
      //  $("#PersonAddress").attr('required', false);
        $("#NTNEditForm").hide();
        $("#ThroughPowerOfAttorenySpan").show();
        personAddress.removeAttribute("required");




    }

}




function PersonLocationTypeChange() {
    var $radio = $('input[name=PersonType]:checked');
    var id = $radio.attr('id');


    if (id == 'Company') {
        $("#ContactEmailDivRow").hide();
        $("#RelationsRowDiv").hide();
        $("#cnicPersonEditForm").hide();
        //$("#cnicPersonEditForm").hide();
        $("#NTNEditForm").show();
    } else {
        $("#NTN_validationMessage").hide();
        $("#ContactEmailDivRow").show();
        $("#RelationsRowDiv").show();
        $("#cnicPersonEditForm").show();
        //$("#cnicPersonEditForm").show();
        $("#NTNEditForm").hide();




    }

}
function AddNewSeller() {
    ValidateSellerSection();
    $(".k-invalid-msg").hide();
    updateFlag = false;
    ResetPersonForm();


    var $radio = $('input[name=PersonType]:checked');
    var id = $radio.attr('id');
    if (id == 'Company') {

        $("#ContactEmailDivRow").hide();
        $("#RelationsRowDiv").hide();
        $("#overSeasDiv").hide();
        $("#throughAttorneyDiv").hide();
        $("#cnicPersonEditForm").hide();
        //$("#cnicPersonEditForm").hide();
        $("#NTNEditForm").show();
        $("#ThroughPowerOfAttorenySpan").hide();
    } else {
        $("#NTN_validationMessage").hide();
        $("#ContactEmailDivRow").show();
        $("#RelationsRowDiv").show();
        $("#overSeasDiv").show();
        $("#throughAttorneyDiv").show();
        $("#cnicPersonEditForm").show();
        //$("#cnicPersonEditForm").show();
        $("#NTNEditForm").hide();
        $("#ThroughPowerOfAttorenySpan").show();

    }

    if (lang == 'ur') {

        document.getElementById("PersonPrimarySpan").innerHTML = Useonform + " " + Party2Label;

        $('.k-window-title').css('bottom', '0px');
        //var elem = $(".k-window-actions");
        $(".k-window-actions").attr("style", "top: -9px !important");
    }
    else {
        document.getElementById("PersonPrimarySpan").innerHTML = " Use this " + Party2Label + " in the form";
    }


    $("#window").data("kendoWindow").title(Add + " " + Party2Label).center().open();
    //setTimeout(function () { document.getElementById('PersonName').focus(); }, 1000);
    TypeFlag = "Seller";
    ValidateSellerSection();
    count_of_seller++;
    PersonButtonText(Add);
    //document.getElementById("PersonName").focus();
}
//here
function AddNewPurchaser() {
    debugger;
    if (Party1Label == "First Party") {
        if (sessionStorage["currentLanguage"] == "Urdu") {

            document.getElementById("PersonPrimarySpan").innerHTML = Useonform + " " + Party1Label;
        }
        else {
            document.getElementById("PersonPrimarySpan").innerHTML = " Use this " + Party1Label + " in the form";
        }

    } else if (Party1Label == "First Party / Donor") {

    } else if (Party1Label == "First Party / Lessor") {

    } else if (Party1Label == "First Party / Mortgager") {

    } else if (Party1Label == "First Party / Principal") {

    } else if (Party1Label == "Plaintiff / Appellant / Petitioner") {

    } else if (Party1Label == "Seller") {

    }
    //edit by me
    if (lang == 'ur') {

        document.getElementById("PersonPrimarySpan").innerHTML = Useonform + " " + Party1Label;
        $('.k-window-title').css('bottom', '0px');
        //var elem = $(".k-window-actions");
        $(".k-window-actions").attr("style", "top: -9px !important");
    }
    else {
        document.getElementById("PersonPrimarySpan").innerHTML = " Use this " + Party1Label + " in the form";
    }

    $(".k-invalid-msg").hide();
    updateFlag = false;
    $("#window").data("kendoWindow").title(Add + " " + Party1Label).center().open();


    //$(".k-window-title .k-window-actions").css("top", "");
    //$("#window").kendoWindow({
    //    modal: true,
    //    visible: false,
    //    resizable: false,
    //    title: "Add Nothing" ,
    //    actions: [
    //        "Close"
    //    ]

    //}).data("kendoWindow").center().open();
    ResetPersonForm();
    TypeFlag = "Purchaser";
    ValidatePurchaserSection();
    count_of_purchaser++;
    PersonButtonText(Add);
    ValidateSellerSection();
}



function getChallanModel() {
    var agentName = $('#AgentName').val();
    var agentCnic = $('#AgentCnic').val();
    var agentCell = $('#AgentCell').val();
    var agentEmail = $('#agentEmail').val();
    var DistrictId = $('#District').val();
    var TalukaId = $('#Taluka').val();
    var address = $('#Address').val();
    var property = {};
    //var totalAmount = $('#Total_Amount').val();
    if (isChallanFirst || challan.propertyInfo == null) {
        property = {
            DistrictId: null,
            DistrictString: null,
            TalukaId: null,
            TalukaString: null,
            TownId: null,
            TownString: null,
            FloorId: null,
            FloorString: null,
            LocationUrbanString: "",
            LocationUrbanId: "",
            FullAddress: "",//$('#PropertyAddress').val(),
            ValuationAmount: 0,
            IsConstructed: false,// $('#IsConstructedCheck').is(":checked"),
            ConstructedAreaInSqFeet: "",//$("#ConstructedArea").val(),
            Classification: "",//$('#PropertyClassification').val(),
            ClassificationString: "",//$('#PropertyClassification').data("kendoDropDownList").text(),
            ConstructedStructureValue: "", //required whenever CVT is applicable
            IsMultiStory: false,       ////////////////////////////////////////////new///////////////////////////
            IsLegalHeirs: false,      ////////////////////////////////////////////new///////////////////////////  
            IsGovProperty: false,       ////////////////////////////////////////////new///////////////////////////
            QanoongoeeString: "",
            QanoongoeeId: "",
            RevenueCircleString: "",
            RevenueCircleId: "",
            MouzaString: "",
            MouzaId: "",
            PropertyAreaString: "",
            PropertyAreaId: "",
            IrrigationMode: "",
            IrrigationModeId: "",
            LandClassificationString: "",
            LandClassificationId: "",
            LocationString: "",
            LocationId: "",
            Rate: "",
            Area: "",
            FinalRate: "",
            isUrban: true,
            //new
            KhasraID: 0,
            DeclaredAmount: 0,
            rateUnit: "",
            LandPropertyValue: "",
            IsLandAndConstructed: false,
            isKhasraHierarchy: false,
            isSquareNoHierarchy: false,
            IsPropertyDetailAvailable: false,
            treatAsUrban: false,
            SquareID: 0,
            SquareNo: 0,
            QilaID: 0,
            QilaNo: 0,
            IsKhasraAvailable: false,
            KhasraUrbanID: 0,
            KhasraUrbanNo: "",
            SquareNoUrban: "",
            SquareUrbanID: 0,
            QilaUrbanID: 0,
            QilaNoUrban: "",
            DCRateSqftString: "",
            sqft_rate: 0,
        };
    }
    else {
        property = challan.propertyInfo;
    }
    var property2;
    if (isChallanFirst || challan.propertyInfo2 == null) {
        property2 = {
            //DistrictId: $('#District').val(),
            //DistrictString: $('#District').data("kendoDropDownList").text(),
            //TalukaId:$('#Taluka').val(),
            //TalukaString:$('#Taluka').data("kendoDropDownList").text(),
            DistrictId: null,
            DistrictString: null,
            TalukaId: null,
            TalukaString: null,
            TownId: null,
            TownString: null,
            FloorId: null,
            FloorString: null,
            LocationUrbanString: "",
            LocationUrbanId: "",
            FullAddress: "",//$('#PropertyAddress').val(),
            ValuationAmount: 0,
            IsConstructed: false,// $('#IsConstructedCheck').is(":checked"),
            ConstructedAreaInSqFeet: "",//$("#ConstructedArea").val(),
            Classification: "",//$('#PropertyClassification').val(),
            ClassificationString: "",//$('#PropertyClassification').data("kendoDropDownList").text(),
            ConstructedStructureValue: "",
            IsMultiStory: false,       ////////////////////////////////////////////new///////////////////////////
            IsLegalHeirs: false,      ////////////////////////////////////////////new///////////////////////////  
            IsGovProperty: false,       ////////////////////////////////////////////new///////////////////////////
            QanoongoeeString: "",
            QanoongoeeId: "",
            RevenueCircleString: "",
            RevenueCircleId: "",
            MouzaString: "",
            MouzaId: "",
            PropertyAreaString: "",
            PropertyAreaId: "",
            IrrigationMode: "",
            IrrigationModeId: "",
            TalukaLandType: "",
            TalukaLandTypeID: "",
            LandClassificationString: "",
            LandClassificationId: "",
            LocationString: "",
            LocationId: "",
            Rate: "",
            Area: "",
            FinalRate: "",
            isUrban: true,
            //new
            KhasraID: 0,
            DeclaredAmount: 0,
            rateUnit: "",
            isKhasraHierarchy: false,
            isSquareNoHierarchy: false,
            IsPropertyDetailAvailable: false,
            treatAsUrban: false,
            SquareID: 0,
            SquareNo: 0,
            QilaID: 0,
            QilaNo: 0,
            IsKhasraAvailable: false,
            KhasraUrbanID: 0,
            KhasraUrbanNo: "",
            SquareNoUrban: "",
            SquareUrbanID: 0,
            QilaUrbanID: 0,
            QilaNoUrban: "",
        };
    }
    else {
        property2 = challan.propertyInfo2;
    }

    var deedInfoModel = {
        IsCalculateSum: false
    };
    var val = $("#StampType").data("kendoDropDownList").text();
    var purchaserSellerValue;
    ispurchaser = false;
    var tt = $('input:radio[name=StampDutyPaid]:checked').val();
    var challanType = $('input:radio[name=ChallanFromType]:checked').val();


    var r1 = 'Party2';
    if (tt == r1) {

        purchaserSellerValue = document.getElementById("SellerStampLabel").innerHTML;
        ispurchaser = false;
    }
    else {
        ispurchaser = true;
        purchaserSellerValue = document.getElementById("PurchaserStampLabel").innerHTML;
    }

    if (isExchangeOfProperty == false) {
        property2 = null;
    }
    queryStringvCount = getUrlVars()["vCount"];
    var challan1 = {
        AgentName: agentName,
        AgentCnic: agentCnic,
        AgentEmail: agentEmail,
        AgentCell: agentCell,
        RegistrationFeeString: "",//$('#Payable_Reg_Duty').val(),
        PayableCvtString: "",//$('#Payable_CVT').val(),
        PayableStampDutyString: "",//$('#Stamp_duty').val(),
        SuitFor: "",//$('#SuitFor').val(),
        TransactionType: $('#StampType').val(),
        TransactionTypeString: $("#StampType").data("kendoDropDownList").text(),
        TransactionName: $('#TransactionName').val(),
        TransactionNameString: $("#TransactionName").data("kendoDropDownList").text(),
        applyRegistrationDuty: $('#RegitrationFeeCheck').is(":checked"),
        applyCVT: $('#CVTTax').is(":checked"),
        applyStampDuty: ($("#TransactionName").val() == oralMutationDeedId || $("#TransactionName").val() == cvtRegistrationDeedId) ? false : $('#StampDutyCheck').is(":checked"), //new //////////////////////////////////////////////////////////
        DCValuationType: isDCValuationFlag,
        ActualDCValue: origianlDCValue,
        DistrictId: $('#District').val(),
        DistrictString: $('#District').data("kendoDropDownList").text(),
        TalukaId: $('#Taluka').val(),
        TalukaString: $('#Taluka').data("kendoDropDownList").text(),
        numberOfStampPapers: 1,                              //new //////////////////////////////////////////////////////////
        leasePeriod: "",                                     //new //////////////////////////////////////////////////////////
        TotalLeaseMoney: 0,
        deficientAmount: "",                                 //new //////////////////////////////////////////////////////////
        penalty: "",                                         //new //////////////////////////////////////////////////////////
        totalDeficient: "",                                 //new //////////////////////////////////////////////////////////
        ChallanAmountPaidByString: purchaserSellerValue,
        //StampDutyPaidBy: purchaserSellerValue,
        Party2: SellerData,
        Party1: PurchaserData,
        TotalAmount: "",// $("#Total_Amount").val().replace(/,/g, ""),
        stampModel: null,
        propertyInfo: property,
        propertyInfo2: property2,
        AdvanceMoney: "",//new //////////////////////////////////////////////////////////
        Premium: "",//new //////////////////////////////////////////////////////////
        TotalAmountOfDuties: 0,
        ChallanType: challanType,
        isPurchaser: ispurchaser,
        AmountLabelText: TotalAmountLabel,
        isPropertyInfoApplicable: isPropertyInfo,
        isCVTandNotDC: false,
        isPowerOfAttorney: isPowerOfAttorney,
        visitorNumber: queryStringvCount,
        lstTaxAmountValue: AmountsData,
        DeedInfo: deedInfoModel,
        isMultiplePropertiesExchageOfProperty: isMultiplePropertiesExchageOfProperty,
        isExchangeOfProperty: isExchangeOfProperty,
        RegistryFeeString: "",
        RegistryFee: 0,
        isRegistryFeeCheck: false,
        isDCFirstScreen: true,
        oldRegistryDate: $("#oldRegDate").data("kendoDatePicker").value(),
        oldRegistryNumber: $('#oldRegistryNumber').val(),
        isLeaseYearLessThan20: isLeaseYearLessThan20,
        isLegalHeirForGiftDeed: isLegalHeirForGiftDeed
    };
    if (!challan1.applyRegistrationDuty)
        challan1.RegistrationFeeString = null;
    if (!challan1.applyCVT)
        challan1.PayableCvtString = null;
    if (val == "Judicial")
        challan1.PayableStampDutyString = null;
    if (typeof queryStringName !== 'undefined' && (queryStringName == "GenerateChallanForOldRegistry" || queryStringName == "PayDeficiencyForOldRegistry")) {
        challan1.isOldRegistryChallan = true;
    }
    else {
        challan1.isOldRegistryChallan = false;
    }
    isChallanFirst = false;
    return challan1;
}

function getChallanModelForDeficient() {
    debugger;
    var agentName = $('#AgentName').val();
    var agentCnic = $('#AgentCnic').val();
    var agentCell = $('#AgentCell').val();
    var agentEmail = $('#agentEmail').val();
    var DistrictId = challanFromDB.DistrictId;
    var TalukaId = challanFromDB.TalukaId;
    var DistrictString = challanFromDB.DistrictString;
    var TalukaString = challanFromDB.TalukaString;

    var challanType = $('input:radio[name=ChallanFromType]:checked').val();
    if (circleName == 'RegFeeNew') {
        var challanType = 'Registration Fee';
    }
    if (circleName == 'PayCVTandRegT') {
        var challanType = 'Scanning';
    }
    //var challanType = "Deficient";
    var id = challanFromDB.Id;
    var challanNumber = challanFromDB.ChallanNumber;
    var address = "";//$('#Address').val();
    //var totalAmount = $('#Total_Amount').val();
    var property = null;
    var property2 = null;

    if (challanFromDB.propertyInfo != null) {
        property = {
            DistrictId: challanFromDB.propertyInfo.DistrictId,
            DistrictString: challanFromDB.propertyInfo.DistrictString,
            TalukaId: challanFromDB.propertyInfo.TalukaId,
            TalukaString: challanFromDB.propertyInfo.TalukaString,

            FullAddress: challanFromDB.propertyInfo.FullAddress,//$('#PropertyAddress').val(), 

            IsConstructed: challanFromDB.propertyInfo.IsConstructed,// $('#IsConstructedCheck').is(":checked"),
            ConstructedAreaInSqFeet: challanFromDB.propertyInfo.ConstructedAreaInSqFeet,//$("#ConstructedArea").val(),
            Classification: challanFromDB.propertyInfo.Classification,//$('#PropertyClassification').val(),
            ClassificationString: challanFromDB.propertyInfo.ClassificationString,//$('#PropertyClassification').data("kendoDropDownList").text(),


            QanoongoeeString: challanFromDB.propertyInfo.QanoongoeeString,
            QanoongoeeId: challanFromDB.propertyInfo.QanoongoeeId,

            RevenueCircleString: challanFromDB.propertyInfo.RevenueCircleString,
            RevenueCircleId: challanFromDB.propertyInfo.RevenueCircleId,

            MouzaString: challanFromDB.propertyInfo.MouzaString,
            MouzaId: challanFromDB.propertyInfo.MouzaId,

            PropertyAreaString: challanFromDB.propertyInfo.PropertyAreaString,
            PropertyAreaId: challanFromDB.propertyInfo.PropertyAreaId,

            LandClassificationString: challanFromDB.propertyInfo.LandClassificationString,

            LandClassificationId: challanFromDB.propertyInfo.LandClassificationId,

            LocationString: challanFromDB.propertyInfo.LocationString,
            LocationId: challanFromDB.propertyInfo.LocationId,


            Rate: challanFromDB.propertyInfo.Rate,

            Area: challanFromDB.propertyInfo.Area,

            FinalRate: challanFromDB.propertyInfo.FinalRate,

            isUrban: challanFromDB.propertyInfo.isUrban,

            LandPropertyValue: "",
            IsLandAndConstructed: false,
            PrimaryAmountLabel: "",

            isKhasraHierarchy: challanFromDB.propertyInfo.isKhasraHierarchy,
            isSquareNoHierarchy: challanFromDB.propertyInfo.isSquareNoHierarchy,
            treatAsUrban: challanFromDB.propertyInfo.treatAsUrban,

            SquareID: challanFromDB.propertyInfo.SquareID,
            SquareNo: challanFromDB.propertyInfo.SquareNo,
            QilaID: challanFromDB.propertyInfo.QilaID,
            QilaNo: challanFromDB.propertyInfo.QilaNo,

            IsKhasraAvailable: challanFromDB.propertyInfo.IsKhasraAvailable,
            KhasraUrbanID: challanFromDB.propertyInfo.KhasraUrbanID,
            KhasraUrbanNo: challanFromDB.propertyInfo.KhasraUrbanNo,

            IsPropertyDetailAvailable: challanFromDB.propertyInfo.IsPropertyDetailAvailable,

            SquareNoUrban: challanFromDB.propertyInfo.SquareNoUrban,
            SquareUrbanID: challanFromDB.propertyInfo.SquareUrbanID,
            QilaUrbanID: challanFromDB.propertyInfo.QilaUrbanID,
            QilaNoUrban: challanFromDB.propertyInfo.QilaNoUrban,

        };
    }


    if (challanFromDB.propertyInfo2 != null) {
        property2 = {
            DistrictId: challanFromDB.propertyInfo2.DistrictId,
            DistrictString: challanFromDB.propertyInfo2.DistrictString,
            TalukaId: challanFromDB.propertyInfo2.TalukaId,
            TalukaString: challanFromDB.propertyInfo2.TalukaString,

            FullAddress: challanFromDB.propertyInfo2.FullAddress,//$('#PropertyAddress').val(), 

            IsConstructed: challanFromDB.propertyInfo2.IsConstructed,// $('#IsConstructedCheck').is(":checked"),
            ConstructedAreaInSqFeet: challanFromDB.propertyInfo2.ConstructedAreaInSqFeet,//$("#ConstructedArea").val(),
            Classification: challanFromDB.propertyInfo2.Classification,//$('#PropertyClassification').val(),
            ClassificationString: challanFromDB.propertyInfo2.ClassificationString,//$('#PropertyClassification').data("kendoDropDownList").text(),


            QanoongoeeString: challanFromDB.propertyInfo2.QanoongoeeString,
            QanoongoeeId: challanFromDB.propertyInfo2.QanoongoeeId,

            RevenueCircleString: challanFromDB.propertyInfo2.RevenueCircleString,
            RevenueCircleId: challanFromDB.propertyInfo2.RevenueCircleId,

            MouzaString: challanFromDB.propertyInfo2.MouzaString,
            MouzaId: challanFromDB.propertyInfo2.MouzaId,

            PropertyAreaString: challanFromDB.propertyInfo2.PropertyAreaString,
            PropertyAreaId: challanFromDB.propertyInfo2.PropertyAreaId,

            LandClassificationString: challanFromDB.propertyInfo2.LandClassificationString,

            LandClassificationId: challanFromDB.propertyInfo2.LandClassificationId,

            LocationString: challanFromDB.propertyInfo2.LocationString,
            LocationId: challanFromDB.propertyInfo2.LocationId,


            Rate: challanFromDB.propertyInfo2.Rate,

            Area: challanFromDB.propertyInfo2.Area,

            FinalRate: challanFromDB.propertyInfo2.FinalRate,

            isUrban: challanFromDB.propertyInfo2.isUrban,

            LandPropertyValue: "",
            PrimaryAmountLabel: "",

            isKhasraHierarchy: challanFromDB.propertyInfo2.isKhasraHierarchy,
            isSquareNoHierarchy: challanFromDB.propertyInfo2.isSquareNoHierarchy,
            treatAsUrban: challanFromDB.propertyInfo2.treatAsUrban,

            SquareID: challanFromDB.propertyInfo2.SquareID,
            SquareNo: challanFromDB.propertyInfo2.SquareNo,
            QilaID: challanFromDB.propertyInfo2.QilaID,
            QilaNo: challanFromDB.propertyInfo2.QilaNo,

            IsKhasraAvailable: challanFromDB.propertyInfo2.IsKhasraAvailable,
            KhasraUrbanID: challanFromDB.propertyInfo2.KhasraUrbanID,
            KhasraUrbanNo: challanFromDB.propertyInfo2.KhasraUrbanNo,

            IsPropertyDetailAvailable: challanFromDB.propertyInfo2.IsPropertyDetailAvailable,

            SquareNoUrban: challanFromDB.propertyInfo2.SquareNoUrban,
            SquareUrbanID: challanFromDB.propertyInfo2.SquareUrbanID,
            QilaUrbanID: challanFromDB.propertyInfo2.QilaUrbanID,
            QilaNoUrban: challanFromDB.propertyInfo2.QilaNoUrban,
        };
    }

    //////////////////////////////////////
    var val = challanFromDB.TransactionTypeString;

    ispurchaser = challanFromDB.isPurchaser;

    queryStringvCount = getUrlVars()["vCount"];

    var challan1 = {

        Id: id,
        ChallanNumber: challanNumber,
        AgentName: agentName,
        AgentCnic: agentCnic,
        AgentEmail: agentEmail,
        AgentCell: agentCell,
        RegistrationFeeString: challanFromDB.RegistrationFeeString,//$('#Payable_Reg_Duty').val(),
        PayableCvtString: challanFromDB.PayableCvtString,//$('#Payable_CVT').val(),
        DistrictId: DistrictId,
        TalukaId: TalukaId,
        DeedNameId: challanFromDB.DeedNameId,
        //DeficientRegistrationFeeString: "",
        //DeficientPayableCvtString: "",
        applyDeficientCVT: $('#DeficientCVT').is(":checked"),
        applyDeficientRegistration: $('#DeficientRegistration').is(":checked"),

        DistrictString: DistrictString,
        TalukaString: TalukaString,

        DCValuationType: challanFromDB.DCValuationType,
        ChallanAmountPaidBy: challanFromDB.ChallanAmountPaidBy,
        ChallanAmountPaidByString: challanFromDB.ChallanAmountPaidByString,
        PayableStampDutyString: challanFromDB.PayableStampDutyString,//$('#Stamp_duty').val(),
        SuitFor: challanFromDB.SuitFor,//$('#SuitFor').val(),
        TransactionType: challanFromDB.TransactionType,//$('#StampType').val(),
        TransactionTypeString: challanFromDB.TransactionTypeString,//$("#StampType").data("kendoDropDownList").text(),
        TransactionName: challanFromDB.TransactionName,//$('#TransactionName').val(),
        TransactionNameString: challanFromDB.TransactionNameString,//$("#TransactionName").data("kendoDropDownList").text(),
        applyRegistrationDuty: challanFromDB.applyRegistrationDuty,//$('#RegitrationFeeCheck').is(":checked"),
        applyCVT: challanFromDB.applyCVT,//$('#CVTTax').is(":checked"),
        applyStampDuty: challanFromDB.applyStampDuty,//$('#StampDutyCheck').is(":checked"), //new //////////////////////////////////////////////////////////
        //StampDutyPaidBy: purchaserSellerValue,//,
        Party2: challanFromDB.Party2,//,
        Party1: challanFromDB.Party1,//,
        TotalAmount: challanFromDB.TotalAmount,//// $("#Total_Amount").val().replace(/,/g, ""),
        stampModel: challanFromDB.stampModel,//,
        propertyInfo: challanFromDB.propertyInfo,//
        propertyInfo2: challanFromDB.propertyInfo2,//
        AdvanceMoney: challanFromDB.AdvanceMoney,
        Premium: challanFromDB.Premium,
        numberOfStampPapers: challanFromDB.numberOfStampPapers,
        leasePeriod: challanFromDB.leasePeriod,
        TotalAmountOfDuties: challanFromDB.TotalAmountOfDuties,
        ChallanType: challanType,
        isPurchaser: ispurchaser,
        TotalLeaseMoney: challanFromDB.TotalLeaseMoney,
        paymentInfo: challanFromDB.paymentInfo,
        AmountLabelText: challanFromDB.AmountLabelText,
        isCVTandNotDC: challanFromDB.isCVTandNotDC,
        isPowerOfAttorney: challanFromDB.isPowerOfAttorney,
        visitorNumber: queryStringvCount,
        DeedInfo: challanFromDB.DeedInfo,
        lstTaxAmountValue: challanFromDB.lstTaxAmountValue,
        ActualDCValue: challanFromDB.ActualDCValue,
        isMultiplePropertiesExchageOfProperty: challanFromDB.isMultiplePropertiesExchageOfProperty,
        isExchangeOfProperty: false,
        //RegistryFeeString: challanFromDB.RegistryFeeString,
        RegistryFee: challanFromDB.RegistryFee,
        //isRegistryFeeCheck: challanFromDB.isRegistryFeeCheck,
        isRegistryFeeCheck: challanFromDB.isRegistryFeeCheck,
        RegFeePercent: challanFromDB.RegFeePercent,
        RegFeeAmount: challanFromDB.RegFeeAmount,
        RegFeeType: challanFromDB.RegFeeType,
        isDCFirstScreen: true,
        isHousingSocietyInvolved: challanFromDB.isHousingSocietyInvolved,
        exemptStampDuty: challanFromDB.exemptStampDuty,
        oldRegistryDate: challanFromDB.oldRegistryDate,
        oldRegistryNumber: challanFromDB.oldRegistryNumber,
        isOldRegistryChallan: challanFromDB.isParentChallanOldReg == true ? false : challanFromDB.isOldRegistryChallan,
        isParentChallanOldReg: challanFromDB.isParentChallanOldReg != null ? challanFromDB.isParentChallanOldReg : false,
        isParentNewChallan: challanFromDB.isParentNewChallan != null ? challanFromDB.isParentNewChallan : false,
        isLeaseYearLessThan20: isLeaseYearLessThan20,
        isLegalHeirForGiftDeed: isLegalHeirForGiftDeed
    };

    if (challan1.TransactionName == exchangeOfPropertyDeedId) {
        challan1.isExchangeOfProperty = true;
    }

    for (amountIndex = 0; amountIndex < challan1.lstTaxAmountValue.length; amountIndex++) {

        if (challan1.lstTaxAmountValue[amountIndex].FieldName == LandValueLabel && challan1.lstTaxAmountValue[amountIndex].AdditionalInfo == firstProperty) {
            challan1.propertyInfo.LandPropertyValue = challan1.lstTaxAmountValue[amountIndex].AmountValue;
            challan1.propertyInfo.IsLandAndConstructed = true;
        }
        else if (challan1.lstTaxAmountValue[amountIndex].FieldName == LandValueLabel && challan1.lstTaxAmountValue[amountIndex].AdditionalInfo == secondProperty) {
            challan1.propertyInfo2.LandPropertyValue = challan1.lstTaxAmountValue[amountIndex].AmountValue;
        }

    }

    return challan1;
}

function updateDCValuationFlag() {

    var deedid = $("#TransactionName").val();

    if (deedid == 3 || deedid == 4 || deedid == 22 || deedid == 24) {

        isDCValuationFlag = true;

    }
    else {

        isDCValuationFlag = false;
    }

}

function updateDCValuationAndCVTFlagDeficient(Challandata) {
    // alert('deedAmountsModel')
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/ChallanForm/getDeedInfo?id=' + Challandata.DeedNameId,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            deedAmountsModel = data;
            if (data.IsCalculateSum == true)
                IsLandAndConstructed = true;
            else
                IsLandAndConstructed = false;



        },
        error: function (data) {
        }
    });

    $.ajax({
        url: base_url_service_layer + '/api/Proxy/ChallanForm/checkDCAndCVTFlag?id=' + Challandata.DeedNameId,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        success: function (data) {

            if (queryStringName == "PayDeficient") {

                if (data[0] != null && data[0] != "") {
                    if (data[0] == "true") {
                        isDCValuationFlag = true;
                    }
                    else {
                        isDCValuationFlag = false;
                    }
                }
                else {
                    isDCValuationFlag = false;
                }

                if (data[6] != null && data[6]) {
                    if (data[6] == "true") {
                        isPropertyInfo = true;
                    }
                    else {
                        isPropertyInfo = false;
                        //challanModel.propertyInfo = null;
                    }
                }
                else {
                    isDCValuationFlag = false;
                }

                transectionIdPayCVTandReg = Challandata.DeedNameId;

                if (transectionIdPayCVTandReg == exchangeOfPropertyDeedId) {
                    isExchangeOfProperty = true;
                }
                else {
                    isExchangeOfProperty = false;
                }

            }
            else {
                if (data[0] != null && data[0] != "") {
                    if (data[0] == "true") {
                        isDCValuationFlag = true;
                    }
                    else {
                        isDCValuationFlag = false;
                    }
                }
                else {
                    isDCValuationFlag = false;
                }

                if (data[1] != null && data[1] != "") {
                    if (data[1] == "true") {
                        isCVTApplicable = true;
                    }
                    else {
                        isCVTApplicable = false;
                    }
                }
                else {
                    isCVTApplicable = false;
                }

                if (data[2] != null && data[2] != "") {
                    Party1Label = data[2];
                }
                else {
                    Party1Label = "Purchser";
                }

                if (data[3] != null && data[3] != "") {
                    Party2Label = data[3];
                }
                else {
                    Party2Label = "Seller";
                }

                if (data[4] != null && data[4] != "") {
                    TotalAmountLabel = data[4];
                }
                else {
                    TotalAmountLabel = "Property Valuation";
                }
                if (data[5] != null && data[5] != "") {

                    if (data[5] == "true") {
                        isRegFeeApplicable = true;
                    }
                    else {
                        isRegFeeApplicable = false;
                    }


                }
                else {
                    isRegFeeApplicable = false;
                }

                if (isDCValuationFlag == false && isCVTApplicable == true) {
                    isCVTandNotDC = true;
                    //challan.isCVTandNotDC = isCVTandNotDC;
                    isDCValuationFlag = true;
                }
                else {
                    isCVTandNotDC = false;
                    //challan.isCVTandNotDC = isCVTandNotDC;
                }

                if (data[6] != null && data[6]) {
                    if (data[6] == "true") {
                        isPropertyInfo = true;
                    }
                    else {
                        isPropertyInfo = false;
                        //challanModel.propertyInfo = null;
                    }
                }
                else {
                    isDCValuationFlag = false;
                }

                var isComparisonFeeApplicableFlag = true;

                if (isCVTApplicable == true || isRegFeeApplicable == true || isComparisonFeeApplicableFlag == true) {
                    $("#DeedDetailsReadOnly").show();
                    $("#AgentFormId").show();
                    $("#PersonDivIdReadOnly").show();
                    $("#captchaDiv").show();
                    $("#dutiesCheckBoxDeficient").show();
                    if (Challandata.ChallanStatus == challanPaidStatus || Challandata.ChallanStatus == challanRefundCancelled || Challandata.ChallanStatus == challanRefundInitiated) {
                        if (isCVTApplicable == true) {
                            $("#CVTTaxDeficient").show();

                        } else {
                            $("#CVTTaxDeficient").hide();
                        }

                        if (isRegFeeApplicable == true) {
                            $("#DeficientRegistration").show();
                        } else {
                            $("#DeficientRegistration").hide();
                        }
                        $("#cvtRegistrationWarning").hide();
                    }
                    document.getElementById("nextFirstScreenButton").disabled = false;
                    // showHideCVTandRegistrationCheckBoxesDeficient(Challandata);

                } else {
                    $("#dutiesCheckBoxDeficient").hide();
                    $("#dialogButtonDeficient").click();

                    $("#cvtRegistrationWarning").show();
                    document.getElementById("cvtRegistrationWarningValue").innerHTML = NoCVTTaxandRegistrationFeeisapplicableonthedeed;
                    $("#cvtRegistrationWarningValue").css("color", "red");

                    $("#DeedDetailsReadOnly").hide();
                    $("#AgentFormId").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $("#captchaDiv").hide();

                    document.getElementById("nextFirstScreenButton").disabled = true;
                }
            }
        },
        error: function (data) {

        }
    });
}

function updateDCValuationAndCVTFlag() {

    var deedid = $("#TransactionName").val();
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/ChallanForm/getDeedInfo?id=' + deedid,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            //alert('deedAmountsModel12')
            debugger;
            deedAmountsModel = data;
            isCVTMandatory = false;
            if (queryStringName == "  GenerateChallan") {
                isCVTMandatory = deedAmountsModel.isCVTMandatory;
            }
            if (data.isDCValuation == true) {
                isDCValuationFlag = true;
                origianlDCValue = true;
            }
            else {
                isDCValuationFlag = false;
                origianlDCValue = false;
            }


            if (data.isCVT == true) {
                isCVTApplicable = true;
            }
            else {
                //isCVTApplicable = false;

                //Check added for power of attorney for deficient CVT
                if (queryStringName == "GenerateChallanForOldRegistry" && (deedid == "106" || deedid == "107" || deedid == "108")) {
                    isCVTApplicable = true;
                }
                else {
                    isCVTApplicable = false;
                }
            }
            if (data.isRegistration == true) {
                isRegFeeApplicable = true;
            }
            else {
                isRegFeeApplicable = false;
            }
            if (data.isRegistrationFeeMandatory == true) {
                isRegFeeMandatory = true;
            }
            else {
                isRegFeeMandatory = false;
            }
            if (data.isPropertyInfoApplicable == true) {
                isPropertyInfo = true;
            }
            else {
                isPropertyInfo = false;
            }
            if (data.FirstPartyLabel != null && data.FirstPartyLabel != "") {
                Party1Label = data.FirstPartyLabel;
            }
            else {
                Party1Label = "Purchaser";
            }
            if (data.SecondPartyLabel != null && data.SecondPartyLabel != "") {
                Party2Label = data.SecondPartyLabel;
            }
            else {
                Party2Label = "Seller";
            }
            if (isDCValuationFlag == false && isCVTApplicable == true) {
                isCVTandNotDC = true;
            }
            else {
                isCVTandNotDC = false;
            }
            if (data.IsCalculateSum == true)
                IsLandAndConstructed = true;
            else
                IsLandAndConstructed = false;
            if (data.isRegFeeFixed == true) {
                $.ajax({
                    url: base_url_service_layer + '/api/Proxy/ChallanForm/FixedRegistrationDuty?id=' + deedid,
                    type: 'POST',
                    contentType: "application/json;charset=utf-8",
                    success: function (registrationAmount) {
                        isFixedRegistration = true;
                        FixedRegistrationValue = registrationAmount;
                    },
                    error: function (registrationAmount) {
                    }
                });
            }
            else {
                isFixedRegistration = false;
                FixedRegistrationValue = "";
            }
            if (data.isStampDutyFixed == true) {
                $("#totalStampDutyCalAmountPayableDiv").hide();
                $.ajax({
                    url: base_url_service_layer + '/api/Proxy/ChallanForm/FixedStampDuty?id=' + deedid,
                    type: 'POST',
                    contentType: "application/json;charset=utf-8",
                    success: function (stampAmount) {
                        isFixedStamp = true;
                        FixedStampValue = stampAmount;
                    },
                    error: function (stampAmount) {
                    }
                });
            }
            else {
                $("#totalStampDutyCalAmountPayableDiv").show();
                isFixedStamp = false;
                FixedStampValue = "";
            }
            //if (data[0] != null && data[0] != "") {
            //    if (data[0] == "true") {
            //        isDCValuationFlag = true;
            //        origianlDCValue = true;
            //    }
            //    else {
            //        isDCValuationFlag = false;
            //        origianlDCValue = false;
            //    }
            //}
            //else {
            //    isDCValuationFlag = false;
            //    origianlDCValue = false;
            //}

            //if (data[1] != null && data[1] != "") {
            //    if (data[1] == "true") {
            //        isCVTApplicable = true;
            //    }
            //    else {
            //        isCVTApplicable = false;
            //    }
            //}
            //else {
            //    isCVTApplicable = false;
            //}

            //if (data[2] != null && data[2] != "") {
            //    Party1Label = data[2];
            //}
            //else {
            //    Party1Label = "Purchser";
            //}

            //if (data[3] != null && data[3] != "") {
            //    Party2Label = data[3];
            //}
            //else {
            //    Party2Label = "Seller";
            //}

            //if (data[4] != null && data[4] != "") {
            //    TotalAmountLabel = data[4];
            //}
            //else {
            //    TotalAmountLabel = "Property Valuation";
            //}
            //if (data[5] != null && data[5] != "") {

            //    if (data[5] == "true") {
            //        isRegFeeApplicable = true;
            //    }
            //    else
            //    {
            //        isRegFeeApplicable = false;
            //    }


            //    }
            //else {
            //    isRegFeeApplicable = false;
            //}

            //if (isDCValuationFlag == false && isCVTApplicable == true) {
            //    isCVTandNotDC = true;
            //    //challan.isCVTandNotDC = isCVTandNotDC;
            //    //isDCValuationFlag = true;
            //}
            //else {
            //    isCVTandNotDC = false;
            //    //challan.isCVTandNotDC = isCVTandNotDC;
            //}

            //if (data[6] != null && data[6]) {
            //    if (data[6] == "true") {
            //        isPropertyInfo = true;
            //    }
            //    else {
            //        isPropertyInfo = false;
            //        //challan.propertyInfo = null;
            //        //challanModel.propertyInfo = null;
            //    }
            //}
            //else {
            //    isDCValuationFlag = false;
            //}

            //if (data[7] != null && data[7]) {
            //    if (data[7] == "true") {

            //        $.ajax({
            //            url: base_url_service_layer + '/api/Proxy/ChallanForm/FixedRegistrationDuty?id=' + deedid,
            //            type: 'POST',
            //            contentType: "application/json;charset=utf-8",
            //            success: function (registrationAmount) {
            //                isFixedRegistration = true;
            //                FixedRegistrationValue = registrationAmount;
            //            },
            //            error: function (registrationAmount) {

            //            }
            //        });
            //    }
            //    else {
            //        isFixedRegistration = false;
            //        FixedRegistrationValue = "";
            //    }
            //}

            //if (data[8] != null && data[8]) {
            //    if (data[8] == "true") {
            //        //return fixed stamp amount from model
            //        $.ajax({
            //            url: base_url_service_layer + '/api/Proxy/ChallanForm/FixedStampDuty?id=' + deedid,
            //            type: 'POST',
            //            contentType: "application/json;charset=utf-8",
            //            success: function (stampAmount) {
            //                isFixedStamp = true;
            //                FixedStampValue = stampAmount;
            //            },
            //            error: function (stampAmount) {

            //            }
            //        });
            //    }
            //    else {
            //        isFixedStamp = false;
            //        FixedStampValue = "";
            //    }
            //}

            document.getElementById("sellerLabel").innerHTML = Party2Label + " Information";
            document.getElementById("addSellerLabel").innerHTML = Add + " " + Party2Label;
            document.getElementById("purchaserLabel").innerHTML = Party1Label + " Information";
            document.getElementById("addPurchaserLabel").innerHTML = Add + " " + Party1Label;
            document.getElementById("SellerStampLabel").innerHTML = Party2Label;
            document.getElementById("PurchaserStampLabel").innerHTML = Party1Label;
            // $("#PropertyValuationGenerateChallan").removeAttr("placeholder");
            // $("#AmountOfConsiderationGenerateChallan").removeAttr("placeholder");
            //$("#PropertyValuationGenerateChallan").addClass("floating-label");
            if (isCVTApplicable == true) {

                if (queryStringName == "GenerateChallanForOldRegistry") {
                    $("#CvtTaxDiv").hide();
                    $("#DefCvtTaxForOldRegDiv").show();
                    $("#dutiesCheckBox").show();
                }
                else if (isCVTMandatory) {
                    $('#CVTTax').attr('checked', true);
                    $('#CVTTax').prop('checked', true);
                    onchangeTaxCheckBoxes();
                }
            }
            else {
                $("#CvtTaxDiv").hide();
                $("#DefCvtTaxForOldRegDiv").hide();
                $('#CVTTax').attr('checked', false);
            }

            if (isRegFeeApplicable == true) {

                if (queryStringName == "GenerateChallanForOldRegistry") {
                    $("#RegistrationFeeForOldRegDiv").show();
                    $("#RegistrationFeeDiv").hide();
                    $("#dutiesCheckBox").show();
                }
                else {
                    // Reg Fee Optional 
                    $("#dutiesCheckBox").show();
                    $("#RegistrationFeeDiv").show();
                    $('#RegitrationFeeCheck').attr('checked', false);

                    if (isRegFeeMandatory == true) {
                        // Reg Fee Mandatory
                        $('#RegitrationFeeCheck').attr('checked', true);
                        $('#RegitrationFeeCheck').prop('checked', true);
                        $("#RegistrationFeeDiv").hide();
                        $("#dutiesCheckBox").hide();
                    }
                }
            }
            else {
                // Reg Fee Not Applicalbe
                $("#RegistrationFeeDiv").hide();
                $("#RegistrationFeeForOldRegDiv").hide();
                $('#RegitrationFeeCheck').attr('checked', false);
            }

            if (!isCVTApplicable && !isRegFeeApplicable) {
                $("#dutiesCheckBox").hide();
            }
            //if (isRegFeeMandatory == true) {

            //    $("#RegistrationFeeDiv").hide();
            //    $("#dutiesCheckBox").hide();
            //    if (isRegFeeApplicable == true) {                   
            //        $('#RegitrationFeeCheck').attr('checked', true);
            //        $('#RegitrationFeeCheck').prop('checked', true);
            //        if (queryStringName == "GenerateChallanForOldRegistry") {                       
            //            $("#RegistrationFeeForOldRegDiv").show();
            //        }
            //    }
            //    else {

            //        $("#RegistrationFeeForOldRegDiv").hide();
            //        $('#RegitrationFeeCheck').attr('checked', false);
            //    }
            //}
            //else
            //{
            //    $("#dutiesCheckBox").show();
            //    $("#RegistrationFeeDiv").show();
            //    $("#RegistrationFeeForOldRegDiv").hide();
            //    $('#RegitrationFeeCheck').attr('checked', false);
            //}

            //if ((isCVTApplicable == false && isRegFeeApplicable == false) || (queryStringName == "PayDeficiencyForOldRegistry")) {
            //    $("#dutiesCheckBox").hide();
            //} else {
            //    $("#dutiesCheckBox").show();
            //}
            ValidatePurchaserSection();
            ValidateSellerSection();
        },
        error: function (data) {
        }
    });
}

function getCookieByName(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function onFocusBondNumber() {

    $(this).click(function () {
        $('.datepicker').datepicker();

    });

}

function PolicyAmountChange() {

    $(this).click(function () {
        $('.datepicker').datepicker();

    });

    $(function () {
        $("#PeriodFrom").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            onClose: function (selectedDate) {
                $("#PeriodTo").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#PeriodTo").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            onClose: function (selectedDate) {
                $("#PeriodFrom").datepicker("option", "maxDate", selectedDate);
            }
        });
    });

    var TotalPolicy = 0;

    if ($("#PolicyCount").val() != "" && $("#PolicyCount").val() != "NaN")
        TotalPolicy = parseFloat($("#PolicyCount").val().replace(/,/g, ""));

    if (isNaN(TotalPolicy)) TotalPolicy = 0;

    var sum = TotalPolicy * FixedStampValue;

    if (sum != 0 && sum != null && sum != "" && sum != "NaN") {
        $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
        onChangeTotalAmountDeedDetailGenerateChallan();
    }
    else {
        if (sum == 0) {
            $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
            onChangeTotalAmountDeedDetailGenerateChallan();

        }
        else
            $("#PropertyValuationGenerateChallan").val("");
    }




}


function PolicyValueChange() {

    debugger;

    var Fixed_Percent = 0;
    var StampDuty = 0;


    var StampAmount = 0;
    var SubInsuredAmount = parseFloat($("#InsuredAmount").val().replace(/,/g, ""));
    var PremiumAmount = parseFloat($("#PremiumAmount").val().replace(/,/g, ""));

    var Value1InsuredAmount = SubInsuredAmount / 8;

    if (Value1InsuredAmount > PremiumAmount) {
        StampAmount = SubInsuredAmount * 0.006 / 100;
        challan.Fixed_Percent = 0.006;
    }
    else {
        StampAmount = SubInsuredAmount * 0.025 / 100;

        challan.Fixed_Percent = 0.025;
    }

    if (StampAmount != 0 && StampAmount != null && StampAmount != "" && StampAmount != "NaN") {
        $("#PropertyValuationGenerateChallan").val(returnCommas(StampAmount));
        onChangeTotalAmountDeedDetailGenerateChallan();
    }

}

function calculateTotalFaceValueFor10c() {

    debugger;

    var Fixed_Percent = 0;
    var StampDuty = 0;
    var $radio = $('input[name=TransferIssue]:checked');
    var radio_id = $radio.attr('id');
    // alert(radio_id);
    if (radio_id == "Issue") {
        Fixed_Percent = 0.05
    } else {
        Fixed_Percent = 0.02
    }

    var TotalFaceValue = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""))
    var NumberOFYears = parseFloat($("#NoOfYears").val().replace(/,/g, ""))
    if (isNaN(TotalFaceValue)) TotalFaceValue = 0;
    if (isNaN(NumberOFYears)) NumberOFYears = 0;

    if (TotalFaceValue > 0) {
        //onChangeTotalAmountDeedDetailGenerateChallan();
        challan.DebenturepayableStampDuty = (TotalFaceValue * Fixed_Percent) / 100;
        if (challan.DebenturepayableStampDuty < 500) {
            challan.DebenturepayableStampDuty = 500;
        }
        challan.Fixed_Percent = "";
        challan.Fixed_Percent = Fixed_Percent;
        challan.Fixed_Percent_ForDeb = Fixed_Percent;


    }
}


function calculateAirTicketValue() {

    debugger;

    var Fixed_Percent = 0;
    var StampDuty = 0;
    var $radio = $('input[name=AirTicketValue]:checked');
    var radio_id = $radio.attr('id');
    // alert(radio_id);
    if (radio_id == "domesticFlight") {
        Fixed_Percent = 50
    } else {
        Fixed_Percent = 400
    }

    var TotalFaceValue = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""))

    if (isNaN(TotalFaceValue)) TotalFaceValue = 0;


    if (TotalFaceValue > 0) {
        //onChangeTotalAmountDeedDetailGenerateChallan();
        challan.AirTicketStampDuty = (TotalFaceValue * Fixed_Percent);

        challan.Fixed_Percent = "";
        challan.Fixed_Percent = Fixed_Percent;
        challan.Fixed_Percent_ForDeb = Fixed_Percent;


    }
}


function selectFaceValueRate() {
    //var Fixed_Percent = 0; 
    //var $radio = $('input[name=ShareWinthdrawl]:checked');
    //var radio_id = $radio.attr('id');
    //if (radio_id == "Withdrawl") {
    //    Fixed_Percent = 1.5
    //} else {
    //    Fixed_Percent = 0.15
    //}
    //alert('1')
    var number_shareWithdrawl = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""))
    if (number_shareWithdrawl > 0) {
        onChangeTotalAmountDeedDetailGenerateChallan();

    }

    debugger;
    var $radio = $('input[name=ShareWinthdrawl]:checked');
    var radio_id = $radio.attr('id');
    // alert(radio_id);
    if (radio_id == "CDC") {
        challan.TransferType = "TransferCDC";
        challan.FixedPercentForTransfer_a = 0.15
    } else {
        challan.TransferType = "TransferWithdrawl";
        challan.FixedPercentForTransfer_a = 1.5
    }

}
function selectOriginalDuplicateRate() {
    var Fixed_Percent = 0;
    var $radio = $('input[name=OriginalDuplicate]:checked');
    var radio_id = $radio.attr('id');
    if (radio_id == "Original") {
        Fixed_Percent = 0.12
    } else {
        Fixed_Percent = 0.06
    }
    // alert($("#PropertyValuationGenerateChallan").val());
    var number = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""))
    if (number > 0) {
        // alert('2')
        onChangeTotalAmountDeedDetailGenerateChallan();

    }

}

function selectOriginalDuplicateRate() {
    var Fixed_Percent = 0;
    var $radio = $('input[name=OriginalDuplicate]:checked');
    var radio_id = $radio.attr('id');
    if (radio_id == "Original") {
        Fixed_Percent = 0.12
    } else {
        Fixed_Percent = 0.06
    }
    // alert($("#PropertyValuationGenerateChallan").val());
    var number = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""))
    if (number > 0) {
        // alert('2')
        onChangeTotalAmountDeedDetailGenerateChallan();

    }

}

function selectInsuredAmountValueRate() {
    var Fixed_Percent = 0;
    var $radio = $('input[name=typeInstruments]:checked');
    var radio_id = $radio.attr('id');
    number = 0;
    if (radio_id == "six_month") {
        Fixed_Percent = 0.045;
        number = 0.045 / 100 * parseFloat($("#InsuredAmount").val().replace(/,/g, ""));
        challan.FixedPercent = Fixed_Percent;
    } else {
        Fixed_Percent = 0.090;
        number = 0.090 / 100 * parseFloat($("#InsuredAmount").val().replace(/,/g, ""));
        challan.FixedPercent = Fixed_Percent;

    }
    // alert($("#PropertyValuationGenerateChallan").val());

    if (number > 0) {
        // alert('2')
        $("#PropertyValuationGenerateChallan").val(number);
        onChangeTotalAmountDeedDetailGenerateChallan();

    }

}
function createField(deedInfo, deedAmounts, deedid, checkForSecondProperty) {
    debugger;




    var cultureCookie = getCookieByName("_culture");
    var divID = "";
    var labelID = "";
    var labelName = "";
    var readOnlyClass = "";
    var isDisabled = "";
    var inputFieldDiv = "";
    var onChangeFunction = "";
    var divName = "";
    var minValue = "";
    var toolTipID = "";
    var defaultValue = "";
    var isCVTFieldOnly = "";
    //
    isCVTFieldOnly = deedAmounts.isCVTField;
    // Set Label for the dynamic field
    labelName = deedAmounts.Label
    // Set Defuault Value for dynamic Field
    if (deedAmounts.DefaultValue != null)
        defaultValue = deedAmounts.DefaultValue;
    else
        defaultValue = "";
    // Set Minimum Value for dynamic Field
    if (deedAmounts.MinValue != null)
        minValue = deedAmounts.MinValue;
    else
        minValue = 0;
    // Set Disabled Value fordynamicfield
    if (deedAmounts.Visible == 'V') {
        isDisabled = "disabled = \"true\" ";
    }
    else {
        isDisabled = "";
    }
    if (isPropertyInfo != false) {
        if ($("#TransactionName").val() != 51) {
            $("#propertyAddressDiv").show();
        }
        else {
            $('#PropertyAddressGenerateChallan').attr('required', false);
            $("#propertyAddressDiv").hide();
        }
    }
    else {
        $("#propertyAddressDiv").hide();
    }
    if (checkForSecondProperty) {
        // For Exchange of Property second property
        if (deedAmounts.isPrimaryAmout == true) {
            divID = "";
            labelID = "";
            //if (cultureCookie == "ur") {
            //    labelName = deedAmounts.Label + " " + SecondProperty;
            //}
            //else {
            //    labelName = SecondProperty + " " + deedAmounts.Label;
            //}
            labelName = "Second " + deedAmounts.Label;
            //TotalAmountLabel = labelName;
            readOnlyClass = "";
            //if (deedAmounts.Visible == 'V') {
            //    isDisabled = "disabled = \"true\" ";
            //}
            //else {
            //    isDisabled = "";
            //}
            inputFieldDiv = "PropertyValuationGenerateChallanSecond";
            onChangeFunction = "; onChangeTotalAmountDeedDetailGenerateChallan()";
            //minValue = 0;
            toolTipID = "tooltip_TotalAmount2GenerateChallan";
            //if (deedAmounts.DefaultValue != null)
            //    defaultValue = deedAmounts.DefaultValue;
            //else
            //    defaultValue = "";
        }
        else {
            if (IsLandAndConstructed == true) {
                // Land Value Amount second property
                if (deedAmounts.fieldType == 'FirstAmount') {
                    divID = "landPropertyDiv2";
                    //labelID = "";
                    //if (cultureCookie == "ur") {
                    //    labelName = deedAmounts.Label + " " + SecondPartyPropertys;
                    //}
                    //else {
                    //    labelName = SecondPartyPropertys + " " + deedAmounts.Label;
                    //}
                    labelName = "Second Party Property(s) " + deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "landProperty2";
                    onChangeFunction = "; onChangeLandAndConstructedDeedDetailGenerateChallan()";
                    //divName = "name = \"Land Value\" ";
                    divName = "name = \"" + LandValue + "\"";
                    minValue = 1;
                    toolTipID = "tooltip_LandPropertyValue2";
                    //defaultValue = "";
                }
                else if (deedAmounts.fieldType == 'SharedPercent') {
                    divID = "SharedPercentDiv";
                    //labelID = "";
                    //if (cultureCookie == "ur") {
                    //    labelName = deedAmounts.Label + " " + SecondPartyPropertys;
                    //}
                    //else {
                    //    labelName = SecondPartyPropertys + " " + deedAmounts.Label;
                    //}
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "; onChangeSharePercent() ";
                    //divName = "name = \"Land Value\" ";
                    divName = "name = \"" + deedAmounts.fieldType + "\"";
                    minValue = 1;
                    toolTipID = "tooltip_SharePercent";
                    //defaultValue = "";
                }

                else if (deedAmounts.fieldType == 'Seperate_value') {
                    divID = "Seperate_valueDiv";
                    //labelID = "";
                    //if (cultureCookie == "ur") {
                    //    labelName = deedAmounts.Label + " " + SecondPartyPropertys;
                    //}
                    //else {
                    //    labelName = SecondPartyPropertys + " " + deedAmounts.Label;
                    //}
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "; onChangeSharePercent() ";
                    //divName = "name = \"Land Value\" ";
                    divName = "name = \"" + deedAmounts.fieldType + "\"";
                    minValue = 1;
                    toolTipID = "tooltip_SharePercent";
                    //defaultValue = "";
                }
                else if (deedAmounts.fieldType == 'SecondAmount') {
                    // Constrcture Structure Amount second property
                    divID = "constructedStructureValueDivSecond";
                    labelID = "";
                    //if (cultureCookie == "ur") {
                    //    labelName = deedAmounts.Label + " " + SecondPartyPropertys;
                    //}
                    //else {
                    //    labelName = SecondPartyPropertys + " " + deedAmounts.Label;
                    //}
                    labelName = "Second Party Property(s) " + deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "constructedStructureValueSecond";
                    onChangeFunction = "; onChangeLandAndConstructedDeedDetailGenerateChallan()";
                    divName = "name = \"" + ConstructedStructureValue + "\"";
                    //minValue = 0;
                    toolTipID = "tooltip_ConstructedStructureValueSecond";
                    //defaultValue = "";
                }
            }
        }
        //deedAmounts.JsID = "#" + inputFieldDiv;
        secondPropertyIDArray[secondPropertyIDCounter] = "#" + inputFieldDiv;
        secondPropertyIDCounter++;
    }
    else {
        // For All other deeds
        secondPropertyIDCounter = 0;
        //for (j = 0; j < Lease35cDeeds.length; j++) {
        //    if (deedid == Lease35cDeeds[j]) {
        //        isLease35c = true;
        //        break;
        //    }
        //}
        //for (k = 0; k < LeaseOtherThan35c.length; k++) {
        //    if (deedid == LeaseOtherThan35c[k]) {
        //        isLeaseOtherThan35c = true;
        //        break;
        //    }
        //}
        //for (l = 0; l < SecondAmountLeaseOtherThan35c.length; l++) {
        //    if (deedid == SecondAmountLeaseOtherThan35c[l]) {
        //        isSecondAmountLeaseOtherThan35c = true;
        //        break;
        //    }
        //}
        debugger;
        if (deedAmounts.isPrimaryAmout == true) {
            divID = "PropertyValuationGenerateChallanDiv";
            labelID = "propertyValueLabelDeedName";
            if (isExchangeOfProperty) {
                //if (cultureCookie == "ur") {
                //    labelName = deedAmounts.Label + " " + First;
                //}
                //else {
                //    labelName = First + " " + deedAmounts.Label;
                //}
                labelName = "First " + deedAmounts.Label;
            }

            else
                labelName = deedAmounts.Label;
            TotalAmountLabel = labelName;
            readOnlyClass = "";
            //if (deedAmounts.Visible == 'V') {
            //    isDisabled = "disabled = \"true\" ";
            //}
            //else {
            //    isDisabled = "";
            //}
            inputFieldDiv = "PropertyValuationGenerateChallan";
            if (deedAmounts.DeedID == 18) {
                onChangeFunction = "; calculateTotalFaceValueFor10c()";
            }
            else if (deedAmounts.DeedID == 212) {
                onChangeFunction = "; calculateAirTicketValue()";
            }
            else {
                onChangeFunction = "; onChangeTotalAmountDeedDetailGenerateChallan()";
            }
            //minValue = 0;
            toolTipID = "tooltip_TotalAmountGenerateChallan";
            //if (deedAmounts.DefaultValue != null)
            //    defaultValue = deedAmounts.DefaultValue;
            //else
            //    defaultValue = "";
        }
        else {
            if (IsLandAndConstructed == true) {
                // Land Value Amount
                if (deedAmounts.fieldType == 'FirstAmount') {
                    divID = "landPropertyDiv";
                    //labelID = "";
                    if (isExchangeOfProperty) {
                        //if (cultureCookie == "ur") {
                        //    labelName = deedAmounts.Label + " " + FirstPartyPropertys;
                        //}
                        //else {
                        //    labelName = FirstPartyPropertys + " " + deedAmounts.Label;
                        //}
                        labelName = "First Party Property(s) " + deedAmounts.Label;
                    }
                    else
                        labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "landProperty";
                    onChangeFunction = "; onChangeLandAndConstructedDeedDetailGenerateChallan()";
                    divName = "name = \"" + LandValue + "\"";
                    //minValue = 0;
                    toolTipID = "tooltip_LandPropertyValue";
                    //defaultValue = "";
                }
                else if (deedAmounts.fieldType == 'SharedPercent') {
                    divID = "SharedPercentDiv";
                    //labelID = "";
                    //if (cultureCookie == "ur") {
                    //    labelName = deedAmounts.Label + " " + SecondPartyPropertys;
                    //}
                    //else {
                    //    labelName = SecondPartyPropertys + " " + deedAmounts.Label;
                    //}
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "; onChangeSharePercent() ";
                    //divName = "name = \"Land Value\" ";
                    divName = "name = \"" + deedAmounts.fieldType + "\"";
                    minValue = 1;
                    toolTipID = "tooltip_SharePercent";
                    //defaultValue = "";
                }

                else if (deedAmounts.fieldType == 'Seperate_value') {
                    divID = "Seperate_valueDiv";
                    //labelID = "";
                    //if (cultureCookie == "ur") {
                    //    labelName = deedAmounts.Label + " " + SecondPartyPropertys;
                    //}
                    //else {
                    //    labelName = SecondPartyPropertys + " " + deedAmounts.Label;
                    //}
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "; onChangeSharePercent() ";
                    //divName = "name = \"Land Value\" ";
                    divName = "name = \"" + deedAmounts.fieldType + "\"";
                    minValue = 1;
                    toolTipID = "tooltip_SharePercent";
                    //defaultValue = "";
                }




                else if (deedAmounts.fieldType == 'SecondAmount') {
                    // Constrcture Structure Amount
                    divID = "constructedStructureDiv";
                    labelID = "";
                    if (isExchangeOfProperty) {
                        //if (cultureCookie == "ur") {
                        //    labelName = deedAmounts.Label + " " + FirstPartyPropertys;
                        //}
                        //else {
                        //    labelName = FirstPartyPropertys + " " + deedAmounts.Label;
                        //}
                        labelName = "First Party Property(s) " + deedAmounts.Label;
                    }
                    else
                        labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "constructedStructureValueGenerateChallan";
                    onChangeFunction = "; onChangeLandAndConstructedDeedDetailGenerateChallan()";
                    divName = "name = \"" + ConstructedStructureValue + "\" ";
                    //minValue = 0;
                    toolTipID = "tooltip_ConstructedStructureValue";
                    //defaultValue = "";
                }
                else if (deedAmounts.fieldType == 'ThirdAmount') {
                    // For Transfer of Lease 63-A where CVT is true
                    // Lease Period
                    divID = "LeasePeriodGenerateChallanDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "LeasePeriodGenerateChallan";
                    onChangeFunction = "";
                    divName = "name = \"" + LeasePeriodYears + "\" ";
                    //minValue = 0;
                    toolTipID = "tooltip_LeasePeriodGenerateChallan";
                    //defaultValue = "";
                }
                else if (deedAmounts.fieldType == 'OtherProperty') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "";
                    divName = "name = " + deedAmounts.fieldType + "'";
                    minValue = 0;
                    //toolTipID = "tooltip_Distintive";
                    //defaultValue = "";
                }
            }
            else if (IsLandAndConstructed == false) {
                // Land Value Amount
                if (deedAmounts.fieldType == 'Square Yard/Feet') {
                    divID = "SquareYardDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "SquareYard";
                    onChangeFunction = "; onChangeSquareYardDeedDetailGenerateChallan()";
                    divName = "name = SquareYard";
                    //minValue = 0;
                    toolTipID = "tooltip_LandPropertyValue";
                    //defaultValue = "";
                }
                if (deedAmounts.fieldType == 'InsuredAmount' || deedAmounts.fieldType == 'PolicyCount' || deedAmounts.fieldType == 'PremiumAmount' || deedAmounts.fieldType == 'PremioumAmount' || deedAmounts.fieldType == 'CertificateNumber'
                || deedAmounts.fieldType == 'ShareCertificateNumber' || deedAmounts.fieldType == 'NTNNumber' || deedAmounts.fieldType == 'FrankingNumber') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    if (deedAmounts.fieldType != 'CertificateNumber' && deedAmounts.DeedID != '67' && deedAmounts.DeedID != '72') {
                        onChangeFunction = "; PolicyAmountChange()";
                    }
                    else if (deedAmounts.DeedID == '67') {
                        onChangeFunction = "; PolicyValueChange()";
                    }
                    else if (deedAmounts.DeedID == '72') {
                        onChangeFunction = "; selectInsuredAmountValueRate()";
                    }
                    else {
                        onChangeFunction = ";";
                    }
                    divName = "name = " + deedAmounts.fieldType;
                    //minValue = 0;
                    toolTipID = "tooltip_" + inputFieldDiv;
                    //defaultValue = "";
                }

                if (deedAmounts.fieldType == 'MonthlyRent' || deedAmounts.fieldType == 'AnualRent' || deedAmounts.fieldType == 'LeaseInMonth') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    // onChangeFunction = "; SumAmountChange()";
                    divName = "name = " + deedAmounts.fieldType;
                    //minValue = 0;
                    toolTipID = "tooltip_" + inputFieldDiv;
                    //defaultValue = "";
                }
                else if (deedAmounts.fieldType == 'CompanyName' || deedAmounts.fieldType == 'PolicyNumber' || deedAmounts.fieldType == 'Description') {
                    divID = "CompanyNameDiv";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = ";";
                    //divName = "name = \"Land Value\" ";
                    divName = "name = \"" + deedAmounts.fieldType + "\"";
                    toolTipID = "tooltip_CompanyName";
                    //defaultValue = "";
                }
                else if (deedAmounts.fieldType == 'Month') {
                    divID = "MonthDiv";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = ";";
                    //divName = "name = \"Land Value\" ";
                    divName = "name = \"" + deedAmounts.fieldType + "\"";
                    toolTipID = "tooltip_Month";
                    //defaultValue = "";
                }
                debugger;
                if (deedAmounts.fieldType == 'FaceVale' || deedAmounts.fieldType == 'TotalShare') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "; onChangeShareFaceValue()";
                    divName = "name = " + deedAmounts.fieldType;
                    minValue = 0;
                    //toolTipID = "tooltip_" + inputFieldDiv;
                    //defaultValue = "";
                }

                if (deedAmounts.fieldType == 'DistinctiveFrom' || deedAmounts.fieldType == 'DistinctiveTo') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "; ";
                    divName = "name = " + deedAmounts.fieldType;
                    //minValue = 0;
                    toolTipID = "tooltip_Distintive";
                    //defaultValue = "";
                }

                if (deedAmounts.fieldType == 'NumberOfShares') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "; calculateTotalFaceValue()";
                    divName = "name = " + deedAmounts.fieldType + "'";
                    minValue = 0;
                    //toolTipID = "tooltip_Distintive";
                    //defaultValue = "";
                }

                if (deedAmounts.fieldType == 'OtherProperty') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "";
                    divName = "name = " + deedAmounts.fieldType + "'";
                    minValue = 0;
                    //toolTipID = "tooltip_Distintive";
                    //defaultValue = "";
                }

                if (deedAmounts.fieldType == 'ValueOfShare') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "; calculateTotalFaceValue()";
                    divName = "name = " + deedAmounts.fieldType + "";
                    minValue = 0;
                    //toolTipID = "tooltip_Distintive";
                    //defaultValue = "";
                }

                if (deedAmounts.fieldType == 'NoOfYears' || deedAmounts.fieldType == 'NoOfMonths' || deedAmounts.fieldType == 'NoOfDays') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "; calculateTotalFaceValueFor10c()";
                    divName = "name = " + deedAmounts.fieldType + "";
                    minValue = 0;
                    //toolTipID = "tooltip_Distintive";
                    //defaultValue = "";
                }

                if (deedAmounts.fieldType == 'NatureOfDocument') {
                    divID = deedAmounts.fieldType + "Div";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = deedAmounts.fieldType;
                    onChangeFunction = "";
                    divName = "name = " + deedAmounts.fieldType + "'";
                    // minValue = 0;
                    //toolTipID = "tooltip_Distintive";
                    //defaultValue = "";
                }

                debugger;

                if (deedAmounts.fieldType == 'radiobutton') {
                    if (deedAmounts.DeedID == 212) {
                        divID = +deedAmounts.fieldType + "Div";
                        //labelID = "";
                        labelName = "For domestic flights (50 Rupees per Ticket) / For international flights (400 Rupees per Ticket) ";
                        readOnlyClass = "";
                        inputFieldDiv = deedAmounts.fieldType;
                        onChangeFunction = "; ";
                        divName = "name = " + deedAmounts.fieldType;
                        //minValue = 0;
                        toolTipID = "tooltip_Distintive";
                        //defaultValue = "";
                    }
                    else {
                        divID = +deedAmounts.fieldType + "Div";
                        //labelID = "";
                        labelName = "Issue(0.05 % per annum) / Transfer(0.02 % per annum)";
                        readOnlyClass = "";
                        inputFieldDiv = deedAmounts.fieldType;
                        onChangeFunction = "; ";
                        divName = "name = " + deedAmounts.fieldType;
                        //minValue = 0;
                        toolTipID = "tooltip_Distintive";
                        //defaultValue = "";
                    }


                }

                if (deedAmounts.fieldType == 'radio_button') {
                    if (deedAmounts.DeedID == 64) {
                        divID = +deedAmounts.fieldType + "Div";
                        //labelID = "";
                        labelName = "Physically Withdrawl / Share Deposit to CDC";
                        readOnlyClass = "";
                        inputFieldDiv = deedAmounts.fieldType;
                        onChangeFunction = "; ";
                        divName = "name = " + deedAmounts.fieldType;
                        //minValue = 0;
                        toolTipID = "tooltip_Distintive";
                        //defaultValue = "";
                    }
                    else if (deedAmounts.DeedID == 83) {
                        divID = +deedAmounts.fieldType + "Div";
                        //labelID = "";
                        labelName = "Type of Instrument:";
                        readOnlyClass = "";
                        inputFieldDiv = deedAmounts.fieldType;
                        onChangeFunction = "; ";
                        divName = "name = " + deedAmounts.fieldType;
                        //minValue = 0;
                        toolTipID = "tooltip_Distintive";
                        //defaultValue = "";
                    }
                    else if (deedAmounts.DeedID == 72) {
                        divID = +deedAmounts.fieldType + "Div";
                        //labelID = "";
                        labelName = "Type of Amounts:";
                        readOnlyClass = "";
                        inputFieldDiv = deedAmounts.fieldType;
                        onChangeFunction = "; ";
                        divName = "name = " + deedAmounts.fieldType;
                        //minValue = 0;
                        toolTipID = "tooltip_Distintive";
                        //defaultValue = "";
                    }

                    else {
                        divID = +deedAmounts.fieldType + "Original_DuplicateDiv";
                        //labelID = "";
                        labelName = "Orignial/ Duplicate";
                        readOnlyClass = "";
                        inputFieldDiv = deedAmounts.fieldType;
                        onChangeFunction = "; ";
                        divName = "name = " + deedAmounts.fieldType + "_Original_Duplicate";
                        //minValue = 0;
                        toolTipID = "tooltip_Distintive";


                    }
                }
                debugger;
                if (deedAmounts.fieldType == 'Bond Number') {
                    //alert('yes')
                    divID = "BondNumberDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "BondNumber";
                    onChangeFunction = "; onFocusBondNumber()";
                    divName = "name = BondNumber";
                    //minValue = 0;
                    toolTipID = "tooltip_BondNumberValue";
                    //defaultValue = "";
                }
                else if (deedAmounts.fieldType == 'Sets') {

                    if (deedAmounts.DeedID == 201) {

                        divID = "NumberofPoliciesDiv";
                        //labelID = "";
                        labelName = deedAmounts.Label;
                        readOnlyClass = "";
                        inputFieldDiv = "NuberofPolicies";
                        onChangeFunction = "; onChangeNumberofPolicies()";
                        divName = "name = Policies";
                        //minValue = 0;
                        toolTipID = "tooltip_SetsValue";

                    }


                    else {

                        divID = "NumberofSetsDiv";
                        //labelID = "";
                        labelName = deedAmounts.Label;
                        readOnlyClass = "";
                        inputFieldDiv = "NuberofSets";
                        onChangeFunction = "; onChangeNumberofSets()";
                        divName = "name = SetsNumber";
                        //minValue = 0;
                        toolTipID = "tooltip_SetsValue";
                    }
                    //defaultValue = "";
                }

                else if (deedAmounts.fieldType == 'RecpietAbove') {

                    if (deedAmounts.DeedID == 201) {

                        divID = "RecpietAboveDiv";
                        //labelID = "";
                        labelName = deedAmounts.Label;
                        readOnlyClass = "";
                        inputFieldDiv = "RecpietAbove";
                        onChangeFunction = "; onChangeNumberofPolicies()";
                        divName = "name = RecpietAbove";
                        //minValue = 0;
                        toolTipID = "tooltip_SetsValue";

                    }
                }
                else if (deedAmounts.fieldType == 'RecpietAbove1') {

                    if (deedAmounts.DeedID == 201) {

                        divID = "RecpietAbove1Div";
                        //labelID = "";
                        labelName = deedAmounts.Label;
                        readOnlyClass = "";
                        inputFieldDiv = "RecpietAbove1";
                        onChangeFunction = "; onChangeNumberofPolicies()";
                        divName = "name = RecpietAbove1";
                        //minValue = 0;
                        toolTipID = "tooltip_SetsValue";

                    }
                }
                else if (deedAmounts.fieldType == 'RecpietAbove2') {

                    if (deedAmounts.DeedID == 201) {

                        divID = "RecpietAbove2Div";
                        //labelID = "";
                        labelName = deedAmounts.Label;
                        readOnlyClass = "";
                        inputFieldDiv = "RecpietAbove2";
                        onChangeFunction = "; onChangeNumberofPolicies()";
                        divName = "name = RecpietAbove2";
                        //minValue = 0;
                        toolTipID = "tooltip_SetsValue";

                    }
                }
                else if (deedAmounts.fieldType == 'RecpietAbove3') {

                    if (deedAmounts.DeedID == 201) {

                        divID = "RecpietAbove3Div";
                        //labelID = "";
                        labelName = deedAmounts.Label;
                        readOnlyClass = "";
                        inputFieldDiv = "RecpietAbove3";
                        onChangeFunction = "; onChangeNumberofPolicies()";
                        divName = "name = RecpietAbove3";
                        //minValue = 0;
                        toolTipID = "tooltip_SetsValue";

                    }
                }
                else if (deedAmounts.fieldType == 'RecpietAbove4') {

                    if (deedAmounts.DeedID == 201) {

                        divID = "RecpietAbove4Div";
                        //labelID = "";
                        labelName = deedAmounts.Label;
                        readOnlyClass = "";
                        inputFieldDiv = "RecpietAbove4";
                        onChangeFunction = "; onChangeNumberofPolicies()";
                        divName = "name = RecpietAbove4";
                        //minValue = 0;
                        toolTipID = "tooltip_SetsValue";

                    }
                }
                else if (deedAmounts.fieldType == 'RecpietAbove5') {

                    if (deedAmounts.DeedID == 201) {

                        divID = "RecpietAbove5Div";
                        //labelID = "";
                        labelName = deedAmounts.Label;
                        readOnlyClass = "";
                        inputFieldDiv = "RecpietAbove5";
                        onChangeFunction = "; onChangeNumberofPolicies()";
                        divName = "name = RecpietAbove5";
                        //minValue = 0;
                        toolTipID = "tooltip_SetsValue";

                    }
                }
                else if (deedAmounts.fieldType == 'Date From') {
                    divID = "PeriodFromDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "PeriodFrom";
                    onChangeFunction = ';';
                    divName = "name = PeriodFrom";
                    //minValue = 0;
                    toolTipID = "tooltip_SetsValue";
                    //defaultValue = "";
                }

                else if (deedAmounts.fieldType == 'Date To') {
                    divID = "PeriodToDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "PeriodTo";
                    onChangeFunction = ';';
                    divName = "name = PeriodTo";
                    //minValue = 0;
                    toolTipID = "tooltip_SetsValue";
                    //defaultValue = "";
                }


                else if (deedAmounts.fieldType == 'SecondAmount') {
                    // Constrcture Structure Amount
                    divID = "constructedStructureDiv";
                    labelID = "";
                    if (isExchangeOfProperty) {
                        //if (cultureCookie == "ur") {
                        //    labelName = deedAmounts.Label + " " + FirstPartyPropertys;
                        //}
                        //else {
                        //    labelName = FirstPartyPropertys + " " + deedAmounts.Label;
                        //}
                        labelName = "First Party Property(s) " + deedAmounts.Label;
                    }
                    else
                        labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "constructedStructureValueGenerateChallan";
                    onChangeFunction = "; onChangeLandAndConstructedDeedDetailGenerateChallan()";
                    divName = "name = \"" + ConstructedStructureValue + "\" ";
                    //minValue = 0;
                    toolTipID = "tooltip_ConstructedStructureValue";
                    //defaultValue = "";
                }

            }

            else if (isLease35c == true) {
                //isCVTFieldOnly != "1" && 
                if ((deedAmounts.isCVTField == false && deedAmounts.fieldType == 'FirstAmount')) { // || deedAmounts.fieldType == 'FourthAmount'
                    // This section generated non-primary field (Advance Money) for lease deeds
                    // This
                    // Average Annual rent
                    divID = "AverageAnnualDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "AverageAnnual";
                    onChangeFunction = "; onChangeTotalAmountDeedDetailGenerateChallan()";
                    divName = "name = \"" + AverageAnnualrent + "\" ";
                    //minValue = 0;
                    toolTipID = "tooltip_AverageAnnualRent";
                    //defaultValue = "";
                }
                else if ((deedAmounts.isCVTField == false && deedAmounts.fieldType == 'SecondAmount')) { // || deedAmounts.fieldType == 'FourthAmount'

                    // This section generated non-primary field (Advance Money) for lease deeds
                    // This
                    // Average Annual rent
                    divID = "AdvanceMoneyDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "AdvanceMoney";
                    onChangeFunction = "; onChangeTotalAmountDeedDetailGenerateChallan()";
                    divName = "name = \"" + AdvanceMoney + "\" ";
                    //minValue = 0;
                    toolTipID = "tooltip_AdvanceMoneyRent";
                    //defaultValue = "";
                }


                else if (deedAmounts.isCVTField == true && deedAmounts.fieldType == 'SecondAmount') {
                    // Total Lease Money
                    divID = "LeaseMoneyDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "TotalLeaseMoneyGenerateChallan";
                    onChangeFunction = "";
                    divName = "name = \"" + TotalLeaseMoney + "\" ";
                    //minValue = 0;
                    toolTipID = "tooltip_TotalLeaseMoneyGenerateChallan";
                    //defaultValue = "";
                }
                else if (deedAmounts.isCVTField == true && deedAmounts.fieldType == 'ThirdAmount') {
                    // Lease Period
                    divID = "LeasePeriodGenerateChallanDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "LeasePeriodGenerateChallan";
                    onChangeFunction = "";
                    divName = "name = \"" + LeasePeriodYears + "\" ";
                    //minValue = 0;
                    toolTipID = "tooltip_LeasePeriodGenerateChallan";
                    //defaultValue = "";
                }
            }
            //else
            if (isLeaseOtherThan35c == true) {

                if (deedAmounts.isCVTField == true && deedAmounts.fieldType == 'FirstAmount') {
                    // Total Lease Money
                    divID = "LeaseMoneyDiv";
                    //labelID = "";
                    labelName = deedAmounts.Label;
                    readOnlyClass = "";
                    inputFieldDiv = "TotalLeaseMoneyGenerateChallan";
                    onChangeFunction = "";
                    divName = "name = \"" + TotalLeaseMoney + "\" ";
                    //minValue = 0;
                    toolTipID = "tooltip_TotalLeaseMoneyGenerateChallan";
                    //defaultValue = "";
                }
                if (isSecondAmountLeaseOtherThan35c == true && deedAmounts.fieldType == 'SecondAmount' && deedAmounts.isCVTField == true) {
                    {
                        // Lease Period
                        divID = "LeasePeriodGenerateChallanDiv";
                        //labelID = "";
                        labelName = deedAmounts.Label;
                        readOnlyClass = "";
                        inputFieldDiv = "LeasePeriodGenerateChallan";
                        onChangeFunction = "";
                        divName = "name = \"" + LeasePeriodYears + "\" ";
                        //minValue = 0;
                        toolTipID = "tooltip_LeasePeriodGenerateChallan";
                        //defaultValue = "";
                    }
                }
            }
        }
        deedAmounts.JsID = "#" + inputFieldDiv;
    }
    debugger;
    if (deedAmounts.fieldType == 'Date To' || deedAmounts.fieldType == 'Date From') {

        //var field = "<div class=\"row\" id=" + divID + "> <div class=\"  col-md-12\"> <div class=\"rowContainer col-md-4\">" +
        //                               "<div class=\"label label-default\" id=" + labelID + "> " + labelName + " </div>" +
        //                               "<div class=\"col-md-12 rowheight\">" +
        //                                   " <div>"+
        //                                    "@(Html.Kendo().DatePicker()"+
        //                                    ".Name(\"oldRegDate\")"+
        //                                    ".Value(\"\")"+
        //                                    ".Max(DateTime.Today)"+
        //                                    ".Min(DateTime.Parse(\"1947-08-14T00:00:01.7752486-07:00\"))"+
        //                                    ".HtmlAttributes(new { onkeydown = \"javascript:return false;\" })"+
        //                                   // .Events(e => e.Change("oldRegistryDateChange"))
        //                                   " )"+
        //                                "</div>" +
        //                                   "</div>" +
        //                               "</div>" +
        //                           "</div>" +
        //                       "</div>" +
        //                   "</div>";


        var field = "<div class=\"row\" id=" + divID + "> <div class=\"  col-md-12\"> <div class=\"rowContainer col-md-4\">" +
                                       "<div class=\"label label-default\" id=" + labelID + "> " + labelName + " </div>" +
                                       "<div class=\"col-md-12 rowheight\">" +
                                          " <input id=" + inputFieldDiv + " " + divName + " class=\"datepicker form-control \"  data-date-format=\"mm/dd/yyyy\" data-provide=\"datepicker\"/>" +
                                           "</div>" +
                                       "</div>" +
                                   "</div>" +
                               "</div>" +
                           "</div>";


    }

    else if (deedAmounts.fieldType == 'radiobutton') {

        debugger;
        if (deedAmounts.DeedID == 18) {
            var field = " <div class=\"row col-md-6\" style=\"display: block; width: 100%;\">" +
                                                "<div class=\"  zeroPadding\">" +
                                                    "<div class=\"radio radio-success zeroPadding\">" +
                                                       " <label class=\"labelPadding\">" +
                                                            "<input  name=\"TransferIssue\" id=\"Issue\" value=\"Issue(0.05 %)\" type=\"radio\"  style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"calculateTotalFaceValueFor10c();\">" +
                                                            "<label id=\"TransferIssueLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                "Issue (0.05 %)" +
                                                            "</label>" +
                                                        "</label>" +
                                                   "</div>" +
                                                "</div>" +

                                                "<div class=\"  zeroPadding\" id=\"TransferIssue\">" +
                                                   " <div class=\"radio radio-success zeroPadding\">" +
                                                       " <label class=\"labelPadding\">" +
                                                           " <input name=\"TransferIssue\" id=\"Transfer\" value=\"Transfer(0.02 %)\" type=\"radio\" style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"calculateTotalFaceValueFor10c();\">" +
                                                           "<label id=\"TransferIssueLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                "Transfer(0.02 %)" +
                                                            "</label>" +
                                                       "</label>" +
                                                     "</div>" +
                                                "</div>" +
                                            "</div>";
        }
        else {
            var field = " <div class=\"row col-md-6\" style=\"display: block; width: 100%;\">" +
                                             "<div class=\"  zeroPadding\">" +
                                                 "<div class=\"radio radio-success zeroPadding\">" +
                                                    " <label class=\"labelPadding\">" +
                                                         "<input  name=\"AirTicketValue\" id=\"domesticFlight\" value=\"Domesticflight (Rs50 /- per ticket)\" type=\"radio\"  style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"calculateAirTicketValue();\">" +
                                                         "<label id=\"TransferIssueLblDcScreen\" style=\"padding-left:0px;\">" +
                                                             "Domestic Flight (Rs50 /- per ticket)" +
                                                         "</label>" +
                                                     "</label>" +
                                                "</div>" +
                                             "</div>" +

                                             "<div class=\"  zeroPadding\" id=\"TransferIssue\">" +
                                                " <div class=\"radio radio-success zeroPadding\">" +
                                                    " <label class=\"labelPadding\">" +
                                                        " <input name=\"AirTicketValue\" id=\"internationalFlight\" value=\"Internationalflight(400 Rupees per Ticket)\" type=\"radio\" style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"calculateAirTicketValue();\">" +
                                                        "<label id=\"TransferIssueLblDcScreen\" style=\"padding-left:0px;\">" +
                                                             "International Flight  (Rs400 /- per ticket)" +
                                                         "</label>" +
                                                    "</label>" +
                                                  "</div>" +
                                             "</div>" +
                                         "</div>";

        }


    }

    else if (deedAmounts.fieldType == 'radio_button') {

        if (deedAmounts.DeedID == 64) {


            var field = " <div class=\"row col-md-6\" style=\"display: block; width: 100%;\">" +
                                                "<div class=\"  zeroPadding\">" +
                                                    "<div class=\"radio radio-success zeroPadding\">" +
                                                       " <label class=\"labelPadding\">" +
                                                            "<input  name=\"ShareWinthdrawl\" id=\"Withdrawl\" value=\"Withdrawl\" checked=\"checked\" type=\"radio\"  style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"selectFaceValueRate();\">" +
                                                            "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                "Physically Withdrawl" +
                                                            "</label>" +
                                                        "</label>" +
                                                   "</div>" +
                                                "</div>" +

                                                "<div class=\"  zeroPadding\" id=\"RuralRadio\">" +
                                                   " <div class=\"radio radio-success zeroPadding\">" +
                                                       " <label class=\"labelPadding\">" +
                                                           " <input name=\"ShareWinthdrawl\" id=\"CDC\" value=\"CDC\" type=\"radio\" style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"selectFaceValueRate();\">" +
                                                           "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                "Share Deposit to CDC" +
                                                            "</label>" +
                                                       "</label>" +
                                                     "</div>" +
                                                "</div>" +
                                            "</div>";

        }

        else if (deedAmounts.DeedID == 72) {


            var field = " <div class=\"row col-md-6\" style=\"display: block; width: 100%;\">" +
                                                "<div class=\"  zeroPadding\">" +
                                                    "<div class=\"radio radio-success zeroPadding\">" +
                                                       " <label class=\"labelPadding\">" +
                                                            "<input  name=\"typeInstruments\" id=\"six_month\" value=\"Upto Six Month\" checked=\"checked\" type=\"radio\"  style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"selectInsuredAmountValueRate();\">" +
                                                            "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                "Upto 6 Months" +
                                                            "</label>" +
                                                        "</label>" +
                                                   "</div>" +
                                                "</div>" +

                                                "<div class=\"  zeroPadding\" id=\"RuralRadio\">" +
                                                   " <div class=\"radio radio-success zeroPadding\">" +
                                                       " <label class=\"labelPadding\">" +
                                                           " <input name=\"typeInstruments\" id=\"twelve_month\" value=\"Above Twelve Months\" type=\"radio\" style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"selectInsuredAmountValueRate();\">" +
                                                           "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                "Upto to 12 Months" +
                                                            "</label>" +
                                                       "</label>" +
                                                     "</div>" +
                                                "</div>" +
                                            "</div>";

        }


        else if (deedAmounts.DeedID == 83) {


            var field = "<div class=\"label label-default\" id=\"TypeofInstrument\">Type of Instrument: </div>" +
                "<div class=\"row col-md-6\" style=\"display: block; width: 100%;\">" +
                                                 "<div class=\"  zeroPadding\">" +
                                                     "<div class=\"radio radio-success zeroPadding\">" +
                                                        " <label class=\"labelPadding\">" +
                                                             "<input  name=\"TypeofInstruments\" id=\"Bill of Lading\" value=\"Bill of Lading\" checked=\"checked\" type=\"radio\"  style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" >" +
                                                             "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                 "Bill of Lading" +
                                                             "</label>" +
                                                         "</label>" +
                                                    "</div>" +
                                                 "</div>" +

                                                 "<div class=\"  zeroPadding\" id=\"RuralRadio1\">" +
                                                    " <div class=\"radio radio-success zeroPadding\">" +
                                                        " <label class=\"labelPadding\">" +
                                                            " <input name=\"TypeofInstruments\" id=\"Insurance\" value=\"Insurance\" type=\"radio\" style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" >" +
                                                            "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                 "Insurance" +
                                                             "</label>" +
                                                        "</label>" +
                                                      "</div>" +
                                                 "</div>" +
                                             "</div>" +

                                              " <div class=\"row col-md-6\" style=\"display: block; width: 100%;\">" +
                                                 "<div class=\"  zeroPadding\">" +
                                                     "<div class=\"radio radio-success zeroPadding\">" +
                                                        " <label class=\"labelPadding\">" +
                                                             "<input  name=\"TypeofInstruments\" id=\"Banking_Documents\" value=\"Banking Documents\"  type=\"radio\"  style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" >" +
                                                             "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                 "Banking Documents" +
                                                             "</label>" +
                                                         "</label>" +
                                                    "</div>" +
                                                 "</div>" +

                                                 "<div class=\"  zeroPadding\" id=\"RuralRadio2\">" +
                                                    " <div class=\"radio radio-success zeroPadding\">" +
                                                        " <label class=\"labelPadding\">" +
                                                            " <input name=\"TypeofInstruments\" id=\"Securities\" value=\"Securities\" type=\"radio\" style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" >" +
                                                            "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                                 "Securities" +
                                                             "</label>" +
                                                        "</label>" +
                                                      "</div>" +
                                                 "</div>" +
                                             "</div>";
        }




        else {

            var field = " <div class=\"row col-md-6\" style=\"display: block; width: 100%;\">" +
                                               "<div class=\"  zeroPadding\">" +
                                                   "<div class=\"radio radio-success zeroPadding\">" +
                                                      " <label class=\"labelPadding\">" +
                                                           "<input  name=\"OriginalDuplicate\" id=\"Original\" value=\"Original\" checked=\"checked\" type=\"radio\"  style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"selectOriginalDuplicateRate();\">" +
                                                           "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                               "Original" +
                                                           "</label>" +
                                                       "</label>" +
                                                  "</div>" +
                                               "</div>" +

                                               "<div class=\"  zeroPadding\" id=\"RuralRadio\">" +
                                                  " <div class=\"radio radio-success zeroPadding\">" +
                                                      " <label class=\"labelPadding\">" +
                                                          " <input name=\"OriginalDuplicate\" id=\"Duplicate\" value=\"Duplicate\" type=\"radio\" style=\"margin-left: 11px;width: auto;height: auto;opacity:100\" onclick=\"selectOriginalDuplicateRate();\">" +
                                                          "<label id=\"urbanLblDcScreen\" style=\"padding-left:0px;\">" +
                                                               "Duplicate" +
                                                           "</label>" +
                                                      "</label>" +
                                                    "</div>" +
                                               "</div>" +
                                           "</div>";




        }


    }

    else {

        debugger;
        var required = " required=\"required\"";
        var onChangeComma = "";
        max_length = "maxlength=\"16\" pattern=\"[0-9,.]+\"";
        if (deedAmounts.fieldType == 'NumberOfShares' || deedAmounts.fieldType == 'ValueOfShare' || deedAmounts.fieldType == 'NoOfYears' || deedAmounts.fieldType == 'NoOfDays' || deedAmounts.fieldType == 'NoOfMonths') {
            onChangeComma = " onchange=\"addCommasGeneric(this)";
            //max_length = "pattern=\"[0-9,.]+\"";
        }
        else {
            onChangeComma = " onchange=\"addCommasGeneric(this)";
            // max_length = "maxlength=\"16\" pattern=\"[0-9,.]+\"";
        }
        if (deedAmounts.DeedID == 18 && deedAmounts.Label == "Total Face Value") {
            onChangeComma = " onchange=\"addCommasGeneric(this)";
            //max_length = "pattern=\"[0-9,.]+\"";
        }

        if (deedAmounts.DeedID == 81 && deedAmounts.Label == "Any Other Property (Optional)") {
            required = "";
            //onChangeComma = "";
            max_length = "";
        }

        //var max_length = "maxlength=\"16\" pattern=\"[0-9,.]+\"";
        if (deedAmounts.fieldType == 'PremiumAmount' || deedAmounts.fieldType == 'PremioumAmount') {//|| deedAmounts.fieldType == 'CertificateNumber'
            required = "";
        }
        if (deedAmounts.fieldType == 'NTNNumber' || deedAmounts.fieldType == 'FrankingNumber' || deedAmounts.fieldType == 'PolicyNumber') {
            var onChangeComma = "";
        }

        if (deedAmounts.fieldType == 'CertificateNumber') {
            required = required;
            onChangeComma = "";
            max_length = "";
        }
        if (deedAmounts.fieldType == 'ShareCertificateNumber') {
            required = "";
            onChangeComma = "";
            max_length = "";
        }
        if (deedAmounts.fieldType == 'NatureOfDocument') {
            required = required;
            onChangeComma = "";
            max_length = "";
        }

        if (deedAmounts.fieldType == 'NumberOfShares') {
            required = required;
        }
        if (deedAmounts.fieldType == 'ValueOfShare') {
            required = required;
        }
        if (deedAmounts.fieldType == 'NoOfYears') {
            required = required;
        }




        if (deedAmounts.fieldType == 'DistinctiveFrom') {
            max_length = "";
            onChangeComma = "";
            required = required;
        }
        //if (deedAmounts.fieldType == 'TotalShare' || deedAmounts.fieldType == 'FaceVale' || (deedAmounts.DeedID == 64 && deedAmounts.fieldType == 'PrimaryAmount')) {
        //    max_length = "";

        //}
        if (deedAmounts.fieldType == 'CompanyName' || deedAmounts.fieldType == 'Month' || deedAmounts.fieldType == 'PolicyNumber' || deedAmounts.fieldType == 'Description') {
            max_length = " maxlength=\"250\"";
        }

        var field = "<div class=\"row\" id=" + divID + "> <div class=\"  col-md-12\"> <div class=\"rowContainer col-md-4\">" +
                                        "<div class=\"label label-default\" id=" + labelID + "> " + labelName + " </div>" +
                                        "<div class=\"col-md-12 rowheight\">" +
                                            "<div class=\"form-control-wrapper\"> <div class=\"input-group\">" +
                                                    "<input class=\"form-control" + readOnlyClass + " \" " + isDisabled + " id=" + inputFieldDiv + " " + divName + " " + max_length + onChangeComma + onChangeFunction + " \"type=\"text\" min=" + minValue + required + " value = \"" + defaultValue + "\" />" +
                                                    "<span class=\"input-group-addon\"><i class=\"fa fa-question-circle\" title = \"" + labelName + "\" id=" + toolTipID + " onmouseover=\"onToolTipMouseOver(this)\"></i></span>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>";

    }

    return field;
    //$("#DeedDetailsForGenerateChallanFormNonJudicialDiv").html(field);
}

function onToolTipMouseOver(_this) {
    var id = _this.id;
    var title = _this.title;

    console.log('Tool Tip icon mouse over: ' + id + " , " + title);

    // Show the tool tip
    var tooltip = $("#" + id + "").kendoTooltip({
        content: function (e) {
            var target = e.target; // the element for which the tooltip is shown
            var tooltipContent = "";
            switch (id) {
                case "tooltip_LandPropertyValue2": tooltipContent = "Land Value of the second property"; break;
                case "tooltip_ConstructedStructureValueSecond": tooltipContent = "Constructed Structure Value of the second property"; break;

                case "tooltip_LandPropertyValue": tooltipContent = "Land Value of the property"; break;
                case "tooltip_ConstructedStructureValue": tooltipContent = "Constructed Structure Value of the property"; break;

                case "tooltip_LeasePeriodGenerateChallan": tooltipContent = "Lease Period in years"; break;
                case "tooltip_TotalLeaseMoneyGenerateChallan": tooltipContent = "Total Lease Money is used to calculate CVT on the property"; break;
                case "tooltip_AverageAnnualRent": tooltipContent = "Total Annual Rent"; break;
                default: tooltipContent = title; break;
            }

            return "Required. " + tooltipContent;
        },
        position: "top"
    }).data("kendoTooltip");

    tooltip.show($("#" + id + ""));
}

var isCVTFieldsCreatedFirstTime = true;

function addCVTFieldsForPayCVTRegistration(deedInfo, deedAmounts, deedid, isCVTCheckBox, checkForSecondProperty, challan) {
    debugger;
    var returnedArray = "";
    var fieldsArray = "";
    var RegFeeCheck = "";

    var ExchangeOfPropertyFirstPropertyTreated = false;
    if (challan.isRegChecked == true) {
        debugger;
        var Regamount = 0;
        var PrimaryAmmount = challan.TotalAmount;
        var regFeeAmounttobePaid = 0;
        if (challan.RegFeePercent == 1) {
            regFeeAmounttobePaid = Math.ceil(PrimaryAmmount * challan.RegFeeAmount);
            regFeeAmounttobePaid = Math.ceil(regFeeAmounttobePaid);
            challan.RegistryFeeString = Math.ceil(regFeeAmounttobePaid);
            challan.RegistryFee = Math.ceil(regFeeAmounttobePaid);
        } else {
            regFeeAmounttobePaid = challan.RegFeeAmount;
            regFeeAmounttobePaid = Math.ceil(regFeeAmounttobePaid);
            challan.RegistryFeeString = regFeeAmounttobePaid;
            challan.RegistryFee = Math.ceil(regFeeAmounttobePaid);
        }


        $("#RegFee").val(returnCommas(regFeeAmounttobePaid));

    }
    for (var i = 0; i < numberOfAmounts; i++) { //deedAmountsModel.DeedAmounts.length

        if (deedAmounts[i].isCVTField || deedAmounts[i].isPrimaryFieldForCVT) {
            if (deedAmounts[i].isPrimaryFieldForCVT == true && deedAmounts[i].isPrimaryAmout == true)
                continue; // primary field and field for CVT are same 
            if (isCVTCheckBox == true) {

                var amount = 0;
                for (var j = 0; j < challan.lstTaxAmountValue.length; j++) // TaxAmountValueModel fieldAmountValue in cvtModel.lstTaxAmountValue)
                {
                    if (deedAmounts[i].FieldID == challan.lstTaxAmountValue[j].FieldId) {
                        amount = challan.lstTaxAmountValue[j].AmountValue;

                        // If there is already a value in  the CVT field, show it in Readonly form
                        if (amount > 0) {
                            if (isCVTFieldsCreatedFirstTime == true) {
                                deedAmounts[i].Visible = "V";
                            }
                            deedAmounts[i].DefaultValue = returnCommas(amount);
                        }



                        if (isExchangeOfProperty) {
                            if (ExchangeOfPropertyFirstPropertyTreated == false) {
                                // For Land Value of First Property
                                returnedArray = createField(deedInfo, deedAmounts[i], deedid, checkForSecondProperty);
                                fieldsArray = fieldsArray + returnedArray;
                                ExchangeOfPropertyFirstPropertyTreated = true;
                            }
                            else {
                                // For Exchange of property
                                // First CVT field is created above
                                // For Second property CVT field, we are setting following flag
                                checkForSecondProperty = true;
                                break;
                            }

                        }
                        else
                            break;
                    }
                }

                returnedArray = createField(deedInfo, deedAmounts[i], deedid, checkForSecondProperty);
                fieldsArray = fieldsArray + returnedArray;
            }
        }

    }


    isCVTFieldsCreatedFirstTime = false;

    $("#leaseDeedPayCVTRegistrationDiv").html(fieldsArray);

    //areDeedDetailsFieldsCreated = true;
}

function addFields(deedInfo, deedAmounts, deedid, isCVTCheckBox, checkForSecondProperty) {

    if (challan.TransactionName == 27 || challan.TransactionName == 28 || challan.TransactionName == 29 || challan.TransactionName == 31 || challan.TransactionName == 40 || challan.TransactionName == 41 || challan.TransactionName == 43 || challan.TransactionName == 45 || challan.TransactionName == 60 || challan.TransactionName == 62 || challan.TransactionName == 55 || challan.TransactionName == 81 || challan.TransactionName == 22) {
        $("#Note_ConvenceMessage_Main").show();
    } else {
        $("#Note_ConvenceMessage_Main").hide();
    }
    debugger;
    var returnedArray = "";
    var fieldsArray = "";
    for (i = 0; i < numberOfAmounts; i++) {
        if (deedAmounts[i].isCVTField == true) {
            if (isCVTCheckBox == true) {
                returnedArray = createField(deedInfo, deedAmounts[i], deedid, checkForSecondProperty);
                fieldsArray = fieldsArray + returnedArray;
            }
        }
        else {
            returnedArray = createField(deedInfo, deedAmounts[i], deedid, checkForSecondProperty);
            fieldsArray = fieldsArray + returnedArray;
        }
    }

    if (checkForSecondProperty) {
        $("#DeedDetailsSecondPropertyGenerateChallan").html(fieldsArray);
    }
    else {
        $("#DeedDetailsForGenerateChallanFormNonJudicialDiv").html(fieldsArray);
    }

    areDeedDetailsFieldsCreated = true;
}

function NextConfirmation() {
    debugger
    if ($('#Taluka').val() == "0") {
        $('#Taluka_nodataMessage').show();
        $('#Taluka_nodataMessage').html(SelectavalidTehsil);
        return;
    }
    if ($("#AgentContactNo_validationMessage").css('display') == 'inline-block' || $("#AgentContactNo_validationMessage").css('display') == 'block' || $("#AgentContactNo_validationMessage").css('display') == 'inline') {
        document.getElementById("AgentFormId").focus();
        return;
    }
    if ($("#AgentCNICNo_validationMessage").css('display') == 'inline-block' || $("#AgentCNICNo_validationMessage").css('display') == 'block' || $("#AgentCNICNo_validationMessage").css('display') == 'inline') {
        document.getElementById("AgentFormId").focus();
        return;
    }
    //if ($("#checkPerson").val() == "1")
    //{
    $("#DeedDetailGenerateNextButton").attr("disabled", false);
    var $radio = $('input[name=ChallanFromType]:checked');
    var id = $radio.attr('id');
    if (id == "GenerateNewChallan") {
        var flag1 = false;
        var flag2 = false;
        var flag3 = false;
        var flag4 = false;
        var oldRegCheck = true;
        var res = $('#agentForm').data("kendoValidator").validate();
        var res2 = $('#dealform').kendoValidator().data('kendoValidator').validate();
        if (!res2)
            res = res2;
        var val = $("#StampType").data("kendoDropDownList").text();
        if (queryStringName == "PayDeficiencyForOldRegistry") {
            oldRegCheck = $('#oldRegistryNumber').kendoValidator().data('kendoValidator').validate();
        }
        else {
            if (val == "Non-Judicial") {
                if (queryStringName == "GenerateChallanForOldRegistry") {
                    flag1 = $('#CVTTaxForOldReg').is(":checked");
                    flag2 = $('#RegitrationFeeForOldRegCheck').is(":checked");
                    flag4 = $('#AhleCommissionDutyCheck').is(":checked");
                    oldRegCheck = $('#oldRegistryNumber').kendoValidator().data('kendoValidator').validate();
                }
                else {
                    flag1 = $('#CVTTax').is(":checked");
                    flag2 = $('#RegitrationFeeCheck').is(":checked");
                    flag3 = $('#StampDutyCheck').is(":checked");
                }
                if ($("#TransactionName").val() == oralMutationDeedId || $("#TransactionName").val() == cvtRegistrationDeedId || queryStringName == "GenerateChallanForOldRegistry") {
                    flag3 = false;
                }

                res2 = true;
                $('#purposeOfChallanTextError').hide();
                //if (flag1 || flag2 || flag3 ) {
                //    res2 = true;
                //    $('#purposeOfChallanTextError').hide();
                //}
                //else {
                //    res2 = false;
                //    $('#purposeOfChallanTextError').show();
                //    $("#purposeOfChallanError").css("color", "red");
                //    document.getElementById("purposeOfChallanError").innerHTML = Pleasecheckatleastone
                //}
            }
            else {
                var flag = false;
                if (queryStringName == "GenerateChallanForOldRegistry") {
                    flag = false;
                    $('#oldRegistryNumber').kendoValidator().data('kendoValidator').validate();
                }
                else {
                    flag = $('#StampDutyCheck').is(":checked");
                }
                if (flag) {
                    res2 = true;
                    $('#purposeOfChallanTextError').hide();
                }
                else {
                    res2 = false;
                    $('#purposeOfChallanTextError').show();
                    $("#purposeOfChallanError").css("color", "red");
                    var challanType = $("#StampType option:selected").text();
                    if (queryStringName == "GenerateChallanForOldRegistry" && challanType == "Judicial") {
                        document.getElementById("purposeOfChallanError").innerHTML = DeficiencycannotbepaidonJudicialchallan;
                        $("#dutiesCheckBox").show();
                        $("#RegistrationFeeForOldRegDiv").hide();
                    }
                    else if (challanType == "Non-Judicial") {
                        document.getElementById("purposeOfChallanError").innerHTML = Pleasecheckstampduty;
                    }
                }
            }
        }
        if (!res2)
            res = res2;
        var res2 = ValidatePurchaserSection();
        var validPurchaseSection = ValidatePurchaserSection();

        if (!res2)
            res = res2;
        var res2 = ValidateSellerSection();
        if (!res2)
            res = res2;

        //Updated Code
        if (SellerData.length <= 0) { $("#sellerSectionError").css("color", "red"); }
        if (PurchaserData.length <= 0) { $("#purchaserSectionError").css("color", "red"); }
        $('#status').attr('class', 'inProgress');
        $('#status').text('Checking...');
        if ($("#checkPerson").val() == "1" && !SellerData.length <= 0 && !PurchaserData.length <= 0 && res == true && oldRegCheck) { //check for agent form too
            CaptchaCheck(res);
        }
        else {
            $("#purchaserSectionError").css("color", "red");
            $("#sellerSectionError").css("color", "red");
            // if ($("#CaptchaCode").val() == "") {
            var captchaObj = $("#CaptchaCode").get(0).Captcha;
            if ($("#CaptchaCode").val() != null && $("#CaptchaCode").val() != "") {
                captchaObj.ReloadImage();
                document.getElementById("captchaError").innerHTML = PleaseEnterAgain;
            }
            else {
            }
            // }
        }
    }
    else if (id == "MutationFee") {
        debugger;
        var res = $('#SearchChallanNoForm').kendoValidator().data('kendoValidator').validate();
        var res2 = $('#agentForm').kendoValidator().data('kendoValidator').validate();
        if (!res2)
            res = res2;
        var isCVTCheckBox = $('#CVTTaxDeficient').is(":checked");
        if (isCVTCheckBox) {
            challanFromDB.applyCVT = true;
        }
        var newflag1 = $('#CVTTaxDeficient').is(":checked");
        var newflag2 = $('#RegitrationFeeCheckDeficient').is(":checked");
        var newflag3 = $('#DeficientCVT').is(":checked");
        var newflag4 = $('#DeficientRegistration').is(":checked");
        var newflag5 = true; $('#registryFeeCheckbox').is(":checked");
        var newflag6 = true;//$('#ahleCommissionFeeCheckbox').is(":checked");
        if (circleName == 'MutationFee') {
            var newflag7 = true;
        }

        var res3;

        if (newflag1 || newflag2 || newflag3 || newflag4 || newflag5 || newflag6 || newflag7) {
            res3 = true;
            $('#purposeOfChallanTextErrorDeficient').hide();
        }
        else {
            res3 = false;
            $('#purposeOfChallanTextErrorDeficient').show();
            $("#purposeOfChallanTextErrorDeficient").css("color", "red");
            if ($('#CvtTaxDivDeficient').is(":visible") || $('#DeficientCVTDiv').is(":visible") || $('#DeficientRegistrationDiv').is(":visible") ||
                $('#RegitrationFeeCheckDeficient').is(":visible") || $('#AhleCommissionFeeCheckboxDiv').is(":visible")) {
                document.getElementById("purposeOfChallanTextErrorDeficient").innerHTML = Pleasecheckatleastone;
            }
            else {
                document.getElementById("purposeOfChallanTextErrorDeficient").innerHTML = Pleasecheckthischeckbox;
            }
        }

        if (!res3)
        { res = res3; }
        if (res) {
            CaptchaCheck(res);
        }
        else {
            //  scroll up to the error
        }

    }
    else if (id == "RegFeeNew") {
        debugger;
        var res = $('#SearchChallanNoForm').kendoValidator().data('kendoValidator').validate();
        var res2 = $('#agentForm').kendoValidator().data('kendoValidator').validate();
        if (!res2)
            res = res2;
        var isCVTCheckBox = $('#CVTTaxDeficient').is(":checked");
        if (isCVTCheckBox) {
            challanFromDB.applyCVT = true;
        }
        var newflag1 = $('#CVTTaxDeficient').is(":checked");
        var newflag2 = $('#RegitrationFeeCheckDeficient').is(":checked");
        var newflag3 = $('#DeficientCVT').is(":checked");
        var newflag4 = $('#DeficientRegistration').is(":checked");
        var newflag5 = true; $('#registryFeeCheckbox').is(":checked");
        var newflag6 = true;//$('#ahleCommissionFeeCheckbox').is(":checked");
        if (circleName == 'RegFeeNew') {
            var newflag7 = true;
        }

        var res3;

        if (newflag1 || newflag2 || newflag3 || newflag4 || newflag5 || newflag6 || newflag7) {
            res3 = true;
            $('#purposeOfChallanTextErrorDeficient').hide();
        }
        else {
            res3 = false;
            $('#purposeOfChallanTextErrorDeficient').show();
            $("#purposeOfChallanTextErrorDeficient").css("color", "red");
            if ($('#CvtTaxDivDeficient').is(":visible") || $('#DeficientCVTDiv').is(":visible") || $('#DeficientRegistrationDiv').is(":visible") ||
                $('#RegitrationFeeCheckDeficient').is(":visible") || $('#AhleCommissionFeeCheckboxDiv').is(":visible")) {
                document.getElementById("purposeOfChallanTextErrorDeficient").innerHTML = Pleasecheckatleastone;
            }
            else {
                document.getElementById("purposeOfChallanTextErrorDeficient").innerHTML = Pleasecheckthischeckbox;
            }
        }

        if (!res3)
        { res = res3; }
        if (res) {
            CaptchaCheck(res);
        }
        else {
            //  scroll up to the error
        }

    }
    else if (id == "ScanningFee") {
        debugger;
        var res = $('#SearchChallanNoForm').kendoValidator().data('kendoValidator').validate();
        var res2 = $('#agentForm').kendoValidator().data('kendoValidator').validate();
        if (!res2)
            res = res2;
        var isCVTCheckBox = $('#CVTTaxDeficient').is(":checked");
        if (isCVTCheckBox) {
            challanFromDB.applyCVT = true;
        }
        var newflag1 = $('#CVTTaxDeficient').is(":checked");
        var newflag2 = $('#RegitrationFeeCheckDeficient').is(":checked");
        var newflag3 = $('#DeficientCVT').is(":checked");
        var newflag4 = $('#DeficientRegistration').is(":checked");
        var newflag5 = true; $('#registryFeeCheckbox').is(":checked");
        var newflag6 = true;//$('#ahleCommissionFeeCheckbox').is(":checked");
        if (circleName == 'MutationFee') {
            var newflag7 = true;
        }

        var res3;

        if (newflag1 || newflag2 || newflag3 || newflag4 || newflag5 || newflag6 || newflag7) {
            res3 = true;
            $('#purposeOfChallanTextErrorDeficient').hide();
        }
        else {
            res3 = false;
            $('#purposeOfChallanTextErrorDeficient').show();
            $("#purposeOfChallanTextErrorDeficient").css("color", "red");
            if ($('#CvtTaxDivDeficient').is(":visible") || $('#DeficientCVTDiv').is(":visible") || $('#DeficientRegistrationDiv').is(":visible") ||
                $('#RegitrationFeeCheckDeficient').is(":visible") || $('#AhleCommissionFeeCheckboxDiv').is(":visible")) {
                document.getElementById("purposeOfChallanTextErrorDeficient").innerHTML = Pleasecheckatleastone;
            }
            else {
                document.getElementById("purposeOfChallanTextErrorDeficient").innerHTML = Pleasecheckthischeckbox;
            }
        }

        if (!res3)
        { res = res3; }
        if (res) {
            CaptchaCheck(res);
        }
        else {
            //  scroll up to the error
        }

    }
    else if (id == "PayCVTandRegFee") {
        debugger;
        var res = $('#SearchChallanNoForm').kendoValidator().data('kendoValidator').validate();
        var res2 = $('#agentForm').kendoValidator().data('kendoValidator').validate();
        if (!res2)
            res = res2;
        var isCVTCheckBox = $('#CVTTaxDeficient').is(":checked");
        if (isCVTCheckBox) {
            challanFromDB.applyCVT = true;
        }
        var newflag1 = $('#CVTTaxDeficient').is(":checked");
        var newflag2 = $('#RegitrationFeeCheckDeficient').is(":checked");
        var newflag3 = $('#DeficientCVT').is(":checked");
        var newflag4 = $('#DeficientRegistration').is(":checked");
        var newflag5 = $('#registryFeeCheckbox').is(":checked");
        var newflag6 = $('#ahleCommissionFeeCheckbox').is(":checked");
        if (circleName == 'PayCVTandRegT') {
            var newflag7 = true;
        }

        var res3;

        if (newflag1 || newflag2 || newflag3 || newflag4 || newflag5 || newflag6 || newflag7) {
            res3 = true;
            $('#purposeOfChallanTextErrorDeficient').hide();
        }
        else {
            res3 = false;
            $('#purposeOfChallanTextErrorDeficient').show();
            $("#purposeOfChallanTextErrorDeficient").css("color", "red");
            if ($('#CvtTaxDivDeficient').is(":visible") || $('#DeficientCVTDiv').is(":visible") || $('#DeficientRegistrationDiv').is(":visible") ||
                $('#RegitrationFeeCheckDeficient').is(":visible") || $('#AhleCommissionFeeCheckboxDiv').is(":visible")) {
                document.getElementById("purposeOfChallanTextErrorDeficient").innerHTML = Pleasecheckatleastone;
            }
            else {
                document.getElementById("purposeOfChallanTextErrorDeficient").innerHTML = Pleasecheckthischeckbox;
            }
        }

        if (!res3)
        { res = res3; }
        if (res) {
            CaptchaCheck(res);
        }
        else {
            //  scroll up to the error
        }

    } else {
        var res = $('#SearchStampNoForm').kendoValidator().data('kendoValidator').validate();
        var res2 = $('#agentForm').kendoValidator().data('kendoValidator').validate()
        if (!res2)
        { res = res2; }
        if (res) {
            CaptchaCheck(res);
        }
        else {
            //  if ($("#CaptchaCode").val() == "") {
            //var captchaObj = $("#CaptchaCode").get(0).Captcha;
            //captchaObj.ReloadImage();
            //document.getElementById("captchaError").innerHTML = "Please Enter Again";
            //  }
        }
    }
}
// Original Function 
//function CaptchaCheck(res) {
//    debugger;
//    // get client-side Captcha object instance
//    var captchaObj = $("#CaptchaCode").get(0).Captcha;
//    // gather data required for Captcha validation
//    var params = {}
//    params.CaptchaId = captchaObj.Id;
//    params.InstanceId = captchaObj.InstanceId;
//    params.UserInput = $("#CaptchaCode").val();
//    // make asynchronous Captcha validation request
//    $.getJSON('../ChallanFormView/CheckCaptcha', params, function (result) {
//        if (res) {
//            debugger
//            document.getElementById("captchaError").innerHTML = " ";
//            var $radio = $('input[name=ChallanFromType]:checked');
//            var id = $radio.attr('id');
//            var urlNew = base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartial';
//            if (id == "GenerateNewChallan") {
//                challan = getChallanModel();

//                challanModel = challan;
//                if ($('#isPaidOnlineChkBox').is(':checked')) {
//                    challan.isPaidOnlineChkBox = true;
//                    challanModel.isPaidOnlineChkBox = true;
//                }
//                else {
//                    challan.isPaidOnlineChkBox = false;
//                    challanModel.isPaidOnlineChkBox = false;
//                }


//                var selectedBank = $('input[name="OnlinePaidGrp"]:checked').val();


//                if (selectedBank) {
//                    challan.onlineSelectedBank = selectedBank;
//                    challanModel.onlineSelectedBank = selectedBank;
//                } else {
//                    challan.onlineSelectedBank = "";
//                    challanModel.onlineSelectedBank = "";
//                }

//                var nameValue = getQueryStringValue('name');

//                if (nameValue != "GenerateChallan" && nameValue != "PayDeficient" && nameValue != "PayDeficiencyForOldRegistry") {

//                    challan.onlineSelectedBank = "";
//                    challanModel.onlineSelectedBank = "";
//                }

//                if (challan.isPaidOnlineChkBox != true) {
//                    challan.onlineSelectedBank = "";
//                    challanModel.onlineSelectedBank = "";
//                }

//                if (isPropertyInfo == false) {
//                    challan.propertyInfo.FullAddress = null;
//                }



//                $("#districtDropdownDC").data("kendoDropDownList").value(challan.DistrictId);
//                initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.DistrictId, selectTalukaText, "talukaDropdownDC", challan.TalukaId);
//                // initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.DistrictId, selectTehsilText, "tehsilDropdownDC", challan.TalukaId);
//                //initializeDropDown(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + id, selectTehsilText, "Tehsil");
//                //$("#tehsilDropdownDC").data("kendoDropDownList").value(challan.TalukaId);
//                //onChangeTotalAmountDeedDetailGenerateChallan();
//                //  urlNew = base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartial';
//            }
//            else {
//                if (id == "PayDeficient") {
//                    challanFromDB.numberOfStampPapers = 1;
//                }
//                challan = getChallanModelForDeficient();
//                isMultiplePropertiesExchageOfProperty = challan.isMultiplePropertiesExchageOfProperty;
//                challanModel = challan;

//                if ($('#isPaidOnlineChkBoxForDeficient').is(':checked')) {
//                    challan.isPaidOnlineChkBox = true;
//                    challanModel.isPaidOnlineChkBox = true;
//                }
//                else {
//                    challan.isPaidOnlineChkBox = false;
//                    challanModel.isPaidOnlineChkBox = false;
//                }


//                var selectedBank = $('input[name="OnlinePaidGrpForDeficient"]:checked').val();

//                if (selectedBank) {
//                    challan.onlineSelectedBank = selectedBank;
//                    challanModel.onlineSelectedBank = selectedBank;
//                } else {
//                    challan.onlineSelectedBank = "";
//                    challanModel.onlineSelectedBank = "";
//                }

//                var nameValue = getQueryStringValue('name');

//                if (nameValue != "GenerateChallan" && nameValue != "PayDeficient" && nameValue != "PayDeficiencyForOldRegistry") {

//                    challan.onlineSelectedBank = "";
//                    challanModel.onlineSelectedBank = "";
//                }

//                if (challan.isPaidOnlineChkBox != true) {
//                    challan.onlineSelectedBank = "";
//                    challanModel.onlineSelectedBank = "";
//                }
//                //urlNew = base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartialDeedDetailsDeficient';
//            }
//            isMultiplePropertiesExchageOfProperty = challan.isMultiplePropertiesExchageOfProperty;
//            $.ajax({
//                url: urlNew,
//                type: 'POST',
//                data: JSON.stringify(challanModel),
//                contentType: "application/json;charset=utf-8",
//                success: function (data) {
//                    OnNextFirstScreen();
//                },
//                error: function (data) {
//                    var response = data.responseText.replace(/"/g, '');
//                    $("#purchaserSectionError").css("color", "red");
//                    $("#Tehsil_nodataMessage").show();
//                    $("#Tehsil_nodataMessage").html(data.responseText);
//                }
//            });

//        }
//        else {
//            document.getElementById("captchaError").innerHTML = PleaseEnterAgain;
//            // always change Captcha code if validation fails
//            captchaObj.ReloadImage();
//            res = false;
//            return res;
//        }
//    }
//        );
//}
function CaptchaCheck(res) {
    debugger;
    // get client-side Captcha object instance
   // var captchaObj = $("#CaptchaCode").get(0).Captcha;
    // gather data required for Captcha validation
   // var params = {}
   // params.CaptchaId = captchaObj.Id;
   // params.InstanceId = captchaObj.InstanceId;
   // params.UserInput = $("#CaptchaCode").val();
    // make asynchronous Captcha validation request

            debugger
            document.getElementById("captchaError").innerHTML = " ";
            var $radio = $('input[name=ChallanFromType]:checked');
            var id = $radio.attr('id');
            var urlNew = base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartial';
            if (id == "GenerateNewChallan") {
                challan = getChallanModel();

                challanModel = challan;
                if ($('#isPaidOnlineChkBox').is(':checked')) {
                    challan.isPaidOnlineChkBox = true;
                    challanModel.isPaidOnlineChkBox = true;
                }
                else {
                    challan.isPaidOnlineChkBox = false;
                    challanModel.isPaidOnlineChkBox = false;
                }


                var selectedBank = $('input[name="OnlinePaidGrp"]:checked').val();


                if (selectedBank) {
                    challan.onlineSelectedBank = selectedBank;
                    challanModel.onlineSelectedBank = selectedBank;
                } else {
                    challan.onlineSelectedBank = "";
                    challanModel.onlineSelectedBank = "";
                }

                var nameValue = getQueryStringValue('name');

                if (nameValue != "GenerateChallan" && nameValue != "PayDeficient" && nameValue != "PayDeficiencyForOldRegistry") {

                    challan.onlineSelectedBank = "";
                    challanModel.onlineSelectedBank = "";
                }

                if (challan.isPaidOnlineChkBox != true) {
                    challan.onlineSelectedBank = "";
                    challanModel.onlineSelectedBank = "";
                }

                if (isPropertyInfo == false) {
                    challan.propertyInfo.FullAddress = null;
                }



                $("#districtDropdownDC").data("kendoDropDownList").value(challan.DistrictId);
                initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.DistrictId, selectTalukaText, "talukaDropdownDC", challan.TalukaId);
                // initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.DistrictId, selectTehsilText, "tehsilDropdownDC", challan.TalukaId);
                //initializeDropDown(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + id, selectTehsilText, "Tehsil");
                //$("#tehsilDropdownDC").data("kendoDropDownList").value(challan.TalukaId);
                //onChangeTotalAmountDeedDetailGenerateChallan();
                //  urlNew = base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartial';
            }
            else {
                if (id == "PayDeficient") {
                    challanFromDB.numberOfStampPapers = 1;
                }
                challan = getChallanModelForDeficient();
                isMultiplePropertiesExchageOfProperty = challan.isMultiplePropertiesExchageOfProperty;
                challanModel = challan;

                if ($('#isPaidOnlineChkBoxForDeficient').is(':checked')) {
                    challan.isPaidOnlineChkBox = true;
                    challanModel.isPaidOnlineChkBox = true;
                }
                else {
                    challan.isPaidOnlineChkBox = false;
                    challanModel.isPaidOnlineChkBox = false;
                }


                var selectedBank = $('input[name="OnlinePaidGrpForDeficient"]:checked').val();

                if (selectedBank) {
                    challan.onlineSelectedBank = selectedBank;
                    challanModel.onlineSelectedBank = selectedBank;
                } else {
                    challan.onlineSelectedBank = "";
                    challanModel.onlineSelectedBank = "";
                }

                var nameValue = getQueryStringValue('name');

                if (nameValue != "GenerateChallan" && nameValue != "PayDeficient" && nameValue != "PayDeficiencyForOldRegistry") {

                    challan.onlineSelectedBank = "";
                    challanModel.onlineSelectedBank = "";
                }

                if (challan.isPaidOnlineChkBox != true) {
                    challan.onlineSelectedBank = "";
                    challanModel.onlineSelectedBank = "";
                }
                //urlNew = base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartialDeedDetailsDeficient';
            }
            isMultiplePropertiesExchageOfProperty = challan.isMultiplePropertiesExchageOfProperty;
            $.ajax({
                url: urlNew,
                type: 'POST',
                data: JSON.stringify(challanModel),
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    OnNextFirstScreen();
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    $("#purchaserSectionError").css("color", "red");
                    $("#Tehsil_nodataMessage").show();
                    $("#Tehsil_nodataMessage").html(data.responseText);
                }
            });

       
   
}
//function CaptchaCheck(res) {
//    // get client-side Captcha object instance
//    var captchaObj = $("#CaptchaCode").get(0).Captcha;
//    // gather data required for Captcha validation
//    var params = {}
//    params.CaptchaId = captchaObj.Id;
//    params.InstanceId = captchaObj.InstanceId;
//    params.UserInput = $("#CaptchaCode").val();
//    // make asynchronous Captcha validation request
//    $.getJSON('../ChallanFormView/CheckCaptcha', params, function (result) {
//        if (res) {
//            if (true === result) {
//                document.getElementById("captchaError").innerHTML = " ";
//                var $radio = $('input[name=ChallanFromType]:checked');
//                var id = $radio.attr('id');
//                var urlNew = base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartial';
//                if (id == "GenerateNewChallan") {
//                    challan = getChallanModel();
//                    challanModel = challan;
//                    if (isPropertyInfo == false) {
//                        challan.propertyInfo.FullAddress = null;
//                    }
//                    $("#districtDropdownDC").data("kendoDropDownList").value(challan.DistrictId);
//                    initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.DistrictId, selectTalukaText, "talukaDropdownDC", challan.TalukaId);
//                    // initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.DistrictId, selectTehsilText, "tehsilDropdownDC", challan.TalukaId);
//                    //initializeDropDown(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + id, selectTehsilText, "Tehsil");
//                    //$("#tehsilDropdownDC").data("kendoDropDownList").value(challan.TalukaId);
//                    //onChangeTotalAmountDeedDetailGenerateChallan();
//                    //  urlNew = base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartial';
//                }
//                else {
//                    if (id == "PayDeficient") {
//                        challanFromDB.numberOfStampPapers = 1;
//                    }
//                    challan = getChallanModelForDeficient();
//                    isMultiplePropertiesExchageOfProperty = challan.isMultiplePropertiesExchageOfProperty;
//                    challanModel = challan;
//                    //urlNew = base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartialDeedDetailsDeficient';
//                }
//                isMultiplePropertiesExchageOfProperty = challan.isMultiplePropertiesExchageOfProperty;
//                $.ajax({
//                    url: urlNew,
//                    type: 'POST',
//                    data: JSON.stringify(challanModel),
//                    contentType: "application/json;charset=utf-8",
//                    success: function (data) {
//                        OnNextFirstScreen();
//                    },
//                    error: function (data) {
//                        var response = data.responseText.replace(/"/g, '');
//                        $("#purchaserSectionError").css("color", "red");
//                        $("#Tehsil_nodataMessage").show();
//                        $("#Tehsil_nodataMessage").html(data.responseText);
//                    }
//                });
//            }
//            else {
//                //$('#status').attr('class', 'incorrect');
//                //$('#status').text('Check failed');
//                document.getElementById("captchaError").innerHTML = InvalidCodeEntered;
//                // always change Captcha code if validation fails
//                captchaObj.ReloadImage();
//                res = false;
//                return res;
//            }
//        }
//        else {
//            document.getElementById("captchaError").innerHTML = PleaseEnterAgain;
//            // always change Captcha code if validation fails
//            captchaObj.ReloadImage();
//            res = false;
//            return res;
//        }
//    }
//        );
//}

function getQueryStringValue(key) {
    // Create a new URL object using the current window location
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value associated with the key
    return urlParams.get(key);
}

function onTehsilChange() {
    $("#Tehsil_nodataMessage").hide();
    if (challan != null && challan != "" && challan != undefined) {
        LandClassificationChange();
    }
}
function updateIsProperty() {
    if (isPropertyInfo == false) {
        challanModel.propertyInfo = null;
    }

    //var $radio = $('input[name=ChallanFromType]:checked');

    //var id = $radio.attr('id');

    //if (id == "GenerateNewChallan") {

    //    if (challan.applyCVT == true || isDCValuationFlag == true) {

    //        isPropertyInfo = true;

    //    }
    //    else {
    //        challanModel.propertyInfo = null;

    //        isPropertyInfo = false;

    //    }
    //}
}




function SubmitChallan() {
    debugger;


    //var testcat = challan.CATEGORY_ID;
    //var testconstrArea = challan.CoveredAreaQuantity;
    //var totalAmountNumeric = parseFloat(totalAmount);
    //if (totalAmountNumeric > 0) {
    //var totalTaxToBePaid = 0;
    //var CVT = 0;
    //if ((challan.applyCVT == true || challan.applyDeficientCVT == true) && challan.PayableCvtString != null)
    //    CVT = parseFloat(challan.PayableCvtString);
    //var RegFee = 0;
    //if ((challan.applyRegistrationDuty == true || challan.applyDeficientRegistration == true) && challan.RegistrationFeeString != null)
    //    RegFee = parseFloat(challan.RegistrationFeeString);
    //var RegistryPagesFee = 0;
    //if ((challan.isRegistryFeeCheck == true) && challan.RegistryFeeString != null)
    //    RegistryPagesFee = parseFloat(challan.RegistryFeeString);
    //totalTaxToBePaid = CVT + RegFee + RegistryPagesFee;
    //if (totalTaxToBePaid == 0) {
    //    $("#totalPayableTaxError").show();
    //    document.getElementById("totalPayableTaxErrorMessage").innerHTML = 'Total Payable Tax amount should be greater than 0 to generate Challan.';
    //    $("#totalPayableTaxErrorMessage").css("color", "red");
    //}
    //else {
    var $radio_land = $('input[name=LandType]:checked');
    var id_land = $radio_land.attr('id');
    if (id_land == "Urban") {
        challanModel.isUrban = true;
    } else {
        challanModel.isUrban = false;
    }
    if ($("#TransactionName").val() == immoveableDeedId && challanModel.propertyInfo.isUrban == false) {
        $("#totalPayableTaxError").show();
        document.getElementById("totalPayableTaxErrorMessage").innerHTML = ErrorMsg63A;
        $("#totalPayableTaxErrorMessage").css("color", "red");
    }
    else if ($("#TransactionName").val() == exchangeOfPropertyDeedId && challanModel.propertyInfo.IsGovProperty == true && challanModel.propertyInfo2.IsGovProperty) {
        $("#totalPayableTaxError").show();
        document.getElementById("totalPayableTaxErrorMessage").innerHTML = ErrorMsgGovtProperty;
        $("#totalPayableTaxErrorMessage").css("color", "red");
    }
    else {
        $("#totalPayableTaxError").hide();
        //for lease less than 20 years
        challanModel.isLeaseYearLessThan20 = isLeaseYearLessThan20;
        challanModel.isLegalHeirForGiftDeed = isLegalHeirForGiftDeed;

        if (challanModel.oldRegistryDate != null && challanModel.oldRegistryDate != "") {
            challanModel.oldRegistryDate = kendo.toString(challanModel.oldRegistryDate, 'd');
        }
        if (queryStringName == "PayCVTandReg" || queryStringName == "GenerateChallanForOldRegistry") {
            debugger;
            var totalTaxToBePaid = 0;
            var CVT = 0;
            if (queryStringName == "GenerateChallanForOldRegistry") {
                challanModel.isOldRegistryChallan = true;
            }
            else {
                challanModel.isOldRegistryChallan = false;
            }
            if ((challan.applyCVT == true || challan.applyDeficientCVT == true) && challan.PayableCvtString != null)
                CVT = parseFloat(challan.PayableCvtString);
            var RegFee = 0;
            if ((challan.applyRegistrationDuty == true || challan.applyDeficientRegistration == true) && challan.RegistrationFeeString != null)
                RegFee = parseFloat(challan.RegistrationFeeString);
            var RegistryPagesFee = 0;
            if ((challan.isRegistryFeeCheck == true) && challan.RegistryFeeString != null)
                RegistryPagesFee = parseFloat(challan.RegistryFeeString);
            var AhleCommFee = 0;
            if ((challan.isAhleCommissionFeeChecked == true) && challan.AhleCommissionFeeString != null)
                AhleCommFee = parseFloat(challan.AhleCommissionFeeString);

            totalTaxToBePaid = CVT + RegFee + RegistryPagesFee + AhleCommFee;
            if (totalTaxToBePaid == 0) {
                $("#totalPayableTaxError").show();
                document.getElementById("totalPayableTaxErrorMessage").innerHTML = TotalPayableTaxamountshouldbegreaterthan0togenerateChallan;
                $("#totalPayableTaxErrorMessage").css("color", "red");
            }
            else {
                updateIsProperty();
                if (isPropertyInfo == true) {
                    challanModel.propertyInfo.DistrictId = challanModel.propertyInfo.DistrictId;
                    challanModel.propertyInfo.TalukaId = challanModel.propertyInfo.TalukaId;
                    //if (challanModel.propertyInfo.SquareID == 0 && challanModel.propertyInfo.QilaID == 0) challanModel.propertyInfo.isSquareNoHierarchy = false;
                    if (isExchangeOfProperty) {
                        challanModel.propertyInfo2.DistrictId = challanModel.propertyInfo2.DistrictId;
                        challanModel.propertyInfo2.TalukaId = challanModel.propertyInfo2.TalukaId;
                        //if (challanModel.propertyInfo2.SquareID == 0 && challanModel.propertyInfo2.QilaID == 0) challanModel.propertyInfo2.isSquareNoHierarchy = false;
                    }
                    if ($("#BasementsDropdownDC").val() >= 1) {
                        challanModel.propertyInfo.BasementsDropdownDC = $("#BasementsDropdownDC").val();
                        //alert(challanModel.propertyInfo.BasementsDropdownDC);
                    } else {
                        challanModel.propertyInfo.BasementsDropdownDC = 0;
                    }
                    if ($("#FlDropdownDC").val() >= 1) {
                        challanModel.propertyInfo.FlDropdownDC = $("#FlDropdownDC").val();
                    } else {
                        challanModel.propertyInfo.FlDropdownDC = 0;
                    }
                }

                var Fixed_Percent = FixedStampValue;

                if ($("#TransactionName").val() == DebentureDeed) {
                    Fixed_Percent = 0.05;
                    var isTCChecked = $('#TransferComercialCheck').is(":checked");
                    if (isTCChecked == true)
                        Fixed_Percent = 0.02;
                }
                if ($("#TransactionName").val() == TransferaDeed) {
                    var $radio = $('input[name=ShareWinthdrawl]:checked');
                    var radio_id = $radio.attr('id');
                    if (radio_id == "Withdrawl") {
                        Fixed_Percent = 1.5
                    } else {
                        Fixed_Percent = 0.15
                    }
                }
                if ($("#TransactionName").val() == LifeInsuranceDeed) {
                    var $radio = $('input[name=OriginalDuplicate]:checked');
                    var radio_id = $radio.attr('id');
                    if (radio_id == "Original") {
                        Fixed_Percent = 0.12
                    } else {
                        Fixed_Percent = 0.06
                    }




                }

                challanModel.Fixed_Percent = Fixed_Percent;
                //contentType: "application/json;charset=utf-8",
                $("#totalPayableTaxError").hide();
                $("#waitModalForSave").modal();

                if (challanModel.propertyInfo != null && challanModel.ChallanType != "Deficient") {
                    challanModel.propertyInfo.CATEGORY_ID = challan.CATEGORY_ID;
                    challanModel.propertyInfo.CoveredAreaQuantity = challan.CoveredAreaQuantity;
                    challanModel.propertyInfo.ConstructedArea = challan.CoveredAreaQuantity;
                    challanModel.propertyInfo.ConstructedAreaInSqFeet = challan.CoveredAreaQuantity;
                }
                //alert('Add_Challan_1' + challanModel.propertyInfo.FlDropdownDC); 
                $.ajax({
                    type: 'POST',
                    url: base_url_service_layer + '/api/Proxy/ChallanForm/AddChallan',
                    data: JSON.stringify(challanModel),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        // Send SMS
                        challanModel.ChallanNumber = data.ChallanNumber;
                        //SendSMS(data);
                        if (isExchangeOfProperty == true) {
                            if (challanModel.applyCVT)
                                $("#step6pending").attr("src", "../Images/steps-completed.png");
                            else
                                $("#step4pending").attr("src", "../Images/steps-completed.png");
                        }
                        else {
                            $("#step4pending").attr("src", "../Images/steps-completed.png");
                        }
                        $("#confirmfrom").hide();
                        $("#confirmChallan").show();
                        printSerial = data.ChallanNumber;
                        document.getElementById("serialNum").innerHTML = printSerial;
                        $("#serialChallanNum").val(printSerial);

                        console.log(printSerial);
                       
                        // Reset the form if successfully inserted




                        debugger;
                        if (challanModel.isPaidOnlineChkBox) {
                            //$("#waitModalForSave").modal();
                            GeneratePSID();
                            //$("#waitModalForSave").modal('hide');
                        }
                        $("#waitModalForSave").modal('hide');
                        //GeneratePSIDOriginal();
                        ResetForm();
                    },
                    error: function (data) {
                        var response = data.responseText.replace(/"/g, '');
                        //$("#confirmfrom").hide();
                        //$("#confirmChallan").show();
                        //alert(response);
                        $("#waitModalForSave").modal('hide');
                        //                    overlayError(response);
                    }
                });


            }
        }
        else {

            //var totalPayableAmount = parseFloat(challan.PayableCvtString) + parseFloat(challan.RegistrationFeeString) + parseFloat(challan.PayableStampDutyString);
            if (!challan.applyCVT && !challan.applyRegistrationDuty && !challan.applyStampDuty) {
                $("#totalPayableTaxError").show();
                if (challan.isOldRegistryChallan && (challan.TransactionNameString == "ORAL MUTATION" || challan.TransactionNameString == "REG/CVT")) {
                    document.getElementById("totalPayableTaxErrorMessage").innerHTML = 'Deficiency/Penalty cannot be paid on ' + challan.TransactionNameString + '.';
                }
                else {
                    document.getElementById("totalPayableTaxErrorMessage").innerHTML = TotalPayableTaxamountshouldbegreaterthan0togenerateChallan;
                }
                $("#totalPayableTaxErrorMessage").css("color", "red");
            }
            else {

                updateIsProperty();
                debugger;
                if (isPropertyInfo == true) {
                    if (challanModel.propertyInfo != null) {
                        challanModel.propertyInfo.DistrictId = challanModel.propertyInfo.DistrictId;
                        challanModel.propertyInfo.TalukaId = challanModel.propertyInfo.TalukaId;
                    }
                    else {
                        //challanModel.propertyInfo.DistrictId = 4;
                        //challanModel.propertyInfo.TalukaId = 13;
                    }


                    /***
                    commented this line on 8/25/2016 --- the logic for hierarchy test is on dc screen 
                    ***/
                    //if (challanModel.propertyInfo.SquareID == 0 && challanModel.propertyInfo.QilaID == 0) challanModel.propertyInfo.isSquareNoHierarchy = false;
                    if (isExchangeOfProperty) {
                        challanModel.propertyInfo2.DistrictId = challanModel.propertyInfo2.DistrictId;
                        challanModel.propertyInfo2.TalukaId = challanModel.propertyInfo2.TalukaId;
                        //if (challanModel.propertyInfo2.SquareID == 0 && challanModel.propertyInfo2.QilaID == 0) challanModel.propertyInfo2.isSquareNoHierarchy = false;
                    }
                }


                Fixed_Percent: Fixed_Percent

                var Fixed_Percent = FixedStampValue;
                //contentType: "application/json;charset=utf-8",
                if ($("#TransactionName").val() == TransferaDeed) {
                    var $radio = $('input[name=ShareWinthdrawl]:checked');
                    var radio_id = $radio.attr('id');
                    if (radio_id == "Withdrawl") {
                        Fixed_Percent = 1.5
                    } else {
                        Fixed_Percent = 0.15
                    }
                }
                if ($("#TransactionName").val() == LifeInsuranceDeed) {
                    var $radio = $('input[name=OriginalDuplicate]:checked');
                    var radio_id = $radio.attr('id');
                    if (radio_id == "Original") {
                        Fixed_Percent = 0.12
                    } else {
                        Fixed_Percent = 0.06
                    }



                }


                $("#totalPayableTaxError").hide();
                $("#waitModalForSave").modal();


                if ($("#TransactionName").val() == DebentureDeed) {
                    Fixed_Percent = 0.05;
                    var isTCChecked = $('#TransferComercialCheck').is(":checked");
                    if (isTCChecked == true)
                        Fixed_Percent = 0.02;
                }
                challanModel.Fixed_Percent = Fixed_Percent;
                if (challanModel.propertyInfo != null && challanModel.ChallanType != "Deficient") {
                    challanModel.propertyInfo.CATEGORY_ID = challan.CATEGORY_ID;
                    challanModel.propertyInfo.CoveredAreaQuantity = challan.CoveredAreaQuantity;
                    challanModel.propertyInfo.ConstructedArea = challan.CoveredAreaQuantity;
                    challanModel.propertyInfo.ConstructedAreaInSqFeet = challan.CoveredAreaQuantity;
                    //alert("I am here"); 
                    if ($("#BasementsDropdownDC").val() >= 1) {
                        challanModel.propertyInfo.BasementsDropdownDC = $("#BasementsDropdownDC").val();
                        // alert(challanModel.propertyInfo.BasementsDropdownDC); 
                    } else {
                        challanModel.propertyInfo.BasementsDropdownDC = 0;
                    }
                    if ($("#FlDropdownDC").val() >= 1) {
                        challanModel.propertyInfo.FlDropdownDC = $("#FlDropdownDC").val();
                    } else {
                        challanModel.propertyInfo.FlDropdownDC = 0;
                    }
                }
                if (challanModel.ChallanType == "Deficient") {
                    debugger;
                    challanModel.order_number = $("#OrderNumber").val();
                    challanModel.order_date = $("#OrderDate").val();
                    challanModel.surchargeAmount = $("#SurchargeDeficient").val();
                    if ($('#afterRegistration').is(':checked')) {
                        challanModel.is_after_registration = $('#afterRegistration').is(':checked');
                    } else {
                        challanModel.is_after_registration = 0;
                    }

                }
                debugger;
                //alert('addchallan2' + challanModel.propertyInfo.FlDropdownDC); 
                $.ajax({
                    type: 'POST',
                    url: base_url_service_layer + '/api/Proxy/ChallanForm/AddChallan',
                    data: JSON.stringify(challanModel),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        challanModel.ChallanNumber = data.ChallanNumber;
                        //SendSMS(data);
                        if (isExchangeOfProperty == true) {
                            if (challanModel.applyCVT)
                                $("#step6pending").attr("src", "../Images/steps-completed.png");
                            else
                                $("#step4pending").attr("src", "../Images/steps-completed.png");
                        }
                        else {
                            $("#step4pending").attr("src", "../Images/steps-completed.png");
                        }

                        $("#confirmfrom").hide();
                        $("#confirmChallan").show();
                        printSerial = data.ChallanNumber;
                        document.getElementById("serialNum").innerHTML = printSerial;
                        console.log(printSerial);
                        // $("#waitModalForSave").modal('hide');
                        // Reset the form if successfully inserted
                        debugger;
                        if (challanModel.isPaidOnlineChkBox) {
                            // $("#waitModalForSave").modal();
                           
                            GeneratePSID();
                           
                            //$("#waitModalForSave").modal('hide');
                        }
                        $("#waitModalForSave").modal('hide');
                        //GeneratePSIDOriginal();
                        ResetForm();
                    },
                    error: function (data) {
                        var response = data.responseText.replace(/"/g, '');
                        //$("#confirmfrom").hide();
                        //$("#confirmChallan").show();
                        // alert(response);
                        $("#waitModalForSave").modal('hide');
                        //                    overlayError(response);
                    }
                });
            }

            //}
        }
    }

}

function SendSMS(_challan) {

    $.ajax({
        url: base_url_sms_services + '/api/ProxyServices/SMS/SendChallanSMS',//base_url_service_layer
        type: 'POST',
        data: JSON.stringify(_challan),
        contentType: "application/json;charset=utf-8",

        success: function (data) {
            console.log("SendSMS service called successfully");
        },
        error: function (data) {
            console.log("SendSMS service called failed");
            //alert(data);
        }
    });
}

/////////////////////////////////////////////
//Client side form functional methods
////////////////////////////////////////////
function BackButtonToRateForm() {
    challan.PayableSDandCVTString = "";
    $("#totalPayableTaxError").hide();
    if (CVTCheckForStepBarOnly == true && isExchangeOfProperty == false) {
        $("#step3pending").attr("src", "../Images/steps-pending.png");
    }
    else if (CVTCheckForStepBarOnly == true && isExchangeOfProperty == true) {
        $("#step5pending").attr("src", "../Images/steps-pending.png");
    }
    else if (isDCValuationFlag == true) {
        if (isExchangeOfProperty == true) {
            $("#step3pending").attr("src", "../Images/steps-pending.png");
        }
        if (exemptCVTforGiftDeed && isCVTApplicable) {
            $("#step3pending").attr("src", "../Images/steps-pending.png");
        }
        else {
            $("#step2pending").attr("src", "../Images/steps-pending.png");
        }
    }
    else {
        $("#step1pending").attr("src", "../Images/steps-pending.png");
    }

    $("#confirmfrom").hide();
    var $radio = $('input[name=ChallanFromType]:checked');

    var id = $radio.attr('id');

    if (id == "GenerateNewChallan") {
        if (queryStringName == "GenerateChallanForOldRegistry") {
            if (isAhleCommissionFeeCheck == true) {
                $("#AhleCommisionFeePage").show();
            } else if (deficientCvtCheck == true) {
                $("#PayCVTDeficient").show();
            } else if (cvtCheck == true) {
                $("#CVTView").show();
            } else if (regCheck == true || deficientRegCheck == true || isRegistryFeeCheck == true) {
                $("#DeedDetailsForPayCVTandReg").show();
            }
        }
        else if (queryStringName == "PayDeficiencyForOldRegistry") {
            $("#confirmfrom").hide();
            $("#DeedDetailsForDeficient").show();
        }
        else {
            $("#confirmfrom").hide();
            var isCVTCheckBox = $('#CVTTax').is(":checked");
            if (isCVTCheckBox == true && isCVTApplicable && isExchangeOfProperty == true) {
                $("#CVTView").show();
                isCVTNextFirstScreen = false;
            }
            else if (isCVTCheckBox == true && isCVTApplicable) {
                $("#CVTView").show();
            }
            else if (isCVTApplicable && exemptCVTforGiftDeed) {
                $("#CVTView").show();
            }
            else if (isDCValuationFlag == true || (isCVTCheckBox == true && isCVTApplicable)) {
                $("#RateOfChallan").show();
            }
            else {
                $("#DeedDetailsForGenerateChallan").show();
            }
        }
    }
    else if (id == "PayDeficient") {
        $("#confirmfrom").hide();
        $("#DeedDetailsForDeficient").show();
    } else {
        if (deficientCvtCheck == true) {
            $("#PayCVTDeficient").show();
        } else if (cvtCheck == true) {
            $("#CVTView").show();
        } else if (regCheck == true || deficientRegCheck == true || isRegistryFeeCheck == true || isAhleCommissionFeeCheck == true || DigitalScaningFee == true || MutationFee == true || RegFeeNew == true) {
            $("#DeedDetailsForPayCVTandReg").show();
        } else {

        }
        if (!deficientRegCheck && !deficientCvtCheck && isAhleCommissionFeeCheck && isRegistryFeeCheck)
            return;
        if (deficientCVTDivVisible && deficientRegisDivVisible && isAhleCommissionFeeCheck) {
            $("#DeedDetailsForPayCVTandReg").hide();
            $("#AhleCommisionFeePage").show();
            $("#PayCVTDeficient").hide();
        }
    }
}

function BackButtonToChallanForm() {
    $("#challanform").show();
    var captchaObj = $("#CaptchaCode").get(0).Captcha;
    captchaObj.ReloadImage();
    $("#RateOfChallan").hide();
}



function DeleteContainerSeller(current) {
    var count = 0;
    for (i = 1 ; i <= count_of_seller; i++) {
        if (document.getElementById("Seller_" + i) != null) {
            count++;
        }
    }
    if (count <= 1)
        return;
    var parent = $(current).parent().parent();
    $(parent).fadeOut('slow');
    $(parent).remove();
}

function DeleteContainerPurchaser(current) {
    var count = 0;
    for (i = 1 ; i <= count_of_purchaser; i++) {
        if (document.getElementById("Purchaser_" + i) != null) {
            count++;
        }
    }
    if (count <= 1)
        return;
    var parent = $(current).parent().parent();
    $(parent).fadeOut('slow');
    $(parent).remove();
}



function ResetForm() {
    isChallanFirst = true;
    // alert("I am the one called first"); 
    var $radio = $('input[name=ChallanFromType]:checked');

    var personPassport = document.getElementById('PersonPassport');
    var personNameAttorney = document.getElementById('PersonNameAttorney');
    var personCnicAttoreny = document.getElementById('PersonCnicPassport');
    var id = $radio.attr('id');
    if (id == "GenerateNewChallan") {
        $(".k-invalid-msg").hide();
        personPassport.removeAttribute("required");
        personNameAttorney.removeAttribute("required");
        personCnicAttoreny.removeAttribute("required");
        $("#IsConstructedCheck").prop('checked', false);
        $("#RegitrationFeeCheck").prop('checked', false);
        $("#ThroughPowerOfAttoreny").prop('checked', false);
        $("#OverSeases").prop('checked', false);
        $("#PersonPassport").val('');
        $("#exemptStampDutyGiftDeedCheckbox").prop('checked', false);
        SellerData = [];
        PurchaserData = [];
        $("#purchaserGrid").data('kendoGrid').dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
        $("#sellerGrid").data('kendoGrid').dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)    ValidatePurchaserSection();
        ValidateSellerSection();
        ValidatePurchaserSection();
        $("#purchaserSectionError").css("color", "black");
        $("#sellerSectionError").css("color", "black");
        $("#CVTTax").prop('checked', false);
        $("#RegitrationFeeCheck").prop('checked', false);
        ResetTextBox("AgentName");
        ResetTextBox("AgentCnic");
        ResetTextBox("AgentCell");
        ResetTextBox("agentEmail");
        ResetTextBox("oldRegistryNumber");
        $("#StampDutyFeeDiv").hide();
        $("#SearchChallanNo").hide();
        $("#SearchStampNo").hide();
        $("#DefCvtTaxForOldRegDiv").hide();
        $("#RegistrationFeeForOldRegDiv").hide();
        $("#CvtTaxDiv").hide();
        $("#RegistrationFeeDiv").hide();
        $("#purposeOfChallanText").hide();
        $("#purposeOfChallanError").hide();
        $("#StampType").val("").data("kendoDropDownList").text(selectStampPaperType);
        $("#TransactionName").val("").data("kendoDropDownList").text("");
        $("#District").val("").data("kendoDropDownList").text(selectDistrictText);
        $("#Tehsil").val("").data("kendoDropDownList").text("");
        // $("#PropertyClassification").val("").data("kendoDropDownList").text(selectlandClassificationText);
        var captchaObj = $("#CaptchaCode").get(0).Captcha;
        captchaObj.ReloadImage();
        var id = $("#StampType").val();
        initializeDropDown(base_url_service_layer + "/api/Proxy/Lookup/TransactionNameByType?Id=" + id, selectDeedName, "TransactionName");
        initializeDropDown(base_url_service_layer + "/api/Proxy/Lookup/TransactionNameByType?Id=", selectDeedName, "TransactionName");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Lookup/AllTransactionTypes?addChallanQueryString=' + queryStringName, selectStampPaperType, "StampType");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "District");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTalukaText, "Taluka");
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTalukaText, "talukaDropdownDC");
        //  initializeDropDown(base_url_service_layer + '/api/Proxy/Lookup/LookupByCategory?category=Land Classification', selectlandClassificationText, "PropertyClassification");
    }
    else {
        $(".k-invalid-msg").hide();
        if (id == "PayCVTandRegFee") {
            $("#SearchChallanNo").show();
            //$("#ChallanNo").val("");
            $("#ChallanNoErrorDiv").hide();
        } else {
            $("#SearchStampNo").show();
            //$("#StampNo").val("");
            $("#StampNoErrorDiv").hide();
        }
        ResetTextBox("AgentName");
        ResetTextBox("AgentCnic");
        ResetTextBox("AgentCell");
        ResetTextBox("agentEmail");
        //initilizeReadOnlyPersonGrids();
        //$("#DistrictReadOnly").val("");
        //$("#TehsilReadOnly").val("");
        //$("#StampPaperTypeReadOnly").val("");
        //$("#TransactionNameReadOnly").val("");
        //$("#ChallanDetailsValuesDiv").hide();
        //$("#AgentFormId").hide();
        //$("#PersonDivId").hide();
        //$("#purposeOfChallanText").hide();
        //$("#DeedDetailsReadOnly").hide();
        //$("#PersonDivIdReadOnly").hide();
        $("#CVTTaxDeficient").prop('checked', false);
        $("#RegitrationFeeCheckDeficient").prop('checked', false);
        $("#DeficientCVT").prop('checked', false);
        $("#DeficientRegistration").prop('checked', false);
        $("#registryFeeCheckbox").prop('checked', false);
        var captchaObj = $("#CaptchaCode").get(0).Captcha;
        captchaObj.ReloadImage();
        challanFromDB = {};
        isCVTFieldsCreatedFirstTime = true; // set the default value
    }
    challan = {};
    challanModel = {};
}
function toggleThroughAttorneyForm() {

    var checkbox = document.getElementById('ThroughPowerOfAttoreny');
    var form = document.getElementById('throughAttorneyForm');
    var personName = document.getElementById('PersonNameAttorney');
    var personCnicPassport = document.getElementById('PersonCnicPassport');

    if (checkbox.checked) {
        $("#throughAttorneyForm").show();
        personName.setAttribute("required", "required");
        personCnicPassport.setAttribute("required", "required");



    } else {
        $("#throughAttorneyForm").hide();
        personName.value = '';
        personCnicPassport.value = '';
    }
}


function ResetTextBox(id) {
    $("#" + id).val("");
    $("#" + id).removeClass("empty");
    $("#" + id).addClass("empty");
}
function deleteFromList(name, list) {
    var tt = [];
    var index = 0;
    for (i = 0; i < list.length; i++) {
        if (list[i].Id == name)
            list.splice(i, 1);
    }
}
function closeWindow() {
    $("#window").data("kendoWindow").close();
}
function SubmitPerson() {
    //alert();
    debugger;
    if ($("#ContactNo_validationMessage").css('display') == 'inline-block' || $("#ContactNo_validationMessage").css('display') == 'block' || $("#ContactNo_validationMessage").css('display') == 'inline') {

        return;
    }

    if ($("#CNICNo_validationMessage").css('display') == 'inline-block' || $("#CNICNo_validationMessage").css('display') == 'block' || $("#CNICNo_validationMessage").css('display') == 'inline') {
        return;
    }
    var $radio = $('input[name=PersonType]:checked');
    var id = $radio.attr('id');
    if (id == 'Company') {

        if ($("#NTN_validationMessage").css('display') == 'inline-block' || $("#NTN_validationMessage").css('display') == 'block' || $("#NTN_validationMessage").css('display') == 'inline') {
            return;
        }
    }

    if (!isValidPersonForm())
        return;
    var primary = "No";
    //var powerOfAttorney = "No";
    var flag = $('#PersonPrimary').is(":checked");
    if (flag == true)
        primary = "Yes";

    var powerOfAttorneyFlag = $('#ThroughPowerOfAttoreny').is(":checked");
    if (powerOfAttorneyFlag == true) {
        powerOfAttorney = "Yes";
    }

    var overseaesFlag = $('#OverSeases').is(":checked");
    if (overseaesFlag == true) {
        overSeaes = "Yes";
    }
    var $radio = $('input[name=PersonType]:checked');
    var id_person = $radio.attr('id');
    obj = {
        PersonName: $("#PersonName").val(),
        IsPrimary: flag,
        IsThroughPowerOfAttorney: powerOfAttorneyFlag,
        person_type: id_person,
        PersonCnic: $("#PersonCnic").val(),
        PersonEmail: $("#PersonEmail").val(),
        IsOverseas: overseaesFlag,
        PersonPassport: $("#PersonPassport").val(),
        PersonNameAttorneyProvider: $("#PersonNameAttorney").val(),
        PersonCnincPassportAttorneyProvider: $("#PersonCnicPassport").val(),
        PersonAddress: $("#PersonAddress").val(),
        NTN: $("#NTN").val(),
        PersonPhone: $("#PersonPhone").val(),
        RelationName: $("#RelationName").val(),
        RelationId: $("#Relation").val(),
        RelationString: $("#Relation").data("kendoDropDownList").text(),
        NameString: $("#PersonName").val() + " " + $("#Relation").data("kendoDropDownList").text() + " " + $("#RelationName").val(),
        IsPrimaryString: primary

    }
    if (obj.RelationName == "" || obj.RelationName == null) {
        obj.RelationString = "";
        obj.NameString = obj.PersonName;
    }
    if (obj.PersonCnic == "" || obj.PersonCnic == null) {
        obj.PersonCnic = "--"
    }

    if (obj.PersonPhone == "" || obj.PersonPhone == null) {
        obj.PersonPhone = "--"
    }
    if (obj.NTN == "" || obj.NTN == null) {
        obj.NTN = "--";

    }

    if (obj.IsOverseas == false) {

        obj.PersonPassport = "--";
    } else {
        obj.PersonCnic = "--";
    }
    if (TypeFlag == "Seller") {

        if (updateFlag) {
            if (obj.IsPrimary && IsMinimumPrimary(SellerData) && MinimumPrimaryId(SellerData) != Id) {
                $("#errorPrimary").show();
                $("#errorPrimary").html("Primary " + Party2Label + " already exists");
                return;
            }
            updatePerson(Id, SellerData, obj);
        }
        else {
            obj.Id = count_of_seller;


            if (IsMinimumPrimary(SellerData) && obj.IsPrimary) {
                $("#errorPrimary").show();
                $("#errorPrimary").html("Primary " + Party2Label + " already exists");
                return;
            }
            else {
                $("#errorPrimary").html("");

            }
            SellerData.push(obj);
        }
        $('#sellerGrid').data('kendoGrid').dataSource.data(SellerData);
        $('#sellerGrid').data('kendoGrid').refresh();
        closeWindow();
        if (SellerData.length > 0)
            $('#sellerGrid').show();
        ValidateSellerSection();
        $("#sellerSectionError").css("color", "red");
    }
    else {

        if (updateFlag) {
            if (obj.IsPrimary && IsMinimumPrimary(PurchaserData) && MinimumPrimaryId(PurchaserData) != Id) {
                $("#errorPrimary").show();
                $("#errorPrimary").html("Primary " + Party1Label + " already exists");
                return;
            }
            updatePerson(Id, PurchaserData, obj);
        }
        else {
            obj.Id = count_of_purchaser;


            if (IsMinimumPrimary(PurchaserData) && obj.IsPrimary) {
                $("#errorPrimary").show();
                $("#errorPrimary").html("Primary " + Party1Label + " already exists");
                return;
            }
            else {
                $("#errorPrimary").html("");

            }
            PurchaserData.push(obj);
        }

        $('#purchaserGrid').data('kendoGrid').dataSource.data(PurchaserData);
        $('#purchaserGrid').data('kendoGrid').refresh();
        closeWindow();
        if (PurchaserData.length > 0)
            $('#purchaserGrid').show();
        ValidatePurchaserSection();
        $("#purchaserSectionError").css("color", "red");
    }

    $("#PersonPrimary").prop('checked', false);
    $("#ThroughPowerOfAttoreny").prop('checked', false);
    $("#RelationName").val("");
    $("#Relation").val("0");
    ResetPersonForm();
    $("#checkPerson").val("1");

    var captchaObj = $("#CaptchaCode").get(0).Captcha;
    // captchaObj.ReloadImage();


    //if ($("#AgentCnic").val() != "" || $("#AgentCnic").val() != null)
    //{
    //    CheckCNIC("agent");
    //}
    //if ($("#AgentCell").val() != "" || $("#AgentCell").val() != null)
    //{
    //    CheckMobileNumber("agent");
    //}
}

function CancelPerson() {
    //ResetPersonForm();
    closeWindow();
}

function deleteSeller(e) {
    debugger;
    var grid = $("#sellerGrid").data("kendoGrid");
    dataitem = grid.dataItem($(e.currentTarget).closest("tr"));

    //var grid = $("#purchaserGrid").data("kendoGrid");
    var window = $("#deleteWin").data("kendoWindow");
    //var tr = $(e.target).closest("tr"); //get the row for deletion
    //var data = this.dataItem(tr); //get the row data so it can be referred later
    //window.content(windowTemplate(data)); //send the row data object to the template and render it
    window.open().title('Delete ' + Party2Label).center();

    $("#yesButton").click(function () {

        //alert("yes button");

        grid.dataSource.remove(dataitem)  //prepare a "destroy" request 
        //grid.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
        window.close();

        deleteFromList(dataitem.Id, SellerData);
        if (SellerData.length <= 0)
            $('#sellerGrid').hide();

        //ValidatePurchaserSection();
        ValidateSellerSection();
    });
    $("#noButton").click(function () {

        //alert("no buttons

        window.close();
    });
    //    var grid = $("#sellerGrid").data("kendoGrid");

    //    //var selectedRow = grid.select();
    //    //var index = selectedRow.index();
    //    e.preventDefault();
    //    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

    //    //  var index = dataItem.index();
    //    var rowIdx = $("tr", grid.tbody).index(dataItem);
    //    $('#sellerGrid').data("kendoGrid").dataSource.remove(dataItem);
    //    console.log(dataItem.PersonName);
    //    deleteFromList(dataItem.Id, SellerData);
    //    console.log(dataItem);
    //    if (SellerData.length <= 0)
    //        $('#sellerGrid').hide();

    //    ValidateSellerSection();
    //}
    //var grid = $("#sellerGrid").data("kendoGrid");
    //var window = $("#deleteWin").data("kendoWindow");
    //var tr = $(e.target).closest("tr"); //get the row for deletion
    //var data = this.dataItem(tr); //get the row data so it can be referred later
    //window.content(windowTemplate(data)); //send the row data object to the template and render it
    //window.open().title('Delete ' + Party2Label).center();

    //$("#yesButton").click(function () {
    //    grid.dataSource.remove(data)  //prepare a "destroy" request 
    //    grid.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
    //    window.close();
    //    $("#checkPerson").val("");
    //    deleteFromList(data.Id, SellerData);
    //    if (SellerData.length <= 0)
    //        $('#sellerGrid').hide();

    //    ValidatePurchaserSection();
    //    ValidateSellerSection();
    //});
    //$("#noButton").click(function () {
    //    window.close();
    //});
}


function deletePurchaser(e) {
    debugger;
    var grid = $("#purchaserGrid").data("kendoGrid");
    dataitem = grid.dataItem($(e.currentTarget).closest("tr"));

    //var grid = $("#purchaserGrid").data("kendoGrid");
    var window = $("#deleteWin").data("kendoWindow");
    //var tr = $(e.target).closest("tr"); //get the row for deletion
    //var data = this.dataItem(tr); //get the row data so it can be referred later
    //window.content(windowTemplate(data)); //send the row data object to the template and render it
    window.open().title('Delete ' + Party1Label).center();

    $("#yesButton").click(function () {

        //alert("yes button");

        grid.dataSource.remove(dataitem)  //prepare a "destroy" request 
        //grid.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
        window.close();

        deleteFromList(dataitem.Id, PurchaserData);
        if (PurchaserData.length <= 0)
            $('#purchaserGrid').hide();

        ValidatePurchaserSection();
        //ValidateSellerSection();
    });
    $("#noButton").click(function () {

        //alert("no button");

        window.close();
    });
}




////var selectedRow = grid.select();
////var index = selectedRow.index();
//e.preventDefault();
//var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

////  var index = dataItem.index();
//var rowIdx = $("tr", grid.tbody).index(dataItem);
//grid.dataSource.remove(dataItem);
//console.log(dataItem.PersonName);

//// console.log(dataItem);
//if (PurchaserData.length <= 0)
//    $('#purchaserGrid').hide();

//ValidatePurchaserSection();

function ResetDropDown(field) {

    $("#" + field).data("kendoDropDownList").value("");
    //$(".k-input").html("Select Relation");
}

function SetDropDownValue(field, value) {
    //debugger;
    //$("#" + field).val(value);
    //if (updateFlag) {
    //    $("#Relation option:first").removeAttr("selected");
    //    //alert($("#Relation option:selected").html());
    //    $(".k-input").html($("#Relation option:selected").html());
    //}
    //else {
    //    $(".k-input").html("Select Relation");
    //}
    if ($("#popupCheck").val() == "1") { $("#popupCheck").val("0"); }
    else {
        $("#" + field).val(value);
    }
}
//function showToolTip()
//{
//    $("#canton").kendoTooltip({
//        content: "This is Agent Name",
//        position: "top"
//    });

//    $("#cnic").kendoTooltip({
//        content: "This is Agent CNIC",
//        position: "top",
//    });


//}

function PersonButtonText(text) {
    document.getElementById("PersonButton").innerHTML = text;

}

function changeRelation() {
    var value = $("#Relation").data("kendoDropDownList").text();
    $("#personForm > div:nth-child(4) > div:nth-child(3) > div > div > div > div").html(value);
    $("#lastSelecetedRelation").val($("#Relation").val());
}

function editPurchaser(e) {
    debugger;
    updateFlag = true;
    var relationValue = $("#lastSelecetedRelation").val();
    //alert(relationValue);
    var grid = $("#purchaserGrid").data("kendoGrid");
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    console.log(dataItem);
    // alert(dataItem.NTN); 
    populatePersonForm(dataItem);
    $("#window").data("kendoWindow").title("Update " + Party1Label).center().open();

    $("#errorPrimary").hide();

    //debugger;
    //SetDropDownValue("Relation", relationValue);
    //debugger;
    Id = dataItem.Id;
    TypeFlag = "Purchaser";
    ValidatePurchaserSection();
    PersonButtonText(Update);

    //$("#Relation").val($("#lastSelecetedRelation").val());
    var value = $("#Relation").data("kendoDropDownList").text();
    $("#personForm > div:nth-child(3) > div:nth-child(3) > div > div > div > div").html(value);


    if (lang == 'ur') {

        $('.k-window-title').css('bottom', '0px');
        //var elem = $(".k-window-actions");
        $(".k-window-actions").attr("style", "top: -9px !important");
    }
}


function editSeller(e) {
    updateFlag = true;
    var grid = $("#purchaserGrid").data("kendoGrid");
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

    populatePersonForm(dataItem);
    $("#window").data("kendoWindow").title("Update " + Party2Label).center().open();

    $("#errorPrimary").hide();

    Id = dataItem.Id;
    TypeFlag = "Seller";
    PersonButtonText(Update);
    ValidateSellerSection();

    if (lang == 'ur') {

        $('.k-window-title').css('bottom', '0px');
        //var elem = $(".k-window-actions");
        $(".k-window-actions").attr("style", "top: -9px !important");
    }
}

function setTextBoxValue(field, value) {
    $("#" + field).val(value);
    $("#" + field).removeClass("empty");
}

function populatePersonForm(obj) {
    debugger;
    if (updateFlag) {
        if (obj.person_type == 'Company') {

            obj.PersonPhone = '';
            obj.PersonCnic = '';
            obj.RelationId = '';
            obj.RelationName = '';
            $("#ContactEmailDivRow").hide();
            $("#overSeasDiv").hide();
            $("#throughAttorneyDiv").hide();
            $("#cnicPersonEditForm").hide();

            $("#RelationsRowDiv").hide();
            $("#cnicPersonEditForm").hide();
            //$("#cnicPersonEditForm").hide();
            $("#NTNEditForm").show();
            $("#Company").prop("checked", true);
        } else {
            obj.NTN = '';
            $("#ContactEmailDivRow").show();
            $("#RelationsRowDiv").show();
            $("#cnicPersonEditForm").show();
            $("#overSeasDiv").show();
            $("#throughAttorneyDiv").show();
            $("#cnicPersonEditForm").show();

            //$("#cnicPersonEditForm").show();
            $("#NTNEditForm").hide();
            $("#Indivisual").prop("checked", true);



        }
        setTextBoxValue("PersonName", obj.PersonName);
        if (obj.PersonEmail != "") { setTextBoxValue("PersonEmail", obj.PersonEmail); }
        if (obj.IsOverseas == true) {
            $("#OverSeases").prop("checked", true);
            //  $("#personPassportDiv").show();
            $("#passportPersonEditForm").show();
            // $("#personCnicDiv").hide();

            $("#cnicPersonEditForm").hide();
            if (obj.PersonPassport != "") { setTextBoxValue("PersonPassport", obj.PersonPassport); }

        }

        if (obj.IsThroughPowerOfAttorney == true) {
            $("#ThroughPowerOfAttoreny").prop("checked", true);
            $("#throughAttorneyForm").show();
            if (obj.PersonNameAttorneyProvider != "") { setTextBoxValue("PersonNameAttorney", obj.PersonNameAttorneyProvider); }
            if (obj.PersonCnincPassportAttorneyProvider != "") { setTextBoxValue("PersonCnicPassport", obj.PersonCnincPassportAttorneyProvider); }

        }

        if (obj.PersonCnic != "") { setTextBoxValue("PersonCnic", obj.PersonCnic); }
        if (obj.NTN != "") { setTextBoxValue("NTN", obj.NTN); }

        if (obj.PersonPhone != "") { setTextBoxValue("PersonPhone", obj.PersonPhone); }
        if (obj.PersonAddress != "") { setTextBoxValue("PersonAddress", obj.PersonAddress); }


        if (obj.RelationId != "") {
            //SetDropDownValue("RelationId", obj.RelationId);
            var dropdownlist = $("#Relation").data("kendoDropDownList");
            dropdownlist.value(obj.RelationId);
        }



        if (obj.RelationName != "") { setTextBoxValue("RelationName", obj.RelationName); }
        document.getElementById("PersonPrimary").checked = obj.IsPrimary;
        // document.getElementById("ThroughPowerOfAttoreny").checked = obj.IsThroughPowerOfAttorney;
    }
    else {

        setTextBoxValue("PersonName", obj.PersonName);
        setTextBoxValue("PersonEmail", obj.PersonEmail);
        setTextBoxValue("PersonCnic", obj.PersonCnic);
        setTextBoxValue("NTN", obj.NTN);
        setTextBoxValue("PersonPhone", obj.PersonPhone);
        setTextBoxValue("PersonAddress", obj.PersonAddress);
        setTextBoxValue("RelationName", obj.RelationName);

        SetDropDownValue("RelationId", obj.RelationId);
        document.getElementById("PersonPrimary").checked = obj.IsPrimary;
        // document.getElementById("ThroughPowerOfAttoreny").checked = obj.IsThroughPowerOfAttorney;
    }
}

//function populatePersonForm(obj) {
//    if (updateFlag) {
//        setTextBoxValue("PersonName", obj.PersonName);
//        if (obj.PersonEmail != "") { setTextBoxValue("PersonEmail", obj.PersonEmail); }
//        if (obj.PersonCnic != "") { setTextBoxValue("PersonCnic", obj.PersonCnic); }
//        if (obj.PersonPhone != "") { setTextBoxValue("PersonPhone", obj.PersonPhone); }
//        if (obj.PersonAddress != "") { setTextBoxValue("PersonAddress", obj.PersonAddress); }


//        if (obj.RelationId != "") {
//            //SetDropDownValue("RelationId", obj.RelationId);
//            var dropdownlist = $("#Relation").data("kendoDropDownList");
//            dropdownlist.value(obj.RelationId);
//        }



//        if (obj.RelationName != "") { setTextBoxValue("RelationName", obj.RelationName); }
//        document.getElementById("PersonPrimary").checked = obj.IsPrimary;
//        document.getElementById("ThroughPowerOfAttoreny").checked = obj.IsThroughPowerOfAttorney;
//    }
//    else {
//        setTextBoxValue("PersonName", obj.PersonName);
//        setTextBoxValue("PersonEmail", obj.PersonEmail);
//        setTextBoxValue("PersonCnic", obj.PersonCnic);
//        setTextBoxValue("PersonPhone", obj.PersonPhone);
//        setTextBoxValue("PersonAddress", obj.PersonAddress);
//        setTextBoxValue("RelationName", obj.RelationName);

//        SetDropDownValue("RelationId", obj.RelationId);
//        document.getElementById("PersonPrimary").checked = obj.IsPrimary;
//        document.getElementById("ThroughPowerOfAttoreny").checked = obj.IsThroughPowerOfAttorney;
//    }
//}

function updatePerson(Id, list, obj) {
    for (i = 0 ; i < list.length; i++) {
        if (Id == list[i].Id) {
            list[i].PersonName = obj.PersonName;
            list[i].PersonEmail = obj.PersonEmail;
            list[i].PersonPhone = obj.PersonPhone;
            list[i].PersonCnic = obj.PersonCnic;
            list[i].IsOverseas = obj.IsOverseas;
            list[i].PersonPassport = obj.PersonPassport;
            list[i].PersonNameAttorneyProvider = obj.PersonNameAttorneyProvider;
            list[i].PersonCnincPassportAttorneyProvider = obj.PersonCnincPassportAttorneyProvider;
            list[i].person_type = obj.person_type;
            list[i].NTN = obj.NTN;
            list[i].PersonAddress = obj.PersonAddress;
            list[i].RelationName = obj.RelationName;
            list[i].RelationId = obj.RelationId;
            list[i].NameString = obj.NameString;
            list[i].IsPrimary = obj.IsPrimary;
            list[i].IsThroughPowerOfAttorney = obj.IsThroughPowerOfAttorney;
            list[i].IsPrimaryString = obj.IsPrimaryString;
            break;
        }
    }
}
/////////////////////////////////////////////
//Form Validators
////////////////////////////////////////////
function IsMinimumPrimary(list) {
    for (i = 0; i < list.length; i++) {
        if (list[i].IsPrimary == true)
            return true;
    }
    return false;
}

function MinimumPrimaryId(list) {
    for (i = 0; i < list.length; i++) {
        if (list[i].IsPrimary == true)
            return list[i].Id;
    }
    return -1;
}

//function ValidatePurchaserSection() {
//    //alert('iok')
//    debugger;
//    var message = "";

//    if (PurchaserData.length <= 0) {
//        if (Party1Label == "First Party") {
//            message = PleaseaddatleastoneFirstParty;
//        }  else if (Party1Label == "First Party / Donor") {
//            message = FirstPartyDonor;
//        } else if (Party1Label == "First Party / Lessor") {
//            message = FirstPartyLessor;
//        } else if (Party1Label == "First Party / Mortgager") {
//            message = FirstPartyMortgager;
//        } else if (Party1Label == "First Party / Principal") {
//            message = FirstPartyPrincipal;
//        } else if (Party1Label == "Plaintiff / Appellant / Petitioner") {
//            message = PlaintiffAppellantPetitioner;
//        } else if (Party1Label == "Seller") {
//            message = AddOneSeller;
//        }
//        //message = "Please add at least one " + Party1Label;
//        $("#purchaserGrid").hide();
//    }
//    else if (!IsMinimumPrimary(PurchaserData)) {
//        $("#purchaserGrid").show();
//        message = PleaseaddcheckedatleastonePrimaryFirstPartytobeprintonChallan32A;
//        if (Party1Label == "First Party") {
//            message = PleaseaddcheckedatleastonePrimaryFirstPartytobeprintonChallan32A;
//        } else if (Party1Label == "First Party / Donor") {
//            message = PleaseaddcheckedatleastonePrimaryFirstPartyDonortobeprintonChallan32A;
//        } else if (Party1Label == "First Party / Lessor") {
//            message = PleaseaddcheckedatleastonePrimaryFirstPartyLessortobeprintonChallan32A;
//        } else if (Party1Label == "First Party / Mortgager") {
//            message = PleaseaddcheckedatleastonePrimaryFirstPartyMortgagertobeprintonChallan32A;
//        } else if (Party1Label == "First Party / Principal") {
//            message = PleaseaddcheckedatleastonePrimaryFirstPartyPrincipaltobeprintonChallan32A;
//        } else if (Party1Label == "Plaintiff / Appellant / Petitioner") {
//            message = PleaseaddcheckedatleastonePrimaryPlaintiffAppellantPetitionertobeprintonChallan32A;
//        } else if (Party1Label == "Seller") {
//            message = PleaseaddcheckedatleastonePrimarySellertobeprintonChallan32A;
//        }
//      //  message = "Please add/checked at least one Primary " + Party1Label + " to be print on Challan 32-A";
//    }
//    else {
//        $("#purchaserGrid").show();
//    }


//    document.getElementById("purchaserSectionError").innerHTML = message;
//    if (message == "")
//        return true;
//    else
//        return false;
//}
function ValidatePurchaserSection() {
    var message = "";

    if (PurchaserData.length <= 0) {
        if (Party1Label == "First Party") {
            message = PleaseaddatleastoneFirstParty;
        } else if (Party1Label == "First Party / Donor") {
            message = FirstPartyDonor;
        } else if (Party1Label == "First Party / Lessor") {
            message = FirstPartyLessor;
        } else if (Party1Label == "First Party / Mortgager") {
            message = FirstPartyMortgager;
        } else if (Party1Label == "First Party / Principal") {
            message = FirstPartyPrincipal;
        } else if (Party1Label == "Plaintiff / Appellant / Petitioner") {
            message = PlaintiffAppellantPetitioner;
        } else if (Party1Label == "Seller") {
            message = AddOneSeller;
        }
        //message = "Please add at least one " + Party1Label;
        $("#purchaserGrid").hide();
    }
    else if (!IsMinimumPrimary(PurchaserData)) {
        $("#purchaserGrid").show();
        message = PleaseaddcheckedatleastonePrimaryFirstPartytobeprintonChallan32A;
        if (Party1Label == "First Party") {
            message = PleaseaddcheckedatleastonePrimaryFirstPartytobeprintonChallan32A;
        } else if (Party1Label == "First Party / Donor") {
            message = PleaseaddcheckedatleastonePrimaryFirstPartyDonortobeprintonChallan32A;
        } else if (Party1Label == "First Party / Lessor") {
            message = PleaseaddcheckedatleastonePrimaryFirstPartyLessortobeprintonChallan32A;
        } else if (Party1Label == "First Party / Mortgager") {
            message = PleaseaddcheckedatleastonePrimaryFirstPartyMortgagertobeprintonChallan32A;
        } else if (Party1Label == "First Party / Principal") {
            message = PleaseaddcheckedatleastonePrimaryFirstPartyPrincipaltobeprintonChallan32A;
        } else if (Party1Label == "Plaintiff / Appellant / Petitioner") {
            message = PleaseaddcheckedatleastonePrimaryPlaintiffAppellantPetitionertobeprintonChallan32A;
        } else if (Party1Label == "Seller") {
            message = PleaseaddcheckedatleastonePrimarySellertobeprintonChallan32A;
        }
        //  message = "Please add/checked at least one Primary " + Party1Label + " to be print on Challan 32-A";
    }
    else {
        $("#purchaserGrid").show();
    }


    document.getElementById("purchaserSectionError").innerHTML = message;
    if (message == "")
        return true;
    else
        return false;
}

function ValidateSellerSection() {
    var message = "";
    var type = $("#StampType option:selected").text();

    if (TypeFlag == "Seller" && type == "Judicial") {
        $("#tooltip_PersonCnic").data('kendoTooltip').destroy();
        $("#tooltip_PersonRelationName").data('kendoTooltip').destroy();
        $("#tooltip_PersonPhone").data('kendoTooltip').destroy();
        $("#tooltip_PersonAdress").data('kendoTooltip').destroy();

        $("#tooltip_PersonCnic").kendoTooltip({
            content: " CNIC of parties involved",
            position: "top"
        });

        $("#tooltip_PersonRelation").kendoTooltip({
            content: " Relationship type like s/o, d/o etc",
            position: "top"
        });
        $("#tooltip_PersonRelationName").kendoTooltip({
            content: "Father Name / Husband Name / Wife Name etc",
            position: "top"
        });
        $("#tooltip_PersonPhone").kendoTooltip({
            content: " Contact No. of parties involved",
            position: "top"
        });

        $("#tooltip_PersonAdress").kendoTooltip({
            content: " Address of parties involved",
            position: "top"
        });
    }
    else {
        $("#tooltip_PersonCnic").data('kendoTooltip').destroy();

        $("#tooltip_PersonRelationName").data('kendoTooltip').destroy();
        $("#tooltip_PersonPhone").data('kendoTooltip').destroy();
        $("#tooltip_PersonAdress").data('kendoTooltip').destroy();

        $("#tooltip_PersonCnic").kendoTooltip({
            content: "Required. CNIC of parties involved",
            position: "top"
        });
        $("#tooltip_PersonRelation").kendoTooltip({
            content: "Required. Relationship type like s/o, d/o etc",
            position: "top"
        });
        $("#tooltip_PersonRelationName").kendoTooltip({
            content: "Required. Father / Husband / Wife etc",
            position: "top"
        });
        $("#tooltip_PersonPhone").kendoTooltip({
            content: "Required. Contact No. of parties involved",
            position: "top"
        });

        $("#tooltip_PersonAdress").kendoTooltip({
            content: "Required. Address of parties involved",
            position: "top"
        });


    }
    if (SellerData.length <= 0) {

        if (Party2Label == "Defendant / Respondent") {
            message = DefendantRespondent;
        } else if (Party2Label == "Purchaser") {
            message = AddOnePurchaser;
        } else if (Party2Label == "Second Party") {
            message = PleaseaddatleastoneSecondtParty;//SecondParty;
        } else if (Party2Label == "Second Party / Attorney Holder") {
            message = SecondPartyAttorneyHolder;
        } else if (Party2Label == "Second Party / Donee") {
            message = SecondPartyDonee;
        } else if (Party2Label == "Second Party / Lessee") {
            message = SecondPartyLessee;
        } else if (Party2Label == "Second Party / Mortgagee") {
            message = SecondPartyMortgagee;
        }
        // message = "Please add at least one " + Party2Label;
        $("#sellerGrid").hide();
    }
    else if (!IsMinimumPrimary(SellerData)) {
        message = PleaseaddcheckedatleastonePrimaryPurchasertobeprintonChallan32A;
        if (Party2Label == "Defendant / Respondent") {
            message = PleaseaddcheckedatleastonePrimaryDefendantRespondenttobeprintonChallan32A;
        } else if (Party2Label == "Purchaser") {
            message = PleaseaddcheckedatleastonePrimaryPurchasertobeprintonChallan32A;
        } else if (Party2Label == "Second Party") {
            message = PleaseaddcheckedatleastonePrimarySecondPartytobeprintonChallan32A;
        } else if (Party2Label == "Second Party / Attorney Holder") {
            message = PleaseaddcheckedatleastonePrimarySecondPartyAttorneyHoldertobeprintonChallan32A;
        } else if (Party2Label == "Second Party / Donee") {
            message = PleaseaddcheckedatleastonePrimarySecondPartyDoneetobeprintonChallan32A;
        } else if (Party2Label == "Second Party / Lessee") {
            message = PleaseaddcheckedatleastonePrimarySecondPartyLesseetobeprintonChallan32A;
        } else if (Party2Label == "Second Party / Mortgagee") {
            message = PleaseaddcheckedatleastonePrimarySecondPartyMortgageetobeprintonChallan32A;
        }
        //message = "Please add/checked at least one Primary " + Party2Label + " to be print on Challan 32-A";
        $("#sellerGrid").show();
    }
    else {
        $("#sellerGrid").show();
    }

    if (SellerData.length <= 0)
        $("#sellerGrid").hide();
    else
        $("#sellerGrid").show();
    document.getElementById("sellerSectionError").innerHTML = message;
    if (message == "")
        return true;
    else
        return false;
}

function toggleLocationTypeChange() {
    var checkboxOverseas = document.getElementById('OverSeases');
    var personCnic = document.getElementById('PersonCnic');
    var personPassport = document.getElementById('PersonPassport');

    if (checkboxOverseas.checked) {
        //  $("#personPassportDiv").show();
        $("#passportPersonEditForm").show();
        $("#PersonPassport").val('');
        //$("#personCnicDiv").hide();
        $("#cnicPersonEditForm").hide();
        personCnic.removeAttribute("required");
        personPassport.setAttribute("required", "required");
    } else {
        // $("#personPassportDiv").hide();
        $("#passportPersonEditForm").hide();
        $("#PersonCnic").val('');
        // $("#personCnicDiv").show();          
        $("#cnicPersonEditForm").show();
        personPassport.removeAttribute("required");
        personCnic.setAttribute("required", "required");
    }
}
function isValidPersonForm() {
    debugger;
    var val = $("#StampType").data("kendoDropDownList").text();

    if (TypeFlag == "Seller" && val == "Judicial") {
        var validator = $("#NameForm").kendoValidator().data('kendoValidator');
        res2 = validator.validate();
        return res2;
    }

    var validator = $("#personForm").data("kendoValidator");
    var $radio = $('input[name=PersonType]:checked');
    var id_person = $radio.attr('id');
    if (id_person == 'Company') {
        if ($("#CNIC").text() == null || $("#CNIC").text() == "") {
            $("#CNIC_validationMessage").hide();
            $('#CNIC').removeAttr("required");
        }
        if ($("#RelationName").text() == null || $("#RelationName").text() == "") {
            $("#RelationName_validationMessage").hide();
            $('#RelationName').removeAttr("required");
        }
        if ($("#ContactNo").text() == null || $("#ContactNo").text() == "") {
            $("#ContactNo_validationMessage").hide();
            $('#ContactNo').removeAttr("required");
        }
        //if ($("#PersonAddress").text() == null || $("#PersonAddress").text() == "") {
        //    $("#PersonAddress_validationMessage").hide();
        //    $('#PersonAddress').removeAttr("required");
        //}
        if (($('#Relation').data("kendoDropDownList") != null) && ($('#Relation').val() == "" || $('#Relation').val() < 0)) {
            $("#Relation_validationMessage").hide();
            $('#Relation').removeAttr("required");
        }
        //var validator2 = $("#NTN").valid();
        var validator2 = true;//validator.validate();
        res2 = validator2;
        return res2;
    } else {
        var personNameAttorney = document.getElementById('PersonNameAttorney');
        var personCnicAttoreny = document.getElementById('PersonCnicPassport');
        var personPassport = document.getElementById('PersonPassport');
        var checkbox = document.getElementById('ThroughPowerOfAttoreny');
        if (!checkbox.checked) {
            personNameAttorney.removeAttribute("required");
            personCnicAttoreny.removeAttribute("required");

        }
        var checkbox_overseas = document.getElementById('OverSeases');
        if (!checkbox_overseas.checked) {
            personPassport.removeAttribute("required");
            $("#PersonPassport").val('');
        }



        res2 = validator.validate();
        return res2;
    }

}

function onFocusOutValidateForJudicial() {
    debugger;
    var val = $("#StampType").data("kendoDropDownList").text();
    if (TypeFlag == "Seller" && val == "Judicial") {
        if ($("#CNIC").text() == null || $("#CNIC").text() == "") {
            $("#CNIC_validationMessage").hide();
            $('#CNIC').removeAttr("required");
        }
        if ($("#RelationName").text() == null || $("#RelationName").text() == "") {
            $("#RelationName_validationMessage").hide();
            $('#RelationName').removeAttr("required");
        }
        if ($("#ContactNo").text() == null || $("#ContactNo").text() == "") {
            $("#ContactNo_validationMessage").hide();
            $('#ContactNo').removeAttr("required");
        }
        if ($("#PersonAddress").text() == null || $("#PersonAddress").text() == "") {
            $("#PersonAddress_validationMessage").hide();
            $('#PersonAddress').removeAttr("required");
        }
        if (($('#Relation').data("kendoDropDownList") != null) && ($('#Relation').val() == "" || $('#Relation').val() < 0)) {
            $("#Relation_validationMessage").hide();
            $('#Relation').removeAttr("required");
        }

        var $radio = $('input[name=PersonType]:checked');
        var id = $radio.attr('id');
        if (id == 'Company') {
            $("#CNIC_validationMessage").hide();
            $('#CNIC').removeAttr("required");
            $("#RelationName_validationMessage").hide();
            $('#RelationName').removeAttr("required");
            $("#ContactNo_validationMessage").hide();
            $('#ContactNo').removeAttr("required");
            $("#Relation_validationMessage").hide();
            $('#Relation').removeAttr("required");
            $('#NTN').attr("required", "required");
        }
        if (id == 'Indivisual') {
            $('#CNIC').attr("required", true);
            $('#RelationName').attr("required", true);
            $('#ContactNo').attr("required", true);
            $('#Relation').attr("required", true);
            $('#NTN').removeAttr("required");
        }
    }
    else {
        $('#CNIC').attr("required", "required");
        $('#RelationName').attr("required", "required");
        $('#ContactNo').attr("required", "required");
        $('#PersonAddress').attr("required", "required");
        $('#Relation').attr("required", "required");

        var $radio = $('input[name=PersonType]:checked');
        var id = $radio.attr('id');
        if (id == 'Company') {
            $("#CNIC_validationMessage").hide();
            $('#CNIC').removeAttr("required");
            $("#RelationName_validationMessage").hide();
            $('#RelationName').removeAttr("required");
            $("#ContactNo_validationMessage").hide();
            $('#ContactNo').removeAttr("required");
            $("#Relation_validationMessage").hide();
            $('#Relation').removeAttr("required");
            $('#NTN').attr("required", "required");
        }
        if (id == 'Indivisual') {
            $('#CNIC').attr("required", true);
            $('#RelationName').attr("required", true);
            $('#ContactNo').attr("required", true);
            $('#Relation').attr("required", true);
            $('#NTN').removeAttr("required");
        }
    }

    if (val != "Judicial") {
        var $radio = $('input[name=PersonType]:checked');
        var id = $radio.attr('id');
        if (id == 'Company') {
            $("#CNIC_validationMessage").hide();
            $('#CNIC').removeAttr("required");
            $("#RelationName_validationMessage").hide();
            $('#RelationName').removeAttr("required");
            $("#ContactNo_validationMessage").hide();
            $('#ContactNo').removeAttr("required");
            $("#Relation_validationMessage").hide();
            $('#Relation').removeAttr("required");
            $('#NTN').attr("required", "required");
        }
        if (id == 'Indivisual') {
            $('#CNIC').attr("required", true);
            $('#RelationName').attr("required", true);
            $('#ContactNo').attr("required", true);
            $('#Relation').attr("required", true);
            $('#NTN').removeAttr("required");
        }
    }
}


$("#PersonCnic").focusout(function () {
    onFocusOutValidateForJudicial();
    //CheckMobileNumber()
});



function CheckMobileNumber(type) {
    /*
    debugger;

    var number = "";
    if (type == "person") {
        number = $("#PersonPhone").val();
    }
    else if (type == "agent") {
        number = $("#AgentCell").val();
    }
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/CitizenPortal/CheckMobileNumber?mobileNumber=' + number,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        async:false,
        success: function (data) {
            if (data.result == true) {
                if (type == "person")
                {
                    $("#ContactNo_validationMessage").show();
                }
                else if (type == "agent")
                {
                    $("#AgentContactNo_validationMessage").show();
                }
                
                //$("#PersonPhone_validationMessage").show();
                //var validator = $("#personForm").kendoValidator().data("kendoValidator");
                //validator.showMessage();
                //if (!validator.validateInput($("#PersonPhone"))) {
                //    alert("UserName is not valid!");
                //} else {
                //    alert("UserName is valid!");
                //}


            }
            else {
                if (type == "person")
                { $("#ContactNo_validationMessage").hide(); }
                else if (type == "agent") {
                    $("#AgentContactNo_validationMessage").hide();
                }
                
            }
        },
        error: function (data) {
            
        }
    });
    */
}
function CheckCNIC(type) {
    debugger;
    var number = "";
    if (type == "person") {
        number = $("#PersonCnic").val();
    }
    else if (type == "agent") {
        number = $("#AgentCnic").val();
    }
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/CitizenPortal/CheckCNIC?Cnic=' + number,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        async: false,
        success: function (data) {
            if (data.result == true) {
                debugger;

                if (type == "person") {
                    $("#CNICNo_validationMessage").show();
                }
                else if (type == "agent") {
                    $("#AgentCNICNo_validationMessage").show();
                }

                //$("#PersonPhone_validationMessage").show();
                //var validator = $("#personForm").kendoValidator().data("kendoValidator");
                //validator.showMessage();
                //if (!validator.validateInput($("#PersonPhone"))) {
                //    alert("UserName is not valid!");
                //} else {
                //    alert("UserName is valid!");
                //}


            }
            else {
                debugger;
                if (type == "person") {
                    $("#CNICNo_validationMessage").hide();
                }
                else if (type == "agent") {
                    $("#AgentCNICNo_validationMessage").hide();
                }

            }
        },
        error: function (data) {

        }
    });
}
//function someFunc() {

//    validateCaptcha(isv)

//}

//function validateCaptcha(callback) {
//    //All ajax calls called here
//    onAjaxSuccess: function() {
//        callback();
//    };
//    console.log('Pass1');    
//}
function isValid() {
    //alert("isValid");
    var res = $('#agentForm').kendoValidator().data('kendoValidator').validate();
    var res2 = $('#dealform').kendoValidator().data('kendoValidator').validate()
    if (!res2)
        res = res2;

    var val = $("#StampType").data("kendoDropDownList").text();
    if (val == "Judicial") {
        var res2 = $('#NonPropertyForm').kendoValidator().data('kendoValidator').validate();
        if (!res2)
            res = res2;
    }
    else {
        var res2 = $('#PropertyForm').kendoValidator().data('kendoValidator').validate();
        if (!res2)
            res = res2;
        var flag = $('#CVTTax').is(":checked");
        if (flag) {
            var res2 = $('#ClassficationFrom').kendoValidator().data('kendoValidator').validate();
            if (!res2)
                res = res2;

            var flag1 = $('#IsConstructed').is(":checked");
            if (flag1) {
                var res2 = $('#ConstructedForm').kendoValidator().data('kendoValidator').validate();
                if (!res2)
                    res = res2;

            }
        }

        var res2 = ValidatePurchaserSection();
        if (!res2)
            res = res2;

        var res2 = ValidateSellerSection();
        if (!res2)
            res = res2;



    }

    $('#status').attr('class', 'inProgress');
    $('#status').text('Checking...');

    // get client-side Captcha object instance
    var captchaObj = $("#CaptchaCode").get(0).Captcha;

    // gather data required for Captcha validation
    var params = {}
    params.CaptchaId = captchaObj.Id;
    params.InstanceId = captchaObj.InstanceId;
    params.UserInput = $("#CaptchaCode").val();

    // make asynchronous Captcha validation request
    $.getJSON('../ChallanFormView/CheckCaptcha', params, function (result) {
        if (true === result) {
            //$('#status').attr('class', 'correct');
            //$('#status').text('Check passed');
            document.getElementById("captchaError").innerHTML = " ";
            return res;
        } else {
            //$('#status').attr('class', 'incorrect');
            //$('#status').text('Check failed');
            document.getElementById("captchaError").innerHTML = InvalidCodeEntered;
            // always change Captcha code if validation fails
            captchaObj.ReloadImage();
            res = false;
            return res;
        }
    });
    return res;
}

/////////////////////////////////////////////
//View initializing functions
////////////////////////////////////////////

$(function () {
    var container = $("#agentForm");
    kendo.init(container);
    container.kendoValidator({
        rules: {
            validmask: function (input) {
                if (input.is("[data-validmask-msg]") && input.val() != "") {
                    var maskedtextbox = input.data("kendoMaskedTextBox");
                    return maskedtextbox.value().indexOf(maskedtextbox.options.promptChar) === -1;
                }

                return true;
            }
        }
    });
});


function UrduValidationMessage(Id) {
    $(Id).kendoValidator({
        validateOnBlur: true,
        messages: {
            required: "{0} ضروری ہے", pattern: "{0} درست نہیں ہے", min: "{0} should be greater than or equal to {1}", max: "{0} should be smaller than or equal to {1}", step: "{0} is not valid", email: "{0} درست ای میل نہیں ہے", url: "{0} درست نہیں ہے URL", date: "{0} درست تاریخ نہیں ہے"
        }
    });
}

function InitializeValidators() {
    /*     $(function () {
         var container = $("#agentForm");
         kendo.init(container);
         container.kendoValidator({
             validateOnBlur: true,
             rules: {
                 validmask: function (input) {
                     console.log(input);
                     if (input.is("[data-validmask-msg]") && input.val() != "") {
                         var maskedtextbox = input.data("kendoMaskedTextBox");
                         return maskedtextbox.value().indexOf(maskedtextbox.options.promptChar) === -1;
                     }
 
                     return true;
                 }
             }
         });
         */



    // $("#agentForm").kendoValidator({
    //     validateOnBlur: true
    //});


    if (lang == 'ur') {

        UrduValidationMessage("#dealform");
        UrduValidationMessage("#agentForm");
        UrduValidationMessage("#propertyAddressForm");
        UrduValidationMessage("#constructedStructureFormSecond");
        UrduValidationMessage("#constructedStructureForm");
        UrduValidationMessage("#PropertyForm");
        UrduValidationMessage("#NonPropertyForm");
        UrduValidationMessage("#ConstructedForm");
        UrduValidationMessage("#ClassificationForm");
        UrduValidationMessage("#DeedDetailsForDeficientFormSuitFor");
        UrduValidationMessage("#DeedDetailsForDeficientFormProperty");
        UrduValidationMessage("#DeedDetailsForDeficientFormProperty2");
        UrduValidationMessage("#DeficientAmountForm");
        UrduValidationMessage("#leaseDeedPayCVTRegistrationForm");
        UrduValidationMessage("#RegistrationPayCVTandRegDeedDetailsForm");
        UrduValidationMessage("#registryFeeDiv");
        UrduValidationMessage("#RegistrationPayCVTandRegDeedDetailsFormDeficient");
        UrduValidationMessage("#DeedDetailsForGenerateChallanFormNonJudicialForm");
        UrduValidationMessage("#DeedDetailsForGenerateChallanFormNonJudicialSecondForm");
        UrduValidationMessage("#DeedDetailsForGenerateChallanFormNonJudicialReadOnly");
        UrduValidationMessage("#DeedDetailsForGenerateChallanFormNonJudicialSecond");
        UrduValidationMessage("#DeedDetailsForGenerateChallanFormJudicial");
        UrduValidationMessage("#DeedDetailsForGenerateChallanFormJudicial");
        UrduValidationMessage("#ConstructedAreaCVTForm");
        UrduValidationMessage("#landClassificationCVTForm");
        UrduValidationMessage("#PayCVTFormDeficient");
        UrduValidationMessage("#LandAreaCVTForm");
        UrduValidationMessage("#payableCVTExchagneOfPropertyForm");


    }
    else {
        $("#dealform").kendoValidator({
            validateOnBlur: true
        });

        $("#propertyAddressForm").kendoValidator({
            validateOnBlur: true

        });

        $("#constructedStructureFormSecond").kendoValidator({
            validateOnBlur: true
        });
        $("#constructedStructureForm").kendoValidator({
            validateOnBlur: true
        });
        $("#PropertyForm").kendoValidator({
            validateOnBlur: true
        });

        $("#NonPropertyForm").kendoValidator({
            validateOnBlur: true
        });
        $("#ConstructedForm").kendoValidator({
            validateOnBlur: true
        });

        $("#ClassificationForm").kendoValidator({
            validateOnBlur: true
        });
        $("#property2").kendoValidator({
            validateOnBlur: true

        });
        $("#AmountDiv").kendoValidator({
            validateOnBlur: true

        });
        ///////////////////Deed Details Deficient Screen///////////
        $("#DeedDetailsForDeficientFormSuitFor").kendoValidator({
            validateOnBlur: true

        });
        $("#DeedDetailsForDeficientFormProperty").kendoValidator({
            validateOnBlur: true

        });

        $("#DeedDetailsForDeficientFormProperty2").kendoValidator({
            validateOnBlur: true

        });

        $("#DeficientAmountForm").kendoValidator({
            validateOnBlur: true

        });
        ///////////////////Deed Details Pay CVT and Registration Fee///////////
        //$("#DeedDetailsForPayCVTandRegFormProperty").kendoValidator({
        //    validateOnBlur: true

        //}); 
        $("#leaseDeedPayCVTRegistrationForm").kendoValidator({
            validateOnBlur: true

        });

        $("#RegistrationPayCVTandRegDeedDetailsForm").kendoValidator({
            validateOnBlur: true

        });
        $("#registryFeeDiv").kendoValidator({
            validateOnBlur: true

        });
        //$("#AhleCommissionFeeDiv").kendoValidator({
        //    validateOnBlur: true

        //});
        $("#RegistrationPayCVTandRegDeedDetailsFormDeficient").kendoValidator({
            validateOnBlur: true

        });
        ///////////////////Deed Details Generate Challan Screen///////////
        $("#DeedDetailsForGenerateChallanFormNonJudicialForm").kendoValidator({
            validateOnBlur: true

        });

        $("#DeedDetailsForGenerateChallanFormNonJudicialSecondForm").kendoValidator({
            validateOnBlur: true

        });

        $("#DeedDetailsForGenerateChallanFormNonJudicialReadOnly").kendoValidator({
            validateOnBlur: true

        });



        $("#DeedDetailsForGenerateChallanFormNonJudicialSecond").kendoValidator({
            validateOnBlur: true

        });
        $("#DeedDetailsForGenerateChallanFormJudicial").kendoValidator({
            validateOnBlur: true

        });
        $("#DeedDetailsForGenerateChallanFormJudicial").kendoValidator({
            validateOnBlur: true

        });
        //$("#LeaseForm").kendoValidator({
        //    validateOnBlur: true

        //});

        //$("#premiumForm").kendoValidator({
        //    validateOnBlur: true

        //});

        //$("#LeasePeriodForGenerateChallanFormNonJudicial").kendoValidator({
        //    validateOnBlur: true

        //});
        //$("#LeaseMoneyForGenerateChallanFormNonJudicial").kendoValidator({
        //    validateOnBlur: true

        //});
        //////////////////////////////////////CVT Screen///////////////
        $("#ConstructedAreaCVTForm").kendoValidator({
            validateOnBlur: true

        });
        $("#landClassificationCVTForm").kendoValidator({
            validateOnBlur: true

        });
        $("#PayCVTFormDeficient").kendoValidator({
            validate: true
        });

        $("#LandAreaCVTForm").kendoValidator({
            validate: true
        });

        $("#payableCVTExchagneOfPropertyForm").kendoValidator({
            validate: true
        });

        // $("#PayableCVTForm").kendoValidator({
        //validate: true

        // });
    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function moveCaretToStart(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = 0;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(true);
        range.select();
    }
}

function onDatePickerKeyDown() {
    //$("#oldRegDate").data("kendoDatePicker").value("");
    //$("#oldRegDate").data("kendoDatePicker").text("");

}

$(document).ready(function () {
    var CalstampDuty = 0;
 
  
    //if (lang == "ur")
    //{
 
    //    $("#div_ExemptStampDuty").css("direction", "rtl");
    //}

    //var nameValue = getQueryStringValue('name');
    ////alert(nameValue)

    //if (nameValue === "GenerateChallan" || nameValue === "PayDeficient" || nameValue === "PayDeficiencyForOldRegistry") {

    //    $('#showHideBanks').show();
    //}
    //else {
    //    $('#showHideBanks').hide();
    //}

    $('#isPaidOnlineChkBox').click(function () {
        debugger;
        if ($(this).is(':checked')) {
            var nameValue = getQueryStringValue('name');
            //alert(nameValue)

            if (nameValue === "GenerateChallan" || nameValue === "PayDeficient" || nameValue === "PayDeficiencyForOldRegistry") {

                $('#showHideBanks').show();
            }
            else {
                $('#showHideBanks').hide();
            }
            //$('#showHideBanks').show(); // Show the div
        } else {
            $('#showHideBanks').hide(); // Hide the div
        }
    });

    $('#isPaidOnlineChkBoxForDeficient').click(function () {
        debugger;
        if ($(this).is(':checked')) {
            var nameValue = getQueryStringValue('name');
            //alert(nameValue)

            if (nameValue === "GenerateChallan" || nameValue === "PayDeficient" || nameValue === "PayDeficiencyForOldRegistry") {

                $('#showHideBanksForDeficient').show();
            }
            else {
                $('#showHideBanksForDeficient').hide();
            }
        } else {
            $('#showHideBanksForDeficient').hide(); // Hide the div
        }
    });

    $("#AgentCNICNo_validationMessage").hide();
    $("#AgentContactNo_validationMessage").hide();

    console.log('Form is being loading ..'); +
    //$("#oldRegDate").attr("disabled", "disabled");
    //$(".k-datepicker input").prop("readonly", true);
    $("#oldRegistryDetailsDiv").hide();
    $("#findLandClickMessage").css("color", "red");
    $("#registryFeeDiv").hide();
    $("#payableCVTExchagneOfPropertyDiv").hide();
    $("#multiplePropertiesExchangeOfPropertyCheckboxDiv").hide();
    $("#leaseYearCheckboxDiv").hide();
    $("#dcMessage").hide();
    $("#leasePeriodWarningCVT").hide();
    $("#LandAreaCVTDiv").hide();
    $("#landAreaError").hide();
    $("#constructedAreaError").hide();
    $("#deficientError").hide();
    $("#penaltyError").hide();
    $("#deficientCVTError").hide();
    $("#DeficientRegistrationWindow").hide();
    $("#AdvanceMoneyDivDeedDetailsGenerateChallan").hide();
    $("#LeasePeriodGenerateChallanDiv").hide();
    $("#LeaseMoneyDiv").hide();
    $("#leaseDeedPayCVTRegistrationDiv").hide();
    $("#totalPayableTaxError").hide();
    $('#multiplePropertiesExchangeOfPropertyCheckboxPayCVTRegDiv').hide();
    //$("#inheritenceGiftDeedCheckboxDiv").hide();
    $("#exemptStampDutyGiftDeedCheckboxDiv").hide();
    $("#isHousingSocietyInvolvedCheckboxDiv").hide();
    document.getElementById("LandUnit").innerHTML = "&nbsp;";
    // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
    challan = null;
    challanFromDB = null;
    challanModel = null;
    document.getElementById("nextFirstScreenButton").disabled = false;
    $("#constructedStructureValueDiv").hide();
    $("#constructedStructureValueDivSecond").hide();
    $("#constructedAreaWarning").hide();
    $("#cvtRegistrationWarning").hide();
    $("#ChallanTypeCheckBoxes").hide();
    $("#dcMessage").hide();
    document.getElementById("constructedAreaCVT").innerHTML = "";
    $('#multiStoryBuilding').prop('checked', false);
    $('#propertyConstructed').prop('checked', false);
    $('#govPropertyExchangeOfPropertyCheckbox').prop('checked', false);
    $("#purposeOfChallanTextError").hide();
    $("#purposeOfChallanTextErrorDeficient").hide();
    $("#LeasePeriodCVTDiv").hide();
    // $('#constructedAreaCVTDiv').hide();
    $('#checkBoxesCVT').show();
    $("#stampErrorMessage").hide();
    $("#stampErrorMessageForJudicial").hide();
    $("#LeaseMoneyDiv").hide();
    ResetTextBox("PayableCVTValue");
    ResetTextBox("constructedAreaCVT");
    ResetTextBox("PropertyAreaQuantity");
    ResetTextBox("PayCVTValueMultipleProperties");
    ResetTextBox("registryFee");
    ResetTextBox("DeficientAmount");
    ResetTextBox("PenaltyDeficient");
    ResetTextBox("TotalDeficient");
    queryStringName = getUrlVars()["name"];
    var textBox = document.getElementById("AgentCnic");
    if (queryStringName == "RegFeeNew") {
        $("#IsOnlinePaidDivDef").hide();
    }
    $(".RemoveMask").kendoMaskedTextBox({
        mask: "00000-0000000-0",
        clearPromptChar: true,
    });

    $("#AgentCell").kendoMaskedTextBox({
        mask: "0000-0000000",//"\\0300-0000000",
        clearPromptChar: true
    });

    //$("#AgentCnic").kendoMaskedTextBox({
    //    mask: "00000-0000000-0",
    //    clearPromptChar: true
    //});

    $(".RemoveMask").focus(function () {
        var id = $(this).attr("id");

        var value = $(this).val();
        if (value == "_____-_______-_" || value == "_____-_______-_") {
            $(this).val("");
        }
        else {
            $(this)[0].focus();
        }
    });

    $('#PersonCnic').focus(function () {

        var id = $(this).attr("id");

        var value = $(this).val();
        if (value == "_____-_______-_" || value == "_____-_______-_") {
            $(this).val("");
        }
        else {
            $(this)[0].focus();
        }

    });



    $('#AgentCnic').focus(function () {
        ;
        var id = $(this).attr("id");

        var value = $(this).val();
        if (value == "_____-_______-_" || value == "_____-_______-_") {
            $(this).val("");
        }
        else {
            $(this)[0].focus();
        }

    });

    $('#PersonPhone').focus(function () {

        var id = $(this).attr("id");

        var value = $(this).val();
        //console.log(value);

        if (value == "____-_______") {
            $(this).val("");
        }
        else {
            $(this)[0].focus();
        }

    });

    //$('#NTN').focus(function () {
    //    var id = $(this).attr("id");

    //    var value = $(this).val();
    //    if (value == "_-_____" || value == "_-_____") {
    //        $(this).val("");
    //    }
    //    else {
    //        $(this)[0].focus();
    //    }

    //});

    $('.alphaonly').bind('keyup blur', function (evt) {
        var node = $(this);

        var code = evt.which ? evt.which : event.keyCode;

        // 37 = left arrow, 39 = right arrow.
        if (code != 37 && code != 39)
            //$(evt).val($(evt).val().replace(/[^A-Za-z0-9]/g, ' '))\
            node.val(node.val().replace(/[^a-zA-Z\s]/g, ''));

        //"[A-Za-z ]+"
    });
    $('.numericonly').bind('keyup blur', function (evt) {
        var node = $(this);

        var code = evt.which ? evt.which : event.keyCode;

        // 37 = left arrow, 39 = right arrow.
        if (code != 37 && code != 39)
            //$(evt).val($(evt).val().replace(/[^A-Za-z0-9]/g, ' '))\
            node.val(node.val().replace(/[^0-9\s]/g, ''));

        //"[A-Za-z ]+"
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('#showAllDeeds').click(function () {
        showDeeds();
    });


    var window = $("#deleteWin").kendoWindow({

        visible: false, //the window will not appear before its .open method is called
        width: "400px",
        height: "100px",
    }).data("kendoWindow");
    document.getElementById("AgentCnic").classList.remove("k-textbox");
    document.getElementById("AgentCell").classList.remove("k-textbox");
    $("#confirmfrom").hide();
    $("#PropertyClassification").val(18);
    $("#confirmChallan").hide();
    $("#ConstructedDiv").hide();
    $("#AreaDiv").hide();
    $("#ConstructedDiv").hide();
    $("#AmountDiv").hide();
    $("#PropertyDiv").hide();
    $("#SuitForDiv").hide();
    $("#ClassficationFrom").hide();
    $("#StampPaidByDiv").hide();
    $("#RateOfChallan").hide();
    $("#StampDutyFeeDiv").hide();
    $("#SearchChallanNo").hide();
    $("#SearchStampNo").hide();
    $("#CvtTaxDiv").hide();
    $("#DefCvtTaxForOldRegDiv").hide();
    $("#RegistrationFeeForOldRegDiv").hide();
    $("#RegistrationFeeDiv").hide();
    $("#purposeOfChallanText").hide();
    $("#DeedDetailsReadOnly").hide();
    $("#PersonDivIdReadOnly").hide();
    $("#ChallanNoErrorDiv").hide();
    $("#DeedDetailsForDeficient").hide();
    // $("#window").data("kendoWindow").close();
    initializeDropDown(base_url_service_layer + "/api/Proxy/Lookup/TransactionNameByType?Id=", selectDeedName, "TransactionName");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Lookup/AllTransactionTypes?addChallanQueryString=' + queryStringName, selectStampPaperType, "StampType");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "District");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTalukaText, "Taluka");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTalukaText, "tehsilDropdownDC");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Lookup/LookupByCategory?category=Land Classification', selectlandClassificationText, "PropertyClassification");
    InitializeValidators();

    // ToolTips for form 
    $("#tooltip_StampNumber").kendoTooltip({
        content: "e-Stamp Number example:PB-GRW-XXXXXXXXXXXXXXXX. Please enter the complete e-Stamp Number or the last 16 digits of e-Stamp Number",
        position: "top"
    });
    $("#tooltip_AgentName").kendoTooltip({
        content: "Required. Name of the Agent",
        position: "top"
    });
    $("#tooltip_LeaseYear").kendoTooltip({
        content: "Where the lease purports to be for a term of less than twenty years. 3.25% of the average annual rent of the lease will be applicable. <br/>And 5.25% of the consideration equal to the amount of advance as set forth in the lease will be applicable.",
        position: "top"
    });
    $("#tooltip_cnic").kendoTooltip({
        content: "Required. CNIC of the Agent",
        position: "top",
    });
    $("#tooltip_AgentCell").kendoTooltip({
        content: "Required. Contact No. of the Agent",
        position: "top"
    });
    $("#tooltip_").kendoTooltip({
        content: "Email of the Agent",
        position: "top"
    });
    $("#tooltip_District").kendoTooltip({
        content: "Required. District from where stamp paper would be issued",
        position: "top"
    });

    $("#tooltip_Tehsil").kendoTooltip({
        content: "required. Tehsil from where stamp paper would be issued",
        position: "top"
    });
    $("#tooltip_StampType").kendoTooltip({
        content: "Required. Stamp Paper Type like Non-Judicial, Judicial",
        position: "top"
    });
    $("#tooltip_TransactionName").kendoTooltip({
        content: "Required. Deed Name like sale deed, transfer deed etc. Stamp duty differs on various deeds",
        position: "top"
    });
    $("#tooltip_SuitFor").kendoTooltip({
        content: "Required. Reason for filing judicial stamp paper",
        position: "top"
    });
    $("#tooltip_PropertyAddress").kendoTooltip({
        content: "Required. Address of property being considered for sale / purchase",
        position: "top"
    });

    $("#tooltip_PropertyAddress2").kendoTooltip({
        content: "Required. Address of property being considered for sale / purchase",
        position: "top"
    });

    $("#tooltip_TotalAmount").kendoTooltip({
        content: "Required. Declared amount of the property on which stamp duty is to be calculated",
        position: "top"
    });
    $("#tooltip_Stamp_duty").kendoTooltip({
        content: "Calculated stamp duty amount for which stamp paper would be generated",
        position: "top"
    });
    $("#tooltip_LandClassification").kendoTooltip({
        content: "Land classification of the property like Residential, Commercial. This is required for CVT calculation",
        position: "top"
    });
    $("#tooltip_PersonName").kendoTooltip({
        content: "Required. Name of parties involved",
        position: "top"
    });
    $("#tooltip_NTN").kendoTooltip({
        content: "Required. NTN of company involved",
        position: "top"
    });
    $("#tooltip_PersonCnic").kendoTooltip({
        content: "Required. CNIC of parties involved",
        position: "top"
    });
    $("#tooltip_PersonRelation").kendoTooltip({
        content: "Required. Relationship type like s/o, d/o etc",
        position: "top"
    });
    $("#tooltip_PersonRelationName").kendoTooltip({
        content: "Required. Father Name / Husband Name / Wife Name etc",
        position: "top"
    });
    $("#tooltip_PersonPhone").kendoTooltip({
        content: "Required. Contact No. of parties involved",
        position: "top"
    });
    $("#tooltip_PersonEmail").kendoTooltip({
        content: "Email of parties involved",
        position: "top"
    });
    $("#tooltip_PersonAdress").kendoTooltip({
        content: "Required. Address of parties involved",
        position: "top"
    });
    $("#tooltip_Payable_CVT").kendoTooltip({
        content: "Calculated CVT which is payable on Challan Form 32-A",
        position: "top"
    });
    $("#tooltip_Pay_CVT_Deficient").kendoTooltip({
        content: "Required. Payable Deficient CVT.",
        position: "top"
    });
    $("#tooltip_Pay_CVT_MultipleProperties").kendoTooltip({
        content: "Required. Payable CVT.",
        position: "top"
    });
    $("#tooltip_ConstructedArea").kendoTooltip({
        content: "Constructed Area in square feet. This field is used to calculate the Constructed Area of user provided value in square feet",
        position: "top"
    });
    $("#tooltip_Payable_Reg_Duty").kendoTooltip({
        content: "Calculated Registration Fee which is payable on Challan Form 32A",
        position: "top"
    });
    $("#tooltip_agentEmail").kendoTooltip({
        content: "Email of the Agent",
        position: "top"
    });
    $("#tooltip_OldRegistryNumber").kendoTooltip({
        content: "Old Registry Number against which challan is being generated",
        position: "top"
    });
    $("#tooltip_OldRegistryDate").kendoTooltip({
        content: "Date when the old registry was created",
        position: "top"
    });

    ////////Deed Details Pay CVT and Registration ToolTips///
    //$("#tooltip_PropertyAddressPayCVTandReg").kendoTooltip({
    //    content: "Address of the property",
    //    position: "top"
    //});
    $("#tooltip_PropertyValuationPayCVTandReg").kendoTooltip({
        content: "",
        position: "top"
    });
    $("#tooltip_RegistryFee").kendoTooltip({
        content: "Required. Payable Registry Pages Fee. (Rs.)",
        position: "top"
    });
    $("#tooltip_AhleCommissionFee").kendoTooltip({
        content: "Required. Payable Ahl-e-Commission Fee. (Rs.)",
        position: "top"
    });
    $("#tooltip_AhleCommisionOld").kendoTooltip({
        content: "Required. Payable Ahl-e-Commission Fee. (Rs.)",
        position: "top"
    });
    $("#tooltip_PropertyValuationDeficient").kendoTooltip({
        content: "Property Value",
        position: "top"
    });
    $("#tooltip_registrationFeePayCVTandReg").kendoTooltip({
        content: "Payable Registration Fee",
        position: "top"
    });
    $("#tooltip_registrationFeePayCVTandRegDeficient").kendoTooltip({
        content: "Required. Payable Registration Fee",
        position: "top"
    });
    ////////Deed Details Deficient Amount ToolTips///
    $("#tooltip_DeficientAmount").kendoTooltip({
        content: "Deficient Amount to be paid",
        position: "top"
    });
    $("#tooltip_DeficientPenalty").kendoTooltip({
        content: "Penalty to be paid",
        position: "top"
    });
    $("#tooltip_TotalDeficient").kendoTooltip({
        content: "Total Amount",
        position: "top"
    });
    //////////////////////////Deed Details Generate Challan ToolTips///////////////
    $("#tooltip_PropertyAddressGenerateChallan").kendoTooltip({
        content: "Required. Address of property being considered for sale/purchase",
        position: "top"
    });

    $("#tooltip_TotalAmountGenerateChallan").kendoTooltip({
        content: "Required. Declared amount of the property on which stamp duty is to be calculated",
        position: "top"
    });

    $("#tooltip_LandPropertyValue2").kendoTooltip({
        content: "Required. Land Value of the property",
        position: "top"
    });

    $("#tooltip_ConstructedStructureValue").kendoTooltip({
        content: "Required. Constructed Structure Value of the property",
        position: "top"
    });

    $("#tooltip_ConstructedStructureValueSecond").kendoTooltip({
        content: "Required. Constructed Structure Value of second property",
        position: "top"
    });

    $("#tooltip_PropertyAddress2GenerateChallan").kendoTooltip({
        content: "Required. Address of second property being considered for sale/purchase",
        position: "top"
    });
    $("#tooltip_TotalAmount2GenerateChallan").kendoTooltip({
        content: "Required. Declared amount of the second property on which stamp duty is to be calculated",
        position: "top"
    });

    $("#tooltip_SuitForGenerateChallan").kendoTooltip({
        content: "Required. Reason for filing judicial stamp paper",
        position: "top"
    });
    $("#tooltip_AmountOfConsiderationGenerateChallan").kendoTooltip({
        content: "Required. Amount to be paid",
        position: "top"
    });
    $("#tooltip_TotalLeaseMoneyGenerateChallan").kendoTooltip({
        content: "Required. Total Lease Money to be paid",
        position: "top"
    });
    $("#tooltip_AdvanceMoneyGenerateChallan").kendoTooltip({
        content: "Required. Advance Money to be paid",
        position: "top"
    });
    //$("#tooltip_PremiumGenerateChallan").kendoTooltip({
    //    content: "Required. Premium to be paid",
    //    position: "top"
    //});

    //////////////////////////////////////////
    //////////////////////////Stamp Duty and Registration Fee Generate Challan ToolTips///////////////
    $("#tooltip_payableStampDutyandCVTGenerateChallan").kendoTooltip({
        content: "Payable Stamp Duty",
        position: "top"
    });
    $("#tooltip_registrationFeeGenerateChallan").kendoTooltip({
        content: "Additional Stamp Duty of Registration of Instrument",
        position: "top"
    });

    ////////////////////////////////////////////////////////////////////////////CVT Screen/////////

    $("#tooltip_LeasePeriodGenerateChallan").kendoTooltip({
        content: "Lease Period in years",
        position: "top"
    });

    $("#tooltip_PropertyValuation").kendoTooltip({
        content: "",
        position: "top"
    });

    $("#tooltip_PropertyValuation2").kendoTooltip({
        content: "Property Valuation for second property",
        position: "top"
    });
    //$("#tooltip_PropertyAddress2").kendoTooltip({
    //    content: "Property address for second property",
    //    position: "top"
    //});
    ValidateSellerSection();
    ValidatePurchaserSection();
    $("#sellerGrid").kendoGrid({
        dataSource: {
            data: SellerData,
            schema: {
                model: {
                    fields: {
                        NameString: { type: "string" },
                        PersonCnic: { type: "string" },
                        NTN: { type: "string" },
                        PersonPhone: { type: "string" },
                        IsPrimaryString: { type: "string" }
                    }
                }
            },
            pageSize: 60
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false,
        columns: [
             { field: "NameString", title: Name, headerAttributes: { style: "white-space: normal" }, width: "300px" },
            { field: "PersonCnic", title: CNIC, width: "200px" },
             { field: "NTN", title: "NTN", width: "200px" },
           { field: "PersonPhone", title: Contact, width: "200px" },
           { field: "IsPrimaryString", title: Useonform, width: "130px" },
             {
                 command: [{
                     text: "",
                     name: "delete",
                     className: "delete-btn-center-adjustment",
                     imageClass: "fa fa-trash",
                     click: deleteSeller
                 },


                   {
                       text: "",
                       name: "edit",
                       className: "edit-btn-center-adjustment",
                       imageClass: "fa fa-edit",
                       click: editSeller
                   }
                 ], width: "130px"

             }
        ]
    });

    $("#purchaserGrid").kendoGrid({
        dataSource: {
            data: PurchaserData,
            schema: {
                model: {
                    fields: {
                        NameString: { type: "string" },
                        PersonCnic: { type: "string" },
                        NTN: { type: "string" },
                        IsPrimaryString: { type: "string" }
                    }
                }
            },
            pageSize: 60
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false,

        columns: [
           { field: "NameString", title: Name, headerAttributes: { style: "white-space: normal" }, width: "300px" },
            { field: "PersonCnic", title: CNIC, width: "200px" },
          { field: "NTN", title: 'NTN', width: "200px" },
           { field: "PersonPhone", title: Contact, width: "200px" },
           { field: "IsPrimaryString", title: Useonform, width: "130px" },
            {
                command: [{
                    name: "delete",
                    text: "",
                    className: "delete-btn-center-adjustment",
                    imageClass: "fa fa-trash",
                    click: deletePurchaser
                },


                  {
                      text: "",
                      name: "edit",
                      className: "edit-btn-center-adjustment",
                      imageClass: "fa fa-edit",
                      //  template: "<div class='k-button'><span class='k-icon k-edit'></span></div>",
                      click: editPurchaser
                  }
                ], width: "130px"

            }
        ]
    });

    $('#check').click(function checkForm(event) {
        $('#status').attr('class', 'inProgress');
        $('#status').text('Checking...');
        // get client-side Captcha object instance
        var captchaObj = $("#CaptchaCode").get(0).Captcha;
        // gather data required for Captcha validation
        var params = {}
        params.CaptchaId = captchaObj.Id;
        params.InstanceId = captchaObj.InstanceId;
        params.UserInput = $("#CaptchaCode").val();
        // make asynchronous Captcha validation request
        $.getJSON('../ChallanFormView/CheckCaptcha', params, function (result) {
            if (true === result) {
                //$('#status').attr('class', 'correct');
                //$('#status').text('');
            } else {
                //$('#status').attr('class', 'incorrect');
                //$('#status').text('Invalid Code Entered');
                document.getElementById("captchaError").innerHTML = InvalidCodeEntered;
                // always change Captcha code if validation fails
                captchaObj.ReloadImage();
                res = false;
            }
        });
        event.preventDefault();
    });
    var windowdc = $("#DCconfirmationwindow").kendoWindow({
        visible: false, //the window will not appear before its .open method is called
        width: "600px",
        height: "220px",
        // position: {
        //     top: "30%",
        //     left: "12%"
        // },
    }).data("kendoWindow");

    //////////initialize Static dropdown of Stamp Papers//////////////
    //initializeStaticDropDown(numberOfStampsdata, "Select Number Of Stamp Papers", "NumberOfStampPapersGenerateChallanDeedDetail");
    //////////////////////////////////////////////////////////////////
    queryStringName = getUrlVars()["name"];
    if (queryStringName == "GenerateChallan" || queryStringName == "GenerateChallanForOldRegistry" || queryStringName == "PayDeficiencyForOldRegistry") {
        $('#GenerateNewChallan').prop('checked', true);
        if (queryStringName == "GenerateChallan") {
            createArrowBarFirstScreen();
        } else {
            removeArrowBarFirstScreen();
        }
        ViewChallanTypeDivs();
    } else {
        removeArrowBarFirstScreen();
        if (queryStringName == "PayDeficient") {
            $('#PayDeficient').prop('checked', true);
            ResetTextBox("registrationFeePayCVTandRegDeficient");
            ResetTextBox("PayCVTValueDeficient");
            ViewChallanTypeDivs();
        }
        else if (queryStringName == "MutationFee") {
            $('#MutationFee').prop('checked', true);
            ViewChallanTypeDivs();
        }
        else if (queryStringName == "RegFeeNew") {
            $('#RegFeeNew').prop('checked', true);
            ViewChallanTypeDivs();
        }
        else if (queryStringName == "PayCVTandRegT") {
            $('#ScanningFee').prop('checked', true);
            ViewChallanTypeDivs();
        }

        else {
            $('#PayCVTandRegFee').prop('checked', true);
            ViewChallanTypeDivs();
        }
    }

});


/////////////////////////////////////////////
//TextBoxes triggering event functions
////////////////////////////////////////////
function calculateStampDuty() {
    try {
        var value = "1"; // Default Value
        var totalAmount = $("#Total_Amount").val();
        //alert(totalAmount);
        if (totalAmount != null && totalAmount != "")
            value = totalAmount.replace(/,/g, "");

        var id = $("#TransactionName").val();

        var Fixed_Percent = FixedStampValue;

        if ($("#TransactionName").val() == DebentureDeed) {
            Fixed_Percent = 0.05;
            var isTCChecked = $('#TransferComercialCheck').is(":checked");
            if (isTCChecked == true)
                Fixed_Percent = 0.02;
        }

        $.ajax({
            url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateStampDuty?TransactionId=' + id + "&Amount=" + value + "&Fixed_Percent=" + Fixed_Percent,
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                console.log(data);
                if (data > 1) {
                    $("#Stamp_duty").val(returnCommas(data));
                }
                else {
                    $("#Stamp_duty").val("");
                }
                $("#Stamp_duty").removeClass("empty");
                RegistrationFeeChanged();
                onChangeCVTTax();

            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');
                $("#Stamp_duty").val("");
                $("#Stamp_duty").removeClass("empty");
                $("#Stamp_duty").addClass("empty");
            }
        });
    }
    catch (ex) { alert(ex); }
}
function ResetDropDown(field) {

    $("#" + field).data("kendoDropDownList").value("");
    //$(".k-input").html("Select Relation");
}
/////////////////////////////////////////////
//Dropdowns triggering event functions
////////////////////////////////////////////
function ResetPersonForm() {
    ResetTextBox("PersonName");
    ResetTextBox("PersonEmail");
    ResetTextBox("PersonPhone");
    ResetTextBox("PersonAddress");
    ResetTextBox("PersonCnic");
    ResetTextBox("RelationName");
    ResetTextBox("PersonCnicPassport");
    ResetTextBox("PersonNameAttorney");
    $("#ThroughPowerOfAttoreny").prop("checked", false);



    $("#OverSeases").prop("checked", false);
    // $("#personCnicDiv").show();
    $("#cnicPersonEditForm").show();
    $("#throughAttorneyForm").hide();
    //$("#personPassportDiv").hide(); 
    $("#passportPersonEditForm").hide();
    ResetTextBox("NTN");
    ResetDropDown("Relation");
    if (sessionStorage["currentLanguage"] == "Urdu") {
        $("#personForm > div:nth-child(2) > div:nth-child(2) > div > div > div > div").html("رشتہ");
    }
    else {
        $("#personForm > div:nth-child(2) > div:nth-child(2) > div > div > div > div").html("CNIC");
    }
}

function onChangeDeedName() {



    //calculateStampDuty();
    // var deedId = $("#TransactionName").val();
    //removeArrowBarOnChangeDeedName();
    //// Stamp duty is always applied
    if ($("#TransactionName").val() == oralMutationDeedId || $("#TransactionName").val() == cvtRegistrationDeedId) {
        $('#StampDutyCheck').prop('checked', false);
    }
    else
        $('#StampDutyCheck').prop('checked', true);

    if ($("#TransactionName").val() == DebentureDeed) {

        $("#DebentureDiv").show();

    } else {

        $("#DebentureDiv").hide();

    }


    $('#StampDutyFeeDiv').hide();

    if ($("#StampType option:selected").text() == "Judicial") {
        $('#StampDutyCheck').prop('checked', true);
        $('#StampDutyFeeDiv').hide();

    } else {

        $('#CVTTax').prop('checked', false);
        $('#multiplePropertiesExchangeOfPropertyCheckbox').prop('checked', false);
    }
    $('#multiplePropertiesExchangeOfPropertyCheckbox').attr('checked', false);
    $('#leaseYearCheckbox').attr('checked', false);
    isMultiplePropertiesExchageOfProperty = false;
    AmountsData = [];
    areDeedDetailsFieldsCreated = false;
    updateDCValuationAndCVTFlag();
    updateExchangeOfPropertyFlag();
    updateLeaseYearFlag();
    updatePowerOfAttorneyFlag();
    updateGiftDeedFlag();
    resetGenerateChallanDeedScreen();
   
    if (queryStringName == "GenerateChallanForOldRegistry") {
        $('#AhleCommissionDutyCheck').prop('checked', false);
        $("#AhleCommissionDutyFeeDiv").show();
    } else {
        $("#AhleCommissionDutyFeeDiv").hide();
    }
   
    //isChallanFirst = true;
  //fillForm();// Fill Form with default
    //isChallanFirst = true;
    // updateIsLeasePeriod();
    if (lang == "ur") {

        $("#div_ExemptStampDuty").css("direction", "rtl");
    }
}

function onexemptStampDutyGifDeedChange() {
    if (true == $('#exemptStampDutyGiftDeedCheckbox').is(":checked")) {
        // Uncheck CVT checkbox, PITB Merger of Duties change
        $('#CVTTax').prop('checked', false);
        $('#CvtTaxDiv').hide();
        isCVTApplicable = true;
        exemptCVTforGiftDeed = true;
        isLegalHeirForGiftDeed = true;
    }
    else {
        //$('#CVTTax').prop('checked', false);
        //$('#CVTTax').prop('checked', true);
        //$('#CvtTaxDiv').show();
        isCVTApplicable = false;
        exemptCVTforGiftDeed = false;
        isLegalHeirForGiftDeed = false;
    }
}
function updateGiftDeedFlag() {
    //alert('yeahg')
    var deedid = $("#TransactionName").val();

    if (deedid == GiftDeedId) {
        //$("#inheritenceGiftDeedCheckboxDiv").show();
        $("#isHousingSocietyInvolvedCheckboxDiv").show();
        $("#exemptStampDutyGiftDeedCheckboxDiv").show();
    }
    else {
        //$("#inheritenceGiftDeedCheckboxDiv").hide();
        $("#isHousingSocietyInvolvedCheckboxDiv").hide();
        $("#exemptStampDutyGiftDeedCheckboxDiv").hide();
    }
}

function updatePowerOfAttorneyFlag() {
    var deedid = $("#TransactionName").val();

    if (deedid == PowerOfAttorneyDeedId) {
        isPowerOfAttorney = true;
        $('#propertyConstructed').prop('checked', true);
        $('#propertyConstructed').attr('checked', true);
        $('#constructedAreaCVTDiv').show();

        $('#PropertyValuationGenerateChallanDiv').hide();
    }
    else {
        isPowerOfAttorney = false;
        $('#propertyConstructed').prop('checked', false);
        //  $('#constructedAreaCVTDiv').hide();

        $('#PropertyValuationGenerateChallanDiv').show();
    }
    if (deedid == PowerOfAttorneyDeed48bbId) {
        isCVTApplicable = true;
        exemptCVTforGiftDeed = true; // to show CVT Screen only
    }
}


function updateExchangeOfPropertyFlag() {
    var deedid = $("#TransactionName").val();

    if (deedid == exchangeOfPropertyDeedId) {
        isExchangeOfProperty = true;
        $("#multiplePropertiesExchangeOfPropertyCheckboxDiv").show();
    }
    else {
        isExchangeOfProperty = false;
        $("#multiplePropertiesExchangeOfPropertyCheckboxDiv").hide();
    }

}

function updateLeaseYearFlag() {
    var deedid = $("#TransactionName").val();

    if (deedid == Lease353ADeedId || deedid == Lease353BDeedId) {
        //isLeaseYearLessThan20 = true;
        $("#leaseYearCheckboxDiv").show();
    }
    else {
        isLeaseYearLessThan20 = false;
        $("#leaseYearCheckboxDiv").hide();
    }

}
var deedName;
function initializeTooltip(url, placeholder, elementId) {
    deedName = $("#" + elementId).kendoDropDownList({

        dataSource: {
            transport: {
                read: {
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                },
            },
        },
        dataTextField: "Name",
        optionLabel: placeholder,
        dataValueField: "Id",
    }).data('kendoDropDownList')


}


$('body').kendoTooltip({
    filter: '#TransactionName_listbox > .k-item',
    position: 'right',
    content: function (e) {
        var item = deedName.dataItem(e.target.index())
        console.log(item);
        if (item.DeedDetail != "undefined" && item.DeedDetail != null) {
            var result = '<p>' + item.DeedDetail + '</p>';
            return result;
        }
        return null;


    },
    width: 220
});


function onChangeTransactionName() {
    //alert("i am onChangeTransactionName");

    $("#TransactionName").val("").data("kendoDropDownList").text(selectDeedName);
    $transactionName = $("#TransactionName").val();
    // alert($transactionName); 
    var id = $("#StampType").val();
    //initializeDropDown(base_url_service_layer + "/api/Proxy/Lookup/TransactionNameByType?Id=" + id + "&addChallanQueryString=" + queryStringName, selectDeedName, "TransactionName");
    initializeTooltip(base_url_service_layer + "/api/Proxy/Lookup/TransactionNameByType?Id=" + id + "&addChallanQueryString=" + queryStringName, selectDeedName, "TransactionName");
    $("#PropertyDiv").hide();
    $("#SuitForDiv").hide();
    $("#CvtTaxDiv").hide();
    $("#DefCvtTaxForOldRegDiv").hide();
    $("#RegistrationFeeForOldRegDiv").hide();
    $("#RegistrationFeeDiv").hide();
    $("#AmountDiv").hide();
    $("#ClassficationFrom").hide();
    $("#ConstructedDiv").hide();


    $("#StampDutyFeeDiv").show();
    $("#purposeOfChallanText").hide();
    $("#purposeOfChallanTextError").hide();
    $("#purposeOfChallanTextErrorDeficient").hide();
    if ($("#StampType option:selected").text() == "Judicial") {
        if ($('#CVTTax').is(":checked") == true) {
            $('#CVTTax').prop('checked', false);
        }
    }
    SellerData = [];
    PurchaserData = [];
    $("#purchaserGrid").data('kendoGrid').dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
    $("#sellerGrid").data('kendoGrid').dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
    ValidatePurchaserSection();
    ValidateSellerSection();
    ResetTextBox("Total_Amount");
    ResetTextBox("SuitFor");
    ResetTextBox("Stamp_duty");
    ResetTextBox("Payable_CVT");
    ResetTextBox("Payable_Reg_Duty");
    ResetTextBox("PropertyAddress");
    $("#PropertyDiv").hide();
    $("#SuitForDiv").hide();
    $("#ClassficationFrom").hide();
    $("#StampDutyDiv").hide();
    $("#CvtTaxDiv").hide();
    $("#DefCvtTaxForOldRegDiv").hide();
    $("#RegistrationFeeForOldRegDiv").hide();
    $("#purposeOfChallanText").hide();
    $("#RegistrationFeeDiv").hide();
    $("#AmountDiv").hide();
    $("#StampPaidByDiv").hide();
    $("#ConstructedDiv").hide();
    var name = $("#TransactionName").val();
    var typeId = $("#StampType").val();
    if (typeId > 0 /*&& name > 0 && name != "" && $("#TransactionName").val() > 0*/) {
        //alert("i am judicial");
        $("#AmountDiv").show();
        var type = $("#StampType option:selected").text();
        if (type == "Judicial") {
            //alert("i am judicial");
            $("#PropertyDiv").hide();
            $("#SuitForDiv").show();
            $("#CvtTaxDiv").hide();
            $("#DefCvtTaxForOldRegDiv").hide();
            $("#RegistrationFeeForOldRegDiv").hide();
            $("#RegistrationFeeDiv").hide();
            $("#ClassficationFrom").hide();
            $("#ConstructedDiv").hide();
            $("#StampDutyFeeDiv").hide();
            //Party1Label = "Applicant";
            //Party2Label = "Defendant";
            $("#StampPaidByDiv").show();
            document.getElementById("sellerLabel").innerHTML = Party2Label + " Information";
            document.getElementById("addSellerLabel").innerHTML = "Add " + Party2Label;
            document.getElementById("purchaserLabel").innerHTML = Party1Label + " Information";
            document.getElementById("addPurchaserLabel").innerHTML = Add + " " + Party2Label;
            document.getElementById("SellerStampLabel").innerHTML = Party2Label;
            document.getElementById("PurchaserStampLabel").innerHTML = Party1Label;
            $("#AmountDiv > div:nth-child(1) > div > div > div >div").html(AmountofConsiderationRs);
            //   $("#tooltip_TotalAmount").data('kendoTooltip').destroy();
            /*      $("#tooltip_TotalAmount").kendoTooltip({
                      content: "Required. Amount of stamp duty to be paid",
                      position: "top"
                  });*/
        }
        else {
            //   $("#tooltip_TotalAmount").data('kendoTooltip').destroy();
            /*   $("#tooltip_TotalAmount").kendoTooltip({
                   content:"Required. Declared amount of the property on which stamp duty is to be calculated",
                   position: "top"
               });*/
            $("#StampDutyDiv").show();
            //Party1Label = "Purchaser";
            //Party2Label = "Seller";
            document.getElementById("sellerLabel").innerHTML = Party2Label + " Information";
            document.getElementById("addSellerLabel").innerHTML = Add + " " + Party2Label;
            document.getElementById("purchaserLabel").innerHTML = Party1Label + " Information";
            document.getElementById("addPurchaserLabel").innerHTML = Add + " " + Party2Label;
            document.getElementById("SellerStampLabel").innerHTML = Party2Label;
            $("#StampPaidByDiv").show();
            document.getElementById("PurchaserStampLabel").innerHTML = Party1Label;
            $("#PropertyDiv").show();
            $("#SuitForDiv").hide();
            $("#RegistrationFeeDiv").show();
            if (queryStringName == "GenerateChallanForOldRegistry") {
                $("#RegistrationFeeDiv").hide();
            }
            //$("#StampDutyFeeDiv").show();
            $("#purposeOfChallanText").show();
            $("#AmountDiv > div:nth-child(1) > div > div > div> div").html(PropertyValuation);

        }
    }
    else {
        $("#PropertyDiv").hide();
        $("#SuitForDiv").hide();
        $("#CvtTaxDiv").hide();
        $("#DefCvtTaxForOldRegDiv").hide();
        $("#RegistrationFeeForOldRegDiv").hide();
        $("#RegistrationFeeDiv").hide();
        $("#AmountDiv").hide();
        $("#StampPaidByDiv").hide();
        $("#ConstructedDiv").hide();
    }
    ValidatePurchaserSection();
    ValidateSellerSection();
    $("#dutiesCheckBox").hide();
}

function populateTaluka() {
    $("#Taluka").val("").data("kendoDropDownList").text(selectTalukaText);
    var id = $("#District").val();
    initializeDropDown(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + id, selectTalukaText, "Taluka");
}

function populateTransactionNames() {
    var id = $("#StampType").val();
    initializeDropDown(base_url_service_layer + "/api/Proxy/Lookup/TransactionNameByType?Id=" + id, selectDeedName, "TransactionName");
    $("#PropertyDiv").hide();
    $("#SuitForDiv").hide();
    $("#CvtTaxDiv").hide();
    $("#DefCvtTaxForOldRegDiv").hide();
    $("#RegistrationFeeForOldRegDiv").hide();
    $("#RegistrationFeeDiv").hide();
    $("#AmountDiv").hide();
    $("#ClassficationFrom").hide();
    $("#ConstructedDiv").hide();
    onChangeTransactionName();
}


/////////////////////////////////////////////
//Check boxes triggering event functions
////////////////////////////////////////////
function onChangeCVTTax() {
    var flag = $('#CVTTax').is(":checked");
    if (flag == true) {
        $("#ConstructedDiv").hide();
        var classification = $("#PropertyClassification").val();

        var classificationtext = $("#PropertyClassification").data("kendoDropDownList").text();
        var isConstructed = false;
        if (classificationtext == "Residential") {
            $("#ConstructedDiv").show();
            isConstructed = $('#IsConstructedCheck').is(":checked");
        }

        var amount = $("#Total_Amount").val().replace(/,/g, "");


        //if ($("#PropertyClassification").empty()) {
        //    initializeDropDown(base_url_service_layer + '/api/Proxy/Lookup/LookupByCategory?category=Land Classification', selectlandClassificationText, "PropertyClassification");
        //}


        $("#ClassficationFrom").show();
        /*if (classificationtext != "Residential")
        {
            $("#ClassficationFrom").show();
          
        }
        else {
            $("#ClassficationFrom").show();
        }*/
        var area = $("#ConstructedArea").val();
        //  var id = $("#TransactionName").val();

        if (amount != null && amount != ""
            && classification != null && classification != ""

            ) { // call AJAX call only when input parameters are not empty
            $.ajax({
                url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateCvt?totalamount=' + amount + "&classificationId=" + classification + "&constructedAreaInSqt=" + area + "&isConstructed=" + isConstructed,
                type: 'GET',
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    $("#Payable_CVT").val(returnCommas(data));
                    $("#Payable_CVT").removeClass("empty");
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                }
            });
        }
    }
    else {

        $("#ClassficationFrom").hide();
        $("#ConstructedDiv").hide();
        $("#Payable_CVT").val("");
        $("#Payable_CVT").removeClass("empty");
        $("#Payable_CVT").addClass("empty");
    }

}


function ConstructedCheckChanged() {
    var flag = $('#IsConstructedCheck').is(":checked");
    if (flag == true) {
        $("#AreaDiv").show();
    }
    else {
        $("#AreaDiv").hide();
    }
    onChangeCVTTax();
}

function RegistrationFeeChanged() {
    var flag = $('#RegitrationFeeCheck').is(":checked");
    if (flag == true) {
        var id = $("#Total_Amount").val().replace(/,/g, "");
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateRegistrationFee?totalAmount=' + id,
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                $("#Payable_Reg_Duty").val(returnCommas(data));
                $("#Payable_Reg_Duty").removeClass("empty");
            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');
            }
        });
    }
    else {
        $("#Payable_Reg_Duty").val("");
        $("#Payable_Reg_Duty").removeClass("empty");
        $("#Payable_Reg_Duty").addClass("empty");
    }
}

function addCommas(nStr) {

    $("#Total_Amount").val(returnCommas(nStr));
}
function validateAhleComission(nStr) {
    res2 = $('#ahleCommisionFeeinput').kendoValidator().data('kendoValidator').validate();
    if (!res2) {
        $("#ahleComissionAmountError").hide();
        return false;
    }
    var value = $("#ahleCommisionFeeinput").val();
    if (value != "" && value < 200) {
        $("#ahleCommisionFeeinput").kendoValidator().data("kendoValidator").hideMessages();
        $("#ahleComissionAmountError").html("<span class='k-icon k-warning' style='margin-right: 3px;'> </span> " + "Ahl-e-Comission Fee is not valid. Please enter amount greater than 200");
        $("#ahleComissionAmountError").show();
        return false;
    } else {
        $("#ahleComissionAmountError").hide();
    }
    return true;
}
function validateAhleComissionOld(nStr) {
    res2 = $('#ahleCommissionOld').kendoValidator().data('kendoValidator').validate();
    if (!res2) {
        $("#ahleComissionAmountErrorOld").hide();
        return false;
    }
    var value = $("#ahleCommissionOld").val();
    if (value != "" && value < 200) {
        $("#ahleCommissionOld").kendoValidator().data("kendoValidator").hideMessages();
        $("#ahleComissionAmountErrorOld").html("<span class='k-icon k-warning' style='margin-right: 3px;'> </span> " + "Ahl-e-Comission Fee is not valid. Please enter amount greater than 200");
        $("#ahleComissionAmountErrorOld").show();
        return false;
    } else {
        $("#ahleComissionAmountErrorOld").hide();
    }
    return true;
}
function addCommasGeneric(ParamObject) {
    //debugger;
    $("#" + $(ParamObject).attr("id")).val(returnCommas(ParamObject.value));
}

function addNoCommasGeneric(ParamObject) {
    //debugger;
    // $("#" + $(ParamObject).attr("id")).val(returnCommas(ParamObject.value));
}


function numberTest(v, m, e) {
    if (!bShowTests) return false;
    var oMask = new Mask(m, "number");

    writeOutput("<b>mask:</b> " + m);
    writeOutput("<b>string:</b> " + v);
    var n = oMask.format(v);
    if (e != n) document.write("<font color=red>");
    writeOutput("<b>result:</b> " + n);
    writeOutput("<b>expected:</b> " + e);
    if (e != n) document.write("</font>");
    writeOutput("<b>error:</b> " + ((oMask.error.length == 0) ? "n/a" : oMask.error.join("<br>")));
    writeOutput("");
    updateResults(oMask, v, e);
}
function updateResults(m, v, e) {
    if (m.value != e) {
        var i = oResults[m.type].length;
        oResults[m.type][i] = {
            "supplied": v,
            "value": m.value,
            "expected": e,
            "error": m.error.join("|"),
            "mask": m.mask
        };
    }
}

function fillForm() {
    $("#AgentName").val("Agent Sample Name");
    $('#AgentCnic').val('11111-1111111-1');
    $('#AgentCell').val('0321-1111111');
    $('#agentEmail').val('test@abc.com');



    obj = {
        PersonName: 'Test Person First',
        IsPrimary: true,
        person_type: 'indivisual',
        NTN: '-',
        IsThroughPowerOfAttorney: false,
        PersonCnic: '35201-12345670-8',
        PersonEmail: '',
        PersonAddress: 'Address 1',
        PersonPhone: '0321-1234567',
        RelationName: 'Test First',
        RelationId: 33,
        RelationString: 'S/O',
        NameString: 'Test Person First S/O Test First',
        IsPrimaryString: 'Yes'

    }

    SellerData.push(obj);

    $('#sellerGrid').data('kendoGrid').dataSource.data(SellerData);
    $('#sellerGrid').data('kendoGrid').refresh();
    $('#sellerGrid').show();
    ValidateSellerSection();

    var purchaser = {
        PersonName: 'Test Person Second',
        IsPrimary: true,
        NTN: '-',
        person_type: 'indivisual',
        IsThroughPowerOfAttorney: false,
        PersonCnic: '35201-12345670-8',
        PersonEmail: '',
        PersonAddress: 'Address 2',
        PersonPhone: '0321-1234567',
        RelationName: 'Test Second',
        RelationId: 33,
        RelationString: 'S/O',
        NameString: 'Test Person Second S/O Test Second',
        IsPrimaryString: 'Yes'

    }

    PurchaserData.push(purchaser);
    $('#purchaserGrid').data('kendoGrid').dataSource.data(PurchaserData);
    $('#purchaserGrid').data('kendoGrid').refresh();
    if (PurchaserData.length > 0)
        $('#purchaserGrid').show();
    ValidatePurchaserSection();

    $("#checkPerson").val("1");

}

function ViewChallanTypeDivs() {
    //ResetForm();
    var $radio = $('input[name=ChallanFromType]:checked');
    var id = $radio.attr('id');
    if (id == "GenerateNewChallan") {
        document.getElementById("searchHeading").innerHTML = ChallanDetails;
        $("#SearchChallanNo").hide();
        $("#SearchStampNo").hide();
        $("#ChallanDetailsValuesDiv").show();
        $("#AgentFormId").show();
        $("#PersonDivId").show();
        $("#DeedDetailsReadOnly").hide();
        $("#PersonDivIdReadOnly").hide();
        if (queryStringName == "GenerateChallanForOldRegistry" || queryStringName == "PayDeficiencyForOldRegistry") {
            $("#oldRegistryDetailsDiv").show();
        }
        else {
            $("#oldRegistryDetailsDiv").hide();
        }
        if (queryStringName == "PayDeficiencyForOldRegistry") {
            $("#dutiesCheckBox").hide();
        }
        else {
            $("#dutiesCheckBox").show();
        }
    }
    else if (id == "PayDeficient") {
        document.getElementById("searchHeading").innerHTML = SearcheStamp;
        $("#ChallanNoErrorDiv").hide();
        $('#ChallanNo').val("");
        $("#SearchStampNo").show();
        $("#StampNoErrorDiv").hide();
        $("#SearchChallanNo").hide();
        $("#ChallanDetailsValuesDiv").hide();
        $("#AgentFormId").hide();
        $("#PersonDivId").hide();
        $("#purposeOfChallanText").hide();
        $("#DeedDetailsReadOnly").hide();
        $("#PersonDivIdReadOnly").hide();
        $("#captchaDiv").hide();
    }
    else if (id == "MutationFee") {
        debugger;
        document.getElementById("searchHeading").innerHTML = SearchChallan;
        $("#ChallanNoErrorDiv").hide();
        $('#ChallanNo').val("");
        $("#SearchChallanNo").show();
        $("#SearchStampNo").hide();
        $("#ChallanDetailsValuesDiv").hide();
        $("#AgentFormId").hide();
        $("#PersonDivId").hide();
        $("#purposeOfChallanText").hide();
        $("#DeedDetailsReadOnly").hide();
        $("#PersonDivIdReadOnly").hide();
        $("#captchaDiv").hide();
    }
    else if (id == "RegFeeNew") {
        debugger;
        document.getElementById("searchHeading").innerHTML = SearchChallan;
        $("#ChallanNoErrorDiv").hide();
        $('#ChallanNo').val("");
        $("#SearchChallanNo").show();
        $("#SearchStampNo").hide();
        $("#ChallanDetailsValuesDiv").hide();
        $("#AgentFormId").hide();
        $("#PersonDivId").hide();
        $("#purposeOfChallanText").hide();
        $("#DeedDetailsReadOnly").hide();
        $("#PersonDivIdReadOnly").hide();
        $("#captchaDiv").hide();
    }
    else if (id == "ScanningFee") {
        debugger;
        document.getElementById("searchHeading").innerHTML = SearchChallan;
        $("#ChallanNoErrorDiv").hide();
        $('#ChallanNo').val("");
        $("#SearchChallanNo").show();
        $("#SearchStampNo").hide();
        $("#ChallanDetailsValuesDiv").hide();
        $("#AgentFormId").hide();
        $("#PersonDivId").hide();
        $("#purposeOfChallanText").hide();
        $("#DeedDetailsReadOnly").hide();
        $("#PersonDivIdReadOnly").hide();
        $("#captchaDiv").hide();
    }
    else {
        document.getElementById("searchHeading").innerHTML = SearchChallan;
        $("#ChallanNoErrorDiv").hide();
        $('#ChallanNo').val("");
        $("#SearchChallanNo").show();
        $("#SearchStampNo").hide();
        $("#ChallanDetailsValuesDiv").hide();
        $("#AgentFormId").hide();
        $("#PersonDivId").hide();
        $("#purposeOfChallanText").hide();
        $("#DeedDetailsReadOnly").hide();
        $("#PersonDivIdReadOnly").hide();
        $("#captchaDiv").hide();
    }
}

function SearchStampNo() {
    resetDeficientDeedScreen();
    var stampNo = $('#StampNo').val();
    if (stampNo == "") {
        $("#StampNoErrorDiv").show();
        document.getElementById("StampNoErrorDiv").innerHTML = eStampNumberisrequired;
        $("#StampNoErrorDiv").css("color", "red");
    }
    else {
        $("#StampNoErrorDiv").hide();
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/ChallanForm/SearchStampPayDeficient?StampNumber=' + stampNo,
            type: 'GET',
            success: function (data) {
                challanFromDB = data;

                $("#ChallanNoErrorDiv").hide();
                populateDefficientCaseData(data);

                $("#captchaDiv").show();


            },
            error: function (data) {
                $("#StampNoErrorDiv").show();
                document.getElementById("StampNoErrorDiv").innerHTML = data.responseJSON;
                $("#StampNoErrorDiv").css("color", "red");

                resetDeficiontForm();
            }
        });

    }

}

function hideAllDutiesCheckBox() {
    $("#CvtTaxDivDeficient").hide();
    $("#RegitrationFeeCheckDeficient").hide();
    $("#DeficientCVTDiv").hide();
    $("#DeficientRegistrationDiv").hide();
    $("#RegistryPagesFeeCheckboxDiv").hide();
}


// This function should only be called for searching of challan to Pay CVT, Registration or Comparison Fee
function SearchChallanNo() {
    //sdfssdf
    cvtDutyStatus = "";
    regFeeDutyStatus = "";
    defCvtDutyStatus = "";
    defRegFeeDutyStatus = "";
    var challanNo = $('#ChallanNo').val();
    if (challanNo == "") {
        $("#ChallanNoErrorDiv").show();
        document.getElementById("ChallanNoError").innerHTML = ChallanNumberisrequired;
        $("#ChallanNoError").css("color", "red");
    }
    else {
        $("#ChallanNoErrorDiv").hide();
        $("#purposeOfChallanTextErrorDeficient").hide();
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/ChallanForm/SearchChallan?SearchChallan&ChallanNo=' + challanNo,
            type: 'POST',
            success: function (data) {
                debugger;
                if (data.ChallanType == "Adhesive Stamp") {
                    //Hide Div:
                    $("#AgentFormId").hide();
                    $("#DeedDetailsReadOnly").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $('#sellerGridReadOnly').hide();
                    $('#purchaserGridReadOnly').hide();
                    $("#captchaDiv").hide();


                    $("#ChallanNoErrorDiv").show();
                    document.getElementById("ChallanNoError").innerHTML = AdhesiveChallanError;
                    $("#ChallanNoError").css("color", "red");
                }
                else if (data.ChallanType == "MutationFee") {
                    //Hide Div:
                    $("#AgentFormId").hide();
                    $("#DeedDetailsReadOnly").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $('#sellerGridReadOnly').hide();
                    $('#purchaserGridReadOnly').hide();
                    $("#captchaDiv").hide();


                    $("#ChallanNoErrorDiv").show();
                    document.getElementById("ChallanNoError").innerHTML = MutationChallanError;
                    $("#ChallanNoError").css("color", "red");
                }
                else if (data.ChallanType == "Scanning") {
                    //Hide Div:
                    $("#AgentFormId").hide();
                    $("#DeedDetailsReadOnly").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $('#sellerGridReadOnly').hide();
                    $('#purchaserGridReadOnly').hide();
                    $("#captchaDiv").hide();


                    $("#ChallanNoErrorDiv").show();
                    document.getElementById("ChallanNoError").innerHTML = ScanningChallanError;
                    $("#ChallanNoError").css("color", "red");
                }
                else if (data.ChallanType == "Registration Fee") {
                    //Hide Div:
                    $("#AgentFormId").hide();
                    $("#DeedDetailsReadOnly").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $('#sellerGridReadOnly').hide();
                    $('#purchaserGridReadOnly').hide();
                    $("#captchaDiv").hide();


                    $("#ChallanNoErrorDiv").show();
                    document.getElementById("ChallanNoError").innerHTML = "Given Challan is of Registration Type";
                    $("#ChallanNoError").css("color", "red");
                }

                else if (circleName == "RegFeeNew" && (data.isRegistryFeeCheck == false || data.ChallanType != "New")) {

                    $("#AgentFormId").hide();
                    $("#DeedDetailsReadOnly").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $('#sellerGridReadOnly').hide();
                    $('#purchaserGridReadOnly').hide();
                    $("#captchaDiv").hide();

                    $("#ChallanNoErrorDiv").show();
                    document.getElementById("ChallanNoError").innerHTML = "Registration Fee Not Applicable on this Challan Type";
                    $("#ChallanNoError").css("color", "red");
                }
                else if (data.ChallanType == "Stamp Vendor") {
                    //Hide Div:
                    $("#AgentFormId").hide();
                    $("#DeedDetailsReadOnly").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $('#sellerGridReadOnly').hide();
                    $('#purchaserGridReadOnly').hide();
                    $("#captchaDiv").hide();


                    $("#ChallanNoErrorDiv").show();
                    document.getElementById("ChallanNoError").innerHTML = StampVendorChallanError;
                    $("#ChallanNoError").css("color", "red");
                } else if (data.ChallanType == "Low_Denomination_Stamps") {
                    //Hide Div:
                    $("#AgentFormId").hide();
                    $("#DeedDetailsReadOnly").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $('#sellerGridReadOnly').hide();
                    $('#purchaserGridReadOnly').hide();
                    $("#captchaDiv").hide();


                    $("#ChallanNoErrorDiv").show();
                    document.getElementById("ChallanNoError").innerHTML = LowDenominationChallanError;
                    $("#ChallanNoError").css("color", "red");
                }
                else if (data.ChallanType == "PLRA Challan") {
                    //Hide Div:
                    $("#AgentFormId").hide();
                    $("#DeedDetailsReadOnly").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $('#sellerGridReadOnly').hide();
                    $('#purchaserGridReadOnly').hide();
                    $("#captchaDiv").hide();


                    $("#ChallanNoErrorDiv").show();
                    document.getElementById("ChallanNoError").innerHTML = PLRAChallanError;
                    $("#ChallanNoError").css("color", "red");
                }
                else if (data.ChallanType == "Copying Fee") {
                    //Hide Div:
                    $("#AgentFormId").hide();
                    $("#DeedDetailsReadOnly").hide();
                    $("#PersonDivIdReadOnly").hide();
                    $('#sellerGridReadOnly').hide();
                    $('#purchaserGridReadOnly').hide();
                    $("#captchaDiv").hide();


                    $("#ChallanNoErrorDiv").show();
                    document.getElementById("ChallanNoError").innerHTML = CopyingFeeChallanError;
                    $("#ChallanNoError").css("color", "red");
                } else {
                    if (data.isOldRegistryChallan != null && data.isOldRegistryChallan == true) {
                        data.isParentChallanOldReg = true;
                        data.isOldRegistryChallan = false;
                        data.oldRegistryDate = "";
                        data.oldRegistryNumber = "";
                    }
                    challanFromDB = data;
                    $("#ChallanNoErrorDiv").hide();
                    populateDefficientCaseData(data);
                    $("#captchaDiv").show();
                }

                //if (data.ChallanStatus != challanPaidStatus || data.ChallanStatus != challanRefundCancelled) {
                //    hideAllDutiesCheckBox();
                //    $("#RegistryPagesFeeCheckboxDiv").show();
                //}

            },
            error: function (data) {
                $("#ChallanNoErrorDiv").show();
                document.getElementById("ChallanNoError").innerHTML = data.responseJSON;
                $("#ChallanNoError").css("color", "red");
                if (data.ChallanType != "Adhesive Stamp") {
                    resetDeficiontForm();
                }
            }
        });

    }

}



var transectionIdPayCVTandReg;

function showHideCVTandRegistrationCheckBoxesDeficient(Challandata) {
    $("#CvtTaxDivDeficient").hide();
    $("#DeficientCVTDiv").hide();
    $("#RegistrationFeeDivDeficient").hide();
    $("#DeficientRegistrationDiv").hide();
    transectionIdPayCVTandReg = Challandata.DeedNameId;
    if (transectionIdPayCVTandReg == exchangeOfPropertyDeedId) {
        isExchangeOfProperty = true;
    }
    else {
        isExchangeOfProperty = false;
    }
    updateIsLegalHeirPayCVTAndReg(transectionIdPayCVTandReg);
    showLegalHeir();
    if (Challandata.ChallanStatus == challanPaidStatus || Challandata.ChallanStatus == challanRefundCancelled || Challandata.ChallanStatus == challanRefundInitiated || Challandata.ChallanStatus == challanRefundCompleted) {
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/ChallanForm/IsCVTandRegistrationPaid?ChallanNumber=' + Challandata.ChallanNumber,
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                if (!(cvtDutyStatus == challanRefundInitiated || defCvtDutyStatus == challanRefundInitiated)) {
                    // Check for CVT if its is paid or not
                    //if (data[0] == true && (cvtDutyStatus == "-" || cvtDutyStatus == "" || cvtDutyStatus == challanRefundCancelled || cvtDutyStatus == challanPaidStatus) ) {
                    //    $("#CvtTaxDivDeficient").hide();
                    //    $("#CVTTaxDeficient").prop('checked', false);
                    //    $("#DeficientCVTDiv").show();
                    //} else if (cvtDutyStatus == challanRefundCompleted || cvtDutyStatus == "-" || cvtDutyStatus == ""){
                    //    $("#DeficientCVTDiv").hide();
                    //    $("#DeficientCVT").prop('checked', false);
                    //    if (isCVTApplicable == true) {
                    //        $("#CvtTaxDivDeficient").show();
                    //    } else {
                    //        $("#CvtTaxDivDeficient").hide();
                    //    }
                    //}
                    if (data[0] == true && (cvtDutyStatus == "-" || cvtDutyStatus == "" || cvtDutyStatus == challanRefundCancelled || cvtDutyStatus == challanPaidStatus)) {
                        $("#CvtTaxDivDeficient").hide();
                        $("#CVTTaxDeficient").prop('checked', false);
                        $("#DeficientCVTDiv").show();
                    }
                }

                if (!(regFeeDutyStatus == challanRefundInitiated || defRegFeeDutyStatus == challanRefundInitiated)) {
                    // Cehck for reg fee if it is paid or not
                    //if (data[1] == true && (regFeeDutyStatus == "" || regFeeDutyStatus == "-" || regFeeDutyStatus == challanRefundCancelled || regFeeDutyStatus == challanPaidStatus )) {
                    //    $("#RegistrationFeeDivDeficient").hide();
                    //    $("#RegitrationFeeCheckDeficient").prop('checked', false);
                    //    $("#DeficientRegistrationDiv").show();
                    //} else if (regFeeDutyStatus == challanRefundCompleted || regFeeDutyStatus == "" || regFeeDutyStatus == "-") {
                    //    $("#DeficientRegistrationDiv").hide();
                    //    $("#DeficientRegistration").prop('checked', false);
                    //    if (isRegFeeApplicable == true) {
                    //        $("#RegistrationFeeDivDeficient").show();
                    //    } else {
                    //        $("#RegistrationFeeDivDeficient").hide();
                    //    }
                    //}

                    if (data[1] == true && (regFeeDutyStatus == "" || regFeeDutyStatus == "-" || regFeeDutyStatus == challanRefundCancelled || regFeeDutyStatus == challanPaidStatus)) {
                        $("#RegistrationFeeDivDeficient").hide();
                        $("#RegitrationFeeCheckDeficient").prop('checked', false);
                        $("#DeficientRegistrationDiv").show();
                    }
                }

            },
            error: function (data) {

            }
        });
    }
}

function populateDefficientCaseData(data) {
    $("#AgentFormId").show();
    $("#DeedDetailsReadOnly").show();
    $("#PersonDivIdReadOnly").show();
    $("#DistrictReadOnly").val(data.DistrictString);
    $("#TehsilReadOnly").val(data.TalukaString);
    $("#StampPaperTypeReadOnly").val(data.TransactionTypeString);
    document.getElementById("TransactionNameReadOnly").innerHTML = data.TransactionNameString;


    //calculating indexes of cvt and regfee duties if they exist in the list
    if (data.ChallandDutyStatuses != null && data.ChallandDutyStatuses.LstDutyStatus > 1) {
        for (var index = 0 ; index < data.ChallandDutyStatuses.LstDutyStatus.length; index++) {
            if (data.ChallandDutyStatuses.LstDutyStatus[index].Key == "CVT") {
                cvtDutyStatus = data.ChallandDutyStatuses.LstDutyStatus[index].Value;
            }
            else if (data.ChallandDutyStatuses.LstDutyStatus[index].Key == RegistrationFee) {
                regFeeDutyStatus = data.ChallandDutyStatuses.LstDutyStatus[index].Value;
            }
            else if (data.ChallandDutyStatuses.LstDutyStatus[index].Key == DeficientCVT) {
                defCvtDutyStatus = data.ChallandDutyStatuses.LstDutyStatus[index].Value;
            }
            else if (data.ChallandDutyStatuses.LstDutyStatus[index].Key == DeficientRegistrationFee) {
                defRegFeeDutyStatus = data.ChallandDutyStatuses.LstDutyStatus[index].Value;
            }
        }
    }



    //$("#TransactionNameReadOnly").val(data.TransactionNameString);
    if (queryStringName != "PayCVTandReg" || queryStringName != "PayCVTandRegT" || queryStringName != "MutationFee" || queryStringName != "RegFeeNew") {
        $("#dutiesCheckBoxDeficient").hide();
        updateDCValuationAndCVTFlagDeficient(data);
    }

    else {
        updateDCValuationAndCVTFlagDeficient(data); //check if cvt or registration is applicable on the deed $("#dutiesCheckBoxDeficient").show();
    }
    if (queryStringName == "PayCVTandReg" || queryStringName == "PayCVTandRegT" || queryStringName == "MutationFee") {
        if (data.TransactionName == exchangeOfPropertyDeedId && data.isMultiplePropertiesExchageOfProperty) {
            $('#multiplePropertiesExchangeOfPropertyCheckboxPayCVTRegDiv').show();
        }
        else {
            $('#multiplePropertiesExchangeOfPropertyCheckboxPayCVTRegDiv').hide();
        }
    }
    else {
        $('#multiplePropertiesExchangeOfPropertyCheckboxPayCVTRegDiv').hide();
    }

    $("#AgentName").val(data.AgentName);
    $("#AgentName").focus();
    $("#AgentCnic").data("kendoMaskedTextBox").value(data.AgentCnic);
    $("#AgentCell").data("kendoMaskedTextBox").value(data.AgentCell);
    $("#agentEmail").val(data.AgentEmail);
    if (data.DeedNameId == 83) {

        data.AgentDesignation = data.AgentEmail;
        $("#agentEmail").val("");
    }

    Party1Label = data.FirstPartyLabel;
    Party2Label = data.SecondPartyLabel;

    if (data.TransactionTypeString == "Judicial") {
        document.getElementById("sellerLabelReadOnly").innerHTML = Party2Label + " Information";
        document.getElementById("purchaserLabelReadOnly").innerHTML = Party1Label + " Information";
    } else {
        document.getElementById("sellerLabelReadOnly").innerHTML = Party2Label + " Information";
        document.getElementById("purchaserLabelReadOnly").innerHTML = Party1Label + " Information";
    }

    $("#sellerGridReadOnly").empty();
    $("#purchaserGridReadOnly").empty();
    initilizeReadOnlyPersonGrids();


    //////////////////////////////////////////////////////////////

    var party1DataList = [];

    for (i = 0; i < data.Party1.length; i++) {
        var isPrimary = "";
        if (data.Party1[i].IsPrimary == true)
        { isPrimary = "Yes"; }
        else
        { isPrimary = "No"; }

        var isThroughPowerOfAttorney = "";
        if (data.Party1[i].IsThroughPowerOfAttorney == true)
        { isThroughPowerOfAttorney = "Yes"; }
        else
        { isThroughPowerOfAttorney = "No"; }

        var overseaesFlag = "";
        if (data.Party1[i].IsOverseas == true)
        { overseaesFlag = "Yes"; }
        else
        { overseaesFlag = "No"; }
        debugger;
        var party1data =
    {

        NameString: data.Party1[i].NameString,
        PersonCnic: data.Party1[i].PersonCnic,
        NTN: data.Party1[i].NTN,
        PersonPhone: data.Party1[i].PersonPhone,
        IsPrimary: isPrimary,
        PersonAddress: data.Party1[i].PersonAddress,
        PersonEmail: data.Party1[i].PersonEmail,
        IsThroughPowerOfAttorney: isThroughPowerOfAttorney,
        IsOverseas: data.Party1[i].IsOverseas,
        PersonPassport: data.Party1[i].PersonPassport,
        PersonNameAttorneyProvider: data.Party1[i].PersonNameAttorneyProvider,
        PersonCnincPassportAttorneyProvider: data.Party1[i].PersonCnincPassportAttorneyProvider,

    }

        party1DataList.push(party1data);
    }




    var party2DataList = [];

    for (i = 0; i < data.Party2.length; i++) {
        var isPrimary = "";
        if (data.Party2[i].IsPrimary == true)
        { isPrimary = "Yes"; }
        else
        { isPrimary = "No"; }

        var isThroughPowerOfAttorney = "";
        if (data.Party2[i].IsThroughPowerOfAttorney == true)
        { isThroughPowerOfAttorney = "Yes"; }
        else
        { isThroughPowerOfAttorney = "No"; }


        var overseaesFlag = "";
        if (data.Party2[i].IsOverseas == true)
        { overseaesFlag = "Yes"; }
        else
        { overseaesFlag = "No"; }
        debugger;

        var party2data =
    {

        NameString: data.Party2[i].NameString,
        PersonCnic: data.Party2[i].PersonCnic,
        NTN: data.Party2[i].NTN,
        PersonPhone: data.Party2[i].PersonPhone,
        IsPrimary: isPrimary,
        PersonAddress: data.Party2[i].PersonAddress,
        PersonEmail: data.Party2[i].PersonEmail,
        IsThroughPowerOfAttorney: isThroughPowerOfAttorney,
        IsOverseas: data.Party2[i].IsOverseas,
        PersonPassport: data.Party2[i].PersonPassport,
        PersonNameAttorneyProvider: data.Party2[i].PersonNameAttorneyProvider,
        PersonCnincPassportAttorneyProvider: data.Party2[i].PersonCnincPassportAttorneyProvider,

    }

        party2DataList.push(party2data);
    }





    //////////////////////////////////////////////

    $('#purchaserGridReadOnly').data('kendoGrid').dataSource.data(party1DataList);
    $('#purchaserGridReadOnly').data('kendoGrid').refresh();

    $('#purchaserGridReadOnly').show();
    $('#purchaserSectionErrorReadOnly').hide();
    $('#sellerGridReadOnly').data('kendoGrid').dataSource.data(party2DataList);
    $('#sellerGridReadOnly').data('kendoGrid').refresh();

    $('#sellerSectionErrorReadOnly').hide();
    // For Franking Maching Defecinecy Challan. 


    if (data.DeedNameId == 83) {
        $("#FirstPartyDiv").hide();
        $("#AgentEmailDiv").hide();
    } else {
        $("#FirstPartyDiv").show();
        $("#AgentEmailDiv").show();
    }



    //document.getElementById("SellerStampLabel").innerHTML = "Defendant";
    if (challan != null)
        challan.isParentNewChallan = data.isParentNewChallan != null ? data.isParentNewChallan : false;

}


function initilizeReadOnlyPersonGrids() {
    $("#sellerGridReadOnly").kendoGrid({
        dataSource: {
            data: SellerData,
            schema: {
                model: {
                    fields: {
                        NameString: { type: "string" },
                        PersonCnic: { type: "string" },
                        NTN: { type: "string" },
                        PersonPhone: { type: "string" },
                        IsPrimary: { type: "string" },
                        PersonEmail: { type: "string" }
                    }
                }
            },
            pageSize: 60
        },

        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false,
        columns: [
             { field: "NameString", title: Name, headerAttributes: { style: "white-space: normal" }, width: "300px" },
            { field: "PersonCnic", title: CNIC, width: "200px" },
            { field: "NTN", title: 'NTN', width: "200px" },
           { field: "PersonPhone", title: Contact, width: "200px" },
           { field: "IsPrimary", title: "Primary " + Party2Label, width: "350px" },
           {
               command: {
                   text: "",
                   imageClass: "fa fa-eye",
                   className: "view-btn-center-adjustment",
                   name: "details",
                   click: sellerDetailsAddChallan
               }, title: " ", width: "50px"
           }
        ]
    });

    function sellerDetailsAddChallan(d) {
        var grid = $('#sellerGridReadOnly').data("kendoGrid");
        d.preventDefault();
        var dataItem = this.dataItem($(d.currentTarget).closest("tr"));

        if (dataItem.IsOverseas == true) {
            $("#PassportLabelSeller").show();
            $("#sellerPassportText").show();
            document.getElementById("sellerPassportText").innerHTML = dataItem.PersonPassport;
            $("#SellerNTNLabel").hide();
            $("#sellerNTNText").hide();
            $("#CNINLabbel").hide();
            $("#sellerCNICText").hide();
        }
        else {
            if (dataItem.PersonCnic == '--') {
                $("#CNINLabbel").hide();
                $("#sellerCNICText").hide();
                $("#SellerNTNLabel").show();
                $("#sellerNTNText").show();
                document.getElementById("sellerNTNText").innerHTML = dataItem.NTN;
                $("#SellerNTNLabel").show();
                $("#sellerNTNText").show();


            }
            else {
                $("#CNINLabbel").show();
                $("#sellerCNICText").show();
                $("#SellerNTNLabel").hide();
                $("#sellerNTNText").hide();
                document.getElementById("sellerCNICText").innerHTML = dataItem.PersonCnic;
            }
        }



        document.getElementById("sellerNameText").innerHTML = dataItem.NameString;
        document.getElementById("sellerCNICText").innerHTML = dataItem.PersonCnic;
        document.getElementById("sellerContactText").innerHTML = dataItem.PersonPhone;
        document.getElementById("sellerAddressText").innerHTML = dataItem.PersonAddress;
        if (dataItem.PersonEmail == null || dataItem.PersonEmail == "") {
            $('#party2email').hide();
        } else {
            document.getElementById("sellerEmailText").innerHTML = dataItem.PersonEmail;
        }
        if (dataItem.IsPrimary == null || dataItem.IsPrimary == "" || dataItem.IsPrimary == "No") {
            document.getElementById("sellerPrimaryText").innerHTML = "No";
        } else {
            document.getElementById("sellerPrimaryText").innerHTML = "Yes";
        }
        if (dataItem.IsThroughPowerOfAttorney == null || dataItem.IsThroughPowerOfAttorney == "" || dataItem.IsThroughPowerOfAttorney == "No") {
            document.getElementById("sellerThroughAttorneyText").innerHTML = "No";
        } else {
            document.getElementById("sellerThroughAttorneyText").innerHTML = "Yes";
        }



        if (dataItem.PersonPhone == null || dataItem.PersonPhone == "") {
            document.getElementById("sellerContactText").innerHTML = "--";
        } else {
            document.getElementById("sellerContactText").innerHTML = dataItem.PersonPhone;
        }
        if (dataItem.PersonCnic == null || dataItem.PersonCnic == "") {
            document.getElementById("sellerCNICText").innerHTML = "--";
        } else {
            document.getElementById("sellerCNICText").innerHTML = dataItem.PersonCnic;
        }
        document.getElementById("sellerAddressText").innerHTML = dataItem.PersonAddress;
        if (dataItem.PersonEmail == null || dataItem.PersonEmail == "") {
            $('#party2email').hide();
        } else {
            $('#party2email').show();
            //document.getElementById("").innerHTML = dataItem.PersonEmail;
            document.getElementById("sellerEmailText").innerHTML = dataItem.PersonEmail;
        }
        if (dataItem.IsPrimary == null || dataItem.IsPrimary == "") {
            document.getElementById("sellerPrimaryText").innerHTML = "No";
        } else {
            document.getElementById("sellerPrimaryText").innerHTML = "Yes";
        }
        if (dataItem.IsThroughPowerOfAttorney == null || dataItem.IsThroughPowerOfAttorney == "") {
            document.getElementById("sellerThroughAttorneyText").innerHTML = "No";
        } else {
            document.getElementById("sellerThroughAttorneyText").innerHTML = "Yes";
            $("#AtorenyDetailTitleDivSeller").show();
            $("#AtorenyDetailTextDivSeller").show();
            document.getElementById("purchaserAttorneyProviderNameTextSeller").innerHTML = dataItem.PersonNameAttorneyProvider;
            document.getElementById("purchaserAttorneyProviderCnicTextSeller").innerHTML = dataItem.PersonCnincPassportAttorneyProvider;


        }


        $("#sellerDetailedWindow").data("kendoWindow").title(Party2Label).center().open();

    }

    $("#purchaserGridReadOnly").kendoGrid({
        dataSource: {
            data: PurchaserData,
            schema: {
                model: {
                    fields: {
                        NameString: { type: "string" },
                        PersonCnic: { type: "string" },
                        NTN: { type: "string" },
                        PersonPassport: { type: "string" },
                        PersonPhone: { type: "string" },
                        IsPrimary: { type: "string" },
                        PersonEmail: { type: "string" },
                        PersonNameAttorneyProvider: { type: "string" },
                        PersonCnincPassportAttorneyProvider: { type: "string" },
                    }
                }
            },
            pageSize: 60
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false,
        columns: [
           { field: "NameString", title: Name, headerAttributes: { style: "white-space: normal" }, width: "300px" },
            { field: "PersonCnic", title: CNIC, width: "200px" },
            { field: "NTN", title: 'NTN', width: "200px" },
           { field: "PersonPhone", title: Contact, width: "200px" },
           { field: "IsPrimary", title: "Primary " + Party1Label, width: "350px" },
           {
               command: {
                   text: "",
                   imageClass: "fa fa-eye",
                   className: "view-btn-center-adjustment",
                   name: "details",
                   click: purchaserDetailsAddChallan
               }, title: " ", width: "50px"
           }
        ]
    });

    function purchaserDetailsAddChallan(d) {
        debugger;
        var grid = $('#purchaserGridReadOnly').data("kendoGrid");
        d.preventDefault();
        var dataItem = this.dataItem($(d.currentTarget).closest("tr"));

        document.getElementById("purchaserNameText").innerHTML = dataItem.NameString;


        if (dataItem.IsOverseas == true) {
            $("#PassportLabelPurchaser").show();
            $("#purchaserPassportText").show();
            document.getElementById("purchaserPassportText").innerHTML = dataItem.PersonPassport;
            $("#NTNLabelPurchaser").hide();
            $("#purchaserNTNText").hide();
            $("#CNINLabbelPurchaser").hide();
            $("#purchaserCNICText").hide();
        }
        else {
            if (dataItem.PersonCnic == '--' && dataItem.IsOverseas != true) {
                $("#CNINLabbelPurchaser").hide();
                $("#purchaserCNICText").hide();

                $("#NTNLabelPurchaser").show();
                $("#purchaserNTNText").show();

                document.getElementById("purchaserNTNText").innerHTML = dataItem.NTN;

            }
            else {
                $("#CNINLabbelPurchaser").show();
                $("#purchaserCNICText").show();
                $("#NTNLabelPurchaser").hide();
                $("#purchaserNTNText").hide();
                document.getElementById("purchaserCNICText").innerHTML = dataItem.PersonCnic;
            }
        }


        document.getElementById("purchaserCNICText").innerHTML = dataItem.PersonCnic;
        document.getElementById("purchaserContactText_new").innerHTML = dataItem.PersonPhone;
        document.getElementById("purchaserAddressText_new").innerHTML = dataItem.PersonAddress;
        if (dataItem.PersonEmail == null || dataItem.PersonEmail == "") {
            $('#party1email').hide();
        } else {
            document.getElementById("purchaserEmailText").innerHTML = dataItem.PersonEmail;
        }
        if (dataItem.IsPrimary == null || dataItem.IsPrimary == "" || dataItem.IsPrimary == "No") {
            document.getElementById("purchaserPrimaryText").innerHTML = "No";
        } else {
            document.getElementById("purchaserPrimaryText").innerHTML = "Yes";
        }
        if (dataItem.IsThroughPowerOfAttorney == null || dataItem.IsThroughPowerOfAttorney == "") {
            document.getElementById("purchaserThroughAttorneyText").innerHTML = "No";
        } else {
            document.getElementById("purchaserThroughAttorneyText").innerHTML = "Yes";

            $("#AtorenyDetailTitleDivPurchaser").show();
            $("#AtorenyDetailTextDivPurchaser").show();
            document.getElementById("purchaserAttorneyProviderNameTextPurchaser").innerHTML = dataItem.PersonNameAttorneyProvider;
            document.getElementById("purchaserAttorneyProviderCnicTextPurchaser").innerHTML = dataItem.PersonCnincPassportAttorneyProvider;

        }

        $("#purchaserDetailedWindow").data("kendoWindow").title(Party1Label).center().open();

    }

}

function resetDeficiontForm() {


    // ResetForm();

    //  $("#ChallanNoErrorDiv").hide();
    var $radio = $('input[name=ChallanFromType]:checked');

    var id = $radio.attr('id');

    if (id == "PayCVTandRegFee") {
        $("#SearchChallanNo").show();
    } else if (id == "PayDeficient") {
        $("#SearchStampNo").show();
    }


    ResetTextBox("AgentName");
    ResetTextBox("AgentCnic");
    ResetTextBox("AgentCell");
    ResetTextBox("agentEmail");


    $("#purchaserGridReadOnly").data('kendoGrid').dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
    $("#sellerGridReadOnly").data('kendoGrid').dataSource.sync()

    initilizeReadOnlyPersonGrids();

    $("#DistrictReadOnly").val("");

    $("#TehsilReadOnly").val("");

    $("#StampPaperTypeReadOnly").val("");
    //$("#TransactionNameReadOnly").val("");

    document.getElementById("TransactionNameReadOnly").innerHTML = "";

    $("#AgentFormId").hide();
    $("#DeedDetailsReadOnly").hide();

    $("#PersonDivIdReadOnly").hide();


}



////// Deed Details for Deficient Screen/////////

function showOrHideLeaseFields() {
    var deedid = $("#TransactionName").val();

    //if (deedid == AdvanceMoneyDeedId) 
    //{
    //    $("#AdvanceMoneyDivDeedDetailsGenerateChallan").show();
    //}
    //else{

    //    $("#AdvanceMoneyDivDeedDetailsGenerateChallan").hide();

    //}

    //if (deedid == PremiumDeedId) {
    //    $("#NewPremiumDiv").show();
    //}
    //else {

    //    $("#NewPremiumDiv").hide();

    //}
}

function initializeDynamicToolTips() {

    //$("#tooltip_PropertyValuationPayCVTandReg").data("kendoTooltip").destroy();
    //$("#tooltip_PropertyValuation").data("kendoTooltip").destroy();
    $("#tooltip_PropertyValuationDeficient").data("kendoTooltip").destroy();

    //$("#tooltip_PropertyValuationPayCVTandReg").kendoTooltip({
    //    content: "",
    //    position: "top"
    //});
    //$("#tooltip_PropertyValuation").kendoTooltip({
    //    content: "",
    //    position: "top"
    //});
    //$("#tooltip_PropertyValuationDeficient").kendoTooltip({
    //    content: "",
    //    position: "top"
    //});
}

function IsCVTApplied(deedid) {


}

function OnNextFirstScreen() {
    var deedid = $("#TransactionName").val();
    if (deedid == agreementRelatingtoDeposit6ai) {
        $("#tooltip_TotalAmountGenerateChallan").kendoTooltip({
            content: "Required. Declared Loan Amount on which stamp duty is to be calculated",
            position: "top"
        });
    }
    initializeDynamicToolTips();
    $("#tooltip_PropertyValuationPayCVTandReg").kendoTooltip({
        content: challan.AmountLabelText,
        position: "top"
    });
    $("#tooltip_PropertyValuation").kendoTooltip({
        content: challan.AmountLabelText,
        position: "top"
    });
    $("#tooltip_PropertyValuationDeficient").kendoTooltip({
        content: challan.AmountLabelText,
        position: "top"
    });
    //resetGenerateChallanDeedScreen();
    var $radio = $('input[name=ChallanFromType]:checked');
    var id = $radio.attr('id');
    deficientCVTDivVisible = $('#DeficientCVTDiv').is(":visible");
    deficientRegisDivVisible = $('#DeficientRegistrationDiv').is(":visible");

    $("#challanform").hide();
    $("#stampErrorMessage").hide();
    $("#stampErrorMessageForJudicial").hide();
    if (id == "GenerateNewChallan") {
        if (queryStringName == "GenerateChallanForOldRegistry") {
            isCVTApplicable = false;
            challan.applyStampDuty = false;
            ShowDeedDetailsGenerateChallanForOldReg();
        }
        else if (queryStringName == "PayDeficiencyForOldRegistry") {
            $("#DeedDetailsForGenerateChallan").hide();
            $("#DeedDetailsForDeficient").show();
            ShowDeedDetailsDeficient();
        }
        else {
            removeArrowBarFirstScreen();
            updateIsLeasePeriod();
            //showLeasePeriod();
            //showOrHideLeaseFields();
            updateIsTotalLeaseMoney();
            //showTotalLeaseMoney();
            // Check CVT Applicable
            // IsCVTApplied(deedid)
            var isCVTCheckBox = $('#CVTTax').is(":checked");
            if (isCVTCheckBox)
                isCVTApplicable = true;

            if (!areDeedDetailsFieldsCreated) {
                if (deedAmountsModel.DeedAmounts.length > 0) {
                    var checkForSecondProperty = false;

                    numberOfAmounts = deedAmountsModel.DeedAmounts.length;
                    addFields(deedAmountsModel, deedAmountsModel.DeedAmounts, deedid, isCVTCheckBox, checkForSecondProperty);
                    if (isExchangeOfProperty) {
                        checkForSecondProperty = true;
                        addFields(deedAmountsModel, deedAmountsModel.DeedAmounts, deedid, isCVTCheckBox, checkForSecondProperty);
                    }
                }
            }
            // var isGiftDeedInheritence = false; // $('#inheritenceGiftDeedCheckbox').is(":checked");//StampDutyCheck
            //if (challan.TransactionName == GiftDeedId ) {
            //challan.applyStampDuty = false;  
            //}
            //else
            //          {
            if (deedid != oralMutationDeedId && deedid != cvtRegistrationDeedId) {
                challan.applyStampDuty = true;
            }
            else {
                challan.applyStampDuty = false;
            }
            //        }
            challan.applyStampDutyForGiftDeed = $('#exemptStampDutyGiftDeedCheckbox').is(":checked");
            challan.exemptStampDuty = $('#exemptStampDutyGiftDeedCheckbox').is(":checked");
            challan.isHousingSocietyInvolved = $('#isHousingSocietyInvolvedCheckbox').is(":checked");
            //  document.getElementById("propertyValueLabelDeedName").innerHTML = TotalAmountLabel;
            //$("#PropertyValuationGenerateChallan").attr("placeholder", TotalAmountLabel);
            $("#PropertyValuationGenerateChallan").attr("name", TotalAmountLabel);
            //$("#PropertyValuationGenerateChallanSecond").attr("placeholder","Second " +TotalAmountLabel);
            $("#AmountOfConsiderationGenerateChallan").attr("placeholder", TotalAmountLabel);
            if (isExchangeOfProperty == true) {
                $("#DeedDetailsForGenerateChallanFormNonJudicialSecondDiv").show();
                $("#constructedStructureValueDivSecond").show();
                document.getElementById('propertyAddressDeedDetailsGenerateChallan').innerHTML = FirstPartyPropertysAddress;
                document.getElementById('propertyAddressSecondDeedDetailsGenerateChallan').innerHTML = SecondPartyPropertysAddress;
            }
            else {
                $("#DeedDetailsForGenerateChallanFormNonJudicialSecondDiv").hide();
                $("#constructedStructureValueDivSecond").hide();
                document.getElementById('propertyAddressDeedDetailsGenerateChallan').innerHTML = PropertyAddress;
                //document.getElementById('propertyAddressSecondDeedDetailsGenerateChallan').innerHTML = 'Second Property Address';
            }
            $("#DeedDetailsForGenerateChallan").show();
            if (deedid == "Judicial") {
                $("#StampDutyAndRegistrationGenerateChallanDiv").hide();
            }
            $("#DeedDetailsForDeficient").hide();
            if (isFixedStamp == true) {
                $("#payableStampDutyGenerateChallan").val(returnCommas(FixedStampValue));
                $("#payableStampDutyGenerateChallan").removeClass("empty")
            }
            else {
                $("#payableStampDutyGenerateChallan").val("");
                if (deedid != oralMutationDeedId && deedid != cvtRegistrationDeedId) {
                    calculateStampDutyDeedDetail();
                }
            }
            // CHeck Registration Flag set in db
            // IsRegistrationApplied(deedid)
            var isRegChecked = $('#RegitrationFeeCheck').is(":checked");
            if (isRegChecked == true) {
                if (isFixedRegistration == true) {
                    $("#registrationFeeGenerateChallan").val(returnCommas(FixedRegistrationValue));
                    $("#registrationFeeGenerateChallan").removeClass("empty")
                }
                else {
                    $("#registrationFeeGenerateChallan").val("");
                    calculateRegistrationFeeDeedDetail();
                }
            }
            ShowDeedDetailsGenerateChallan();
            removeArrowBar();
            createArrowBar();
        }
    }
    else if (id == "PayDeficient") {
        $("#DeedDetailsForGenerateChallan").hide();
        $("#DeedDetailsForDeficient").show();
        ShowDeedDetailsDeficient();

    } else { //for pay cvt and registration fee
        deedid = challan.TransactionName;
        updateIsLeasePeriod();
        ResetTextBox("registrationFeePayCVTandRegDeficient");
        ResetTextBox("PayCVTValueDeficient");
        $("#DeedDetailsForGenerateChallan").hide();
        cvtCheck = $('#CVTTaxDeficient').is(":checked");
        deficientCvtCheck = $('#DeficientCVT').is(":checked");
        regCheck = $('#RegitrationFeeCheckDeficient').is(":checked");
        deficientRegCheck = $('#DeficientRegistration').is(":checked");
        isRegistryFeeCheck = $('#registryFeeCheckbox').is(":checked");
        isAhleCommissionFeeCheck = $('#ahleCommissionFeeCheckbox').is(":checked");
        if (circleName == 'PayCVTandRegT') {
            DigitalScaningFee = true;
            challan.DigitalScaningFee = true;
        }
        if (circleName == 'MutationFee') {
            MutationFee = true;
            challan.MutationFee = true;
        }
        if (circleName == 'RegFeeNew') {
            RegFeeNew = true;
            challan.applyRegistrationDuty = true;
            challan.isRegChecked = true;
            isRegistryFeeCheck = true;
            challan.RegFeeNew = true;
        }

        if (regCheck == true) {
            $('#RegitrationFeeCheck').prop('checked', true);
            challan.applyRegistrationDuty = true;
        } else {
            $('#RegitrationFeeCheck').prop('checked', false);
            challan.applyRegistrationDuty = false;
        }
        if (deficientRegCheck == true) {
            challan.applyDeficientRegistration = true;
            document.getElementById("RegHeadingPayCVTandRegDeedDetails").innerHTML = DeficientRegistrationFee;
            document.getElementById("registrationPayCVTRegHeading").innerHTML = DeficientRegistrationFee;
            challan.applyRegistrationDuty = false;
        } else {
            document.getElementById("RegHeadingPayCVTandRegDeedDetails").innerHTML = RegistrationFee;
            document.getElementById("registrationPayCVTRegHeading").innerHTML = RegistrationFee;
        }
        if (cvtCheck == true) {
            $('#CVTTax').prop('checked', true);
            challan.applyCVT = true;
        } else {
            $('#CVTTax').prop('checked', false);
            challan.applyCVT = false;
        }

        if (deficientCvtCheck == true) {
            challan.applyDeficientCVT = true;
            challan.applyCVT = false;
        }
        //if (isCVTandNotDC == true) {
        //    $("#dcMessage").show();
        //} else {
        //    $("#dcMessage").hide();
        //}


        if (regCheck == true || deficientRegCheck == true || cvtCheck == true || isRegistryFeeCheck == true || DigitalScaningFee == true || RegFeeNew == true || MutationFee == true || (!deficientCvtCheck && isAhleCommissionFeeCheck == true)) {
            // Show Deed Detail section
            if (deedAmountsModel.DeedAmounts.length > 0 && cvtCheck == true) {
                // Create CVT fields only when CVT is being paid
                var checkForSecondProperty = false;
                numberOfAmounts = deedAmountsModel.DeedAmounts.length;
                addCVTFieldsForPayCVTRegistration(deedAmountsModel, deedAmountsModel.DeedAmounts, deedid, cvtCheck, checkForSecondProperty, challan);
            }
            if (deedAmountsModel.DeedAmounts.length > 0 && isRegistryFeeCheck) {
                numberOfAmounts = deedAmountsModel.DeedAmounts.length;
                addCVTFieldsForPayCVTRegistration(deedAmountsModel, deedAmountsModel.DeedAmounts, deedid, cvtCheck, checkForSecondProperty, challan);

            }

            $("#DeedDetailsForPayCVTandReg").show();
            //if (!isRegistryFeeCheck)
            //    $("#registryFeeDiv").hide();
            //else
            //    $("#registryFeeDiv").show();

            if (!isAhleCommissionFeeCheck)
                $("#AhleCommissionFeeDiv").hide();
            else
                $("#AhleCommissionFeeDiv").show();
            if (DigitalScaningFee) {
                $("#ScanningDigitalFeeDiv").show();
                $("#CopyingFeeDivNew").show();
                $("#DuplicateFeeDivNew").show();
                $("#TotalDigitalFeeDiv").show();

            } else {
                $("#ScanningDigitalFeeDiv").hide();
                $("#CopyingFeeDiv").hide();
                $("#DuplicateFeeDiv").hide();
                $("#TotalDigitalFeeDiv").hide();
            }

            if (MutationFee) {
                $("#MutationFeeDivNew").show();
                $("#CertitiedFeeDivNew").show();
                $("#TotalMutationFeeNew").show();


            } else {
                $("#MutationFeeDiv").hide();
                $("#CertitiedFeeDivNew").hide();
                $("#TotalMutationFeeNew").hide();
            }

            if (RegFeeNew) {
                $("#RegistrationFeeApplicableDiv").show();


            } else {
                $("#RegistrationFeeApplicableDiv").hide();
            }
            ShowDeedDetailsPayCVTandReg();
            $("#leaseDeedPayCVTRegistrationDiv").show();

            if (!regCheck && !deficientRegCheck)
                $("#RegistrationPayCVTandRegDeedDetailsDiv").hide();
            else
                $("#RegistrationPayCVTandRegDeedDetailsDiv").show();
        }
        else {
            // For Deficient CVT
            $("#leaseDeedPayCVTRegistrationDiv").hide();
            if (regCheck == true || deficientRegCheck == true) {
                $("#DeedDetailsForPayCVTandReg").show();
                ShowDeedDetailsPayCVTandReg();
            } else {
                $("#DeedDetailsForPayCVTandReg").hide();
                IsCvtOrDeficientCvt();
            }
        }
        if ((deficientCvtCheck || deficientRegCheck) && isAhleCommissionFeeCheck) {
            $("#AhleCommissionFeeDiv").hide();
        }
    }
}


function updateChallanModelDeedDetailsGenerate2() {
    debugger;
    //challan.numberOfStampPapers = $("#NumberOfStampPapersGenerateChallanDeedDetail").val();

    var $radio = $('input[name=ChallanFromType]:checked');

    var id = $radio.attr('id');

    if (challan.TransactionTypeString == "Non-Judicial") {
        challan.propertyInfo2.FullAddress = $("#PropertyAddressGenerateChallanSecond").val();
        //model.propertyInfo.MultipleKhasras
        if (challan.TotalAmount < parseFloat($("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, ""))) {
            challan.TotalAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");
            debugger;
            if (isMultiplePropertiesExchageOfProperty) {
                var calculateStampDuty = challan.TotalAmount * 1 / 100;
                $("#payableStampDutyGenerateChallan").val(calculateStampDuty);
            }
        }
        challan.propertyInfo2.ValuationAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");

        // if (isDCValuationFlag == true) {
        if (IsLandAndConstructed == true) {
            challan.propertyInfo2.ConstructedStructureValue = $("#constructedStructureValueSecond").val().replace(/,/g, "");
            document.getElementById('CSValueUserProvided2').innerHTML = "Rs.&nbsp;" + returnCommas($("#constructedStructureValueSecond").val().replace(/,/g, ""));
            //  $('#CSValueUserProvided2').show(); $('#CSValueUserProvided').hide();
        } else {
            challan.propertyInfo2.ConstructedStructureValueSecond = null;
        }

        challan.propertyInfo2.LandPropertyValue = $('#landProperty2').val().replace(/,/g, "");

        var isCVTCheckBox = $('#CVTTax').is(":checked");
        var amount = {};

        for (i = 0; i < numberOfAmounts; i++) {

            if (deedAmountsModel.DeedAmounts[i].isCVTField) {

                if (isCVTCheckBox) {

                    amount = {
                        FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
                        FieldName: deedAmountsModel.DeedAmounts[i].Label,
                        AmountValue: $(secondPropertyIDArray[i]).val().replace(/,/g, ""),
                        AdditionalInfo: "Second Property"
                    }

                    AmountsData.push(amount);

                }

            }
            else {

                amount = {
                    FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
                    FieldName: deedAmountsModel.DeedAmounts[i].Label,
                    AmountValue: $(secondPropertyIDArray[i]).val().replace(/,/g, ""),
                    AdditionalInfo: "Second Property"
                }

                AmountsData.push(amount);

            }

        }

        challan.lstTaxAmountValue = AmountsData;
        if (challan.applyStampDuty == true && $("#payableStampDutyGenerateChallan").val() != null && $("#payableStampDutyGenerateChallan").val() != "")
        { challan.PayableStampDutyString = $("#payableStampDutyGenerateChallan").val().replace(/,/g, ""); }
        // challan.TotalAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");
        /*
                    if (challan.applyStampDuty == true && $("#payableStampDutyGenerateChallan").val() != null && $("#payableStampDutyGenerateChallan").val() != "")
                    { challan.PayableStampDutyString = $("#payableStampDutyGenerateChallan").val().replace(/,/g, ""); }
                    else { challan.PayableStampDutyString = null; }
                    if (challan.applyRegistrationDuty == true && $("#registrationFeeGenerateChallan").val() != null && $("#registrationFeeGenerateChallan").val() != "")
                    { challan.RegistrationFeeString = $("#registrationFeeGenerateChallan").val().replace(/,/g, ""); }
                    else { challan.RegistrationFeeString = null; }
        
                    if (isLeasePeriod == true) {
                        challan.leasePeriod = $("#LeasePeriodGenerateChallan").val();
                    }
                    var deedid = $("#TransactionName").val();
                    if (deedid == AdvanceMoneyDeedId) {
                        challan.AdvanceMoney = $("#AdvanceMoneyGenerateChallan").val().replace(/,/g, "");
                    }
                    else if (deedid == PremiumDeedId) {
                        challan.Premium = $("#PremiumGenerateChallan").val().replace(/,/g, "");
                    }
                    */
    }
    else {
        // challan.SuitFor = $("#SuitForGenerateChallan").val();
        //  challan.TotalAmount = $("#AmountOfConsiderationGenerateChallan").val().replace(/,/g, "");
    }
}

function populateSecondRateOfChallan() {
    populateChallanPropertyInfo2();
    //console.log(challan.propertyInfo2);
}


function createArrowBarFirstScreen() {

    $("#stepsArrowFirstScreen").show();
    $("#informationDiv").show();

    createArrow();
    var arrTotalStepImages = ['steps-pending', 'steps-pending', 'steps-pending'];
    var arrTotalStepImagesId = ['imageForFirstScreen', 'step1pending', 'step4pending'];
    var arrTotalStepTitles = ['stepTitle-basicInfo', 'stepTitle-DeedDetails', 'stepTitle-confirmation'];
    var arrTotalStepTitles_ur = ['stepTitle-basicInfo-ur', 'stepTitle-DeedDetails-ur', 'stepTitle-confirmation-ur'];
    if (document.cookie == "_culture=ur") {
        createArrowBarNew(arrTotalStepImages, arrTotalStepImagesId, arrTotalStepTitles_ur);
    }
    else {
        createArrowBarNew(arrTotalStepImages, arrTotalStepImagesId, arrTotalStepTitles);
    }
    /*-------------------------------------------------*/

    //createStepTitle('stepTitle-basicInfo', 0);
    //createStep('steps-pending', 45);

    //var img = $('<img />', {
    //    src: '../Images/stepTitle-basicInfo.png',
    //    id: 'basicInfo',
    //    style: 'position: absolute;left: 0px;top:-55px;'
    //});
    //img.appendTo($('#informationDiv'));
    ///*-------------------------------------------------*/

    ///*-------------------------------------------------*/

    //createStepTitle('stepTitle-DeedDetails', 473);
    //createStep('steps-pending', 518);

    //var img = $('<img />', {
    //    src: '../Images/stepTitle-DeedDetails.png',
    //    id: 'deedDetails',
    //    style: 'position: absolute; left: 473px; top:-55px;'
    //});
    //img.appendTo($('#informationDiv'));
    /*-------------------------------------------------*/

    ///*-------------------------------------------------*/

    //createStepTitle('stepTitle-confirmation', 1035);
    //createStep('steps-pending', 1080);
    //var img = $('<img />', {
    //    src: '../Images/stepTitle-confirmation.png',
    //    id: 'deedDetails',
    //    style: 'position: absolute; left: 1035px; top:-55px;'
    //});
    //img.appendTo($('#informationDiv'));
    /*-------------------------------------------------*/





    //var img = $('<img />', {
    //    src: '../Images/steps-pending.png',
    //    id: 'firstpending',
    //    style: 'position: absolute; top: 15px;left:45px;'
    //});
    //img.appendTo($('#stepsArrowFirstScreen'));





    //var img = $('<img />', {
    //    id: 'secondpending',
    //    src: '../Images/steps-pending.png',
    //    style: 'position: absolute; left: 518px;top:15px;'
    //});
    //img.appendTo($('#stepsArrowFirstScreen'));



    //var img = $('<img />', {
    //    id: 'thirdpending',
    //    src: '../Images/steps-pending.png',
    //    style: 'position: absolute; left: 1080px;top:15px;'
    //});
    //img.appendTo($('#stepsArrowFirstScreen'));

}

// Should only be created once
function createArrow() {
    var count = $('#stepsArrowFirstScreen').find("#mainStepBar").size();
    if (count == 0) {
        var img = $('<img />', {
            src: '../Images/steps-bgArrow.png',
            id: 'mainStepBar',
            //width: '1105px'
            //style: 'position: relative; left: -750px'
        });
        img.appendTo($('#stepsArrowFirstScreen'));
    }
}

function createStepTitle(imageName, imagePosition) {

    var img = $('<img />', {
        src: '../Images/' + imageName + '.png',
        style: 'position: absolute; left: ' + imagePosition + 'px;top:-55px;'
    });
    img.appendTo($('#informationDiv'));

}

function createStep(imageName, imageId, imagePosition) {
    var img = $('<img />', {
        src: '../Images/' + imageName + '.png',
        id: imageId,
        style: 'position: absolute;top: 15px;left:' + imagePosition + 'px;' //
    });
    img.appendTo($('#stepsArrow'));
}


function createArrowBar() {
    $("#stepsArrow").show();
    var arrTotalStepImages = [];//['steps-pending', 'steps-pending', 'steps-pending'];
    var arrTotalStepImagesId = [];
    var arrTotalStepTitles = [];//['stepTitle-basicInfo', 'stepTitle-DeedDetails', 'stepTitle-confirmation'];

    if (document.cookie == "_culture=ur") {
        arrTotalStepImages.push('steps-completed');
        arrTotalStepImagesId.push('imageForFirstScreen');
        arrTotalStepTitles.push('stepTitle-basicInfo-ur');
    }
    else {
        arrTotalStepImages.push('steps-completed');
        arrTotalStepImagesId.push('imageForFirstScreen');
        arrTotalStepTitles.push('stepTitle-basicInfo');

    }

    var stepTitleLocation = -50;
    //createStepTitle('stepTitle-basicInfo', stepTitleLocation);
    var arrowWidth = parseFloat(1000);
    var tempcvtCheck = $('#CVTTax').is(":checked");

    if (tempcvtCheck == true && isExchangeOfProperty == false) { //isDCValuationFlag

        // For CVT = Yes
        if (document.cookie == "_culture=ur") {
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step1pending');
            arrTotalStepTitles.push('stepTitle-DeedDetails-ur');
        }
        else {
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step1pending');
            arrTotalStepTitles.push('stepTitle-DeedDetails');
        }

        // Here DC Valuation screen is coming always now. 
        // It shoould not ocme for those cases where DC Valuation screen is not required for CVT calculation
        if (!isPowerOfAttorney) {
            if (document.cookie == "_culture=ur") {
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step2pending');
                arrTotalStepTitles.push('stepTitle-DCValuation-ur');
            }
            else {
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step2pending');
                arrTotalStepTitles.push('stepTitle-DCValuation');
            }

        }
        if (document.cookie == "_culture=ur") {
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step3pending');
            arrTotalStepTitles.push('stepTitle-CVT-ur');
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step4pending');
            arrTotalStepTitles.push('stepTitle-confirmation-ur');
        }
        else {
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step3pending');
            arrTotalStepTitles.push('stepTitle-CVT');
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step4pending');
            arrTotalStepTitles.push('stepTitle-confirmation');
        }

        createArrowBarNew(arrTotalStepImages, arrTotalStepImagesId, arrTotalStepTitles);
    }
    else if (tempcvtCheck == true && isExchangeOfProperty == true) {
        if (document.cookie == "_culture=ur") {
            // Exchange of Property case with CVT
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step1pending');
            arrTotalStepTitles.push('stepTitle-DeedDetails-ur');
        }
        else {
            // Exchange of Property case with CVT
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step1pending');
            arrTotalStepTitles.push('stepTitle-DeedDetails');
        }

        if (!isMultiplePropertiesExchageOfProperty) {
            if (document.cookie == "_culture=ur") {
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step2pending');
                arrTotalStepTitles.push('stepTitle-DCV1st-ur');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step3pending');
                arrTotalStepTitles.push('stepTitle-DCV2nd-ur');
            }
            else {
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step2pending');
                arrTotalStepTitles.push('stepTitle-DCV1st');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step3pending');
                arrTotalStepTitles.push('stepTitle-DCV2nd');
            }

        }
        if (document.cookie == "_culture=ur") {
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step4pending');
            arrTotalStepTitles.push('stepTitle-CVT1st-ur');
            //stepTitle-CVT2nd
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step5pending');
            arrTotalStepTitles.push('stepTitle-CVT2nd-ur');
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step6pending');
            arrTotalStepTitles.push('stepTitle-confirmation-ur');
        }
        else {
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step4pending');
            arrTotalStepTitles.push('stepTitle-CVT1st');
            //stepTitle-CVT2nd
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step5pending');
            arrTotalStepTitles.push('stepTitle-CVT2nd');
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step6pending');
            arrTotalStepTitles.push('stepTitle-confirmation');
        }

        createArrowBarNew(arrTotalStepImages, arrTotalStepImagesId, arrTotalStepTitles);
        //var partWidth = parseFloat(arrowWidth / 7 - 20);
        //var imagePosition = 0;
        //imagePosition = parseFloat(arrowWidth - partWidth);
        //var img = $('<img />', {
        //    src: '../Images/steps-pending.png',
        //    id: 'step1pending',
        //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
        //});
        //img.appendTo($('#stepsArrow'));
        //createStepTitle('stepTitle-DeedDetails', 75);
        //imagePosition = parseFloat(arrowWidth - 2 * partWidth);
        //var img = $('<img />', {
        //    id: 'step2pending',
        //    src: '../Images/steps-pending.png',
        //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
        //});
        //img.appendTo($('#stepsArrow'));
        //createStepTitle('stepTitle-DCV1st', 122);
        //imagePosition = parseFloat(arrowWidth - 3 * partWidth);
        //var img = $('<img />', {
        //    id: 'step3pending',
        //    src: '../Images/steps-pending.png',
        //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
        //});
        //img.appendTo($('#stepsArrow'));
        //createStepTitle('stepTitle-DCV2nd', 165);
        //imagePosition = parseFloat(arrowWidth - 4 * partWidth);
        //var img = $('<img />', {
        //    id: 'step4pending',
        //    src: '../Images/steps-pending.png',
        //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
        //});
        //img.appendTo($('#stepsArrow'));
        //createStepTitle('stepTitle-CVT1st', 215);
        //imagePosition = parseFloat(arrowWidth - 5 * partWidth);
        //var img = $('<img />', {
        //    id: 'step5pending',
        //    src: '../Images/steps-pending.png',
        //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
        //});
        //img.appendTo($('#stepsArrow'));
        //createStepTitle('stepTitle-CVT2nd', 260);
        //imagePosition = parseFloat(arrowWidth - 6 * partWidth);
        //var img = $('<img />', {
        //    id: 'step6pending',
        //    src: '../Images/steps-pending.png',
        //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
        //});
        //img.appendTo($('#stepsArrow'));
        //createStepTitle('stepTitle-confirmation', 305);

    }
    else if (isDCValuationFlag == true) {
        if (isExchangeOfProperty == true) {


            // Exchange of Property without CVT
            if (document.cookie == "_culture=ur") {
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step1pending');
                arrTotalStepTitles.push('stepTitle-DeedDetails-ur');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step2pending');
                arrTotalStepTitles.push('stepTitle-DCV1st-ur');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step3pending');
                arrTotalStepTitles.push('stepTitle-DCV2nd-ur');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step4pending');
                arrTotalStepTitles.push('stepTitle-confirmation-ur');
            }
            else {
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step1pending');
                arrTotalStepTitles.push('stepTitle-DeedDetails');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step2pending');
                arrTotalStepTitles.push('stepTitle-DCV1st');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step3pending');
                arrTotalStepTitles.push('stepTitle-DCV2nd');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step4pending');
                arrTotalStepTitles.push('stepTitle-confirmation');
            }

            createArrowBarNew(arrTotalStepImages, arrTotalStepImagesId, arrTotalStepTitles);
            //var partWidth = parseFloat(arrowWidth / 5);
            //var imagePosition = 0;
            //imagePosition = parseFloat(arrowWidth - partWidth);
            //var img = $('<img />', {
            //    src: '../Images/steps-pending.png',
            //    id: 'step1pending',
            //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
            //});
            //img.appendTo($('#stepsArrow'));
            //createStepTitle('stepTitle-DeedDetails', 160);
            //imagePosition = parseFloat(arrowWidth - 2 * partWidth);
            //var img = $('<img />', {
            //    id: 'step2pending',
            //    src: '../Images/steps-pending.png',
            //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
            //});
            //img.appendTo($('#stepsArrow'));
            //createStepTitle('stepTitle-DCV1st', 285);
            //imagePosition = parseFloat(arrowWidth - 3 * partWidth);
            //var img = $('<img />', {
            //    id: 'step3pending',
            //    src: '../Images/steps-pending.png',
            //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
            //});
            //img.appendTo($('#stepsArrow'));
            //createStepTitle('stepTitle-DCV2nd', 415);
            //imagePosition = parseFloat(arrowWidth - 4 * partWidth);
            //var img = $('<img />', {
            //    id: 'step4pending',
            //    src: '../Images/steps-pending.png',
            //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
            //});
            //img.appendTo($('#stepsArrow'));
            //createStepTitle('stepTitle-confirmation', 545);
        }
        else {
            // For All Deeds where DC Valuation is enabled

            if (document.cookie == "_culture=ur") {
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step1pending');
                arrTotalStepTitles.push('stepTitle-DeedDetails-ur');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step2pending');
                arrTotalStepTitles.push('stepTitle-DCValuation-ur');
                if (exemptCVTforGiftDeed) {
                    arrTotalStepImages.push('steps-pending');
                    arrTotalStepImagesId.push('step3pending');
                    arrTotalStepTitles.push('stepTitle-CVT-ur');
                }
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step4pending'); // It should be 3 but it is 4. do not know
                arrTotalStepTitles.push('stepTitle-confirmation-ur');
            }
            else {
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step1pending');
                arrTotalStepTitles.push('stepTitle-DeedDetails');
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step2pending');
                arrTotalStepTitles.push('stepTitle-DCValuation');
                if (exemptCVTforGiftDeed) {
                    arrTotalStepImages.push('steps-pending');
                    arrTotalStepImagesId.push('step3pending');
                    arrTotalStepTitles.push('stepTitle-CVT');
                }
                arrTotalStepImages.push('steps-pending');
                arrTotalStepImagesId.push('step4pending'); // It should be 3 but it is 4. do not know
                arrTotalStepTitles.push('stepTitle-confirmation');
            }


            createArrowBarNew(arrTotalStepImages, arrTotalStepImagesId, arrTotalStepTitles);
            //var partWidth = parseFloat(arrowWidth / 4);
            //var imagePosition = 0;
            //imagePosition = parseFloat(arrowWidth - partWidth);
            //var img = $('<img />', {
            //    src: '../Images/steps-pending.png',
            //    id: 'step1pending',
            //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
            //});
            //img.appendTo($('#stepsArrow'));
            //createStepTitle('stepTitle-DeedDetails', 215);
            //imagePosition = parseFloat(arrowWidth - 2 * partWidth);
            //var img = $('<img />', {
            //    id: 'step2pending',
            //    src: '../Images/steps-pending.png',
            //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
            //});
            //img.appendTo($('#stepsArrow'));
            //createStepTitle('stepTitle-DCValuation', 395);
            //imagePosition = parseFloat(arrowWidth - 3 * partWidth);
            //var img = $('<img />', {
            //    id: 'step4pending',
            //    src: '../Images/steps-pending.png',
            //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
            //});
            //img.appendTo($('#stepsArrow'));
            //createStepTitle('stepTitle-confirmation', 580);
        }
    }
    else {
        // For All Deeds where DC is not applied
        if (document.cookie == "_culture=ur") {
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step1pending');
            arrTotalStepTitles.push('stepTitle-DeedDetails-ur');
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step4pending');
            arrTotalStepTitles.push('stepTitle-confirmation-ur');
        }
        else {
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step1pending');
            arrTotalStepTitles.push('stepTitle-DeedDetails');
            arrTotalStepImages.push('steps-pending');
            arrTotalStepImagesId.push('step4pending');
            arrTotalStepTitles.push('stepTitle-confirmation');
        }

        createArrowBarNew(arrTotalStepImages, arrTotalStepImagesId, arrTotalStepTitles);
        //var partWidth = parseFloat(arrowWidth / 3);
        //var imagePosition = 0;
        //imagePosition = parseFloat(arrowWidth - partWidth);
        //var img = $('<img />', {
        //    src: '../Images/steps-pending.png',
        //    id: 'step1pending',
        //    style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
        //});
        //img.appendTo($('#stepsArrow'));
        //createStepTitle('stepTitle-DeedDetails', 305);
        //imagePosition = parseFloat(arrowWidth - 2 * partWidth);
        //var img = $('<img />', {
        //        id: 'step4pending',
        //        src: '../Images/steps-pending.png',
        //        style: 'position: absolute; left: -' + imagePosition + 'px;top: 15px;'
        //    });
        //img.appendTo($('#stepsArrow'));
        //createStepTitle('stepTitle-confirmation', 580);
    }
}

function createArrowBarNew(arrTotalStepImages, arrTotalStepImagesId, arrTotalStepTitles) {
    var posFirstStep = 45;
    var posFirstStepTitle = 0;

    var posLastStep = 1080;
    var posLastStepTitle = 1035;

    var len = -1;
    var isFirstAndSecondArrayLengthEqual = arrTotalStepImages.length == arrTotalStepImagesId.length;
    if (isFirstAndSecondArrayLengthEqual) len = arrTotalStepImages.length;

    if (len == arrTotalStepTitles.length) {
        var posStep = 0;
        var posStepTitle = 0;

        for (var i = 0 ; i < arrTotalStepTitles.length; i++) {
            if (i == 0) {
                // For First Step
                posStep = posFirstStep;
                posStepTitle = posFirstStepTitle;
            }
            else if (i == (arrTotalStepTitles.length - 1)) {
                // For Last Step
                posStep = posLastStep;
                posStepTitle = posLastStepTitle;
            }
            else {
                // For intermediate steps
                var totalWidthBetweenFirstAndLastStepTitle = posLastStepTitle - posFirstStepTitle;
                var totalIntermediateSteps = arrTotalStepTitles.length - 2; // Remove first and last step

                var stepDistanceBetweenTwoTitle = totalWidthBetweenFirstAndLastStepTitle / (totalIntermediateSteps + 1);

                posStep += stepDistanceBetweenTwoTitle;
                posStepTitle += stepDistanceBetweenTwoTitle;

            }

            createStepTitle(arrTotalStepTitles[i], posStepTitle);
            createStep(arrTotalStepImages[i], arrTotalStepImagesId[i], posStep);
        }

    }




}

function removeArrowBarFirstScreen() {

    //$("#stepsArrowFirstScreen img").remove();
    $("#informationDiv img").remove();

}

function removeArrowBarOnChangeDeedName() {

    $("#stepsArrow img").remove();

}

function removeArrowBar() {

    $("#stepsArrow img").remove();
    $("#informationDiv img").remove();

    // Remove first screen images
    //$("#firstpending").remove();
    //$("#secondpending").remove();
    //$("#thirdpending").remove();

}

function IsCvtOrDeficientCvt() {
    if (deficientCvtCheck == true) {
        $("#DeedDetailsForGenerateChallan").hide();
        $("#DeedDetailsForPayCVTandReg").hide();
        $("#PayCVTDeficient").show();
        //show newly created cvtforPayCVTandRegistration.cshtml here
    }
    else if (cvtCheck == true) {
        $("#DeedDetailsForGenerateChallan").hide();
        $("#DeedDetailsForPayCVTandReg").hide();
        //show dc screen 
        if (challan.ActualDCValue) {
            if (isExchangeOfProperty && challan.isMultiplePropertiesExchageOfProperty) {
                $("#dcMessage").hide();
                $("#RateOfChallan").hide()

                showCVTforMultipleProperties();

            }
            else {
                $("#dcMessage").show();
                //To fix next button click issue
                resetAll();
                initializeDCValuation();

                $("#RateOfChallan").show();
                disableFindRateButton();
                initializeGoogleMapByAdminValue();
                populateFirstScreenWhenComingBackFromSecondScreenDC();
            }
        }
        else {
            if (challan.TransactionName == PowerOfAttorneyDeedId) {
                var $radio = $('input[name=LandTypeCVT]:checked');
                var id = $radio.attr('id');
                if (id == "UrbanCVT") {
                    challan.propertyInfo.isUrban = true;
                }
                else {
                    challan.propertyInfo.isUrban = false;
                }
                isDCValuationFlag = false;
                $("#RateOfChallan").hide();
                ResetTextBox("PayableCVTCVTDiv");
                $(".k-invalid-msg").hide();
                if (challan.propertyInfo.isUrban) {
                    $("#ruralAreaWarning").hide();
                    $("#LandClassificationCVTDiv").show();
                    //  $("#LandAreaCVTDiv").show();
                }
                else {
                    //  $("#ruralAreaWarning").show();
                    $("#LandClassificationCVTDiv").hide();
                    $("#LandAreaCVTDiv").hide();
                }
                isDCValuationFlag = false;
                $("#RateOfChallan").hide();
                $(".k-invalid-msg").hide();
                //$("#ruralAreaWarning").hide();
                $("#leasePeriodWarningCVT").hide();
                $("#LandTypeCVTReadOnlyDiv").hide();
                $("#checkBoxesCVT").hide();
                $("#LandTypeCVTdiv").show();
                //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassifications', "Select Land Classifications", "LandClassificationCVT");
                $("#CVTView").show();
            }
            else {
                $("#LandAreaCVTDiv").hide();
                $("#checkBoxesCVT").show();
                $("#dcMessage").show();
                //To fix next button click issue
                resetAll();
                initializeDCValuation();
                $("#RateOfChallan").show();
                disableFindRateButton();
                initializeGoogleMapByAdminValue();
            }
        }
    }
    else {

        if (challan.isOldRegistryChallan == true && isAhleCommissionFeeCheck == true) {
            $("#DeedDetailsForGenerateChallan").hide();
            $("#DeedDetailsForPayCVTandReg").hide();
            $("#PayCVTDeficient").hide();
            $("#AhleCommisionFeePage").show();

        }
        else {
            if (isAhleCommissionFeeCheck) {
                $("#AhleCommisionFeePage").show();
                $("#confirmfrom").hide();
            }
            else {
                rendenChallan();
                $("#confirmfrom").show();
                $("#AhleCommisionFeePage").hide();
            }
            $("#DeedDetailsForGenerateChallan").hide();
            $("#DeedDetailsForPayCVTandReg").hide();
            $("#DeedDetailsForGenerateChallan").hide();
            if (DigitalScaningFee) {
                rendenChallan();
                $("#confirmfrom").show();
                $("#AhleCommisionFeePage").hide();
            }
            if (!deficientRegCheck && !deficientCvtCheck && isAhleCommissionFeeCheck && isRegistryFeeCheck) {
                rendenChallan();
                $("#confirmfrom").show();
                $("#AhleCommisionFeePage").hide();
            }

        }
    }
}

function ShowDeedDetailsPayCVTandReg() {
    $(this).scrollTop(0);
    if (challan.TotalAmount > 0 || challan.isOldRegistryChallan || challan.isParentChallanOldReg) {
        if (challan.isOldRegistryChallan || challan.isParentChallanOldReg) {
            $("#PropertyValuationPayCVTandRegDiv").hide();
            challan.isParentChallanOldReg = true;
            if ($('#registryFeeCheckbox').is(":checked")) {
                $("#DeedDetailsPopertyForPayCVTandRegdiv").show();
            }
            else {
                $("#DeedDetailsPopertyForPayCVTandRegdiv").hide();
            }
        }
        else {
            $("#PropertyValuationPayCVTandRegDiv").show();
            $("#PropertyValuationPayCVTandReg").val(returnCommas(challan.TotalAmount));
            document.getElementById('propertyValueHeadingPayCVTRegistration').innerHTML = challan.AmountLabelText;
            $("#DeedDetailsPopertyForPayCVTandRegdiv").show();
        }


    }
    else {
        $("#DeedDetailsPopertyForPayCVTandRegdiv").hide();
    }

    var FirstScreenRegCheck = $('#RegitrationFeeCheck').is(":checked");

    if (FirstScreenRegCheck == true) {
        $("#payableRegFeeDivPayCVTandRegDeedDetailsDeficient").hide();
        calculateRegistrationFeePayCVTandRegistration();
        $("#payableRegFeeDivPayCVTandRegDeedDetails").show();
    } else {
        $("#payableRegFeeDivPayCVTandRegDeedDetails").hide();
    }

    if (deficientRegCheck == true) {
        $("#payableRegFeeDivPayCVTandRegDeedDetails").hide();
        $("#payableRegFeeDivPayCVTandRegDeedDetailsDeficient").show();
    } else {
        $("#payableRegFeeDivPayCVTandRegDeedDetailsDeficient").hide();
    }

    //if (isRegistryFeeCheck) {
    //    $("#registryFeeDiv").show();
    //}
    //else {
    //    $("#registryFeeDiv").hide();
    //}
    if (isRegistryFeeCheck || deficientRegCheck == true || DigitalScaningFee == true || MutationFee == true || RegFeeNew == true) {
        return;
    }
    // check for hardCord Duties .. 
    $("#DeedDetailsForPayCVTandReg").show();
    //if ((regCheck == true || deficientRegCheck == true) && !isAhleCommissionFeeCheck) {
    //    $("#DeedDetailsForPayCVTandReg").show();
    //    $("#AhleCommisionFeePage").hide();
    //}
    //else {
    //    $("#DeedDetailsForPayCVTandReg").hide();
    //    $("#AhleCommisionFeePage").show();
    //}
}

function ShowDeedDetailsGenerateChallanForOldReg() {
    deedid = challan.TransactionName;
    updateIsLeasePeriod();
    ResetTextBox("registrationFeePayCVTandRegDeficient");
    ResetTextBox("PayCVTValueDeficient");
    $("#DeedDetailsForGenerateChallan").hide();
    cvtCheck = false;
    regCheck = false;
    deficientCvtCheck = $('#CVTTaxForOldReg').is(":checked");
    deficientRegCheck = $('#RegitrationFeeForOldRegCheck').is(":checked");
    isRegistryFeeCheck = $('#registryFeeCheckbox').is(":checked");
    isAhleCommissionFeeCheck = $('#AhleCommissionDutyCheck').is(":checked");
    if (regCheck == true) {
        $('#RegitrationFeeCheck').prop('checked', true);
        challan.applyRegistrationDuty = true;
    } else {
        $('#RegitrationFeeCheck').prop('checked', false);
        challan.applyRegistrationDuty = false;
    }
    if (deficientRegCheck == true) {
        challan.applyDeficientRegistration = true;
        document.getElementById("RegHeadingPayCVTandRegDeedDetails").innerHTML = DeficientRegistrationFee;
        document.getElementById("registrationPayCVTRegHeading").innerHTML = DeficientRegistrationFee;
        challan.applyRegistrationDuty = false;
    } else {
        document.getElementById("RegHeadingPayCVTandRegDeedDetails").innerHTML = RegistrationFee;
        document.getElementById("registrationPayCVTRegHeading").innerHTML = RegistrationFee;
    }
    if (cvtCheck == true) {
        $('#CVTTax').prop('checked', true);
        challan.applyCVT = true;
    } else {
        $('#CVTTax').prop('checked', false);
        challan.applyCVT = false;
    }

    if (deficientCvtCheck == true) {
        challan.applyDeficientCVT = true;
        challan.applyCVT = false;
    }
    //if (isCVTandNotDC == true) {
    //    $("#dcMessage").show();
    //} else {
    //    $("#dcMessage").hide();
    //}


    if (regCheck == true || deficientRegCheck == true || cvtCheck == true || isRegistryFeeCheck == true || (queryStringName != 'GenerateChallanForOldRegistry' && isAhleCommissionFeeCheck == true)) {
        // Show Deed Detail section
        if (deedAmountsModel.DeedAmounts.length > 0 && cvtCheck == true) {
            // Create CVT fields only when CVT is being paid
            var checkForSecondProperty = false;
            numberOfAmounts = deedAmountsModel.DeedAmounts.length;
            addCVTFieldsForPayCVTRegistration(deedAmountsModel, deedAmountsModel.DeedAmounts, deedid, cvtCheck, checkForSecondProperty, challan);
        }

        $("#DeedDetailsForPayCVTandReg").show();
        ShowDeedDetailsPayCVTandReg();
        $("#leaseDeedPayCVTRegistrationDiv").show();

        if (!regCheck && !deficientRegCheck)
            $("#RegistrationPayCVTandRegDeedDetailsDiv").hide();
        else
            $("#RegistrationPayCVTandRegDeedDetailsDiv").show();
    }
    else {
        // For Deficient CVT
        $("#leaseDeedPayCVTRegistrationDiv").hide();
        if (regCheck == true || deficientRegCheck == true) {
            $("#DeedDetailsForPayCVTandReg").show();
            ShowDeedDetailsPayCVTandReg();
        } else if (deficientCvtCheck == true) {
            $("#DeedDetailsForPayCVTandReg").hide();
            IsCvtOrDeficientCvt();
        } else {
            $("#DeedDetailsForPayCVTandReg").hide();
            $("#AhleCommisionFeePage").show();
        }
    }


    /*
    $("#deficientValuesDivForOldReg").show();
    $("#DeficientAmountMainDiv").show();
    $("#DeedDetailsForDeficient").show();
    $("#DeficientAmountForm").hide();
    $("#DeedDetailsForDeficientDiv").hide();
    $("#DeedDetailsForGenerateChallan").hide();
    $("#SuitForDeficientDiv").hide();
    $("#PropertyAddressDeficientDiv").hide();
    $("#PropertyAddressDeficientDiv2").hide();
    $("#PropertyValuationDeficientDiv").hide();
    $("#PropertyValuationDeficientDiv2").hide();
    $("#payableRegFeeDiv").hide();
    $("#payableStampDutyDiv").hide();
    $(this).scrollTop(0);
    var transactionType = challan.TransactionTypeString;
    $("#tooltip_DeficientCVTForOldReg").kendoTooltip({
        content: "Required. Deficient CVT Tax (Rs.)",
        position: "top"
    });
    $("#tooltip_DeficientRegistrationFeeOldReg").kendoTooltip({
        content: "Required. Deficient Registration Fee (Rs.)",
        position: "top"
    });
    var flag1 = $('#CVTTaxForOldReg').is(":checked");
    var flag2 = $('#RegitrationFeeForOldRegCheck').is(":checked");
    if (flag1 == true) {
        if (flag2 == true) {
            $("#deficientCVTForOldRegDiv").show();
            $("#deficientRegFeeForOldRegDiv").show();
            document.getElementById("stampHeadingGenerateChallan").innerHTML = "Deficient CVT and Deficient Reg Fee";
        } else {
            $("#deficientCVTForOldRegDiv").show();
            document.getElementById("stampHeadingGenerateChallan").innerHTML = "Deficient CVT";
            $("#deficientRegFeeForOldRegDiv").hide();
        }
    }
    else {
        if (flag2 == true) {
            $("#deficientRegFeeForOldRegDiv").show();
            $("#deficientCVTForOldRegDiv").hide();
            document.getElementById("stampHeadingGenerateChallan").innerHTML = "Deficient Registration Fee";
        } else {
            $("#deficientCVTForOldRegDiv").hide();
            $("#deficientRegFeeForOldRegDiv").hide();
        }
    }
    */
}

function ShowDeedDetailsGenerateChallan() {
    $(this).scrollTop(0);
    var transactionType = challan.TransactionTypeString;
    $("#deficientValuesDivForOldReg").hide();
    if (transactionType == "Judicial") {
        $("#NumberOfStampsGenerateChallanDiv").show();
        $("#JudicialGenerateChallanDiv").show();
        $("#NonJudicialGenerateChallanDiv").hide();
        $("#propertyAddressDiv").hide();
        $("#StampDutyAndRegistrationGenerateChallanDiv").hide();
        document.getElementById("stampHeadingGenerateChallan").innerHTML = TotalPayableAmount;
        $("#payableRegFeeDiv").hide();
        document.getElementById("stampHeadingGenerateChallan").innerHTML = StampDuty;
    }
    else {
        $("#NumberOfStampsGenerateChallanDiv").show();
        $("#JudicialGenerateChallanDiv").hide();
        $("#NonJudicialGenerateChallanDiv").show();
        if (isPropertyInfo != false) {
            if ($("#TransactionName").val() != 51) {
                $("#propertyAddressDiv").show();
            }
        }
        else {
            $("#propertyAddressDiv").hide();
        }
        $("#StampDutyAndRegistrationGenerateChallanDiv").show();
        $("#payableRegFeeDiv").hide();
        $("#payableStampDutyDiv").hide();
        $("#deficientRegFeeForOldRegDiv").hide();
        $("#deficientCVTForOldRegDiv").hide();
        var flag1 = $('#RegitrationFeeCheck').is(":checked");
        var flag2 = $('#StampDutyCheck').is(":checked");
        if ($("#TransactionName").val() == oralMutationDeedId || $("#TransactionName").val() == cvtRegistrationDeedId) {
            flag2 = false;
        }
        if (flag1 == true) {
            if (flag2 == true) {
                $("#payableRegFeeDiv").show();
                $("#payableStampDutyDiv").show();
                document.getElementById("stampHeadingGenerateChallan").innerHTML = StampDuty;
            } else {
                $("#payableRegFeeDiv").show();
                document.getElementById("stampHeadingGenerateChallan").innerHTML = StampDuty;
                $("#payableStampDutyDiv").hide();
            }
        }
        else {
            if (flag2 == true) {
                $("#payableStampDutyDiv").show();
                document.getElementById("stampHeadingGenerateChallan").innerHTML = StampDuty;
            } else {
                $("#payableStampDutyDiv").hide();
                $("#StampDutyAndRegistrationGenerateChallanDiv").hide();
            }
        }
    }
}

function ShowDeedDetailsDeficient() {
    $(this).scrollTop(0);
    if (queryStringName == "PayDeficiencyForOldRegistry" || challan.isParentChallanOldReg) {
        $("#DeedDetailsForDeficientDiv").hide();
    }
    else {
        $("#DeedDetailsForDeficientDiv").show();
    }
    $("#deficientValuesDivForOldReg").hide();
    var transactionType = challan.TransactionTypeString;
    if (transactionType == "Judicial") {
        if (queryStringName != "PayDeficiencyForOldRegistry" || challan.isParentChallanOldReg) {
            $("#SuitForDeficientDiv").show();
            $("#SuitForDeficient").val(challan.SuitFor);
        }
        else {
            $("#SuitForDeficientDiv").hide();
        }
        $("#PropertyAddressDeficientDiv").hide();
        $("#PropertyAddressDeficientDiv2").hide();
        $("#PropertyValuationDeficientDiv").hide();
        $("#PropertyValuationDeficientDiv2").hide();
        $("#payableRegFeeDiv").hide();
        $("#payableStampDutyDiv").hide();
    }
    else {
        $("#SuitForDeficientDiv").hide();
        if (challan.TotalAmount > 0) {
            $("#PropertyValuationDeficientDiv").show();
            if (challan.propertyInfo != null) {
                if ((challan.propertyInfo.FinalRate != 0 || challan.propertyInfo.DeclaredAmount != 0) && (challan.DeedNameId != releaseDeedId || challan.DeedNameId != certificateOfSaleDeedId)) {
                    var amount = Math.max(challan.propertyInfo.DeclaredAmount, challan.propertyInfo.FinalRate + challan.propertyInfo.ConstructedStructureValue);
                    $("#PropertyValuationDeficient").val(returnCommas(amount));
                }
                else {
                    $("#PropertyValuationDeficient").val(returnCommas(challan.TotalAmount));//challan.propertyInfo.DeclaredAmount
                }
                document.getElementById('FirstpropertyAddressHeadingPayDeficient').innerHTML = challan.AmountLabelText;
            }
            else {
                //$("#PropertyValuationDeficientDiv").hide();
                document.getElementById('FirstpropertyAddressHeadingPayDeficient').innerHTML = challan.AmountLabelText;
                $("#PropertyValuationDeficient").val(returnCommas(challan.TotalAmount));
            }
        }
        else {
            $("#PropertyValuationDeficientDiv").hide();
        }
        if (challan.propertyInfo != null && queryStringName != "PayDeficiencyForOldRegistry" && !challan.isParentChallanOldReg) {
            $("#PropertyAddressDeficientDiv").show();
            $("#PropertyAddressDeficient").val(challan.propertyInfo.FullAddress);
            document.getElementById('propertyAddressFirstPropertyDeficient').innerHTML = PropertyAddress;
        }
        else {
            $("#PropertyAddressDeficientDiv").hide();
            $("#PropertyAddressDeficient").val("");
        }
        if (isExchangeOfProperty == true && queryStringName != "PayDeficiencyForOldRegistry" && !challan.isParentChallanOldReg) {
            document.getElementById('propertyAddressFirstPropertyDeficient').innerHTML = FirstPartyPropertysAddress;
            document.getElementById('FirstpropertyAddressHeadingPayDeficient').innerHTML = "First " + challan.AmountLabelText;
            $("#PropertyValuationDeficientDiv2").show();
            if (challan.propertyInfo2.FinalRate != 0 || challan.propertyInfo2.DeclaredAmount != 0) {
                var maxAmount = Math.max(challan.propertyInfo2.DeclaredAmount, challan.propertyInfo2.FinalRate + challan.propertyInfo2.ConstructedStructureValue);
                $("#PropertyValuationDeficient2").val(returnCommas(maxAmount));
            }
            else {
                $("#PropertyValuationDeficient2").val(returnCommas(challan.propertyInfo2.DeclaredAmount));
            }
            document.getElementById('SecondpropertyAddressHeadingPayDeficient').innerHTML = SecondPropertyValue;
            $("#PropertyAddressDeficientDiv2").show();
            $("#PropertyAddressDeficient2").val(challan.propertyInfo2.FullAddress);
            document.getElementById('propertyAddressSecondPropertyDeficient').innerHTML = SecondPartyPropertysAddress;
        }
        else {
            $("#PropertyValuationDeficientDiv2").hide();
            $("#PropertyAddressDeficientDiv2").hide();
        }
    }
}

function onBackFromPayCVTDeficient() {
    ResetTextBox("PayCVTValueDeficient");
    $("#PayCVTDeficient").hide();
    if (regCheck == true || deficientRegCheck == true || isRegistryFeeCheck == true) {
        $("#DeedDetailsForPayCVTandReg").show();
    } else {
        $("#challanform").show();
    }
}
function onBackFromAhleCommission() {
    ResetTextBox("ahleCommissionOld");
    $("#AhleCommisionFeePage").hide();
    if (deficientCvtCheck == true)
        $("#PayCVTDeficient").show();
    else if (regCheck == true || deficientRegCheck == true || isRegistryFeeCheck == true) {
        $("#DeedDetailsForPayCVTandReg").show();
    } else {
        $("#challanform").show();
    }
}
function OnBackFromPayCVTandRegistrationDeedDetails() {
    resetPayCVTandRegistrationDeedDetails();
    $("#challanform").show();
    $("#DeedDetailsForPayCVTandReg").hide();
    $(".k-invalid-msg").hide();
}

function resetPayCVTandRegistrationDeedDetails() {
    ResetTextBox("PropertyValuationPayCVTandReg");
    ResetTextBox("registrationFeePayCVTandReg");
    ResetTextBox("registrationFeePayCVTandRegDeficient");
    $(".k-invalid-msg").hide();

    var captchaObj = $("#CaptchaCode").get(0).Captcha;
    captchaObj.ReloadImage();
}

function OnBackFromDeedDetailsDeficient() {
    //resetDeficientDeedScreen();
    $("#challanform").show();
    $("#DeedDetailsForDeficient").hide();
    $(".k-invalid-msg").hide();

}

function OnBackFromDeedDetailsGenerateChallan() {

    //$("#stepsArrow").hide(); //$("#step4pending").attr("src", "../Images/steps-pending.png");

    $("#stepsArrowFirstScreen").show();

    removeArrowBar();
    $("#informationDiv").show();

    createArrowBarFirstScreen();

    //resetGenerateChallanDeedScreen();
    $("#challanform").show();
    $("#DeedDetailsForGenerateChallan").hide();
    //$(".k-invalid-msg").hide(); 

}

function CheckForZeroOnchangeDeedDetailsDeficient() {
    var deficientAmount = parseFloat($("#DeficientAmount").val().replace(/,/g, ""));
    //if (deficientAmount <= 0) {
    //    res = false;
    //    document.getElementById("deficientError").innerHTML = "Deficient amount should be greater than 0.";
    //    $("#deficientError").show();
    //    $("#deficientError").css("color", "red");
    //    //$("#DeficientAmount_validationMessage").hide();
    //}
    //else
    if (challan.TransactionTypeString == "Judicial" && deficientAmount > maxJudicialAmount) {
        res = false;
        document.getElementById("deficientError").innerHTML = "Deficient amount should be less than or equal to " + maxJudicialAmount + " for Judicial challan.";
        $("#deficientError").show();
        $("#deficientError").css("color", "red");
        //$("#DeficientAmount_validationMessage").hide();
    }
    else {
        $("#deficientError").hide();
    }
    var totalLease = parseFloat($("#PenaltyDeficient").val().replace(/,/g, ""));
    if (totalLease <= 0) {
        res = false;
        document.getElementById("penaltyError").innerHTML = Penaltyshouldbegreaterthan0;
        $("#penaltyError").show();
        $("#penaltyError").css("color", "red");
        //$("#Penalty_validationMessage").hide();
    }
    else {
        $("#penaltyError").hide();
    }
}

function CheckForZeroOnchangeDeedDetailsDeficientForOldReg() {
    var deficientCVTAmount = parseFloat($("#deficientCVTForOldRegValue").val().replace(/,/g, ""));
    if (deficientCVTAmount <= 0) {
        res = false;
        document.getElementById("deficientCVTErrorOldReg").innerHTML = DeficientCVTamountshouldbegreaterthan0;
        $("#deficientCVTErrorOldReg").show();
        $("#deficientCVTErrorOldReg").css("color", "red");
        //$("#DeficientAmount_validationMessage").hide();
    }
    else {
        $("#deficientCVTErrorOldReg").hide();
    }
    var deficientRegFeeAmount = parseFloat($("#deficientRegFeeForOldRegValue").val().replace(/,/g, ""));
    if (deficientRegFeeAmount <= 0) {
        res = false;
        document.getElementById("deficientRegFeeErrorOldReg").innerHTML = DeficientRegistrationFeeamountshouldbegreaterthan0;
        $("#deficientRegFeeErrorOldReg").show();
        $("#deficientRegFeeErrorOldReg").css("color", "red");
        //$("#DeficientAmount_validationMessage").hide();
    }
    else {
        $("#deficientRegFeeErrorOldReg").hide();
    }
}


function calculateTotalAmountDeedDetailsDeficient() {
    debugger;
    var sum = 0;
    var deficientAmount = $("#DeficientAmount").val();
    var penaltyAmount = $("#PenaltyDeficient").val();
    var surchargeAmount = $("#SurchargeDeficient").val();
    var isFloat = /^[0-9,.]+$/;
    var isFlaotDeficient = isFloat.test(deficientAmount);
    var isFlaotPenalty = isFloat.test(penaltyAmount);
    var isFlaotSurcharge = isFloat.test(surchargeAmount);
    if (deficientAmount != null && deficientAmount != "" && isFlaotDeficient == true) {
        if (penaltyAmount != null && penaltyAmount != "" && isFlaotPenalty == true) {
            var value1 = deficientAmount.replace(/,/g, "");
            var value2 = penaltyAmount.replace(/,/g, "");
            sum = parseFloat(value1) + parseFloat(value2);

            if (surchargeAmount != null && surchargeAmount != "" && isFlaotSurcharge == true) {
                var value3 = surchargeAmount.replace(/,/g, "");
                sum = sum + parseFloat(value3);
            }
        }
        else {
            var value1 = deficientAmount.replace(/,/g, "");
            sum = parseFloat(value1);
        }
    }
    else {
        if (penaltyAmount != null && penaltyAmount != "" && isFlaotPenalty == true) {
            var value1 = penaltyAmount.replace(/,/g, "");
            sum = parseFloat(value1);

            if (surchargeAmount != null && surchargeAmount != "" && isFlaotSurcharge == true) {
                var value3 = surchargeAmount.replace(/,/g, "");
                sum = sum + parseFloat(value3);
            }
        }
        else {
            sum = 0;
        }
    }
    sum = returnCommas(sum);
    $("#TotalDeficient").val(sum);
}

function calculateTotalAmountDeficientOldReg() {
    var sum = 0;
    var deficientRegFeeAmount = $("#deficientRegFeeForOldRegValue").val();
    var deficientCVTAmount = $("#deficientCVTForOldRegValue").val();
    var isFloat = /^[0-9,.]+$/;
    var isFlaotDeficient = isFloat.test(deficientRegFeeAmount);
    var isFlaotPenalty = isFloat.test(deficientCVTAmount);
    if (deficientRegFeeAmount != null && deficientRegFeeAmount != "" && isFlaotDeficient == true) {
        if (deficientCVTAmount != null && deficientCVTAmount != "" && isFlaotPenalty == true) {
            var value1 = deficientRegFeeAmount.replace(/,/g, "");
            var value2 = deficientCVTAmount.replace(/,/g, "");
            sum = parseFloat(value1) + parseFloat(value2);
        }
        else {
            var value1 = deficientRegFeeAmount.replace(/,/g, "");
            sum = parseFloat(value1);
        }
    }
    else {
        if (deficientCVTAmount != null && deficientCVTAmount != "" && isFlaotPenalty == true) {
            var value1 = deficientCVTAmount.replace(/,/g, "");
            sum = parseFloat(value1);
        }
        else {
            sum = 0;
        }
    }
    sum = returnCommas(sum);
    $("#TotalDeficientOldReg").val(sum);
}



//function calculateUpdatedSD() {


//    var deedid = $("#TransactionName").val();
//    var totalAmount = "";
//    var constructedArea = 0;
//    var isUrban = false;

//    var sqftRate = $("#DCRateSqFt").text().replace(/[^0-9]/g, '');
//    var userProvided = 0;
//    var calculatedDCSqft = 0;

//    var primaryAmount = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""));

//    if ($("#constructedAreaCVT").val() != "" && $("#constructedAreaCVT").val() != "NaN") {
//        userProvided = parseFloat($("#constructedAreaCVT").val().replace(/,/g, ""));
//        calculatedDCSqft = sqftRate * userProvided;
//        $("#CSValueDCCalculated").text("Rs. " + returnCommas(calculatedDCSqft));
//    }
//    else {
//        $("#CSValueDCCalculated").text('');
//    }

//    constructedArea = $("#constructedAreaCVT").val();        

//    if (deedid == certificateOfSaleDeedId || deedid == releaseDeedId ) { // Don't compare with DC
//        totalAmount = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, "")) + parseFloat(calculatedDCSqft);
//        if (challan.propertyInfo.treatAsUrban)
//            isUrban = true;
//        else if (challan.propertyInfo.isUrban)
//            isUrban = true;
//    }
//    else if (isLeaseDeed) { // Don't compare with DC
//        totalAmount = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""));

//        var deedContainsAdvanceMoneyField = false;
//        for (var k = 0; k < leaseDeedsWithAdvanceMoney.length; k++) {
//            if (deedid == leaseDeedsWithAdvanceMoney[k]) {
//                deedContainsAdvanceMoneyField = true;
//                break;
//            }
//        }
//        if (deedContainsAdvanceMoneyField || deedid == "94") {// LEASE - 35(3(b))
//            var totalAmount2;
//            if ($("#AverageAnnual").val() != "" && $("#AverageAnnual").val() != undefined) {
//                totalAmount2 = $("#AverageAnnual").val();
//            }
//            else { totalAmount2 = ""; }

//            var totalAmount3;
//            if ($("#AdvanceMoney").val() != "" && $("#AdvanceMoney").val() != undefined) {
//                totalAmount3 = $("#AdvanceMoney").val();
//            }
//            else {totalAmount3 = ""; }

//            var floatNumber = parseFloat(totalAmount3);
//            if (!isNaN(floatNumber)) {
//                totalAmount += parseFloat(totalAmount3.replace(/,/g, ""));
//            }

//            var floatNumber2 = parseFloat(totalAmount2);
//            if (!isNaN(floatNumber2)) {
//                totalAmount += parseFloat(totalAmount2.replace(/,/g, ""));
//            }             
//        }
//        if (challan.propertyInfo.treatAsUrban)
//            isUrban = true;
//        else if (challan.propertyInfo.isUrban)
//            isUrban = true;
//    }
//    else if (isExchangeOfProperty == true && isCVTNextFirstScreen == false) {
//        // Second Property
//        if (challan.propertyInfo2 != null && (challan.propertyInfo2.FinalRate != null && challan.propertyInfo2.LandPropertyValue != null)) {
//            if (isP2DCGreater2 == true) {
//                if (calculatedDCSqft < parseFloat(challan.lstTaxAmountValue[4].AmountValue)) {
//                    totalAmount = parseFloat(challan.propertyInfo2.FinalRate) + parseFloat(challan.lstTaxAmountValue[4].AmountValue);
//                }
//                else {
//                    totalAmount = parseFloat(challan.propertyInfo2.FinalRate) + parseFloat(calculatedDCSqft);
//                }
//            }
//            else {
//                if (calculatedDCSqft < parseFloat(challan.lstTaxAmountValue[4].AmountValue)) {
//                    totalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.lstTaxAmountValue[4].AmountValue); //  
//                }
//                else {
//                    totalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(calculatedDCSqft);
//                }
//            }
//        }
//        if (challan.propertyInfo2.treatAsUrban)
//            isUrban = true;
//        else if (challan.propertyInfo2.isUrban)
//            isUrban = true;
//    }
//    else if (isExchangeOfProperty == true && isCVTNextFirstScreen == true) {
//        // First Property
//        if (challan.propertyInfo != null && (challan.propertyInfo.FinalRate != null && challan.propertyInfo.LandPropertyValue != null)) {

//            if (isP1DCGreater == true) { // this is the case where Land DC Valuation is greater than user provided land value.                
//                if (calculatedDCSqft < parseFloat(challan.lstTaxAmountValue[1].AmountValue)) {
//                    totalAmount = parseFloat(challan.propertyInfo.FinalRate) + parseFloat(challan.lstTaxAmountValue[1].AmountValue);
//                }
//                else {
//                    totalAmount = parseFloat(challan.propertyInfo.FinalRate) + parseFloat(calculatedDCSqft);
//                }
//            }
//            else { // Consider User Provided Land Value which is greater than DC Value.                                          
//                if (calculatedDCSqft < parseFloat(challan.lstTaxAmountValue[1].AmountValue)) {
//                    totalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.lstTaxAmountValue[1].AmountValue); //  
//                }
//                else {
//                    totalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(calculatedDCSqft);
//                }
//            }
//        }
//        if (challan.propertyInfo.treatAsUrban)
//            isUrban = true;
//        else if (challan.propertyInfo.isUrban)
//            isUrban = true;
//    }
//    else if (challan.propertyInfo != null && (challan.propertyInfo.FinalRate != null && challan.propertyInfo.LandPropertyValue != null)) {
//        if (compareDCValue()) {
//            isDCGreater = true; //land value dc check.
//        }
//        else {
//            isDCGreater = false;
//        }

//        if (isDCGreater == true) { // this is the case where Land DC Valuation is greater than user provided land value.                
//            if (calculatedDCSqft < parseFloat(challan.lstTaxAmountValue[1].AmountValue)) {
//                totalAmount = parseFloat(challan.propertyInfo.FinalRate) + parseFloat(challan.lstTaxAmountValue[1].AmountValue);
//            }
//            else {
//                totalAmount = parseFloat(challan.propertyInfo.FinalRate) + parseFloat(calculatedDCSqft);
//            }
//        }
//        else { // Consider User Provided Land Value which is greater than DC Value.                                          
//            if (calculatedDCSqft < parseFloat(challan.lstTaxAmountValue[1].AmountValue)) {
//                totalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.lstTaxAmountValue[1].AmountValue); //  
//            }
//            else {
//                totalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(calculatedDCSqft);
//            }
//        }

//        if (challan.propertyInfo.treatAsUrban)
//            isUrban = true;
//        else if (challan.propertyInfo.isUrban)
//            isUrban = true;
//    }
//    else {
//        totalAmount = primaryAmount + parseFloat(calculatedDCSqft);
//    }


//    var value = [];
//    value.push(totalAmount);


//    var stampModel = {
//        TransactionId: deedid,
//        Amount: value,
//        IsUrban: isUrban
//    }

//    //var deedContainsAdvanceMoneyField = false;
//    //for (var k = 0; k < leaseDeedsWithAdvanceMoney.length; k++) {
//    //    if (deedid == leaseDeedsWithAdvanceMoney[k]) {
//    //        deedContainsAdvanceMoneyField = true;
//    //        break;
//    //    }
//    //}
//    //if (deedContainsAdvanceMoneyField || deedid == "94") {// LEASE - 35(3(b))
//    //    var totalAmount2;
//    //    if ($("#AverageAnnual").val() != "" && $("#AverageAnnual").val() != undefined) {
//    //        totalAmount2 = $("#AverageAnnual").val();
//    //    }
//    //    else {
//    //        totalAmount2 = "";
//    //    }
//    //    var totalAmount3;
//    //    if ($("#AdvanceMoney").val() != "" && $("#AdvanceMoney").val() != undefined) {
//    //        totalAmount3 = $("#AdvanceMoney").val();
//    //    }
//    //    else {
//    //        totalAmount3 = "";
//    //    }
//    //    var isValidTotal3Exists = false;
//    //    var floatNumber = parseFloat(totalAmount3);
//    //    if (!isNaN(floatNumber)) {
//    //        value.push(totalAmount3.replace(/,/g, ""));
//    //        isValidTotal3Exists = true;
//    //    }
//    //    var isValidTotal2Exists = false;
//    //    var floatNumber2 = parseFloat(totalAmount2);
//    //    if (!isNaN(floatNumber2)) {
//    //        //value.push(totalAmount3.replace(/,/g, ""));
//    //        value.push(totalAmount2.replace(/,/g, ""));
//    //        isValidTotal2Exists = true;
//    //    }
//    //    //var isFloatAmount2 = isFloat.test(totalAmount2);
//    //    if (
//    //        //(totalAmount2 != null && totalAmount2 != "" && isFloatAmount2 == true)
//    //        isValidTotal2Exists == true || isValidTotal3Exists == true
//    //        ) {

//    //        //value.push(totalAmount2.replace(/,/g, ""));
//    //        stampModel = {
//    //            TransactionId: deedid,
//    //            Amount: value
//    //        }
//    //    }
//    //}


//    $.ajax({
//        url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateStampDuty',
//        type: 'POST',
//        data: JSON.stringify(stampModel),
//        contentType: "application/json;charset=utf-8",
//        async: false,
//        cache: false,
//        timeout: 30000,
//        success: function (data) {
//            $("#payableStampDutyGenerateChallan").val(returnCommas(data[0]));
//            return true;
//        },
//        error: function (data) {
//            return false;
//        }
//    });

//    if (challan.TransactionName == "85" ||
//        challan.TransactionName == "86" ||
//        challan.TransactionName == "87" ||
//        challan.TransactionName == "90" ||
//        challan.TransactionName == "91" ||
//        challan.TransactionName == "92" ||
//        challan.TransactionName == "94"
//        ) {
//        if (isUrban) {
//            challan.RegistrationFeeString = 0;
//            $("#registrationFeeGenerateChallan").val(0);
//        }

//    }


//    if (challan.TransactionName == "5" ) {
//        /*var value = [];
//        value.push(parseFloat(challan.propertyInfo.FinalRate.replace(/,/g, "")));
//        var stampModel = {
//            TransactionId: challan.TransactionName,
//            Amount: value

//        }*/

//        $.ajax({
//            url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateRegistrationFee',
//            type: 'POST',
//            async: false,
//            data: JSON.stringify(stampModel),
//            contentType: "application/json;charset=utf-8",
//            success: function (data) {

//                if (data >= 0) {

//                    challan.RegistrationFeeString = parseFloat(data);
//                    $("#registrationFeeGenerateChallan").val(returnCommas(data));
//                }
//                else {
//                    //$("#registrationFeeGenerateChallan").val("");
//                }
//                //$("#registrationFeeGenerateChallan").removeClass("empty");

//            },
//            error: function (data) {
//                //var response = data.responseText.replace(/"/g, '');
//                // $("#registrationFeeGenerateChallan").val("");
//                //$("#registrationFeeGenerateChallan").removeClass("empty");
//                //$("#registrationFeeGenerateChallan").addClass("empty");
//            }
//        });

//    }
//}


function calculateStampDutyDeedDetail() {
    try {
        var value = []; // Default Value
        var stampModel;
        var isUrban = false;

        if (isExchangeOfProperty == true) {
            if (challan.propertyInfo.treatAsUrban)
                isUrban = true;
            else if (challan.propertyInfo.isUrban)
                isUrban = true;
        }
        var totalAmount = $("#PropertyValuationGenerateChallan").val();
        if (totalAmount == "") {
            totalAmount = 0;
        }
        else if (totalAmount == 0) {
            $("#btnNextCVT").attr("disabled", true);
            $("#payableStampDutyGenerateChallan").val("0");
        }

        if (challan.TransactionType == judicialID) {
            totalAmount = $("#AmountOfConsiderationGenerateChallan").val();
        }

        // Calculating Stamp Duty for Highest Value is not required as we display Stamp Duty for both First and Second Property Separetly. 

        //if (isExchangeOfProperty == true) {
        //    if (totalAmount == 0) {
        //        totalAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");
        //    }
        //    else {
        //        if (parseFloat(totalAmount.replace(/,/g, "")) < parseFloat($("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, ""))) {
        //            totalAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");
        //        }
        //    }
        //}
        var isFloat = /^[0-9,.]+$/;
        var isFloatAmount = isFloat.test(totalAmount);
        if (totalAmount != null && totalAmount != "" && isFloatAmount == true) {
            // value = totalAmount.replace(/,/g, "");
            value.push(totalAmount.replace(/,/g, ""));
            var id = $("#TransactionName").val();
            var deedContainsAdvanceMoneyField = false;
            for (var k = 0; k < leaseDeedsWithAdvanceMoney.length; k++) {
                if (id == leaseDeedsWithAdvanceMoney[k]) {
                    deedContainsAdvanceMoneyField = true;
                    break;
                }
            }
            if (deedContainsAdvanceMoneyField || id == "94") {// LEASE - 35(3(b))
                var totalAmount2;
                if ($("#AverageAnnual").val() != "" && $("#AverageAnnual").val() != undefined) {
                    totalAmount2 = $("#AverageAnnual").val();
                }
                else {
                    totalAmount2 = "";
                }
                var totalAmount3;
                if ($("#AdvanceMoney").val() != "" && $("#AdvanceMoney").val() != undefined) {
                    totalAmount3 = $("#AdvanceMoney").val();
                }
                else {
                    totalAmount3 = "";
                }
                var isValidTotal3Exists = false;
                var floatNumber = parseFloat(totalAmount3);
                if (!isNaN(floatNumber)) {
                    value.push(totalAmount3.replace(/,/g, ""));
                    isValidTotal3Exists = true;
                }
                var isValidTotal2Exists = false;
                var floatNumber2 = parseFloat(totalAmount2);
                if (!isNaN(floatNumber2)) {
                    value.push(totalAmount2.replace(/,/g, ""));
                    isValidTotal2Exists = true;
                }
                if (isValidTotal2Exists == true || isValidTotal3Exists == true) {
                    stampModel = {
                        TransactionId: id,
                        Amount: value
                    }
                }
            }
            else {

                var radio_butt_transfer = 0;

                var Fixed_Percent = FixedStampValue;

                if ($("#TransactionName").val() == DebentureDeed) {
                    Fixed_Percent = 0.05;
                    var isTCChecked = $('#TransferComercialCheck').is(":checked");
                    if (isTCChecked == true)
                        Fixed_Percent = 0.02;
                }
                if ($("#TransactionName").val() == 51) {
                    Fixed_Percent = $('#SharedPercent').val();


                }
                if ($("#TransactionName").val() == TransferaDeed) {
                    var $radio = $('input[name=ShareWinthdrawl]:checked');
                    var radio_id = $radio.attr('id');
                    if (radio_id == "Withdrawl") {
                        Fixed_Percent = 1.5
                    } else {
                        Fixed_Percent = 0.15
                    }
                }
                if ($("#TransactionName").val() == LifeInsuranceDeed) {
                    var $radio = $('input[name=OriginalDuplicate]:checked');
                    var radio_id = $radio.attr('id');
                    if (radio_id == "Original") {
                        Fixed_Percent = 0.12
                    } else {
                        Fixed_Percent = 0.06
                    }



                }



                stampModel = {
                    TransactionId: id,
                    Amount: value,
                    IsUrban: isUrban,
                    Fixed_Percent: Fixed_Percent
                }
                debugger;
                $.ajax({
                    url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateStampDuty',
                    type: 'POST',
                    data: JSON.stringify(stampModel),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {

                        if (data[0] >= 0) {
                            $("#payableStampDutyGenerateChallan").val(returnCommas(data[0]));
                            challan.propertyInfo.PropertyStampDutyString = data[0];
                        }
                        else {
                            $("#payableStampDutyGenerateChallan").val("");
                        }
                        $("#payableStampDutyGenerateChallan").removeClass("empty");
                        if (data[0] < data[1]) {
                        }
                        else {
                            $("#DeedDetailGenerateNextButton").removeAttr("disabled");
                            $("#btnNextCVT").removeAttr("disabled");
                            $("#submitChallan").removeAttr("disabled");
                            $("#stampErrorMessage").hide();
                            $("#stampErrorMessage1").hide();
                        }
                        if (challan.TransactionType == judicialID) {
                            if (data[0] <= data[2] && data[0] >= data[1]) {

                                $("#submitChallan").removeAttr("disabled");
                                $("#stampErrorMessage").hide();

                            }
                            else {
                                $("#submitChallan").attr("disabled", true);
                                $("#stampErrorMessage").css("color", "red");
                                document.getElementById("stampErrorMessage").innerHTML = stampErrorMessageJ;//stampErrorMessage1 + " " + minJudicialAmount+"/- " + stampErrorMessage2 + " " + maxJudicialAmount + "/-"//"To Generate Challan 32-A, minimum payable Total Amount must be greater than or equal to Rs.  " + minJudicialAmount + "/- and less than or equal to Rs. " + maxJudicialAmount + "/-.";
                                $("#stampErrorMessage").show();
                            }
                        }
                    },
                    error: function (data) {
                        var response = data.responseText.replace(/"/g, '');
                        $("#payableStampDutyGenerateChallan").val("");
                        $("#payableStampDutyGenerateChallan").removeClass("empty");
                        $("#payableStampDutyGenerateChallan").addClass("empty");
                    }
                });
            }
        }
        else {
            value = 0;
            $("#payableStampDutyGenerateChallan").val("");
        }
    }
    catch (ex) { alert(ex); }
}

//function calculateRegistrationFeePayCVTandRegistration() {
//    try {

//        var val = [];

//        var totalAmount = $("#PropertyValuationPayCVTandReg").val();
//        val.push(totalAmount.replace(/,/g, ""));

//        var id = transectionIdPayCVTandReg;

//        var totalAmount2 = "";
//        if (queryStringName == "PayCVTandReg") {

//            var deedContainsAdvanceMoneyField = false;

//            for (var k = 0; k < leaseDeedsWithAdvanceMoney.length; k++) {

//                if (id == leaseDeedsWithAdvanceMoney[k]) {
//                    deedContainsAdvanceMoneyField = true;
//                    break;
//                }

//            }

//            var totalAmount3 = 0;
//            if (deedContainsAdvanceMoneyField)
//            {
//                for (var i = 1; i < challan.lstTaxAmountValue.length; i++)
//                {
//                    if (challan.lstTaxAmountValue[i].FieldName == "Advance Money (Rs.)" )
//                    {
//                        // iterate over all fields other than primary field on which stamp duty is calculated 
//                        totalAmount2 = challan.lstTaxAmountValue[i].AmountValue;
//                        val.push(totalAmount2);
//                    }
//                    else if (challan.lstTaxAmountValue[i].FieldName == "Average Annual Rent (Rs.)")
//                    {
//                        totalAmount3 = challan.lstTaxAmountValue[i].AmountValue;
//                        val.push(totalAmount3);
//                    }
//                }

//            }
//        }

//        var stampModel = {
//            TransactionId: id,
//            Amount: val

//        }

//        $.ajax({
//            url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateRegistrationFee',
//            type: 'POST',
//            data: JSON.stringify(stampModel),
//            contentType: "application/json;charset=utf-8",
//            success: function (data) {
//                if (data >= 0) {
//                    $("#registrationFeePayCVTandReg").val(returnCommas(data));
//                }
//                else {
//                    $("#registrationFeePayCVTandReg").val("");
//                }
//                $("#registrationFeePayCVTandReg").removeClass("empty");

//            },
//            error: function (data) {
//                var response = data.responseText.replace(/"/g, '');
//                $("#registrationFeePayCVTandReg").val("");
//                $("#registrationFeePayCVTandReg").removeClass("empty");
//                $("#registrationFeePayCVTandReg").addClass("empty");
//            }
//        });
//    }
//    catch (ex) {
//        alert(ex);
//    }

//}

function calculateRegistrationFeeDeedDetail() {
    try {

        var value = []; // Default Value
        var isUrban = false;
        if (challan.propertyInfo.treatAsUrban)
            isUrban = true;
        else if (challan.propertyInfo.isUrban)
            isUrban = true;
        var totalAmount = $("#PropertyValuationGenerateChallan").val();

        if (challan.transactionType == judicialID) {

            totalAmount = $("#AmountOfConsiderationGenerateChallan").val();

        }

        if (isExchangeOfProperty == true) {

            if (parseFloat(totalAmount.replace(/,/g, "")) < parseFloat($("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, ""))) {
                totalAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");
            }

        }



        var isFloat = /^[0-9,.]+$/;
        var isFloatAmount = isFloat.test(totalAmount);

        if (totalAmount != null && totalAmount != "" && isFloatAmount == true) {
            // value = totalAmount.replace(/,/g, "");
            value.push(totalAmount.replace(/,/g, ""));
            var id = $("#TransactionName").val();

            var deedContainsAdvanceMoneyField = false;

            for (var k = 0; k < leaseDeedsWithAdvanceMoney.length; k++) {

                if (id == leaseDeedsWithAdvanceMoney[k]) {
                    deedContainsAdvanceMoneyField = true;
                    break;
                }

            }
            // ===========================================//
            // Merger of Duties Change;

            if (deedContainsAdvanceMoneyField || id == "94") {// LEASE - 35(3(b))
                var totalAmount2;

                if ($("#AverageAnnual").val() != "" && $("#AverageAnnual").val() != undefined) {
                    totalAmount2 = $("#AverageAnnual").val();
                }
                else {
                    totalAmount2 = "";
                }

                var totalAmount3;

                if ($("#AdvanceMoney").val() != "" && $("#AdvanceMoney").val() != undefined) {
                    totalAmount3 = $("#AdvanceMoney").val();
                }
                else {
                    totalAmount3 = "";
                }

                var isValidTotal3Exists = false;
                var floatNumber = parseFloat(totalAmount3);
                if (!isNaN(floatNumber)) {
                    value.push(totalAmount3.replace(/,/g, ""));
                    isValidTotal3Exists = true;
                }

                var isValidTotal2Exists = false;
                var floatNumber2 = parseFloat(totalAmount2);
                if (!isNaN(floatNumber2)) {
                    //value.push(totalAmount3.replace(/,/g, ""));
                    value.push(totalAmount2.replace(/,/g, ""));
                    isValidTotal2Exists = true;
                }

                //var isFloatAmount2 = isFloat.test(totalAmount2);

                if (isValidTotal2Exists == true || isValidTotal3Exists == true) {

                    var stampModel = {
                        TransactionId: id,
                        Amount: value
                    }

                    $.ajax({
                        url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateRegistrationFee',
                        type: 'POST',
                        data: JSON.stringify(stampModel),
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data >= 0) {
                                $("#registrationFeeGenerateChallan").val(returnCommas(data));
                            }
                            else {
                                $("#registrationFeeGenerateChallan").val("");
                            }
                            $("#registrationFeeGenerateChallan").removeClass("empty");

                        },
                        error: function (data) {
                            var response = data.responseText.replace(/"/g, '');
                            $("#registrationFeeGenerateChallan").val("");
                            $("#registrationFeeGenerateChallan").removeClass("empty");
                            $("#registrationFeeGenerateChallan").addClass("empty");
                        }
                    });

                }

            }
            else {

                var stampModel = {
                    TransactionId: id,
                    Amount: value

                }

                $.ajax({
                    url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateRegistrationFee',
                    type: 'POST',
                    data: JSON.stringify(stampModel),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data >= 0) {
                            $("#registrationFeeGenerateChallan").val(returnCommas(data));
                        }
                        else {
                            $("#registrationFeeGenerateChallan").val("");
                        }
                        $("#registrationFeeGenerateChallan").removeClass("empty");

                    },
                    error: function (data) {
                        var response = data.responseText.replace(/"/g, '');
                        $("#registrationFeeGenerateChallan").val("");
                        $("#registrationFeeGenerateChallan").removeClass("empty");
                        $("#registrationFeeGenerateChallan").addClass("empty");
                    }
                });
            }

        }
        else {
            value = 0;

            $("#registrationFeeGenerateChallan").val("");
        }


    }
    catch (ex) { alert(ex); }
}

function onChangeLandAndConstructedDeedDetailGenerateChallan() {
    debugger;
    var landValue = constructedValue = 0;
    if ($("#TransactionName").val() != PartitionDeed) {
        if ($("#landProperty").val() != "" && $("#landProperty").val() != "NaN")
            landValue = parseFloat($("#landProperty").val().replace(/,/g, ""));


        else {
            landValue = 0;
            $("#landProperty").val('');
        }

        if ($("#constructedStructureValueGenerateChallan").val() != "" && $("#constructedStructureValueGenerateChallan").val() != "NaN") {
            constructedValue = parseFloat($("#constructedStructureValueGenerateChallan").val().replace(/,/g, ""));
            // $('#propertyConstructed').attr("required", "required");
            $('#propertyConstructed').prop('checked', true);
            $('#propertyConstructed').attr('checked', true);
        }
        else {
            $("#constructedStructureValueGenerateChallan").val('')
            constructedValue = 0;
            //  $('#propertyConstructed').removeAttr("required");
            $('#propertyConstructed').attr("checked", true);
            $('#propertyConstructed').attr('checked', true);
        }
    }
    if (isNaN(landValue)) landValue = 0;
    if (isNaN(constructedValue)) constructedValue = 0;
    if (landValue != 0 || constructedValue != 0) {
        var sum = landValue + constructedValue;
    }


    if (sum != 0 && sum != null && sum != "" && sum != "NaN") {
        $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
        onChangeTotalAmountDeedDetailGenerateChallan();
    }
    else {
        if (sum == 0) {
            $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
            onChangeTotalAmountDeedDetailGenerateChallan();

        }
        else
            $("#PropertyValuationGenerateChallan").val("");
    }
    if (isExchangeOfProperty) {
        var landValue2 = constructedValue2 = 0;
        if ($("#landProperty2").val() != "" && $("#landProperty2").val() != "NaN")
            landValue2 = parseFloat($("#landProperty2").val().replace(/,/g, ""));
        else {
            landValue2 = 0;
            $("#landProperty2").val('');
        }
        if ($("#constructedStructureValueSecond").val() != "" && $("#constructedStructureValueSecond").val() != "NaN")
            constructedValue2 = parseFloat($("#constructedStructureValueSecond").val().replace(/,/g, ""));
        else {
            constructedValue2 = 0;
            $("#constructedStructureValueSecond").val('');
        }
        var sum = landValue2 + constructedValue2;
        if (sum != 0 && sum != null && sum != "" && sum != "NaN") {
            $("#PropertyValuationGenerateChallanSecond").val(returnCommas(sum));
            onChangeTotalAmountDeedDetailGenerateChallan();
        }
        else {
            $("#PropertyValuationGenerateChallanSecond").val("");
        }
    }
}

function SumAmountChange() {
    var TotalSumRevenue = 0;
    var monthlyRent = 0;
    var AnualRent = 0;
    if ($("#MonthlyRent").val() != "" && $("#MonthlyRent").val() != "NaN") {

        monthlyRent = parseFloat($("#MonthlyRent").val().replace(/,/g, ""));
    }

    if ($("#AnualRent").val() != "" && $("#AnualRent").val() != "NaN") {

        AnualRent = parseFloat($("#AnualRent").val().replace(/,/g, ""));
    }

    TotalSumRevenue = monthlyRent + AnualRent;
    var sum = TotalSumRevenue;
    if (sum != 0 && sum != null && sum != "" && sum != "NaN") {
        $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
        onChangeTotalAmountDeedDetailGenerateChallan();
    }

}
function onChangeNumberofPolicies() {
    var SetValue1 = 0;
    var SetValue2 = 0;
    var SetValue3 = 0;
    var SetValue4 = 0;
    var SetValue5 = 0
    var SetValue6 = 0;
    var SetValue7 = 0;
    if ($("#NuberofPolicies").val() != "" && $("#NuberofPolicies").val() != "NaN") {
        SetValue1 = parseFloat($("#NuberofPolicies").val().replace(/,/g, ""));
        SetValue1 = SetValue1 * 10;
    }

    if ($("#NuberofPolicies").val() == "" || $("#NuberofPolicies").val() == "NaN") {
        $("#NuberofPolicies").val(0);
        SetValue1 = 0;
    }
    if ($("#RecpietAbove").val() != "" && $("#RecpietAbove").val() != "NaN") {
        SetValue2 = parseFloat($("#RecpietAbove").val().replace(/,/g, ""));
        SetValue2 = SetValue2 * 20;
    }

    if ($("#RecpietAbove").val() == "" || $("#RecpietAbove").val() == "NaN") {
        $("#RecpietAbove").val(0);
        SetValue2 = 0;
    }
    if ($("#RecpietAbove1").val() != "" && $("#RecpietAbove1").val() != "NaN") {
        SetValue3 = parseFloat($("#RecpietAbove1").val().replace(/,/g, ""));
        SetValue3 = SetValue3 * 50;
    }

    if ($("#RecpietAbove1").val() == "" || $("#RecpietAbove1").val() == "NaN") {
        $("#RecpietAbove1").val(0);
        SetValue3 = 0;

    }
    if ($("#RecpietAbove2").val() != "" && $("#RecpietAbove2").val() != "NaN") {
        SetValue4 = parseFloat($("#RecpietAbove2").val().replace(/,/g, ""));
        SetValue4 = SetValue4 * 100;
    }

    if ($("#RecpietAbove2").val() == "" || $("#RecpietAbove2").val() == "NaN") {
        $("#RecpietAbove2").val(0);
        SetValue4 = 0;
    }
    if ($("#RecpietAbove3").val() != "" && $("#RecpietAbove3").val() != "NaN") {
        SetValue5 = parseFloat($("#RecpietAbove3").val().replace(/,/g, ""));
        SetValue5 = SetValue5 * 500;
    }

    if ($("#RecpietAbove3").val() == "" || $("#RecpietAbove3").val() == "NaN") {
        $("#RecpietAbove3").val(0);
        SetValue5 = 0;
    }
    if ($("#RecpietAbove4").val() != "" && $("#RecpietAbove4").val() != "NaN") {
        SetValue6 = parseFloat($("#RecpietAbove4").val().replace(/,/g, ""));
        SetValue6 = SetValue6 * 1000;
    }

    if ($("#RecpietAbove4").val() == "" || $("#RecpietAbove4").val() == "NaN") {
        $("#RecpietAbove4").val(0);
        SetValue6 = 0;
    }
    if ($("#RecpietAbove5").val() != "" && $("#RecpietAbove5").val() != "NaN") {
        SetValue7 = parseFloat($("#RecpietAbove5").val().replace(/,/g, ""));
        SetValue7 = SetValue7 * 2000;
    }

    if ($("#RecpietAbove5").val() == "" || $("#RecpietAbove5").val() == "NaN") {
        $("#RecpietAbove5").val(0);
        SetValue7 = 0;
    }


    var sum = SetValue1 + SetValue2 + SetValue3 + SetValue4 + SetValue5 + SetValue6 + SetValue7;
    if (sum != 0 && sum != null && sum != "" && sum != "NaN") {
        $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
        onChangeTotalAmountDeedDetailGenerateChallan();
    }
    else {
        if (sum == 0) {
            $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
            onChangeTotalAmountDeedDetailGenerateChallan();

        }
        else
            $("#PropertyValuationGenerateChallan").val("");
    }

}


function onChangeSharePercent() {
    var StampAmountProperty = 0;
    var shared_percent = 0;
    var seperate_share_value = 0;
    if ($("#SharedPercent").val() != "" && $("#SharedPercent").val() != "NaN") {
        shared_percent = parseFloat($("#SharedPercent").val().replace(/,/g, ""));
    }

    if ($("#Seperate_value").val() != "" && $("#Seperate_value").val() != "NaN") {
        seperate_share_value = parseFloat($("#Seperate_value").val().replace(/,/g, ""));

    }
    if (shared_percent > 0 && seperate_share_value > 0) {

        StampAmountProperty = seperate_share_value * shared_percent / 100;


    }

    if (StampAmountProperty != 0 && StampAmountProperty != null && StampAmountProperty != "" && StampAmountProperty != "NaN") {
        $("#PropertyValuationGenerateChallan").val(returnCommas(StampAmountProperty));
        onChangeTotalAmountDeedDetailGenerateChallan();
    }
    else {
        if (StampAmountProperty == 0) {
            $("#PropertyValuationGenerateChallan").val(returnCommas(StampAmountProperty));
            onChangeTotalAmountDeedDetailGenerateChallan();

        }
        else
            $("#PropertyValuationGenerateChallan").val("");
    }

}



function onChangeNumberofSets() {
    var SetValue = 0;
    if ($("#NuberofSets").val() != "" && $("#NuberofSets").val() != "NaN")
        SetValue = parseFloat($("#NuberofSets").val().replace(/,/g, ""));

    // if (isNaN(SetValue)) SetValue = 0;


    var sum = SetValue * FixedStampValue;

    //alert("StampDuty Fixed = " + challan.StampDutyFixed);
    //alert("Sum = " + sum);

    if (sum != 0 && sum != null && sum != "" && sum != "NaN") {
        $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
        onChangeTotalAmountDeedDetailGenerateChallan();
    }
    else {
        if (sum == 0) {
            $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
            onChangeTotalAmountDeedDetailGenerateChallan();

        }
        else
            $("#PropertyValuationGenerateChallan").val("");
    }

}
function onChangeShareFaceValue() {
    var TotalNumberofShare = 0;
    var FaceVale = 0;
    var Total_Face_value = 0;
    if ($("#TotalShare").val() != "" && $("#TotalShare").val() != "NaN") {
        TotalNumberofShare = parseFloat($("#TotalShare").val().replace(/,/g, ""));
    }
    if ($("#FaceVale").val() != "" && $("#FaceVale").val() != "NaN") {
        FaceVale = parseFloat($("#FaceVale").val().replace(/,/g, ""));
    }
    if (TotalNumberofShare > 0 && FaceVale > 0) {
        Total_Face_value = TotalNumberofShare * FaceVale;
        $("#PropertyValuationGenerateChallan").val(returnCommas(Total_Face_value));
        onChangeTotalAmountDeedDetailGenerateChallan();
    }
    //debugger;
    //var $radio = $('input[name=ShareWinthdrawl]:checked');
    //var radio_id = $radio.attr('id');
    //// alert(radio_id);
    //if (radio_id == "CDC") {
    //    challan.TransferType = "TransferCDC";
    //   challan.FixedPercentForTransfer_a = 0.15
    //} else {
    //    challan.TransferType = "TransferWithdrawl";
    //    challan.FixedPercentForTransfer_a = 1.5
    //}



}
// $('input[type=radio][name=ShareWinthdrawl]').on('change', function() {
//// $('input[type=radio][name=ShareWinthdrawl]').change(function () {
//    // if (this.value == 'allot') {
//         alert("Allot Thai Gayo Bhai");
//    // }
//    // else if (this.value == 'transfer') {
//        // alert("Transfer Thai Gayo");
//    // }
// });
function calculateTotalFaceValue() {
    // alert('ok')
    debugger;
    //if ($("#NumberOfShares").val() != "" && $("#NumberOfShares").val() != "NaN") {
    //    TotalNumberofShare = parseFloat($("#NumberOfShares").val().replace(/,/g, ""));
    //}
    //if ($("#ValueOfShare").val() != "" && $("#ValueOfShare").val() != "NaN") {
    //    FaceVale = parseFloat($("#ValueOfShare").val().replace(/,/g, ""));
    //}
    var NumberOfShares = $("#NumberOfShares").val();
    var ValOfShares = $("#ValueOfShare").val();

    if ($("#NumberOfShares").val() != "" && $("#NumberOfShares").val() != "NaN") {
        NumberOfShares = parseFloat($("#NumberOfShares").val().replace(/,/g, ""));
    }

    if ($("#ValueOfShare").val() != "" && $("#ValueOfShare").val() != "NaN") {
        ValOfShares = parseFloat($("#ValueOfShare").val().replace(/,/g, ""));
    }

    if (isNaN(NumberOfShares)) NumberOfShares = 0;
    if (isNaN(ValOfShares)) ValOfShares = 0;

    //if (NumberOfShares != "" && NumberOfShares != null && NumberOfShares!=undefined) {
    //    NumberOfShares = parseFloat(NumberOfShares)
    //}

    //if (ValOfShares != "" && ValOfShares != null && ValOfShares != undefined) {
    //    ValOfShares = parseFloat(ValOfShares)
    //}
    var ValOfTotalFace = 0;
    if (NumberOfShares != 0 || ValOfShares != 0) {
        ValOfTotalFace = NumberOfShares * ValOfShares;
    }
    // = NumberOfShares * ValOfShares;

    $("#PropertyValuationGenerateChallan").val(returnCommas(ValOfTotalFace))
}
function onChangeSquareYardDeedDetailGenerateChallan() {
    var SquareValue = 0;
    if ($("#SquareYard").val() != "" && $("#SquareYard").val() != "NaN")
        SquareValue = parseFloat($("#SquareYard").val().replace(/,/g, ""));

    if (isNaN(SquareValue)) SquareValue = 0;


    var sum = SquareValue * FixedStampValue;

    //alert("StampDuty Fixed = " + challan.StampDutyFixed);
    //alert("Sum = " + sum);

    if (sum != 0 && sum != null && sum != "" && sum != "NaN") {
        $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
        onChangeTotalAmountDeedDetailGenerateChallan();
    }
    else {
        if (sum == 0) {
            $("#PropertyValuationGenerateChallan").val(returnCommas(sum));
            onChangeTotalAmountDeedDetailGenerateChallan();

        }
        else
            $("#PropertyValuationGenerateChallan").val("");
    }
    if (isExchangeOfProperty) {
        var landValue2 = constructedValue2 = 0;
        if ($("#landProperty2").val() != "" && $("#landProperty2").val() != "NaN")
            landValue2 = parseFloat($("#landProperty2").val().replace(/,/g, ""));
        else {
            landValue2 = 0;
            $("#landProperty2").val('');
        }
        if ($("#constructedStructureValueSecond").val() != "" && $("#constructedStructureValueSecond").val() != "NaN")
            constructedValue2 = parseFloat($("#constructedStructureValueSecond").val().replace(/,/g, ""));
        else {
            constructedValue2 = 0;
            $("#constructedStructureValueSecond").val('');
        }
        var sum = landValue2 + constructedValue2;
        if (sum != 0 && sum != null && sum != "" && sum != "NaN") {
            $("#PropertyValuationGenerateChallanSecond").val(returnCommas(sum));
            onChangeTotalAmountDeedDetailGenerateChallan();
        }
        else {
            $("#PropertyValuationGenerateChallanSecond").val("");
        }
    }
}

function onChangeTotalAmountDeedDetailGenerateChallan() {
    debugger;
    var isRegChecked = $('#RegitrationFeeCheck').is(":checked");
    if (isRegChecked == true) {
        calculateRegistrationFeeDeedDetail();
    }
    var isStampChecked = $('#StampDutyCheck').is(":checked");
    if ($("#TransactionName").val() == oralMutationDeedId || $("#TransactionName").val() == cvtRegistrationDeedId) {
        isStampChecked = false;
    }
    if (isStampChecked == true) {

        if (challan.TransactionType == judicialID) {
            var userInputAmount = parseFloat($("#AmountOfConsiderationGenerateChallan").val().replace(/,/g, ""))
            if (userInputAmount > maxJudicialAmount || userInputAmount < minJudicialAmount) {
                $("#submitChallan").attr("disabled", true);
                $("#stampErrorMessage").css("color", "red");
                document.getElementById("stampErrorMessage").innerHTML = stampErrorMessageJ;//stampErrorMessage1 + " " + minJudicialAmount + "/- " + stampErrorMessage2 + " " + maxJudicialAmount + "/-"//"To Generate Challan 32-A, minimum payable Total Amount must be greater than or equal to Rs.  " + minJudicialAmount + "/- and less than or equal to Rs. " + maxJudicialAmount + "/-.";
                calculateStampDutyDeedDetail();
            }
            else {
                // $("#btnNextCVT").removeAttr("disabled");
                $("#submitChallan").removeAttr("disabled");
                $("#stampErrorMessage").hide();
                calculateStampDutyDeedDetail();
            }
        }
        else {
            calculateStampDutyDeedDetail();

        }

    }

}

function calculateCVTDutyandMergeWithStampDuty(propertyValue) {


}
function resetGenerateChallanDeedScreen() {
    ResetTextBox("PropertyAddressGenerateChallan");
    ResetTextBox("PropertyValuationGenerateChallan");
    ResetTextBox("SuitForGenerateChallan");
    ResetTextBox("AmountOfConsiderationGenerateChallan");
    ResetTextBox("payableStampDutyGenerateChallan");
    ResetTextBox("registrationFeeGenerateChallan");
    ResetTextBox("LeasePeriodGenerateChallan");
    ResetTextBox("TotalLeaseMoneyGenerateChallan");
    ResetTextBox("AdvanceMoneyGenerateChallan");
    ResetTextBox("constructedStructureValueGenerateChallan");
    if (isExchangeOfProperty == true) {
        ResetTextBox("constructedStructureValueSecond");
        ResetTextBox("PropertyAddressGenerateChallanSecond");
        ResetTextBox("PropertyValuationGenerateChallanSecond");
    }

    $(".k-invalid-msg").hide();
    //$("#NumberOfStampPapersGenerateChallanDeedDetail").val("").data("kendoDropDownList").text("Number of Stamp Papers");
    //initializeStaticDropDown(numberOfStampsdata, "Select Number Of Stamp Papers", "NumberOfStampPapersGenerateChallanDeedDetail");
    //var captchaObj = $("#CaptchaCode").get(0).Captcha;
    //captchaObj.ReloadImage();
}
function ResetCaptchaOnclick() {
    // alert('yeah')
    var captchaObj = $("#CaptchaCode").get(0).Captcha;
    captchaObj.ReloadImage();
}
function resetDeficientDeedScreen() {
    ResetTextBox("SuitForDeficient");
    ResetTextBox("PropertyAddressDeficient");
    ResetTextBox("PropertyValuationDeficient");
    ResetTextBox("DeficientAmount");
    ResetTextBox("PenaltyDeficient");
    ResetTextBox("TotalDeficient");
    $(".k-invalid-msg").hide();

    //var captchaObj = $("#CaptchaCode").get(0).Captcha;
    //captchaObj.ReloadImage();
}

function OnChangeLandTypeCVT() {
    var $radio = $('input[name=LandTypeCVT]:checked');

    var id = $radio.attr('id');

    if (id == "RuralCVT") {
        // $("#ruralAreaWarning").show();
        //$("#LandTypeCVTdiv").hide();
        //  $("#LandClassificationCVTDiv").hide();
        $("#LandAreaCVTDiv").hide();
        $("#payableCVTExchagneOfPropertyDiv").hide();

        //  $('#PayableCVTCVTDiv').hide();
        // $('#PayableCVTValue').val("");
        //   $('#PayCVTValueMultipleProperties').val("");


        $('#payableStampDutyandCVTGenerateChallan').show();

        if (isMultiplePropertiesExchageOfProperty && isExchangeOfProperty) {
            if (isCVTNextFirstScreen) {
                challan.propertyInfo.isUrban = false;
            }
            else if (!isCVTNextFirstScreen) {
                challan.propertyInfo2.isUrban = false;
            }
        }
        else {
            challan.applyCVT = false;
            challan.PayableCvtString = null;
            challan.PayableSDandCVTString = null;
            challan.propertyInfo.isUrban = false;
        }

    }
    else {
        //  $("#LandTypeCVTdiv").show();
        LandClassificationCVT = 0;
        $('#ruralAreaWarning').hide();
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassifications', "Select Land Classifications", "LandClassificationCVT");           
        $('#payableStampDutyandCVTGenerateChallan').show();

        if (challan.isMultiplePropertiesExchageOfProperty) {
            if (isCVTNextFirstScreen) {
                challan.propertyInfo.isUrban = true;
            }
            else if (!isCVTNextFirstScreen) {
                challan.propertyInfo2.isUrban = true;
            }

        }
        else {
            //   $("#payableCVTExchagneOfPropertyDiv").hide();
            //  $("#LandClassificationCVTDiv").show();
            // ResetTextBox("LandAreaCVT");
            //  $("#LandAreaCVTDiv").show();

            //document.getElementById("LandAreaCVT").innerHTML = tempLandValue + "";

            $('#PayableCVTCVTDiv').show();

            if (isMultiplePropertiesExchageOfProperty && isExchangeOfProperty) {
                if (isCVTNextFirstScreen) {
                    challan.propertyInfo.isUrban = true;
                }
                else if (!isCVTNextFirstScreen) {
                    challan.propertyInfo2.isUrban = true;
                }
            }
            else {
                challan.applyCVT = true;
                //challan.PayableCvtString = null;
                challan.propertyInfo.isUrban = true;
            }
        }
    }

    calculateCVTTaxAmount();
}
function populateFirstScreenWhenComingBackFromSecondScreenDC2() {

    $(".k-invalid-msg").hide();
    if (challan.propertyInfo2.isUrban == true) {
        $('#Urban').prop('checked', true);
        LandClassificationChange();

        bothKandSqN_IsKhasraHierarchy = false;
        bothKandSqN_IsSqNoHierarchy = false;
        dropdownIdentifier = 0;
        $("#BasementDropdownDCDiv").hide();
        $("#FLDropdownDCDiv").hide();

        $('#DCRateNotFoundLabel').hide();
        $('#SQFRateNotFoundLabel').hide();
        $('#RateRuralNotFoundLabel').hide();

        $('#CoveredAreaRate').hide();
        // $('#PropertyAreaRate').hide(); 

        $("#DCValueError").hide();
        $(".k-invalid-msg").hide();
        if ($('#districtDropdownDC').data("kendoDropDownList") != null)
            $("#districtDropdownDC").val("").data("kendoDropDownList").text(selectDistrictText);
        if ($('#talukaDropdownDC').data("kendoDropDownList") != null)
            $("#talukaDropdownDC").val("").data("kendoDropDownList").text(selectTehsilText);
        if ($('#PropertyArea').data("kendoDropDownList") != null)
            $("#PropertyArea").val("").data("kendoDropDownList").text("");


        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC", challan.propertyInfo2.DistrictId);
        initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.propertyInfo2.DistrictId, selectTehsilText, "tehsilDropdownDC", challan.propertyInfo2.TehsilId);
        // initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?Id=' + challan.propertyInfo2.TehsilId, selectTownText, "townDropdownDC", challan.propertyInfo2.TownString);
        //   initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=' + challan.propertyInfo2.TehsilId + '&town=' + challan.propertyInfo2.TownString, selectRevenueCircleText, "RevenueCircle", challan.propertyInfo2.RevenueCircleId);
        //   var dropdownlist = $("#RevenueCircle").data("kendoDropDownList");
        //   dropdownlist.value(challan.propertyInfo2.RevenueCircleId);
        initializePropertyAreaDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?TehsilId=' + challan.propertyInfo2.TehsilId + '&town=' + challan.propertyInfo2.TownString + '&RevenueCircleId=' + challan.propertyInfo2.RevenueCircleId, "Select Property Area", "PropertyArea", challan.propertyInfo2.PropertyAreaString);

        // initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/GetFloors?RevenueCircleId=' + challan.propertyInfo2.RevenueCircleId, selectFloorText, "Floor", challan.propertyInfo2.FloorId);
        // var floordropdownlist = $("#Floor").data("kendoDropDownList");
        //   floordropdownlist.value(challan.propertyInfo2.FloorId);
        //var dropdownlist2 = $("#PropertyArea").data("kendoDropDownList");
        //dropdownlist2.value(challan.propertyInfo.PropertyAreaId);

        if (challan.propertyInfo2.IsKhasraAvailable) {
            $('#khasraUrbanDiv').show();
            $("#KhasraUrban").val(challan.propertyInfo2.KhasraUrbanNo);
            KhasraUrbanId = challan.propertyInfo2.KhasraUrbanID;
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyAreaKhasraUrban?khasraUrbanNo=' + challan.propertyInfo2.KhasraUrbanNo +
                "&PropertyAreaID=" + challan.propertyInfo2.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo2.RevenueCircleId + "&tehsilId=" + challan.propertyInfo2.TehsilId + "&town=" + +challan.propertyInfo2.TownString, selectlandClassificationText, "LandClassificationUrban");

            var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
            dropdownlist3.value(challan.propertyInfo2.LandClassificationId);
            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaIdHavingKhasraNo?tehsilId=' + challan.propertyInfo2.TehsilId + "&town=" + challan.propertyInfo2.TownString + "&PropertyAreaID=" + challan.propertyInfo2.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo2.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "LocationUrban", challan.propertyInfo2.LocationUrbanString);
        }

        else if (challan.propertyInfo2.isSquareNoHierarchy) {
            $('#squareNoUrbanHierarchyDiv').show();
            $("#squareNoUrban").val(challan.propertyInfo2.SquareNoUrban);
            SquareNoUrbanId = challan.propertyInfo2.SquareUrbanID;
            $("#qilaNoUrban").val(challan.propertyInfo2.QilaNoUrban);
            QilaNoUrbanId = challan.propertyInfo2.QilaUrbanID;

            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByQilaNoUrban?TehsilId=' + challan.propertyInfo2.TehsilId + '&town=' + challan.propertyInfo2.TownString + '&revenueCircleId=' + challan.propertyInfo2.RevenueCircleId + '&PropertyAreaID=' + challan.propertyInfo2.PropertyAreaId + "&squareNoId=" + challan.propertyInfo2.SquareUrbanID + '&qilaUrbanNo=' + challan.propertyInfo2.QilaNoUrban, selectlandClassificationText, "LandClassificationUrban", challan.propertyInfo2.LandClassificationString);
            //var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
            //dropdownlist3.value(challan.propertyInfo.LandClassificationId);
            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaIdHavingSquareNo?tehsilId=' + challan.propertyInfo2.TehsilId + "&town=" + challan.propertyInfo2.TownString + "&PropertyAreaID=" + challan.propertyInfo2.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo2.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "LocationUrban", challan.propertyInfo2.LocationUrbanString);
        }
        else {
            $('#khasraUrbanDiv').hide();
            $('#squareNoUrbanHierarchyDiv').hide();
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaName=' + challan.propertyInfo2.PropertyAreaString + "&revenueCircleId=" +
                challan.propertyInfo2.RevenueCircleId + "&tehsilId=" + challan.propertyInfo2.TehsilId + "&town=" + challan.propertyInfo2.town, selectlandClassificationText, "LandClassificationUrban");

            var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
            dropdownlist3.value(challan.propertyInfo2.LandClassificationId);
            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaId?tehsilId=' + challan.propertyInfo2.TehsilId + "&town=" + challan.propertyInfo2.TownString + "&PropertyAreaId=" + challan.propertyInfo2.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo2.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "LocationUrban", challan.propertyInfo2.LocationUrbanString);
        }




        $('#PropertyAreaQuantity').val(challan.propertyInfo2.Area);

        //var dropdownlist4 = $("#LocationUrban").data("kendoDropDownList");

        //dropdownlist4.value(challan.propertyInfo.LocationId);
    }
    else {
        challan.propertyInfo2.isUrban == false;
        $('#Rural').prop('checked', true);
        LandClassificationChange();
        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC", challan.propertyInfo2.DistrictId);
        initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.propertyInfo2.DistrictId, selectTehsilText, "tehsilDropdownDC", challan.propertyInfo2.TehsilId);
        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + challan.propertyInfo2.TehsilId, "Select Qanoongoee", "Qanoongoee", challan.propertyInfo2.QanoongoeeId);
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + challan.TehsilId, "Select Qanoongoee", "Qanoongoee");
        //var dropdownlist = $("#Qanoongoee").data("kendoDropDownList");
        //dropdownlist.value(challan.propertyInfo2.QanoongoeeId);
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=' + challan.propertyInfo2.QanoongoeeId, "Select Mouza", "Mouza");
        initializeMouzaDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=' + challan.propertyInfo2.QanoongoeeId, "Select Mouza", "Mouza", challan.propertyInfo2.MouzaString);
        //var dropdownlist2 = $("#Mouza").data("kendoDropDownList");
        //dropdownlist2.value(challan.propertyInfo2.MouzaId);
        if (challan.propertyInfo2.isKhasraHierarchy) {
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=' + encodeURIComponent(challan.propertyInfo2.MouzaString) + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId, selectlandClassificationText, "LandClassification");
        }
        else {
            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaNameForSquareNo?MouzaName=' + encodeURIComponent(challan.propertyInfo2.MouzaString) + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId, selectlandClassificationText, "LandClassification");
        }
        var dropdownlist3 = $("#LandClassification").data("kendoDropDownList");
        dropdownlist3.value(challan.propertyInfo2.LandClassificationId);
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=' + challan.propertyInfo2.MouzaString + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "Location");
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=' + challan.propertyInfo2.MouzaString + "&QanoonGoId=" + challan.propertyInfo.QanoongoeeId, selectlandClassificationText, "LandClassification");
        //var dropdownlist3 = $("#LandClassification").data("kendoDropDownList");
        //dropdownlist3.value(challan.propertyInfo.LandClassificationId);
        //$('#PropertyAreaQuantity').val(challan.propertyInfo.Area);
        if (challan.propertyInfo2.isKhasraHierarchy) {
            $('#squareNoHierarchyDiv').hide();
            $('#btnMultipleSquareQila').hide();
            $('#khasraHierarchyDiv').show();
            $('#khasraTypeRadioButtonDiv').show();
            $("#squareQilaTypeRadioButtonDiv").hide();
            multipleKhasraList = challan.propertyInfo2.MultipleKhasras;
            multipleKhasraDCRateType = challan.propertyInfo2.MultipleKhasraDCRateType;
            multipleKhasrasSelected = (challan.propertyInfo2.MultipleKhasras != null && challan.propertyInfo2.MultipleKhasras.length > 0 ? true : false);

            if (multipleKhasrasSelected) {
                MouzaNameGlobal = $('#Mouza').data("kendoDropDownList").text();
                MouzaIdGlobal = $("#Mouza").val();
                QanoongoidGlobal = $("#Qanoongoee").val();
                $("#KhasraTypeMultipleKhasra").prop("checked", true);
                $("#KhasraTypeSingleKhasra").prop("checked", false);
            }
            else {
                $("#KhasraTypeSingleKhasra").prop("checked", true);
                $("#KhasraTypeMultipleKhasra").prop("checked", false);
            }

            onKharaTypeChange();

            if (multipleKhasraDCRateType == highestRateApplied || multipleKhasraDCRateType == "") {
                $("#landAreaLabelDiv").show();
                $("#PropertyAreaQuantity").show();
                $("#PropertyAreaQuantityLabel").show();
                $("#PropertyAreaQuantity").val(challan.propertyInfo2.Area);

                $("#LandUnitOfArea").show();
                document.getElementById("LandUnitOfArea").innerHTML = '&nbsp;' + challan.propertyInfo2.rateUnit;
                $("#btnAreaCalcDiv").show();
            }
            else {
                $("#landAreaLabelDiv").hide();
                $("#PropertyAreaQuantity").hide();
                $("#PropertyAreaQuantityLabel").hide();
            }

            if (multipleKhasraDCRateType == allRatesApplied) {
                allRatesAppliedFlag = true;
                highestRateApplieedFlag = false;
            }
            else if (multipleKhasraDCRateType == highestRateApplied) {
                allRatesAppliedFlag = false;
                highestRateApplieedFlag = true;
            }

            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=' + encodeURIComponent(challan.propertyInfo2.MouzaString) + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "Location", challan.propertyInfo2.LocationString);
        }
        else {
            $("#squareQilaTypeRadioButtonDiv").show();
            $('#btnMultipleKhasra').hide();
            $('#squareNoHierarchyDiv').show();
            $('#khasraHierarchyDiv').hide();
            multipleSquareQilaList = challan.propertyInfo2.MultipleQilas;
            multipleSquareQilaDCRateType = challan.propertyInfo2.MultipleSquareQilaDCRateType;
            multipleSquareQilaSelected = (challan.propertyInfo2.MultipleQilas != null && challan.propertyInfo2.MultipleQilas.length > 0 ? true : false);
            if (multipleSquareQilaSelected) {
                // Mouza
                // QanoonGoo
                MouzaNameGlobal = $('#Mouza').data("kendoDropDownList").text();
                MouzaIdGlobal = $("#Mouza").val();
                QanoongoidGlobal = $("#Qanoongoee").val();
                $("#SquareQilaTypeMultiple").prop("checked", true);
                $("#SquareQilaTypeSingle").prop("checked", false);
            }
            else {
                $("#SquareQilaTypeSingle").prop("checked", true);
                $("#SquareQilaTypeMultiple").prop("checked", false);
            }
            onSquareQilaTypeChange();
            if (multipleSquareQilaDCRateType == highestRateApplied || multipleSquareQilaDCRateType == "") {
                $("#landAreaLabelDiv").show();
                $("#PropertyAreaQuantity").show();
                $("#PropertyAreaQuantityLabel").show();
                $("#PropertyAreaQuantity").val(challan.propertyInfo2.Area);
                $("#LandUnitOfArea").show();
                document.getElementById("LandUnitOfArea").innerHTML = '&nbsp;' + challan.propertyInfo2.rateUnit;
                $("#btnAreaCalcDiv").show();
            }
            else {
                $("#landAreaLabelDiv").hide();
                $("#PropertyAreaQuantity").hide();
                $("#PropertyAreaQuantityLabel").hide();
            }
            if (multipleSquareQilaDCRateType == allRatesApplied) {
                allRatesAppliedFlag = true;
                highestRateApplieedFlag = false;
            }
            else if (multipleSquareQilaDCRateType == highestRateApplied) {
                allRatesAppliedFlag = false;
                highestRateApplieedFlag = true;
            }
            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaIdForSquareNo?MouzaName=' + encodeURIComponent(challan.propertyInfo2.MouzaString) + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "Location", challan.propertyInfo2.LocationString);
        }

        var dropdownlist4 = $("#Location").data("kendoDropDownList");

        if (challan.propertyInfo2.isKhasraHierarchy) {
            $("#Khasra").val(challan.propertyInfo2.KhasraNo);
            KhasraID = challan.propertyInfo2.KhasraID;
        }
        else {
            $("#squareNo").val(challan.propertyInfo2.SquareNo);
            SquareNoId = challan.propertyInfo2.SquareID;
            $("#qilaNo").val(challan.propertyInfo2.QilaNo);
            QilaNoId = challan.propertyInfo2.QilaID;
        }

        $('#PropertyAreaQuantity').val(challan.propertyInfo2.Area);

    }

    if (challan.propertyInfo2.rateUnit == "null" || challan.propertyInfo2.rateUnit == null || challan.propertyInfo2.rateUnit == "") {
        challan.propertyInfo2.rateUnit = "";
    }
    else {
        document.getElementById("LandUnit").innerHTML = "&nbsp;Per " + challan.propertyInfo2.rateUnit;
    }
    document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; " + challan.propertyInfo2.rateUnit;

    //setLandUnitDCScreen2();


}

function nextDeedDetailsGenerateChallan() {
    debugger;
    // alert(challan.DebenturepayableStampDuty);
    resetKendoDropDown("districtDropdownDC", selectDistrictText);
    //var res = $('#DeedDetailsForGenerateChallanFormNonJudicialNoOfStamp').kendoValidator().data('kendoValidator').validate();
    var res = true;
    var res2 = false;
    challan.isParentNewChallan = true;
    if (challan.TransactionTypeString == "Judicial") {
        res2 = $('#DeedDetailsForGenerateChallanFormJudicial').kendoValidator().data('kendoValidator').validate();
        var userInputAmount = parseFloat($("#AmountOfConsiderationGenerateChallan").val().replace(/,/g, ""))
        //if (userInputAmount > maxJudicialAmount || userInputAmount < minJudicialAmount) {
        //    res2 = false;
        //}
        //else {
        //    res2 = true;
        //}
    }
    else {
        if (isPropertyInfo == true) {
            newRes = $('#propertyAddressForm').kendoValidator().data('kendoValidator').validate();
            if (!newRes) {
                res = newRes;
            }
        }
        res2 = $('#DeedDetailsForGenerateChallanFormNonJudicialForm').kendoValidator().data('kendoValidator').validate();
        if (!res2)
            res = res2;
        var res3 = false;
        var deedid = $("#TransactionName").val();

        if (deedid == "81") {
            var otherPropVal = $("#OtherProperty").val();
            challan.OtherPropertyVal = otherPropVal;
            //challan.OtherPropertyValue = otherPropVal;
            //challan.OtherPropertyValue = challan.OtherPropertyVal;
        }


    }
    if (!res2)
        res = res2;
    if (isExchangeOfProperty == true) {
        res2 = $('#DeedDetailsForGenerateChallanFormNonJudicialSecond').kendoValidator().data('kendoValidator').validate();
        //res2 = $('#constructedStructureFormSecond').kendoValidator().data('kendoValidator').validate();
    }
    if (!res2)
        res = res2;
    var primaryAmount = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""));
    if (challan.StampDutyCalcType == 'Fixed') {
        //alert(challan.StampDutyCalcType); 
        challan.PayableStampDutyString = deedAmountsModel.DeedAmounts[0];
    }
    for (i = 0; i < numberOfAmounts; i++) {
        if (deedAmountsModel.DeedAmounts[i].isPrimaryAmout == true) {
            if (primaryAmount <= deedAmountsModel.DeedAmounts[i].MinValue) {
                res = false;
                document.getElementById("minPropertyMessage").innerHTML = deedAmountsModel.DeedAmounts[i].Label + " should be greater than " + returnCommas(deedAmountsModel.DeedAmounts[i].MinValue);
                $("#minPropertyValuationWindow").data("kendoWindow").center().open();
            }
        }
    }
    if (res) {
        updateIsLegalHeir();
        showLegalHeir();
        updateChallanModelDeedDetailsGenerate();
        if (isExchangeOfProperty == true) {
            updateChallanModelDeedDetailsGenerate2();
        }


        $.ajax({
            url: base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartialDeedDetailsGenerate',
            type: 'POST',
            data: JSON.stringify(challan),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                debugger;
                $("#step1pending").attr("src", "../Images/steps-completed.png");
                $("#payableCVTExchagneOfPropertyDiv").hide();
                /*Check for power of attorney*/
                var isCVTCheckBox = $('#CVTTax').is(":checked");
                if (isCVTCheckBox) {
                    CVTCheckForStepBarOnly = true;
                }
                else {
                    CVTCheckForStepBarOnly = false;
                }
                if (challan.TransactionName == PowerOfAttorneyDeedId) {
                    if (isCVTApplicable && isCVTCheckBox) {
                        //var stampDuty = parseFloat($("#payableStampDutyGenerateChallan").val().replace(/,/g, ""));
                        //$("#payableStampDutyandCVTGenerateChallan").val(returnCommas(stampDuty)); // 2% + 3%

                        var $radio = $('input[name=LandTypeCVT]:checked');
                        var id = $radio.attr('id');
                        if (id == "UrbanCVT") {
                            challan.propertyInfo.isUrban = true;
                        }
                        else {
                            challan.propertyInfo.isUrban = false;
                        }
                        isDCValuationFlag = false;
                        $("#DeedDetailsForGenerateChallan").hide();
                        $("#RateOfChallan").hide();
                        ResetTextBox("PayableCVTCVTDiv");
                        $(".k-invalid-msg").hide();
                        if (challan.propertyInfo.isUrban) {
                            $("#ruralAreaWarning").hide();
                            //  $("#LandClassificationCVTDiv").show();
                            //   $("#LandAreaCVTDiv").show();
                        }
                        else {
                            //  $("#ruralAreaWarning").show();
                            //  $("#LandClassificationCVTDiv").hide();
                            $("#LandAreaCVTDiv").hide();
                        }
                        $("#leasePeriodWarningCVT").hide();
                        $("#LandTypeCVTdiv").show();
                        $("#CVTView").show();
                        // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassifications', "Select Land Classifications", "LandClassificationCVT");
                        $("#LandTypeCVTReadOnlyDiv").hide();
                        $("#checkBoxesCVT").hide();
                    }
                    else {
                        rendenChallan();
                        $("#DeedDetailsForGenerateChallan").hide();
                        $("#confirmfrom").show();
                    }
                } /*--------------------------------------------------------------------*/
                else {
                    $("#LandAreaCVTDiv").hide();
                    $("#checkBoxesCVT").show();
                    if (challan.TransactionTypeString == "Non-Judicial") {
                        // updateDCValuationFlag();
                        if (isDCValuationFlag == true) {
                            var isCVTCheckBox = $('#CVTTax').is(":checked");
                            if (isCVTCheckBox) {
                                CVTCheckForStepBarOnly = true;
                            }
                            else {
                                CVTCheckForStepBarOnly = false;
                            }
                            var leasePeriodVal = 0;
                            if (isLeasePeriod == true && isCVTCheckBox == true) {
                                var strLeasePeriod = $("#LeasePeriodGenerateChallan").val();
                                if (strLeasePeriod != null)
                                    leasePeriodVal = parseFloat($("#LeasePeriodGenerateChallan").val().replace(/,/g, ""));
                            }
                            if (isCVTApplicable == true && isCVTCheckBox == true && leasePeriodVal < 20 && isLeasePeriod == true) {
                                //isCVTApplicable = false;
                                challan.applyCVT = false;
                            }
                            else if (isCVTCheckBox == true && leasePeriodVal >= 20 && isLeasePeriod == true) {
                                isCVTApplicable = true;
                                challan.applyCVT = true;
                            }
                            if (isCVTApplicable || isDCValuationFlag == true) { // Show DC screen
                                $("#DeedDetailsForGenerateChallan").hide();
                                //if (isCVTandNotDC == true) {
                                //    $("#dcMessage").show();
                                //} else {
                                //    $("#dcMessage").hide();
                                //}
                                if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
                                    document.getElementById("DCHeading").innerHTML = DCValuationforFirstProperty;
                                } else {
                                    document.getElementById("DCHeading").innerHTML = DCValuation;
                                }
                                //To fix next button click issue
                                resetAll();
                                initializeDCValuation();
                                // initialize();
                                $("#RateOfChallan").show();
                                disableFindRateButton();
                                //initializeGoogleMapByAdminValue();
                            }
                            else {
                                rendenChallan();
                                $("#DeedDetailsForGenerateChallan").hide();
                                $("#confirmfrom").show();
                            }
                        }
                        else {
                            //rendenChallan();
                            // $("#challanform").hide();
                            // var stampDuty = parseFloat($("#payableStampDutyGenerateChallan").val().replace(/,/g, ""));
                            // $("#payableStampDutyandCVTGenerateChallan").val(returnCommas(stampDuty)); // 2% + 3%
                            var isCVTCheckBox = $('#CVTTax').is(":checked");
                            var leasePeriodVal = 0;
                            if (isLeasePeriod == true && isCVTCheckBox == true) {
                                leasePeriodVal = parseFloat($("#LeasePeriodGenerateChallan").val().replace(/,/g, ""));
                            }
                            if (isCVTApplicable == true && isCVTCheckBox == true && leasePeriodVal < 20 && isLeasePeriod == true) {
                                isCVTApplicable = false;
                                challan.applyCVT = false;
                                //isDCValuationFlag = false;
                                rendenChallan();
                                $("#DeedDetailsForGenerateChallan").hide();
                                $("#confirmfrom").show();
                            }
                            else if (isCVTCheckBox == true && leasePeriodVal >= 20 && isLeasePeriod == true) {
                                isCVTApplicable = true;
                                challan.applyCVT = true;
                                $("#DeedDetailsForGenerateChallan").hide();
                                //initializeDCValuation();
                                //isDCValuationFlag = true;
                                //$("#dcMessage").show();
                                //$("#RateOfChallan").show();
                                //disableFindRateButton();
                                //initializeGoogleMapByAdminValue();
                                ResetTextBox("PayableCVTCVTDiv");
                                $(".k-invalid-msg").hide();
                                $("#CVTView").show();
                                //  initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassifications', "Select Land Classifications", "LandClassificationCVT");
                                //  $("#LandClassificationCVTDiv").show();
                                $("#LandTypeCVTdiv").show();
                                $("#LandTypeCVTReadOnlyDiv").hide();
                                ShowHideCVTPowerOfAttorney();
                                $("#legalHeirsDiv").hide();
                            }
                            else if (isCVTApplicable == true && isCVTCheckBox == true) { //this will only true for exchange of property and when multi property checkbox is checked
                                showCVTforMultipleProperties();
                            }
                            else {
                                rendenChallan();
                                $("#DeedDetailsForGenerateChallan").hide();
                                $("#confirmfrom").show();
                            }
                        }
                    }
                    else {
                        rendenChallan();
                        $("#DeedDetailsForGenerateChallan").hide();
                        $("#confirmfrom").show();
                    }
                }
            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');
                $("#purchaserSectionError").css("color", "red");
            }
        });
    }

    // alert('check')
    debugger;

    var FirePolicyDateFrom = $("#PeriodFrom").val();
    challan.PolicyDateFrom = FirePolicyDateFrom;

    var FirePolicyDateTo = $("#PeriodTo").val();
    challan.PolicyDateTo = FirePolicyDateTo;
}

function calculateUpdatedCVTandMergewithStampDuty() {
    var deedid = $("#TransactionName").val(); // Deed Id is not required, we want to calculate CVT on totalAmount ( Hieghest Property Value).
    var totalAmount = "";
    var additionalInfo = "";


    if ($("#PropertyValuationGenerateChallan").val() != null && $("#PropertyValuationGenerateChallan").val() != "") {
        totalAmount = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, '')); // Property Value of First Property
        additionalInfo = 'First Property';
    }
    // Calculating CVT for highest of first and second property is not required now as we calculate cvt for both separetely.
    //if (isExchangeOfProperty == true) {
    //    if (totalAmount == 0) {
    //        totalAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");
    //    }
    //    else {
    //        if (parseFloat(totalAmount) < parseFloat($("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, ""))) {
    //            totalAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");
    //        }
    //    }
    //}        

    var id = "";
    if (isDCValuationFlag == true) {
        id = challan.propertyInfo.LandClassificationId;
    }
    var leasePeriod = challan.leasePeriod;
    var TotalLeaseMoney = challan.TotalLeaseMoney;
    var constructedArea = $("#constructedAreaCVT").val();
    var ispropertyConstructedBox = $('#propertyConstructed').is(":checked");
    if (ispropertyConstructedBox == false) {
        $('#propertyConstructed').prop('checked', true);
        $('#propertyConstructed').attr('checked', true);
        onChangePropertyConstructed();
    }
    var isGovpropertyBox = $('#govPropertyExchangeOfPropertyCheckbox').is(":checked");
    var islegalHeirsBox = $('#legalHeirs').is(":checked");
    islegalHeirsBox = false;
    var DCVal = challan.propertyInfo.FinalRate;
    var isUrban = challan.propertyInfo.isUrban;
    var cvtModel =
        {
            TransactionId: deedid,
            Amount: totalAmount,
            isConstructed: ispropertyConstructedBox,
            isGovProperty: isGovpropertyBox,
            isMultiStory: false,
            isLegalHeir: islegalHeirsBox,
            ConstructedArea: constructedArea,
            LeasePeriod: leasePeriod,
            LandClassification: id,
            DCFinalRate: DCVal,
            TotalLeaseMoney: TotalLeaseMoney,
            LandArea: challan.propertyInfo.Area,
            isDCValuation: isDCValuationFlag,
            lstTaxAmountValue: challan.lstTaxAmountValue,
            AdditionalInfo: additionalInfo,
            isUrban: isUrban,
            TreatAsUrban: challan.propertyInfo.treatAsUrban,
            MultipleKhasraDCRateType: challan.propertyInfo.MultipleKhasraDCRateType,
            MultipleKhasras: challan.propertyInfo.MultipleKhasras,
            MultipleQilas: challan.propertyInfo.MultipleQilas,
            MultipleSquareQilaDCRateType: challan.propertyInfo.MultipleSquareQilaDCRateType,
            isExchangeOfProperty: isExchangeOfProperty
        }
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/ChallanForm/CalculateCVTTaxAmount',
        type: 'POST',
        data: JSON.stringify(cvtModel),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            $("#PayableCVTValue").val(returnCommas(data));

            // Merger of Duties Change by PITB, June 5 2017 // ---->>
            payableCvt = data;
            challan.FirstPropertyCvtString = data;
            stampDuty = parseFloat($("#payableStampDutyGenerateChallan").val().replace(/,/g, ""));
            if (isNaN(stampDuty)) { stampDuty = 0; }
            $("#payableStampDutyandCVTGenerateChallan").val(returnCommas(payableCvt + stampDuty)); // 2% + 3%
        },
        error: function (data) {
            var response = data.responseText.replace(/"/g, '');
        }
    });
}
function showCVTforMultipleProperties() {
    $("#LandTypeCVTReadOnlyDiv").hide();


    //   $("#LandClassificationCVTDiv").hide();       
    $("#PayableCVTCVTDiv").hide();
    $("#payableCVTExchagneOfPropertyDiv").hide();
    if (isExchangeOfProperty && challan.isMultiplePropertiesExchageOfProperty) {
        $("#checkBoxesCVT").hide();
        $("#SqFtDiv").hide();
        $("#LandTypeCVTdiv").show();
    }
    document.getElementById("cvtHeading").innerHTML = ValueOfStructureFirstParty;//CVTforFirstProperty;

    var $radio = $('input[name=LandTypeCVT]:checked');
    var id = $radio.attr('id');
    if (id == "UrbanCVT") {
        challan.propertyInfo.isUrban = true;
    }
    else {
        challan.propertyInfo.isUrban = false;
    }

    isDCValuationFlag = false;
    calculateStampDutyDeedDetail(); // Update Stamp Duty as well. This is required because user may come back from confirmation or CVT screen and change Property 2 Values.
    calculateUpdatedCVTandMergewithStampDuty(); // To calcualte updated CVT and add with Stamp Duty on next screen.

    $("#RateOfChallan").hide();
    $("#DeedDetailsForGenerateChallan").hide();

    $("#leasePeriodWarningCVT").hide();
    $("#CVTView").show();
    $("CVTView").scrollTop(0);
    //  initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassifications', "Select Land Classifications", "LandClassificationCVT");
    $(".k-invalid-msg").hide();
}

function ShowHideCVTPowerOfAttorney() {

    if (isPowerOfAttorney == true) {

        $('#checkBoxesCVT').show();
        $('#multiStoryBuildingDiv').hide();

        $('#constructedAreaCVTDiv').show();
        $('#propertyConstructed').prop('checked', true);
        $('#propertyConstructedDiv').show();
        document.getElementById("propertyConstructed").disabled = true;



    }
    else {
        document.getElementById("propertyConstructed").disabled = false;

    }

}


function updateChallanModelDeedDetailsGenerate() {
    // alert('testing updateChallanModelDeedDetailsGenerate'); 
    debugger;
    $("#UserProvidedResultSet").show();
    $("#PartitionUserProvidedValue").hide();
    //challan.numberOfStampPapers = $("#NumberOfStampPapersGenerateChallanDeedDetail").val();
    if ($("#TransactionName").val() == DebentureDeed || $("#TransactionName").val() == PartitionDeed) {

        IsLandAndConstructed = false;
        if ($("#TransactionName").val() == PartitionDeed) {
            $("#UserProvidedResultSet").hide();
            $("#PartitionUserProvidedValue").show();
        }

    }
    challan.propertyInfo.IsLandAndConstructed = IsLandAndConstructed;
    //challan.isCalculateSum = IsLandAndConstructed;
    challan.DeedInfo.IsCalculateSum = IsLandAndConstructed;

    var $radio = $('input[name=ChallanFromType]:checked');

    var id = $radio.attr('id');

    if (challan.TransactionTypeString == "Non-Judicial") {
        if (challan.propertyInfo != null) {
            challan.propertyInfo.FullAddress = $("#PropertyAddressGenerateChallan").val();
        }

        var deedid = $("#TransactionName").val();

        var check = false;
        for (i = 0; i < firstTenYears.length; i++) {
            if (deedid == firstTenYears[i]) {
                check = true;
            }

        }
        debugger;
        challan.TotalAmount = $("#PropertyValuationGenerateChallan").val().replace(/,/g, "");
        challan.propertyInfo.ValuationAmount = $("#PropertyValuationGenerateChallan").val().replace(/,/g, "");

        if (IsLandAndConstructed == true) {
            challan.propertyInfo.ConstructedStructureValue = $("#constructedStructureValueGenerateChallan").val().replace(/,/g, "");
            challan.propertyInfo.LandPropertyValue = $("#landProperty").val().replace(/,/g, "");
            document.getElementById('CSValueUserProvided').innerHTML = returnCommas($("#constructedStructureValueGenerateChallan").val().replace(/,/g, ""));
            //  document.getElementById('CSValueUserProvidedRate').innerHTML =  returnCommas($("#constructedStructureValueGenerateChallan").val().replace(/,/g, ""));
            //  $('#CSValueUserProvided').show(); $('#CSValueUserProvided2').hide();
        } else {
            challan.propertyInfo.ConstructedStructureValue = null;
            challan.propertyInfo.LandPropertyValue = null;
        }
        //Added  to handle especial case where deed id = 6 and challan.applyStampDuty == flase
        if (challan.applyStampDuty == true)
        { challan.PayableStampDutyString = $("#payableStampDutyGenerateChallan").val().replace(/,/g, ""); }
        else { challan.PayableStampDutyString = null; }

        if (challan.applyRegistrationDuty == true && $("#registrationFeeGenerateChallan").val() != null && $("#registrationFeeGenerateChallan").val() != "")
        { challan.RegistrationFeeString = $("#registrationFeeGenerateChallan").val().replace(/,/g, ""); }
        else { challan.RegistrationFeeString = null; }

        if (isLeasePeriod == true) {
            challan.leasePeriod = $("#LeasePeriodGenerateChallan").val();
        }
        if (isTotalLeaseMoney == true) {
            challan.TotalLeaseMoney = $("#TotalLeaseMoneyGenerateChallan").val();
        }


        var deedid = $("#TransactionName").val();


        if (deedid == AdvanceMoneyDeedId) {
            challan.AdvanceMoney = $("#PropertyValuationGenerateChallan").val().replace(/,/g, "");//$("#AdvanceMoneyGenerateChallan").val().replace(/,/g, ""); //add primary amount here

        }
        else if (deedid == PremiumDeedId) {
            challan.Premium = $("#PropertyValuationGenerateChallan").val().replace(/,/g, "");//$("#PremiumGenerateChallan").val().replace(/,/g, ""); //add primary amount here

        }

        AmountsData = [];
        var isCVTCheckBox = $('#CVTTax').is(":checked");
        var amount = {};

        for (i = 0; i < numberOfAmounts; i++) {

            if (deedAmountsModel.DeedAmounts[i].isCVTField) {

                if (isCVTCheckBox) {

                    amount = {
                        FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
                        FieldName: deedAmountsModel.DeedAmounts[i].Label,
                        AmountValue: $(deedAmountsModel.DeedAmounts[i].JsID).val().replace(/,/g, ""),
                        AdditionalInfo: "First Property"
                    }

                    AmountsData.push(amount);

                }

            }
            else {
                if (deedAmountsModel.DeedAmounts[i].Label == 'Period From' || deedAmountsModel.DeedAmounts[i].Label == 'Period To' || deedAmountsModel.DeedAmounts[i].Label == 'Policy Date From' || deedAmountsModel.DeedAmounts[i].Label == 'Policy Date To' || deedAmountsModel.DeedAmounts[i].Label == 'RadioPhysicalCDC'
                    || deedAmountsModel.DeedAmounts[i].Label == "Distinctive Number (From - To)"
                    || deedAmountsModel.DeedAmounts[i].Label == "Distinctive Number From - To"
                    || deedAmountsModel.DeedAmounts[i].Label == "ShareCertificateNumber"
                    || deedAmountsModel.DeedAmounts[i].Label == "Share Certificate Number"
                    ) {
                    amount = {
                        FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
                        FieldName: deedAmountsModel.DeedAmounts[i].Label,
                        AmountValue: $(deedAmountsModel.DeedAmounts[i].JsID).val(),
                        AdditionalInfo: "First Property"
                    }



                } else {

                    if (deedAmountsModel.DeedAmounts[i].Label == 'RadioSubInsuredType') {


                        var $radio_phsicalCDC = $('input[name=typeInstruments]:checked');
                        var id_radio_CDC = $radio_phsicalCDC.attr('id');
                        if (id_radio_CDC == 'six_month') {
                            amount = {
                                FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
                                FieldName: "RadioSubInsuredType",
                                AmountValue: "0.045",
                                AdditionalInfo: "Upto 6 Months"
                            }
                        } else {
                            amount = {
                                FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
                                FieldName: "RadioSubInsuredType",
                                AmountValue: "0.090",
                                AdditionalInfo: "Upto 12 Months"
                            }
                        }
                    }
                    else {
                        amount = {
                            FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
                            FieldName: deedAmountsModel.DeedAmounts[i].Label,
                            AmountValue: returnCommas($(deedAmountsModel.DeedAmounts[i].JsID).val()).replace(/,/g, ""),
                            AdditionalInfo: "First Property"
                        }
                    }
                }
                AmountsData.push(amount);

            }

        }

        challan.lstTaxAmountValue = AmountsData;

    }
    else {
        challan.SuitFor = $("#SuitForGenerateChallan").val();
        challan.TotalAmount = $("#AmountOfConsiderationGenerateChallan").val().replace(/,/g, "");

        if (challan.applyStampDuty == true)
        { challan.PayableStampDutyString = $("#payableStampDutyGenerateChallan").val().replace(/,/g, ""); }
        else { challan.PayableStampDutyString = null; }

    }
}


//    function updateChallanModelDeedDetailsGenerate2() {
//        //challan.numberOfStampPapers = $("#NumberOfStampPapersGenerateChallanDeedDetail").val();

//        var $radio = $('input[name=ChallanFromType]:checked');

//        var id = $radio.attr('id');

//        if (challan.TransactionTypeString == "Non-Judicial") {
//            challan.propertyInfo2.FullAddress = $("#PropertyAddressGenerateChallanSecond").val();
//            //
//            if (challan.TotalAmount < parseFloat($("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "")))
//            {
//                challan.TotalAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");
//            }
//            challan.propertyInfo2.ValuationAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");

//            // if (isDCValuationFlag == true) {
//            if (IsLandAndConstructed == true) {
//                challan.propertyInfo2.ConstructedStructureValue = $("#constructedStructureValueSecond").val().replace(/,/g, "");
//                document.getElementById('CSValueUserProvided2').innerHTML = "Rs.&nbsp;" + returnCommas($("#constructedStructureValueSecond").val().replace(/,/g, ""));
//              //  $('#CSValueUserProvided2').show(); $('#CSValueUserProvided').hide();
//            } else {
//                challan.propertyInfo2.ConstructedStructureValueSecond = null;
//            }

//            challan.propertyInfo2.LandPropertyValue = $('#landProperty2').val().replace(/,/g, "");

//            var isCVTCheckBox = $('#CVTTax').is(":checked");
//            var amount = {};

//            for (i = 0; i < numberOfAmounts; i++) {

//                if (deedAmountsModel.DeedAmounts[i].isCVTField) {

//                    if (isCVTCheckBox) {

//                        amount = {
//                            FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
//                            FieldName: deedAmountsModel.DeedAmounts[i].Label,
//                            AmountValue: $(secondPropertyIDArray[i]).val().replace(/,/g, ""),
//                            AdditionalInfo: "Second Property"
//                        }

//                        AmountsData.push(amount);

//                    }

//                }
//                else {

//                    amount = {
//                        FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
//                        FieldName: deedAmountsModel.DeedAmounts[i].Label,
//                        AmountValue: $(secondPropertyIDArray[i]).val().replace(/,/g, ""),
//                        AdditionalInfo: "Second Property"
//                    }

//                    AmountsData.push(amount);

//                }

//            }
//            challan.lstTaxAmountValue = AmountsData;
//           // challan.TotalAmount = $("#PropertyValuationGenerateChallanSecond").val().replace(/,/g, "");
///*
//            if (challan.applyStampDuty == true && $("#payableStampDutyGenerateChallan").val() != null && $("#payableStampDutyGenerateChallan").val() != "")
//            { challan.PayableStampDutyString = $("#payableStampDutyGenerateChallan").val().replace(/,/g, ""); }
//            else { challan.PayableStampDutyString = null; }
//            if (challan.applyRegistrationDuty == true && $("#registrationFeeGenerateChallan").val() != null && $("#registrationFeeGenerateChallan").val() != "")
//            { challan.RegistrationFeeString = $("#registrationFeeGenerateChallan").val().replace(/,/g, ""); }
//            else { challan.RegistrationFeeString = null; }

//            if (isLeasePeriod == true) {
//                challan.leasePeriod = $("#LeasePeriodGenerateChallan").val();
//            }
//            var deedid = $("#TransactionName").val();
//            if (deedid == AdvanceMoneyDeedId) {
//                challan.AdvanceMoney = $("#AdvanceMoneyGenerateChallan").val().replace(/,/g, "");
//            }
//            else if (deedid == PremiumDeedId) {
//                challan.Premium = $("#PremiumGenerateChallan").val().replace(/,/g, "");
//            }
//            */
//        }
//        else {
//           // challan.SuitFor = $("#SuitForGenerateChallan").val();
//          //  challan.TotalAmount = $("#AmountOfConsiderationGenerateChallan").val().replace(/,/g, "");
//        }
//    }

function populateSecondRateOfChallan() {
    populateChallanPropertyInfo2();
    //console.log(challan.propertyInfo2);
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function BackButtonToDeedDetails() {
    //resetAll();
    if (isExchangeOfProperty && isDCNextFirstScreen) {
        populateChallanPropertyInfo();
        if (queryStringName == "PayCVTandReg") {
            if (regCheck || deficientRegCheck || isLeasePeriod || cvtCheck) {
                $("#DeedDetailsForPayCVTandReg").show();
                $("#RateOfChallan").hide();
            }
            else {
                $("#DeedDetailsForGenerateChallan").hide();
                $("#RateOfChallan").hide();
                $("#challanform").show();
            }
        }
        else {
            $("#step1pending").attr("src", "../Images/steps-pending.png");
            //resetDCValuationChallanValues();
            $("#DeedDetailsForGenerateChallan").show();
            $("#RateOfChallan").hide();
        }
    }
    else if (isExchangeOfProperty == true && isDCNextFirstScreen == false) {
        populateSecondRateOfChallan();
        $("#step2pending").attr("src", "../Images/steps-pending.png");
        document.getElementById("DCHeading").innerHTML = DCValuationforFirstProperty;
        //resetDCValuationChallanValues2();
        isDCNextFirstScreen = true;
        populateFirstScreenWhenComingBackFromSecondScreenDC();
    }
    else {
        if (queryStringName == "PayCVTandReg") {
            if (regCheck || deficientRegCheck || isLeasePeriod || cvtCheck) {
                $("#DeedDetailsForPayCVTandReg").show();
                $("#RateOfChallan").hide();
            }
            else {
                $("#DeedDetailsForGenerateChallan").hide();
                $("#RateOfChallan").hide();
                $("#challanform").show();
            }
        }
        else {
            $("#step1pending").attr("src", "../Images/steps-pending.png");
            $("#DeedDetailsForGenerateChallan").show();
            //resetDCValuationChallanValues();
            $("#RateOfChallan").hide();
        }
    }
}

function SetRadioButtonValue(name, SelectdValue) {
    $('input[name="' + name + '"][value="' + SelectdValue + '"]').prop('checked', true);
}

function resetDcValuationScreen() {
    ShowInfoByLandType();
    //initialize();
    dropdownIdentifier = 0;
    $("#DCValueError").hide();
    setIsDCValuationFirstValue();
    setIsDCValuationAdminValue();
    $("#districtLabelDiv").hide();
    $("#tehsilLabelDiv").hide();
    $("#districtDropdownDCDiv").show();
    $("#tehsilDropdownDCDiv").show();
    $("#confirmfromUserProvided").hide();
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/TalukasByDistrictId?id=', selectTalukaText, "talukaDropdownDC");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTalukaId?id=', "Select Qanoongoee", "Qanoongoee");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTalukaId?id=', selectRevenueCircleText, "RevenueCircle");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=', "Select Mouza", "Mouza");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=&QanoonGoId=', selectlandClassificationText, "LandClassification");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaName=' + "&revenueCircleId=" + "&TalukaId=" + "&town=", selectlandClassificationText, "LandClassificationUrban");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?RevenueCircleId=', "Select Property Area", "PropertyArea");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=&QanoonGoId=&landClassificationId=', "Select Location", "Location");
    // initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyArea?PropertyAreaName=' + "&revenueCircleId=&landClassificationId=", "Select Location", "LocationUrban");
    document.getElementById("rateValue").innerHTML = "0";
    document.getElementById("LandUnit").innerHTML = "&nbsp;";



    $('#khasraHierarchyDiv').hide();
    $('#squareNoHierarchyDiv').hide();
    $('#khasraUrbanDiv').hide();
    $('#squareNoUrbanHierarchyDiv').hide();
    $('#DCRateFoundLabel').show();
    $('#DCRateNotFoundLabel').hide();
    $("#rateOfChallanMultipleSquareQilaError").html('');
    $("#rateOfChallanMultipleKhasraError").html('');
    $("#bothKandSqNHeirachySelectionDiv").hide();
    var validator = $("#LandformSecondaryThree").kendoValidator().data("kendoValidator");
    $("#Khasra").kendoAutoComplete();
    $("#squareNo").kendoAutoComplete();
    $("#qilaNo").kendoAutoComplete();
    $("#KhasraUrban").kendoAutoComplete();
    $("#squareNoUrban").kendoAutoComplete();
    $('.k-widget k-tooltip k-tooltip-validation k-invalid-msg field-validation-error').hide();
    initializeGoogleMapByAdminValue();
}



function populateFirstScreenWhenComingBackFromSecondScreenDC() {
    //console.log(challan.propertyInfo);

    $(".k-invalid-msg").hide();

    if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
        document.getElementById("DCHeading").innerHTML = DCValuationforFirstProperty;
    } else {
        document.getElementById("DCHeading").innerHTML = DCValuation;
    }
    if (challan.propertyInfo.isUrban == true) {
        $('#Urban').prop('checked', true);
        LandClassificationChange();
        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC", challan.propertyInfo.DistrictId);
        initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TehsilsByDistrictId?Id=" + challan.propertyInfo.DistrictId, selectTehsilText, "tehsilDropdownDC", challan.propertyInfo.TehsilId);
        initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/TownByTehsilId?Id=' + challan.propertyInfo.TehsilId, selectTownText, "townDropdownDC", challan.propertyInfo.TownString);
        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=' + challan.propertyInfo.TehsilId + '&town=' + challan.propertyInfo.TownString, selectRevenueCircleText, "RevenueCircle", challan.propertyInfo.RevenueCircleId);
        var dropdownlist = $("#RevenueCircle").data("kendoDropDownList");
        dropdownlist.value(challan.propertyInfo2.RevenueCircleId);
        initializePropertyAreaDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?TehsilId=' + challan.propertyInfo.TehsilId + '&town=' + challan.propertyInfo.TownString + '&RevenueCircleId=' + challan.propertyInfo.RevenueCircleId, "Select Property Area", "PropertyArea", challan.propertyInfo.PropertyAreaString);

        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/GetFloors?RevenueCircleId=' + challan.propertyInfo.RevenueCircleId, selectFloorText, "Floor", challan.propertyInfo.FloorId);
        var floordropdownlist = $("#Floor").data("kendoDropDownList");
        floordropdownlist.value(challan.propertyInfo.FloorId);
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTehsilId?id=' + challan.TehsilId, selectRevenueCircleText, "RevenueCircle");
        //var dropdownlist = $("#RevenueCircle").data("kendoDropDownList");
        //dropdownlist.value(challan.propertyInfo.RevenueCircleId);
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyArea?PropertyAreaName=' + challan.propertyInfo.PropertyAreaString + "&revenueCircleId=" + challan.propertyInfo.RevenueCircleId
        //    + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, "Select Location", "LocationUrban");
        // initializePropertyAreaDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?RevenueCircleId=' + challan.propertyInfo.RevenueCircleId + '&FloorId='+challan.propertyInfo.FloorId, "Select Property Area", "PropertyArea", challan.propertyInfo.PropertyAreaString);
        //var dropdownlist2 = $("#PropertyArea").data("kendoDropDownList");
        //dropdownlist2.value(challan.propertyInfo.PropertyAreaId);
        //$("#districtDropdownDC").data("kendoDropDownList").value(challan.propertyInfo.DistrictId);
        //$("#tehsilDropdownDC").data("kendoDropDownList").value(challan.propertyInfo.TehsilId);

        $('#khasraUrbanDiv').hide();
        $('#squareNoUrbanHierarchyDiv').hide();
        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaName=' + challan.propertyInfo.PropertyAreaString + "&revenueCircleId=" + challan.propertyInfo.RevenueCircleId + "&tehsilId=" + challan.propertyInfo.TehsilId + "&town=" + challan.propertyInfo.TownString, selectlandClassificationText, "LandClassificationUrban");
        var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
        dropdownlist3.value(challan.propertyInfo.LandClassificationId);
        initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaId?tehsilId=' + challan.propertyInfo.TehsilId + "&town=" + challan.propertyInfo.TownString + "&PropertyAreaId=" + challan.propertyInfo.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, "Select Location", "LocationUrban", challan.propertyInfo.LocationUrbanString);

        $('#PropertyAreaQuantity').val(challan.propertyInfo.Area);
        //var dropdownlist4 = $("#LocationUrban").data("kendoDropDownList");
        //dropdownlist4.value(challan.propertyInfo.LocationId);
    }
    else {
        $('#Rural').prop('checked', true);
        LandClassificationChange();
        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC", challan.propertyInfo.DistrictId);
        initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TehsilsByDistrictId?Id=" + challan.propertyInfo.DistrictId, selectTehsilText, "tehsilDropdownDC", challan.propertyInfo.TehsilId);
        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + challan.propertyInfo.TehsilId, "Select Qanoongoee", "Qanoongoee", challan.propertyInfo.QanoongoeeId);
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTehsilId?id=' + challan.TehsilId, "Select Qanoongoee", "Qanoongoee");
        //var dropdownlist = $("#Qanoongoee").data("kendoDropDownList");
        //dropdownlist.value(challan.propertyInfo.QanoongoeeId);
        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=' + challan.propertyInfo.QanoongoeeId, "Select Mouza", "Mouza");
        //var dropdownlist2 = $("#Mouza").data("kendoDropDownList");
        //dropdownlist2.value(challan.propertyInfo.MouzaId);

        var dropdownlist3 = $("#LandClassification").data("kendoDropDownList");
        dropdownlist3.value(challan.propertyInfo.LandClassificationId);
        $('#PropertyAreaQuantity').val(challan.propertyInfo.Area);

        //var dropdownlist4 = $("#Location").data("kendoDropDownList");
        //dropdownlist4.value(challan.propertyInfo.Location);
        //$("#Khasra").val(challan.propertyInfo.KhasraNo);
        if (challan.propertyInfo.isKhasraHierarchy) {
            $("#Khasra").val(challan.propertyInfo.KhasraNo);
            KhasraID = challan.propertyInfo.KhasraID;
        }
        else {
            $("#squareNo").val(challan.propertyInfo.SquareNo);
            SquareNoId = challan.propertyInfo.SquareID;
            $("#qilaNo").val(challan.propertyInfo.QilaNo);
            QilaNoId = challan.propertyInfo.QilaID;
        }
        //dropdownlist4.value(challan.propertyInfo.LocationId);
    }
    //setLandUnitDCScreen();
}




//function populateFirstScreenWhenComingBackFromSecondScreenDC() {
//    //console.log(challan.propertyInfo);

//    $(".k-invalid-msg").hide();

//    if (isExchangeOfProperty == true && isDCNextFirstScreen == true) {
//        document.getElementById("DCHeading").innerHTML = DCValuationforFirstProperty;
//    } else {
//        document.getElementById("DCHeading").innerHTML = DCValuation;
//    }
//    if (challan.propertyInfo.isUrban == true) {
//        $('#Urban').prop('checked', true);
//        LandClassificationChange();
//        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC", challan.propertyInfo.DistrictId);
//        initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.propertyInfo.DistrictId, selectTalukaText, "talukaDropdownDC", challan.propertyInfo.TalukaId);
//        initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/TownByTalukaId?Id=' + challan.propertyInfo.TalukaId, selectTownText, "townDropdownDC", challan.propertyInfo.TownString);
//        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTalukaId?id=' + challan.propertyInfo.TalukaId + '&town=' + challan.propertyInfo.TownString, selectRevenueCircleText, "RevenueCircle", challan.propertyInfo.RevenueCircleId);
//        var dropdownlist = $("#RevenueCircle").data("kendoDropDownList");
//        dropdownlist.value(challan.propertyInfo2.RevenueCircleId);
//        initializePropertyAreaDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?TalukaId=' + challan.propertyInfo.TalukaId + '&town=' + challan.propertyInfo.TownString + '&RevenueCircleId=' + challan.propertyInfo.RevenueCircleId, "Select Property Area", "PropertyArea", challan.propertyInfo.PropertyAreaString);

//        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/GetFloors?RevenueCircleId=' + challan.propertyInfo.RevenueCircleId, selectFloorText, "Floor", challan.propertyInfo.FloorId);
//        var floordropdownlist = $("#Floor").data("kendoDropDownList");
//        floordropdownlist.value(challan.propertyInfo.FloorId);
//        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTalukaId?id=' + challan.TalukaId, selectRevenueCircleText, "RevenueCircle");
//        //var dropdownlist = $("#RevenueCircle").data("kendoDropDownList");
//        //dropdownlist.value(challan.propertyInfo.RevenueCircleId);
//        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyArea?PropertyAreaName=' + challan.propertyInfo.PropertyAreaString + "&revenueCircleId=" + challan.propertyInfo.RevenueCircleId
//        //    + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, "Select Location", "LocationUrban");
//       // initializePropertyAreaDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?RevenueCircleId=' + challan.propertyInfo.RevenueCircleId + '&FloorId='+challan.propertyInfo.FloorId, "Select Property Area", "PropertyArea", challan.propertyInfo.PropertyAreaString);
//        //var dropdownlist2 = $("#PropertyArea").data("kendoDropDownList");
//        //dropdownlist2.value(challan.propertyInfo.PropertyAreaId);
//         //$("#districtDropdownDC").data("kendoDropDownList").value(challan.propertyInfo.DistrictId);
//        //$("#tehsilDropdownDC").data("kendoDropDownList").value(challan.propertyInfo.TalukaId);
//        if (challan.propertyInfo.IsKhasraAvailable) {
//            $('#khasraUrbanDiv').show();
//            $("#KhasraUrban").val(challan.propertyInfo.KhasraUrbanNo);
//            KhasraUrbanId = challan.propertyInfo.KhasraUrbanID;
//            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyAreaKhasraUrban?khasraUrbanNo=' + challan.propertyInfo.KhasraUrbanNo +
//                "&PropertyAreaID=" + challan.propertyInfo.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo.RevenueCircleId + + "&TalukaId=" + challan.propertyInfo.TalukaId + "&town=" + challan.propertyInfo.town, selectlandClassificationText, "LandClassificationUrban");
//            var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
//            dropdownlist3.value(challan.propertyInfo.LandClassificationId);
//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaIdHavingKhasraNo?TalukaId=' + challan.propertyInfo.TalukaId + "&town=" + challan.propertyInfo.TownString + "&PropertyAreaID=" + challan.propertyInfo.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, "Select Location", "LocationUrban", challan.propertyInfo.LocationUrbanString);
//        }
//        else if (challan.propertyInfo.isSquareNoHierarchy) {
//            $('#squareNoUrbanHierarchyDiv').show();
//            $("#squareNoUrban").val(challan.propertyInfo.SquareNoUrban);
//            SquareNoUrbanId = challan.propertyInfo.SquareUrbanID;
//            $("#qilaNoUrban").val(challan.propertyInfo.QilaNoUrban);
//            QilaNoUrbanId = challan.propertyInfo.QilaUrbanID;
//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByQilaNoUrban?TalukaId=' + challan.propertyInfo.TalukaId + '&town=' + challan.propertyInfo.TownString + '&revenueCircleId=' + challan.propertyInfo.RevenueCircleId + '&PropertyAreaID=' + challan.propertyInfo.PropertyAreaId + "&squareNoId=" + challan.propertyInfo.SquareUrbanID + '&qilaUrbanNo=' + challan.propertyInfo.QilaNoUrban, selectlandClassificationText, "LandClassificationUrban", challan.propertyInfo.LandClassificationString);
//            //var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
//            //dropdownlist3.value(challan.propertyInfo.LandClassificationId);
//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaIdHavingSquareNo?TalukaId=' + challan.propertyInfo.TalukaId + "&town=" + challan.propertyInfo.TownString + "&PropertyAreaID=" + challan.propertyInfo.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, "Select Location", "LocationUrban", challan.propertyInfo.LocationUrbanString);

//        }
//        else {
//            $('#khasraUrbanDiv').hide();
//            $('#squareNoUrbanHierarchyDiv').hide();
//            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaName=' + challan.propertyInfo.PropertyAreaString + "&revenueCircleId=" + challan.propertyInfo.RevenueCircleId + "&TalukaId=" + challan.propertyInfo.TalukaId + "&town=" + challan.propertyInfo.TownString, selectlandClassificationText, "LandClassificationUrban");
//            var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
//            dropdownlist3.value(challan.propertyInfo.LandClassificationId);
//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaId?TalukaId=' + challan.propertyInfo.TalukaId + "&town=" + challan.propertyInfo.TownString + "&PropertyAreaId=" + challan.propertyInfo.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, "Select Location", "LocationUrban", challan.propertyInfo.LocationUrbanString);
//        }
//        $('#PropertyAreaQuantity').val(challan.propertyInfo.Area);
//        //var dropdownlist4 = $("#LocationUrban").data("kendoDropDownList");
//        //dropdownlist4.value(challan.propertyInfo.LocationId);
//    }
//    else {
//        $('#Rural').prop('checked', true);
//        LandClassificationChange();
//        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC", challan.propertyInfo.DistrictId);
//        initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.propertyInfo.DistrictId, selectTalukaText, "talukaDropdownDC", challan.propertyInfo.TalukaId);
//        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTalukaId?id=' + challan.propertyInfo.TalukaId, "Select Qanoongoee", "Qanoongoee", challan.propertyInfo.QanoongoeeId);
//        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTalukaId?id=' + challan.TalukaId, "Select Qanoongoee", "Qanoongoee");
//        //var dropdownlist = $("#Qanoongoee").data("kendoDropDownList");
//        //dropdownlist.value(challan.propertyInfo.QanoongoeeId);
//        //initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=' + challan.propertyInfo.QanoongoeeId, "Select Mouza", "Mouza");
//        //var dropdownlist2 = $("#Mouza").data("kendoDropDownList");
//        //dropdownlist2.value(challan.propertyInfo.MouzaId);
//        initializeMouzaDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=' + challan.propertyInfo.QanoongoeeId, "Select Mouza", "Mouza", challan.propertyInfo.MouzaString);
//        if (challan.propertyInfo.isKhasraHierarchy) {
//            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=' + encodeURIComponent(challan.propertyInfo.MouzaString) + "&QanoonGoId=" + challan.propertyInfo.QanoongoeeId, selectlandClassificationText, "LandClassification");
//        }
//        else {
//            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaNameForSquareNo?MouzaName=' + encodeURIComponent(challan.propertyInfo.MouzaString) + "&QanoonGoId=" + challan.propertyInfo.QanoongoeeId, selectlandClassificationText, "LandClassification");
//        }
//        var dropdownlist3 = $("#LandClassification").data("kendoDropDownList");
//        dropdownlist3.value(challan.propertyInfo.LandClassificationId);
//        $('#PropertyAreaQuantity').val(challan.propertyInfo.Area);
//        if (challan.propertyInfo.isKhasraHierarchy) {
//            $('#squareNoHierarchyDiv').hide();
//            $('#btnMultipleSquareQila').hide();
//            $("#squareQilaTypeRadioButtonDiv").hide();
//            $('#khasraHierarchyDiv').show();
//            $('#khasraTypeRadioButtonDiv').show();
//            multipleKhasraList = challan.propertyInfo.MultipleKhasras;
//            multipleKhasraDCRateType = challan.propertyInfo.MultipleKhasraDCRateType;
//            multipleKhasrasSelected = (challan.propertyInfo.MultipleKhasras != null && challan.propertyInfo.MultipleKhasras.length > 0 ? true : false);
//            if (multipleKhasrasSelected) {
//                // Mouza
//                // QanoonGoo
//                MouzaNameGlobal = $('#Mouza').data("kendoDropDownList").text();
//                MouzaIdGlobal = $("#Mouza").val();
//                QanoongoidGlobal = $("#Qanoongoee").val();
//                $("#KhasraTypeMultipleKhasra").prop("checked", true);
//                $("#KhasraTypeSingleKhasra").prop("checked", false);
//            }
//            else {
//                $("#KhasraTypeSingleKhasra").prop("checked", true);
//                $("#KhasraTypeMultipleKhasra").prop("checked", false);
//            }
//            onKharaTypeChange();
//            if (multipleKhasraDCRateType == highestRateApplied || multipleKhasraDCRateType == "") {
//                $("#landAreaLabelDiv").show();
//                $("#PropertyAreaQuantity").show();
//                $("#PropertyAreaQuantityLabel").show();
//                $("#PropertyAreaQuantity").val(challan.propertyInfo.Area);
//                $("#LandUnitOfArea").show();
//                document.getElementById("LandUnitOfArea").innerHTML = '&nbsp;' + challan.propertyInfo.rateUnit;
//                $("#btnAreaCalcDiv").show();
//            }
//            else {
//                $("#landAreaLabelDiv").hide();
//                $("#PropertyAreaQuantity").hide();
//                $("#PropertyAreaQuantityLabel").hide();
//            }
//            if (multipleKhasraDCRateType == allRatesApplied) {
//                allRatesAppliedFlag = true;
//                highestRateApplieedFlag = false;
//            }
//            else if (multipleKhasraDCRateType == highestRateApplied) {
//                allRatesAppliedFlag = false;
//                highestRateApplieedFlag = true;
//            }
//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=' + encodeURIComponent(challan.propertyInfo.MouzaString) + "&QanoonGoId=" + challan.propertyInfo.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, "Select Location", "Location", challan.propertyInfo.LocationString);
//        }
//        else {
//            $("#squareQilaTypeRadioButtonDiv").show();
//            $('#squareNoHierarchyDiv').show();
//            $('#khasraHierarchyDiv').hide();
//            $('#btnMultipleKhasra').hide();
//            $('#khasraTypeRadioButtonDiv').hide();

//            multipleSquareQilaList = challan.propertyInfo.MultipleQilas;
//            multipleSquareQilaDCRateType = challan.propertyInfo.MultipleSquareQilaDCRateType;
//            multipleSquareQilaSelected = (challan.propertyInfo.MultipleQilas != null && challan.propertyInfo.MultipleQilas.length > 0 ? true : false);
//            if (multipleSquareQilaSelected) {
//                // Mouza
//                // QanoonGoo
//                MouzaNameGlobal = $('#Mouza').data("kendoDropDownList").text();
//                MouzaIdGlobal = $("#Mouza").val();
//                QanoongoidGlobal = $("#Qanoongoee").val();
//                $("#SquareQilaTypeMultiple").prop("checked", true);
//                $("#SquareQilaTypeSingle").prop("checked", false);
//            }
//            else {
//                $("#SquareQilaTypeSingle").prop("checked", true);
//                $("#SquareQilaTypeMultiple").prop("checked", false);
//            }
//            onSquareQilaTypeChange();
//            if (multipleSquareQilaDCRateType == highestRateApplied || multipleSquareQilaDCRateType == "") {
//                $("#landAreaLabelDiv").show();
//                $("#PropertyAreaQuantity").show();
//                $("#PropertyAreaQuantityLabel").show();
//                $("#PropertyAreaQuantity").val(challan.propertyInfo.Area);
//                $("#LandUnitOfArea").show();
//                document.getElementById("LandUnitOfArea").innerHTML = '&nbsp;' + challan.propertyInfo.rateUnit;
//                $("#btnAreaCalcDiv").show();
//            }
//            else {
//                $("#landAreaLabelDiv").hide();
//                $("#PropertyAreaQuantity").hide();
//                $("#PropertyAreaQuantityLabel").hide();
//            }
//            if (multipleSquareQilaDCRateType == allRatesApplied) {
//                allRatesAppliedFlag = true;
//                highestRateApplieedFlag = false;
//            }
//            else if (multipleSquareQilaDCRateType == highestRateApplied) {
//                allRatesAppliedFlag = false;
//                highestRateApplieedFlag = true;
//            }

//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaIdForSquareNo?MouzaName=' + encodeURIComponent(challan.propertyInfo.MouzaString) + "&QanoonGoId=" + challan.propertyInfo.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo.LandClassificationId, "Select Location", "Location", challan.propertyInfo.LocationString);
//        }
//        //var dropdownlist4 = $("#Location").data("kendoDropDownList");
//        //dropdownlist4.value(challan.propertyInfo.Location);
//        //$("#Khasra").val(challan.propertyInfo.KhasraNo);
//        if (challan.propertyInfo.isKhasraHierarchy) {
//            $("#Khasra").val(challan.propertyInfo.KhasraNo);
//            KhasraID = challan.propertyInfo.KhasraID;
//        }
//        else {
//            $("#squareNo").val(challan.propertyInfo.SquareNo);
//            SquareNoId = challan.propertyInfo.SquareID;
//            $("#qilaNo").val(challan.propertyInfo.QilaNo);
//            QilaNoId = challan.propertyInfo.QilaID;
//        }
//        //dropdownlist4.value(challan.propertyInfo.LocationId);
//    }
//    //setLandUnitDCScreen();
//}

function initializeDropDownWithText(url, placeholder, elementId, selectedText) {
    $("#" + elementId).kendoDropDownList({
        dataTextField: "Name",
        optionLabel: placeholder,
        dataValueField: "Id",
        //value: "", // used to select value from the dropdown on the basis of dataValueField
        dataSource: {
            transport: {
                read: {
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                },
            },
        }, //datasource ending
        change: function (e) { // change event of drop down
            console.log("change event of dropdown");
        },
        dataBound: function (e) { // data bound event
            console.log("dataBound event of dropdown");
            // Select value of drop down 
            var dropdownlist = $("#" + elementId).data("kendoDropDownList");
            dropdownlist.select(function (dataItem) { // used to select value from the dropdown on the basis of dataTextField
                return dataItem.Name === selectedText;
            });
            dropdownlist.trigger("change");
        }
    });
    //debugger;
    //var dropdownlist = $("#" + elementId).data("kendoDropDownList");

    //dropdownlist.select(1);

    ////dropdownlist.select(function (dataItem) {
    ////    return dataItem.Name === selectedValue;
    ////});
    //dropdownlist.trigger("change");
}

function initializeMouzaDropDownWithText(url, placeholder, elementId, selectedText) {

    $("#" + elementId).kendoDropDownList({
        dataTextField: "Name",
        optionLabel: placeholder,
        dataValueField: "Id",
        //value: "", // used to select value from the dropdown on the basis of dataValueField
        dataSource: {
            transport: {
                read: {
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                },
            },
        }, //datasource ending

        change: function (e) { // change event of drop down
            console.log("change event of dropdown");
        },
        dataBound: function (e) { // data bound event
            console.log("dataBound event of dropdown");

            // Select value of drop down 
            var dropdownlist = $("#" + elementId).data("kendoDropDownList");

            dropdownlist.select(function (dataItem) { // used to select value from the dropdown on the basis of dataTextField

                if (dataItem.IS_KHASRA_HIERARCHY && dataItem.IS_SQUARE_NO_HIERARCHY) {
                    $("#bothKandSqNHeirachySelectionDiv").show();
                    console.log("isExchangeOfProperty = " + isExchangeOfProperty + " isDCNextFirstScreen = " + isDCNextFirstScreen);
                    if (isExchangeOfProperty && !isDCNextFirstScreen) {

                        if (challan.propertyInfo2.isKhasraHierarchy) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsKhasraSelected');
                        }
                        else if (challan.propertyInfo2.isSquareNoHierarchy) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsSqNoSelected');
                        }

                    }

                    else {
                        if (challan.propertyInfo.isKhasraHierarchy) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsKhasraSelected');
                        }
                        else if (challan.propertyInfo.isSquareNoHierarchy) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsSqNoSelected');
                        }
                    }
                }
                else {
                    $("#bothKandSqNHeirachySelectionDiv").hide();
                }

                return dataItem.Name === selectedText;
            });
            dropdownlist.trigger("change");
        }
    });


    //debugger;
    //var dropdownlist = $("#" + elementId).data("kendoDropDownList");

    //dropdownlist.select(1);

    ////dropdownlist.select(function (dataItem) {
    ////    return dataItem.Name === selectedValue;
    ////});
    //dropdownlist.trigger("change");
}

function initializePropertyAreaDropDownWithText(url, placeholder, elementId, selectedText) {
    $("#" + elementId).kendoDropDownList({
        dataTextField: "Name",
        optionLabel: placeholder,
        dataValueField: "Id",
        //value: "", // used to select value from the dropdown on the basis of dataValueField
        dataSource: {
            transport: {
                read: {
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                },
            },
        }, //datasource ending
        change: function (e) { // change event of drop down
            console.log("change event of prop area dropdown");
        },
        dataBound: function (e) { // data bound event
            console.log("dataBound event of prop area dropdown");
            // Select value of drop down 
            var dropdownlist = $("#" + elementId).data("kendoDropDownList");
            dropdownlist.select(function (dataItem) { // used to select value from the dropdown on the basis of dataTextField
                if ((dataItem.IsKhasraAvailable && dataItem.IsSquareNoAvailable) || (dataItem.IsKhasraAvailable && dataItem.IsPropertyDetailAvailable) || (dataItem.IsSquareNoAvailable && dataItem.IsPropertyDetailAvailable) || (dataItem.IsKhasraAvailable && dataItem.IsSquareNoAvailable && dataItem.IsPropertyDetailAvailable)) {
                    $("#bothKandSqNHeirachySelectionDiv").show();
                    if (dataItem.IsKhasraAvailable) {
                        $("#Khasra").show();
                    }
                    else {
                        $("#Khasra").hide();
                    }
                    if (dataItem.IsSquareNoAvailable) {
                        $("#Square").show();
                    }
                    else {
                        $("#Square").hide();
                    }
                    if (dataItem.IsPropertyDetailAvailable) {
                        $("#Property").show();
                    }
                    else {
                        $("#Property").hide();
                    }
                    if (isExchangeOfProperty && !isDCNextFirstScreen) {
                        if (challan.propertyInfo2.IsKhasraAvailable) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsKhasraSelected');
                        }
                        else if (challan.propertyInfo2.isSquareNoHierarchy) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsSqNoSelected');
                        }
                        else if (challan.propertyInfo2.IsPropertyDetailAvailable) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsSqNoSelected');
                        }
                    }
                    else {
                        if (challan.propertyInfo.IsKhasraAvailable) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsKhasraSelected');
                        }
                        else if (challan.propertyInfo.isSquareNoHierarchy) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsSqNoSelected');
                        }
                        else if (challan.propertyInfo.IsPropertyDetailAvailable) {
                            SetRadioButtonValue('bothKandSqNSelection', 'bothKandSqNIsPropertySelected');
                        }
                    }
                }
                return dataItem.Name === selectedText;
            });
            dropdownlist.trigger("change");
        }
    });
    //debugger;
    //var dropdownlist = $("#" + elementId).data("kendoDropDownList");

    //dropdownlist.select(1);

    ////dropdownlist.select(function (dataItem) {
    ////    return dataItem.Name === selectedValue;
    ////});
    //dropdownlist.trigger("change");
}

function initializeDropDownWithId(url, placeholder, elementId, selectedId) {
    $("#" + elementId).kendoDropDownList({
        dataTextField: "Name",
        optionLabel: placeholder,
        dataValueField: "Id",
        //value: "", // used to select value from the dropdown on the basis of dataValueField
        dataSource: {
            transport: {
                read: {
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                },
            },
        }, //datasource ending
        change: function (e) { // change event of drop down
            console.log("change event of prop area dropdown");
        },
        dataBound: function (e) { // data bound event
            console.log("dataBound event of prop area dropdown");
            // Select value of drop down 
            var dropdownlist = $("#" + elementId).data("kendoDropDownList");
            dropdownlist.value(selectedId);
            //dropdownlist.select(function (dataItem) { // used to select value from the dropdown on the basis of dataValueField
            //    dropdownlist.value(selectedId);
            //    return dataItem.value === selectedId;
            //});
            dropdownlist.trigger("change");
        }
    });
}


function initializeDropDownWithIdString(url, placeholder, elementId) {
    $("#" + elementId).kendoDropDownList({
        dataTextField: "Name",
        optionLabel: placeholder,
        dataValueField: "IdString",
        dataSource: {
            transport: {
                read: {
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                },
            },

        },
    });
}

//function populateFirstScreenWhenComingBackFromSecondScreenDC2() {

//    $(".k-invalid-msg").hide();
//    if (challan.propertyInfo2.isUrban == true) {
//        $('#Urban').prop('checked', true);
//        LandClassificationChange();
//        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC", challan.propertyInfo2.DistrictId);
//        initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.propertyInfo2.DistrictId, selectTalukaText, "talukaDropdownDC", challan.propertyInfo2.TalukaId);
//        initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/TownByTalukaId?Id=' + challan.propertyInfo2.TalukaId, selectTownText, "townDropdownDC", challan.propertyInfo2.TownString);
//        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/RevenueCircleByTalukaId?id=' + challan.propertyInfo2.TalukaId + '&town=' + challan.propertyInfo2.TownString, selectRevenueCircleText, "RevenueCircle", challan.propertyInfo2.RevenueCircleId);
//        var dropdownlist = $("#RevenueCircle").data("kendoDropDownList");
//        dropdownlist.value(challan.propertyInfo2.RevenueCircleId);
//        initializePropertyAreaDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/PropertyAreaByLandInfo?TalukaId=' + challan.propertyInfo2.TalukaId + '&town=' + challan.propertyInfo2.TownString + '&RevenueCircleId=' + challan.propertyInfo2.RevenueCircleId, "Select Property Area", "PropertyArea", challan.propertyInfo2.PropertyAreaString);

//        initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/GetFloors?RevenueCircleId=' + challan.propertyInfo2.RevenueCircleId, selectFloorText, "Floor", challan.propertyInfo2.FloorId);
//        var floordropdownlist = $("#Floor").data("kendoDropDownList");
//        floordropdownlist.value(challan.propertyInfo2.FloorId);
//        var dropdownlist2 = $("#PropertyArea").data("kendoDropDownList");
//        dropdownlist2.value(challan.propertyInfo.PropertyAreaId);

//         if (challan.propertyInfo2.IsKhasraAvailable) {
//            $('#khasraUrbanDiv').show();
//            $("#KhasraUrban").val(challan.propertyInfo2.KhasraUrbanNo);
//            KhasraUrbanId = challan.propertyInfo2.KhasraUrbanID;
//            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyAreaKhasraUrban?khasraUrbanNo=' + challan.propertyInfo2.KhasraUrbanNo +
//                "&PropertyAreaID=" + challan.propertyInfo2.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo2.RevenueCircleId + "&TalukaId=" + challan.propertyInfo2.TalukaId + "&town=" + +challan.propertyInfo2.TownString, selectlandClassificationText, "LandClassificationUrban");

//            var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
//            dropdownlist3.value(challan.propertyInfo2.LandClassificationId);
//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaIdHavingKhasraNo?TalukaId=' + challan.propertyInfo2.TalukaId + "&town=" + challan.propertyInfo2.TownString + "&PropertyAreaID=" + challan.propertyInfo2.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo2.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "LocationUrban",challan.propertyInfo2.LocationUrbanString);
//        }

//        else if (challan.propertyInfo2.isSquareNoHierarchy) {
//            $('#squareNoUrbanHierarchyDiv').show();
//            $("#squareNoUrban").val(challan.propertyInfo2.SquareNoUrban);
//            SquareNoUrbanId = challan.propertyInfo2.SquareUrbanID;
//            $("#qilaNoUrban").val(challan.propertyInfo2.QilaNoUrban);
//            QilaNoUrbanId = challan.propertyInfo2.QilaUrbanID;

//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByQilaNoUrban?TalukaId=' + challan.propertyInfo2.TalukaId +'&town='+ challan.propertyInfo2.TownString+'&revenueCircleId=' + challan.propertyInfo2.RevenueCircleId+'&PropertyAreaID=' + challan.propertyInfo2.PropertyAreaId+"&squareNoId=" + challan.propertyInfo2.SquareUrbanID+ '&qilaUrbanNo=' + challan.propertyInfo2.QilaNoUrban , selectlandClassificationText, "LandClassificationUrban", challan.propertyInfo2.LandClassificationString);
//            var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
//            dropdownlist3.value(challan.propertyInfo.LandClassificationId);
//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaIdHavingSquareNo?TalukaId=' + challan.propertyInfo2.TalukaId + "&town=" + challan.propertyInfo2.TownString + "&PropertyAreaID=" + challan.propertyInfo2.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo2.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "LocationUrban", challan.propertyInfo2.LocationUrbanString);
//        }
//        else {
//            $('#khasraUrbanDiv').hide();
//            $('#squareNoUrbanHierarchyDiv').hide();
//            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByPropertyArea?PropertyAreaName=' + challan.propertyInfo2.PropertyAreaString + "&revenueCircleId=" +
//                challan.propertyInfo2.RevenueCircleId + "&TalukaId=" + challan.propertyInfo2.TalukaId + "&town=" + challan.propertyInfo2.town, selectlandClassificationText, "LandClassificationUrban");

//            var dropdownlist3 = $("#LandClassificationUrban").data("kendoDropDownList");
//            dropdownlist3.value(challan.propertyInfo2.LandClassificationId);
//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByPropertyAreaId?TalukaId=' + challan.propertyInfo2.TalukaId + "&town=" + challan.propertyInfo2.TownString + "&PropertyAreaId=" + challan.propertyInfo2.PropertyAreaId + "&revenueCircleId=" + challan.propertyInfo2.RevenueCircleId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "LocationUrban", challan.propertyInfo2.LocationUrbanString);
//        }




//        $('#PropertyAreaQuantity').val(challan.propertyInfo2.Area);

//        var dropdownlist4 = $("#LocationUrban").data("kendoDropDownList");

//        dropdownlist4.value(challan.propertyInfo.LocationId);
//    }
//    else {
//        challan.propertyInfo2.isUrban == false;
//         $('#Rural').prop('checked', true);
//         LandClassificationChange();
//         initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', selectDistrictText, "districtDropdownDC", challan.propertyInfo2.DistrictId);
//         initializeDropDownWithId(base_url_service_layer + "/api/Proxy/Locations/TalukasByDistrictId?Id=" + challan.propertyInfo2.DistrictId, selectTalukaText, "talukaDropdownDC", challan.propertyInfo2.TalukaId);
//         initializeDropDownWithId(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTalukaId?id=' + challan.propertyInfo2.TalukaId, "Select Qanoongoee", "Qanoongoee", challan.propertyInfo2.QanoongoeeId);
//        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/QanoongoByTalukaId?id=' + challan.TalukaId, "Select Qanoongoee", "Qanoongoee");
//        var dropdownlist = $("#Qanoongoee").data("kendoDropDownList");
//        dropdownlist.value(challan.propertyInfo2.QanoongoeeId);
//        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=' + challan.propertyInfo2.QanoongoeeId, "Select Mouza", "Mouza");
//        initializeMouzaDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/MouzaByLandInfo?QanoonGoId=' + challan.propertyInfo2.QanoongoeeId, "Select Mouza", "Mouza", challan.propertyInfo2.MouzaString);
//        var dropdownlist2 = $("#Mouza").data("kendoDropDownList");
//        dropdownlist2.value(challan.propertyInfo2.MouzaId);
//        if (challan.propertyInfo2.isKhasraHierarchy) {
//            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=' + encodeURIComponent(challan.propertyInfo2.MouzaString) + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId, selectlandClassificationText, "LandClassification");
//        }
//        else {
//            initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaNameForSquareNo?MouzaName=' + encodeURIComponent(challan.propertyInfo2.MouzaString) + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId, selectlandClassificationText, "LandClassification");
//        }
//        var dropdownlist3 = $("#LandClassification").data("kendoDropDownList");
//        dropdownlist3.value(challan.propertyInfo2.LandClassificationId);
//        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=' + challan.propertyInfo2.MouzaString + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "Location");
//        initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassificationsByMouzaName?MouzaName=' + challan.propertyInfo2.MouzaString + "&QanoonGoId=" + challan.propertyInfo.QanoongoeeId, selectlandClassificationText, "LandClassification");
//        var dropdownlist3 = $("#LandClassification").data("kendoDropDownList");
//        dropdownlist3.value(challan.propertyInfo.LandClassificationId);
//        $('#PropertyAreaQuantity').val(challan.propertyInfo.Area);
//        if (challan.propertyInfo2.isKhasraHierarchy) {
//            $('#squareNoHierarchyDiv').hide();
//            $('#btnMultipleSquareQila').hide();
//            $('#khasraHierarchyDiv').show();
//            $('#khasraTypeRadioButtonDiv').show();
//            $("#squareQilaTypeRadioButtonDiv").hide();
//            multipleKhasraList = challan.propertyInfo2.MultipleKhasras;
//            multipleKhasraDCRateType = challan.propertyInfo2.MultipleKhasraDCRateType;
//            multipleKhasrasSelected = (challan.propertyInfo2.MultipleKhasras != null && challan.propertyInfo2.MultipleKhasras.length > 0 ? true : false);

//            if (multipleKhasrasSelected) {
//                MouzaNameGlobal = $('#Mouza').data("kendoDropDownList").text();
//                MouzaIdGlobal = $("#Mouza").val();
//                QanoongoidGlobal = $("#Qanoongoee").val();
//                $("#KhasraTypeMultipleKhasra").prop("checked", true);
//                $("#KhasraTypeSingleKhasra").prop("checked", false);
//            }
//            else {
//                $("#KhasraTypeSingleKhasra").prop("checked", true);
//                $("#KhasraTypeMultipleKhasra").prop("checked", false);
//            }

//            onKharaTypeChange();

//            if (multipleKhasraDCRateType == highestRateApplied || multipleKhasraDCRateType == "") {
//                $("#landAreaLabelDiv").show();
//                $("#PropertyAreaQuantity").show();
//                $("#PropertyAreaQuantityLabel").show();
//                $("#PropertyAreaQuantity").val(challan.propertyInfo2.Area);

//                $("#LandUnitOfArea").show();
//                document.getElementById("LandUnitOfArea").innerHTML = '&nbsp;' + challan.propertyInfo2.rateUnit;
//                $("#btnAreaCalcDiv").show();
//            }
//            else {
//                $("#landAreaLabelDiv").hide();
//                $("#PropertyAreaQuantity").hide();
//                $("#PropertyAreaQuantityLabel").hide();
//            }

//            if (multipleKhasraDCRateType == allRatesApplied) {
//                allRatesAppliedFlag = true;
//                highestRateApplieedFlag = false;
//            }
//            else if (multipleKhasraDCRateType == highestRateApplied) {
//                allRatesAppliedFlag = false;
//                highestRateApplieedFlag = true;
//            }

//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaId?MouzaName=' + encodeURIComponent(challan.propertyInfo2.MouzaString) + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "Location", challan.propertyInfo2.LocationString);
//        }
//        else {
//            $("#squareQilaTypeRadioButtonDiv").show();
//            $('#btnMultipleKhasra').hide();
//            $('#squareNoHierarchyDiv').show();
//            $('#khasraHierarchyDiv').hide();
//            multipleSquareQilaList = challan.propertyInfo2.MultipleQilas;
//            multipleSquareQilaDCRateType = challan.propertyInfo2.MultipleSquareQilaDCRateType;
//            multipleSquareQilaSelected = (challan.propertyInfo2.MultipleQilas != null && challan.propertyInfo2.MultipleQilas.length > 0 ? true : false);
//            if (multipleSquareQilaSelected) {
//                 Mouza
//                 QanoonGoo
//                MouzaNameGlobal = $('#Mouza').data("kendoDropDownList").text();
//                MouzaIdGlobal = $("#Mouza").val();
//                QanoongoidGlobal = $("#Qanoongoee").val();
//                $("#SquareQilaTypeMultiple").prop("checked", true);
//                $("#SquareQilaTypeSingle").prop("checked", false);
//            }
//            else {
//                $("#SquareQilaTypeSingle").prop("checked", true);
//                $("#SquareQilaTypeMultiple").prop("checked", false);
//            }
//            onSquareQilaTypeChange();
//            if (multipleSquareQilaDCRateType == highestRateApplied || multipleSquareQilaDCRateType == "") {
//                $("#landAreaLabelDiv").show();
//                $("#PropertyAreaQuantity").show();
//                $("#PropertyAreaQuantityLabel").show();
//                $("#PropertyAreaQuantity").val(challan.propertyInfo2.Area);
//                $("#LandUnitOfArea").show();
//                document.getElementById("LandUnitOfArea").innerHTML = '&nbsp;' + challan.propertyInfo2.rateUnit;
//                $("#btnAreaCalcDiv").show();
//            }
//            else {
//                $("#landAreaLabelDiv").hide();
//                $("#PropertyAreaQuantity").hide();
//                $("#PropertyAreaQuantityLabel").hide();
//            }
//            if (multipleSquareQilaDCRateType == allRatesApplied) {
//                allRatesAppliedFlag = true;
//                highestRateApplieedFlag = false;
//            }
//            else if (multipleSquareQilaDCRateType == highestRateApplied) {
//                allRatesAppliedFlag = false;
//                highestRateApplieedFlag = true;
//            }
//            initializeDropDownWithText(base_url_service_layer + '/api/Proxy/Locations/AllLocationsByMouzaIdForSquareNo?MouzaName=' + encodeURIComponent(challan.propertyInfo2.MouzaString) + "&QanoonGoId=" + challan.propertyInfo2.QanoongoeeId + "&landClassificationId=" + challan.propertyInfo2.LandClassificationId, "Select Location", "Location", challan.propertyInfo2.LocationString);
//        }

//        var dropdownlist4 = $("#Location").data("kendoDropDownList");

//        if (challan.propertyInfo2.isKhasraHierarchy) {
//            $("#Khasra").val(challan.propertyInfo2.KhasraNo);
//            KhasraID = challan.propertyInfo2.KhasraID;
//        }
//        else {
//            $("#squareNo").val(challan.propertyInfo2.SquareNo);
//            SquareNoId = challan.propertyInfo2.SquareID;
//            $("#qilaNo").val(challan.propertyInfo2.QilaNo);
//            QilaNoId = challan.propertyInfo2.QilaID;
//        }

//        $('#PropertyAreaQuantity').val(challan.propertyInfo2.Area);

//    }

//    if (challan.propertyInfo2.rateUnit == "null" || challan.propertyInfo2.rateUnit == null || challan.propertyInfo2.rateUnit == "") {
//        challan.propertyInfo2.rateUnit = "";
//    }
//    else {
//        document.getElementById("LandUnit").innerHTML = "&nbsp;Per " + challan.propertyInfo2.rateUnit;
//    }
//    document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; " + challan.propertyInfo2.rateUnit;

//    setLandUnitDCScreen2();


//}

function setLandUnitDCScreen2() {


    var rid = challan.propertyInfo2.isUrban;


    if (rid == true) {


        var id2 = challan.propertyInfo2.LandClassificationId;

        if (id2 == 0) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;";
            //document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        }
        else if (id2 == 1) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Acre";
            //  document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Acre";
        }
        else if (id2 == 2) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Marla";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Marla";
        }
        else if (id2 == 3) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Kanal";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Kanal";
        }
        else if (id2 == 4) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Marla";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Marla";
        }
        else {
            document.getElementById("LandUnit").innerHTML = "&nbsp;";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        }
    }

    else {

        var id = challan.propertyInfo2.LandClassificationId;

        if (id == 0) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;";
            //  document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        }
        else if (id == 1) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Acre";
            //  document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Acre";
        }
        else if (id == 2) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Marla";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Marla";
        }
        else if (id == 3) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Kanal";
            //  document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Kanal";
        }
        else if (id == 4) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Marla";
            //document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Marla";
        }
        else {
            document.getElementById("LandUnit").innerHTML = "&nbsp;";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        }


    }


}

function setLandUnitDCScreen() {


    var rid = challan.propertyInfo.isUrban;


    if (rid == true) {


        var id2 = challan.propertyInfo.LandClassificationId;

        if (id2 == 0) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        }
        else if (id2 == 1) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Acre";
            //document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Acre";
        }
        else if (id2 == 2) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Marla";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Marla";
        }
        else if (id2 == 3) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Kanal";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Kanal";
        }
        else if (id2 == 4) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Marla";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Marla";
        }
        else {
            document.getElementById("LandUnit").innerHTML = "&nbsp;";
            //  document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        }
    }

    else {

        var id = challan.propertyInfo.LandClassificationId;

        if (id == 0) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        }
        else if (id == 1) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Acre";
            //document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Acre";
        }
        else if (id == 2) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Marla";
            //document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Marla";
        }
        else if (id == 3) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Kanal";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Kanal";
        }
        else if (id == 4) {
            document.getElementById("LandUnit").innerHTML = "&nbsp;Per Marla";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp; Marla";
        }
        else {
            document.getElementById("LandUnit").innerHTML = "&nbsp;";
            // document.getElementById("LandUnitOfArea").innerHTML = "&nbsp;";
        }


    }


}




function resetDCValuationChallanValues() {

    challan.propertyInfo.QanoongoeeString = "";
    challan.propertyInfo.QanoongoeeId = "";

    challan.propertyInfo.RevenueCircleString = "";
    challan.propertyInfo.RevenueCircleId = "";

    challan.propertyInfo.MouzaString = "";
    challan.propertyInfo.MouzaId = "";

    challan.propertyInfo.PropertyAreaString = "";
    challan.propertyInfo.PropertyAreaId = "";

    challan.propertyInfo.IrrigationMode = "";
    challan.propertyInfo.IrrigationModeId = "";


    challan.propertyInfo.TalukaLandType = "";
    challan.propertyInfo.TalukaLandTypeID = "";


    challan.propertyInfo.LandClassificationString = "";

    challan.propertyInfo.LandClassificationId = "";

    challan.propertyInfo.LocationString = "";
    challan.propertyInfo.LocationId = "";


    challan.propertyInfo.Rate = "";

    challan.propertyInfo.Area = "";

    challan.propertyInfo.FinalRate = "";

    challan.propertyInfo.isUrban = ""
    challan.propertyInfo.ValuationAmount = 0;


}

function resetDCValuationChallanValues2() {

    challan.propertyInfo2.QanoongoeeString = "";
    challan.propertyInfo2.QanoongoeeId = "";

    challan.propertyInfo2.RevenueCircleString = "";
    challan.propertyInfo2.RevenueCircleId = "";

    challan.propertyInfo2.MouzaString = "";
    challan.propertyInfo2.MouzaId = "";

    challan.propertyInfo2.PropertyAreaString = "";
    challan.propertyInfo2.PropertyAreaId = "";

    challan.propertyInfo2.IrrigationMode = "";
    challan.propertyInfo2.IrrigationModeId = "";

    challan.propertyInfo2.TalukaLandType = "";
    challan.propertyInfo2.TalukaLandTypeID = "";

    challan.propertyInfo2.LandClassificationString = "";

    challan.propertyInfo2.LandClassificationId = "";

    challan.propertyInfo2.LocationString = "";
    challan.propertyInfo2.LocationId = "";


    challan.propertyInfo2.Rate = "";

    challan.propertyInfo2.Area = "";

    challan.propertyInfo2.FinalRate = "";

    challan.propertyInfo2.isUrban = ""
    challan.propertyInfo2.ValuationAmount = 0;

}

function onChangePropertyConstructed() {

    if ($('#constructedAreaCVT').prop('required')) {
        $('#constructedAreaCVTDiv').show();
        $('#SqFtDiv').show();
        $('#propertyConstructed').prop('checked', true);
        $('#propertyConstructed').attr('checked', true);
        return;
    }

    var isPropertyConstructed = $('#propertyConstructed').is(":checked");
    var constructedValue = $('#constructedAreaCVT').val();
    //if ((constructedValue != null && constructedValue != "")) {
    //    isPropertyConstructed = true;
    //}            
    if (isPropertyConstructed || $('#constructedAreaCVT').prop('required')) {
        $('#constructedAreaCVTDiv').show();
        $('#SqFtDiv').show();
    }
    else {
        $('#constructedAreaCVTDiv').hide();
        $('#constructedAreaCVT').val("");
        $("#SqFtDiv").hide();
        document.getElementById("CSValueDCCalculated").innerHTML = "";
    }
}

function updateIsLeasePeriod() {
    isLeasePeriod = false;
    if (queryStringName == 'PayCVTandReg')
        var deedid = challan.TransactionName;
    else
        var deedid = $("#TransactionName").val();
    for (i = 0; i < leasePeriodDeeds.length; i++) {
        if (deedid == leasePeriodDeeds[i]) {
            isLeasePeriod = true;
        }
    }
}

function updateIsTotalLeaseMoney() {

    isTotalLeaseMoney = false;

    var deedid = $("#TransactionName").val();

    for (i = 0; i < TotalLeaseMoneyDeeds.length; i++) {

        if (deedid == TotalLeaseMoneyDeeds[i]) {

            isTotalLeaseMoney = true;

        }

    }

}


function showLeasePeriod() {


    if (isLeasePeriod == true) {
        $("#LeasePeriodGenerateChallanDiv").show();

    }
    else {
        $("#LeasePeriodGenerateChallanDiv").hide();
    }


}


function showTotalLeaseMoney() {


    if (isTotalLeaseMoney == true) {
        $("#LeaseMoneyDiv").show();

    }
    else {
        $("#LeaseMoneyDiv").hide();
    }


}


function backForCVTScreen() {
    if (challan.TransactionName != PowerOfAttorneyDeedId)
        resetCVTScreen();
    if (isExchangeOfProperty == true && isCVTNextFirstScreen == true) {
        $("#step3pending").attr("src", "../Images/steps-pending.png");
        resetChallanModelCVT();
        if (isDCValuationFlag == true) {
            $("#RateOfChallan").show();
            $("#CVTView").hide();
            populateFirstScreenWhenComingBackFromSecondScreenDC2();
        }
        else {
            if (queryStringName == "GenerateChallan" || queryStringName == "GenerateChallanForOldRegistry") {
                $("#DeedDetailsForGenerateChallan").show();
            }
            else if (queryStringName == "PayCVTandReg") {
                $("#DeedDetailsForPayCVTandReg").show();
            }
            $("#CVTView").hide();
        }
    }
    else if (isExchangeOfProperty == true && isCVTNextFirstScreen == false) {
        $("#step4pending").attr("src", "../Images/steps-pending.png");
        document.getElementById("cvtHeading").innerHTML = ValueOfStructureFirstParty;//CVTforFirstProperty;
        resetChallanModelCVT2();
        isCVTNextFirstScreen = true;
        populateCVTFields();
        calculateCVTTaxAmount();
        //  populateFirstScreenWhenComingBackFromSecondScreenDC();
    }
    else {
        $("#step2pending").attr("src", "../Images/steps-pending.png");
        if (challan.TransactionName != PowerOfAttorneyDeedId)
            resetChallanModelCVT();
        if (isDCValuationFlag == true) {
            $("#RateOfChallan").show();
            $("#CVTView").hide();
        }
        else {
            $("#CVTView").hide();
            if (queryStringName == "PayCVTandReg") {
                if (regCheck || deficientRegCheck) {
                    $("#DeedDetailsForPayCVTandReg").show();
                }
                else {
                    $("#challanform").show();
                }
            }
            else {
                $("#DeedDetailsForGenerateChallan").show();
                $("#CVTView").hide();
            }
        }
    }
}

function updateIsLegalHeir() {
    isLegalHeir = false;
    var deedid;
    deedid = $("#TransactionName").val();
    for (i = 0; i < legalHeirDeeds.length; i++) {
        if (deedid == legalHeirDeeds[i]) {
            isLegalHeir = true;
        }
    }
}

function updateIsLegalHeirPayCVTAndReg(DeedId) {
    isLegalHeir = false;


    for (i = 0; i < legalHeirDeeds.length; i++) {

        if (DeedId == legalHeirDeeds[i]) {

            isLegalHeir = true;

        }

    }


}

function showLegalHeir() {
    islegalHeirsBox = false;
    if (isLegalHeir == true) {
        $("#legalHeirsDiv").show();
        //$("#legalHeirsDiv").hide();
    }
    else {
        $("#legalHeirsDiv").hide();
    }
}

function resetCVTScreen() {
    //$("#LandClassificationCVTDiv").hide();
    //if (null != $("#LandClassificationCVT").val("").data("kendoDropDownList"))
    //{
    //    $("#LandClassificationCVT").val("").data("kendoDropDownList").text("Select Location");
    //    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllLandClassifications', "Select Land Classifications", "LandClassificationCVT");
    //}            
    //$("#checkBoxesCVT").hide();
    ResetTextBox("constructedAreaCVT");
    //ResetTextBox("PayableCVTCVTDiv");
    $('#propertyConstructed').attr('checked', false);
    $('#govPropertyExchangeOfPropertyCheckbox').attr('checked', false);
    $("#multiStoryBuilding").hide();
    $('#multiStoryBuilding').attr('checked', false);
    $("#legalHeirs").hide();
    $('#legalHeirs').attr('checked', false);
    //  $('#constructedAreaCVTDiv').hide();
    ResetTextBox("PayableCVTValue");
    ResetTextBox("PayCVTValueMultipleProperties");
    ResetTextBox("payableStampDutyandCVTGenerateChallan");
    //if(challan.lstTaxAmountValue[2]!= null)
    //challan.lstTaxAmountValue[2].AmountValue = parseFloat($("#PropertyValuationGenerateChallan").val().replace(/,/g, ""));
}

function updateChallanModelDeedDetailsPayCVTandRegistration() {
    challan.TotalAmount = $("#PropertyValuationPayCVTandReg").val().replace(/,/g, "");
    if (DigitalScaningFee) {
        challan.DigitalScaningFee = true;
        challan.DigitalFee = $("#scanningFee").val().replace(/,/g, "");
        challan.CopyingFee = $("#copyingFee").val().replace(/,/g, "");
        challan.DuplicateFee = $("#duplicateFee").val().replace(/,/g, "");
    }
    if (MutationFee) {
        debugger;
        challan.MutationFee = true;
        challan.MutationFeeValue = $("#mutationFee").val().replace(/,/g, "");
        challan.CertifiedFee = $("#certifiedFee").val().replace(/,/g, "");

    }
    if (RegFeeNew) {
        challan.RegistryFee = $("#RegFee").val().replace(/,/g, "");
        challan.RegistryFeeString = $("#RegFee").val();
        challan.isRegistryFeeCheck = true;

    }
    else {
        challan.isRegistryFeeCheck = false;
        challan.RegistryFee = 0;
        challan.RegistryFeeString = "";
    }
    if (isAhleCommissionFeeCheck) {
        challan.AhleCommissionFee = $("#ahleCommisionFeeinput").val().replace(/,/g, "");
        challan.AhleCommissionFeeString = $("#ahleCommisionFeeinput").val();
        challan.isAhleCommissionFeeChecked = true;
    }
    else {
        challan.isAhleCommissionFeeChecked = false;
        challan.AhleCommissionFee = 0;
        challan.AhleCommissionFeeString = "";
    }
    if (regCheck) {
        if ($("#registrationFeePayCVTandReg").val() != null && $("#registrationFeePayCVTandReg").val() != "") {
            challan.RegistrationFeeString = $("#registrationFeePayCVTandReg").val().replace(/,/g, "");
        }
        else {
            challan.RegistrationFeeString = null;
        }
    }
    else if (deficientRegCheck) {
        if ($("#registrationFeePayCVTandRegDeficient").val() != null && $("#registrationFeePayCVTandRegDeficient").val() != "") {
            challan.RegistrationFeeString = $("#registrationFeePayCVTandRegDeficient").val().replace(/,/g, "");
        }
        else {
            challan.RegistrationFeeString = null;
        }
    }
    else if (!regCheck && !deficientRegCheck) {
        challan.RegistrationFeeString = null;
    }
    if (isLeasePeriod || cvtCheck) {
        // For CVT
        if ($("#TotalLeaseMoneyGenerateChallan").val() != null && $("#TotalLeaseMoneyGenerateChallan").val() != "") {
            challan.TotalLeaseMoney = $("#TotalLeaseMoneyGenerateChallan").val().replace(/,/g, "");
        }
        if ($("#LeasePeriodGenerateChallan").val() != null && $("#LeasePeriodGenerateChallan").val() != "") {
            challan.leasePeriod = $("#LeasePeriodGenerateChallan").val().replace(/,/g, "");
        }
        else {
            challan.leasePeriod = null;
        }
        // Save in LstTaxAmount in Model
        var isCVTCheckBox = cvtCheck;
        var amount = {};
        for (i = 0; i < deedAmountsModel.DeedAmounts.length; i++) {
            if (deedAmountsModel.DeedAmounts[i].isCVTField || deedAmountsModel.DeedAmounts[i].isPrimaryFieldForCVT) {
                if (deedAmountsModel.DeedAmounts[i].isPrimaryFieldForCVT == true && deedAmountsModel.DeedAmounts[i].isPrimaryAmout == true)
                    continue; // primary field and field for CVT are same 
                if (isCVTCheckBox) {
                    amount = {
                        FieldId: deedAmountsModel.DeedAmounts[i].FieldID,
                        FieldName: deedAmountsModel.DeedAmounts[i].Label,
                        AmountValue: $(deedAmountsModel.DeedAmounts[i].JsID).val().replace(/,/g, ""),
                        AdditionalInfo: "First Property"
                    }
                    var isCVTFieldExistsInModel = false;
                    for (var j = 0; j < challan.lstTaxAmountValue.length; j++) {
                        if (amount.FieldId == challan.lstTaxAmountValue[j].FieldId) {
                            // Field already exists in the list
                            // Replace it. Do not append it
                            isCVTFieldExistsInModel = true;
                            challan.lstTaxAmountValue[j] = amount;
                            break;
                        }
                    }
                    if (!isCVTFieldExistsInModel)
                        challan.lstTaxAmountValue.push(amount);
                }
            }
        }
    }
}

function updateChallanModelForDeficientAmountOldReg() {
    challan.TotalAmount = $("#TotalDeficientOldReg").val().replace(/,/g, "");
    if ($('#RegitrationFeeForOldRegCheck').is(":checked")) {
        challan.RegistryFee = $("#registryFee").val().replace(/,/g, "");
        challan.RegistryFeeString = $("#registryFee").val();
        challan.isRegistryFeeCheck = true;
    }
    else {
        challan.isRegistryFeeCheck = false;
        challan.RegistryFee = 0;
        challan.RegistryFeeString = "";
    }
    if ($('#RegitrationFeeForOldRegCheck').is(":checked")) {
        if ($("#registrationFeePayCVTandReg").val() != null && $("#registrationFeePayCVTandReg").val() != "") {
            challan.RegistrationFeeString = $("#registrationFeePayCVTandReg").val().replace(/,/g, "");
        }
        else {
            challan.RegistrationFeeString = null;
        }
    }
    else if (deficientRegCheck) {
        if ($("#registrationFeePayCVTandRegDeficient").val() != null && $("#registrationFeePayCVTandRegDeficient").val() != "") {
            challan.RegistrationFeeString = $("#registrationFeePayCVTandRegDeficient").val().replace(/,/g, "");
        }
        else {
            challan.RegistrationFeeString = null;
        }
    }
    else if (!regCheck && !deficientRegCheck) {
        challan.RegistrationFeeString = null;
    }
}

function updateChallanModeldeedDetailsDeficient() {
    debugger;
    let isChecked = $('#afterRegistration').is(':checked');
    challan.deficientAmount = $("#DeficientAmount").val().replace(/,/g, "");
    if (isChecked) {
        challan.penalty = $("#PenaltyDeficient").val().replace(/,/g, "");
        challan.surchargeAmount = $("#SurchargeDeficient").val().replace(/,/g, "");
    } else {
        challan.penalty = 0;
        challan.surchargeAmount = 0;
    }
    challan.totalDeficient = $("#TotalDeficient").val().replace(/,/g, "");

    if (challan.TransactionTypeString == "Non-Judicial" && (challan.TotalAmount == null || challan.TotalAmount == "" || challan.TotalAmount == 0)) {
        challan.TotalAmount = $("#PropertyValuationDeficient").val().replace(/,/g, "");
    }
    else {
        challan.SuitFor = $("#SuitForDeficient").val();
    }
}

function CheckForZeroOnChangeCVTPayCVTReg() {
    if ($("#PayCVTValueDeficient").val() != null && $("#PayCVTValueDeficient").val() != "") {
        var deficientCVT = parseFloat($("#PayCVTValueDeficient").val().replace(/,/g, ""));
        if (deficientCVT <= 0) {
            document.getElementById("deficientCVTError").innerHTML = DeficientCVTshouldbegreaterthan0;
            $("#deficientCVTError").show();
            $("#deficientCVTError").css("color", "red");
        }
        else {
            $("#deficientCVTError").hide();
        }
    }
}
function onNextAhleCommissionOld() {

    var res = $('#AhleCommissionOld').kendoValidator().data('kendoValidator').validate();
    if (res) {
        if ($("#ahleCommissionOld").val() != null && $("#ahleCommissionOld").val() != "") {
            var ahleCommissionValue = parseFloat($("#ahleCommissionOld").val().replace(/,/g, ""));
            if (ahleCommissionValue < 200) {
                $("#ahleCommissionOld").kendoValidator().data("kendoValidator").hideMessages();
                $("#ahleComissionAmountErrorOld").html("<span class='k-icon k-warning' style='margin-right: 3px;'> </span> " + "Ahl-e-Comission Fee is not valid. Please enter amount greater than 200");
                $("#ahleComissionAmountErrorOld").show();
                res = false;
            }
            else {
                $("#ahleComissionAmountErrorOld").hide();
                challan.isAhleCommissionFeeChecked = true;
                challan.AhleCommissionFee = $('#ahleCommissionOld').val().replace(/,/g, "");
                challan.AhleCommissionFeeString = $('#ahleCommissionOld').val();
                res = true;
            }
        }

        if (res) {
            rendenChallan();
            $("#AhleCommisionFeePage").hide();
            $("#confirmfrom").show();
        }
    }
}
function onNextPayCVTDeficient() {

    var res = $('#PayCVTFormDeficient').kendoValidator().data('kendoValidator').validate();
    if (res) {
        if ($("#PayCVTValueDeficient").val() != null && $("#PayCVTValueDeficient").val() != "") {
            var deficientCVT = parseFloat($("#PayCVTValueDeficient").val().replace(/,/g, ""));
            if (deficientCVT <= 0) {
                res = false;
            }
            else {
                challan.PayableCvtString = $('#PayCVTValueDeficient').val().replace(/,/g, "");
                challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, "");
                res = true;
            }
        }

        if (res) {
            $.ajax({
                url: base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartialPayCVTDeficient',
                type: 'POST',
                data: JSON.stringify(challan),
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (isAhleCommissionFeeCheck == true) {
                        $("#PayCVTDeficient").hide();
                        $("#AhleCommisionFeePage").show();
                    }
                    else {
                        rendenChallan();
                        $("#PayCVTDeficient").hide();
                        $("#confirmfrom").show();
                    }
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                }
            });
        }
    }
}

function CheckForZeroOnchangePayCVTReg() {
    var deficientRegistration = $("#registrationFeePayCVTandRegDeficient").val().replace(/,/g, "");
    challan.RegistrationFeeString = $("#registrationFeePayCVTandRegDeficient").val().replace(/,/g, "");
    if (deficientRegistration <= 0) {
        document.getElementById("deficientRegistrationError").innerHTML = DeficientRegistrationshouldbegreaterthan0;
        $("#deficientRegistrationError").show();
        $("#deficientRegistrationError").css("color", "red");
    }
    else {
        $("#deficientRegistrationError").hide();
    }
}

function OnNextPayCVTandRegistrationFeeDeedDetails() {

    //validate 
    //var res = $('#DeedDetailsForPayCVTandRegFormProperty').kendoValidator().data('kendoValidator').validate();
    var res = $('#DeedDetailsForPayCVTandRegFormPropertyValuation').kendoValidator().data('kendoValidator').validate();
    if (queryStringName == "GenerateChallanForOldRegistry") {
        deficientRegCheck = $('#RegitrationFeeForOldRegCheck').is(":checked");
    }
    else
        deficientRegCheck = $('#DeficientRegistration').is(":checked");
    if (regCheck || deficientRegCheck) {
        if (regCheck) {
            var res2 = $('#RegistrationPayCVTandRegDeedDetailsForm').kendoValidator().data('kendoValidator').validate();
        } else {
            var res2 = $('#RegistrationPayCVTandRegDeedDetailsFormDeficient').kendoValidator().data('kendoValidator').validate();
        }
    }
    else if (cvtCheck || isLeasePeriod) {
        // In case of CVT, Deed Details screen would be visible
        var res2 = $('#leaseDeedPayCVTRegistrationForm').kendoValidator().data('kendoValidator').validate();
    }

    if (!res2)
        res = res2;

    if (deficientRegCheck) {
        if (res) {
            var deficientRegistration = $("#registrationFeePayCVTandRegDeficient").val().replace(/,/g, "");
            challan.RegistrationFeeString = $("#registrationFeePayCVTandRegDeficient").val().replace(/,/g, "");
            if (deficientRegistration <= 0) {
                res = false;
            }
            else {
                res = true;
            }
        }
    }
    var res3 = true;
    if (isRegistryFeeCheck) {
        res3 = $('#registryFeeDiv').kendoValidator().data('kendoValidator').validate();
        if (!res3 || res == undefined) {
            res = res3;
        }
    }

    if (queryStringName != "GenerateChallanForOldRegistry" && (!deficientCVTDivVisible && !deficientRegisDivVisible) && isAhleCommissionFeeCheck) {
        res3 = $('#AhleCommissionFeeDiv').kendoValidator().data('kendoValidator').validate();

        if (!res3 || res == undefined) {
            res = res3;
        } else {
            var value = $("#ahleCommisionFeeinput").val();
            if (value != "" && value < 200) {
                $("#ahleCommisionFeeinput").kendoValidator().data("kendoValidator").hideMessages();
                $("#ahleComissionAmountError").html("<span class='k-icon k-warning' style='margin-right: 3px;'> </span> " + "Ahl-e-Comission Fee is not valid. Please enter amount greater than 200");
                $("#ahleComissionAmountError").show();
                return false;
            } else {
                $("#ahleComissionAmountError").hide();
            }
        }
    }
    if (DigitalScaningFee || MutationFee || RegFeeNew) {
        res = true;
    }
    updateChallanModelDeedDetailsPayCVTandRegistration(); //not complete 
    if (res) {
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartialDeedDetailsPayCVTandReg',
            type: 'POST',
            data: JSON.stringify(challan),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                IsCvtOrDeficientCvt();
            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');
            }
        });
    }

    //IsCvtOrDeficientCvt();
}

function onNextDeficientScreen() {
    var res = $('#DeficientAmountForm').kendoValidator().data('kendoValidator').validate();
    var res2 = false;
    var defCvtCheck = true;
    var defRegFeeCheck = true;
    //if ($('#RegitrationFeeForOldRegCheck').is(":checked")) {
    //    defRegFeeCheck = $('#deficientRegFeeForOldRegValue').kendoValidator().data('kendoValidator').validate();
    //}
    //if ($('#CVTTaxForOldReg').is(":checked")) {
    //    defCvtCheck = $('#deficientCVTForOldRegValue').kendoValidator().data('kendoValidator').validate();
    //}
    if (queryStringName == "PayDeficiencyForOldRegistry") {
        res2 = true;
        challan.isOldRegistryChallan = true;
    }
    else if (challan.TransactionTypeString == "Judicial") {
        res2 = $('#DeedDetailsForDeficientFormSuitFor').kendoValidator().data('kendoValidator').validate();
    }
    else {
        res2 = $('#DeedDetailsForDeficientFormProperty').kendoValidator().data('kendoValidator').validate();
    }
    if (!res2)
        res = res2;

    var totalLease = parseFloat($("#TotalDeficient").val().replace(/,/g, ""));
    if (isNaN(totalLease) || totalLease <= 0 || totalLease < 100) {
        res = false;
        document.getElementById("totalDeficientError").innerHTML = "Total amount should be greater than 100.";
        $("#totalDeficientError").css("color", "red");
        $("#totalDeficientError").show();
    }
    else {
        $("#totalDeficientError").hide();
        res = true;
    }

    let isCheckedRegistration = $('#afterRegistration').is(':checked');
    debugger;
    if (isCheckedRegistration) {
        orderNumberVal = $("#OrderNumber").val();
        orderDateVal = $("#OrderDate").val();
        if (orderNumberVal == "") {
            res = false;
            document.getElementById("totalDeficientError").innerHTML = "Order Number is mandatory.";
            $("#totalDeficientError").css("color", "red");
            $("#totalDeficientError").show();
        }

        else if (orderDateVal == "") {
            res = false;
            document.getElementById("totalDeficientError").innerHTML = "Order Date is mandatory.";
            $("#totalDeficientError").css("color", "red");
            $("#totalDeficientError").show();

        } else {
            //$("#totalDeficientError").hide();
            res = true;
        }

    }
    else {
        //$("#totalDeficientError").hide();
        res = true;
    }


    var deficientAmount = parseFloat($("#TotalDeficient").val().replace(/,/g, ""));
    if (isNaN(deficientAmount) || deficientAmount < 100) {
        res = false;
        document.getElementById("totalDeficientError").innerHTML = "Total amount should be greater than 100";
        $("#totalDeficientError").css("color", "red");
        $("#totalDeficientError").show();
    }
    else if (challan.TransactionTypeString == "Judicial" && deficientAmount > maxJudicialAmount) {
        res = false;
    }
    else {
        if (res)
            res = true;
    }
    let isChecked = $('#afterRegistration').is(':checked');
    var TotalAmount = parseFloat($("#PenaltyDeficient").val().replace(/,/g, "")) + parseFloat($("#DeficientAmount").val().replace(/,/g, ""));
    if (isChecked) {
        var totalLease = parseFloat($("#TotalDeficient").val().replace(/,/g, ""));

        if (totalLease <= 0 || isNaN(totalLease) || totalLease < 100) {
            res = false;
            document.getElementById("totalDeficientError").innerHTML = "Total Amount Should be greater than 100";
            $("#totalDeficientError").css("color", "red");
            $("#totalDeficientError").show();
        }

    }
    else if (TotalAmount < 100) {

        document.getElementById("totalDeficientError").innerHTML = "Total Amount Should be greater than 0";
        $("#totalDeficientError").css("color", "red");
        $("#totalDeficientError").show();

    }


    else {
        if (res)
            res = true;
    }

    if (res /*|| (defRegFeeCheck && defCvtCheck)*/) {
        //if (res && queryStringName != "GenerateChallanForOldRegistry") {
        updateChallanModeldeedDetailsDeficient();
        //}
        //else if (defRegFeeCheck && defCvtCheck && queryStringName == "GenerateChallanForOldRegistry") {
        //    updateChallanModelForDeficientAmountOldReg();
        //}
        rendenChallan();
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartialDeedDetailsDeficient',
            type: 'POST',
            data: JSON.stringify(challan),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                $("#DeedDetailsForDeficient").hide();
                $("#confirmfrom").show();
            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');
                //alert(response);
            }
        });
    }
}

function updateLandAreaCVTPowerOFAttorney() {
    var AreaQuantityString = $("#LandAreaCVT").val();
    challan.propertyInfo.Area = AreaQuantityString;
}

function updateCVTPowerOFAttorney() {

    var $radio = $('input[name=LandTypeCVT]:checked');

    var id = $radio.attr('id');
    if (id != "RuralCVT") {
        //var LandClassificationNamecvt = $("#LandClassificationCVT").data("kendoDropDownList").text();
        //var LandClassificationidcvt = $("#LandClassificationCVT").val();

        //challan.propertyInfo.LandClassificationId = LandClassificationidcvt;
        //challan.propertyInfo.LandClassificationString = LandClassificationNamecvt;

        challan.propertyInfo.isUrban = true;

        if ($('#PayableCVTValue').val() != null && $('#PayableCVTValue').val() != "") {
            if (challan.propertyInfo.isUrban == true) {
                challan.PayableCvtString = $('#PayableCVTValue').val().replace(/,/g, "");
                challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, "");
            }
            else {
                challan.PayableCvtString = 0;
                challan.PayableSDandCVTString = 0;
            }
        }
        else {
            challan.PayableCvtString = "";
            challan.PayableSDandCVTString = "";
        }
    }
    else {
        challan.PayableCvtString = null;
        challan.PayableSDandCVTString = null;
        challan.propertyInfo.isUrban = false;
    }
}

function ZeroCheckLandAreaCVT() {
    var landValue = parseFloat($("#LandAreaCVT").val().replace(/,/g, ""));
    tempLandValue = landValue;
    if (landValue <= 0) {
        $("#landAreaError").show();
        $("#landAreaError").css("color", "red");
    }
    else {
        $("#landAreaError").hide();
    }
}

function ZeroCheckConstructedAreaCVT() {
    var constructedArea = parseFloat($("#constructedAreaCVT").val().replace(/,/g, ""));
    if (constructedArea <= 0) {
        $("#constructedAreaError").show();
        $("#constructedAreaError").css("color", "red");
    }
    else {
        $("#constructedAreaError").hide();
    }
}

//function onNextCVT() {
//    var res = true;
//    var res2 = false;
//    var res3 = false;
//    var res4 = true;
//    var $radio = $('input[name=LandTypeCVT]:checked');
//    var id = $radio.attr('id');
//    if (id != "RuralCVT") {
//        isUrban = true;
//    }
//    else {
//        isUrban = false;
//    }            
//    if (!res4)
//        res = res4;
//    if (challan.TransactionName != PowerOfAttorneyDeedId && isMultiplePropertiesExchageOfProperty == false) { // In case of isMultiplePropertiesExchageOfProperty CSV is not validated.

//        var isPropertyConstructed = $('#propertyConstructed').is(":checked");
//        var constructedValue = 0;
//        var constructedAreaString = $("#constructedAreaCVT").val();
//        if ($("#constructedStructureValueGenerateChallan").val() != null && $("#constructedStructureValueGenerateChallan").val() != "" && $("#constructedStructureValueGenerateChallan").val() != "NaN") {
//            constructedValue = parseFloat($("#constructedStructureValueGenerateChallan").val().replace(/,/g, ""));                   
//        }
//        if (isPropertyConstructed == true && (constructedValue > 0 || constructedAreaString != null || constructedAreaString != "")) {//if constructedValue is set on Deed Details then it should b validated
//            isPropertyConstructed = true;
//            res2 = $('#ConstructedAreaCVTForm').kendoValidator().data('kendoValidator').validate();
//            var constructedArea = parseFloat(constructedAreaString.replace(/,/g, ""));
//            if (isNaN(constructedArea)) { constructedArea = -1;}
//            if (constructedArea < 0)
//                res2 = false;
//        }
//        if (!res2 && isPropertyConstructed == true)
//            res = false;
//    }
//    else {
//        if (challan.applyCVT && isMultiplePropertiesExchageOfProperty == false) {
//            if (challan.propertyInfo.isUrban) {
//                challan.applyCVT = true;
//                res = $('#LandAreaCVTForm').kendoValidator().data('kendoValidator').validate();
//                if (res) {
//                    var landValue = parseFloat($("#LandAreaCVT").val().replace(/,/g, ""));
//                    if (landValue < 0)
//                        res = false;                            
//                }
//            }
//            else {
//                res = true;
//                challan.applyCVT = false;
//            }   
//        }
//        else {
//            res = true;
//        }
//    }
//    if (res) {
//        if (isCVTNextFirstScreen == true) {
//            updateChallanModelCVT();
//        }
//        else{
//            updateChallanModelCVT2();
//        }

//        if (isPowerOfAttorney || challan.TransactionName == PowerOfAttorneyDeedId)
//            updateCVTPowerOFAttorney();
//        //change
//        if (isMultiplePropertiesExchageOfProperty) {
//            // if Multiple Properties, Don't Validate as no input is taken from User on this screen.
//            if (isCVTNextFirstScreen == true && isExchangeOfProperty == true) {
//                $("#step4pending").attr("src", "../Images/steps-completed.png");
//                resetCVTScreen();
//                isCVTNextFirstScreen = false;
//                populateCVTFields();
//                calculateCVTTaxAmount();
//                document.getElementById("cvtHeading").innerHTML = ValueOfStructureSecondParty;//"Value of Structure Calculation of Second Property";
//            }
//            else {
//                if (isExchangeOfProperty == true) {
//                    $("#step5pending").attr("src", "../Images/steps-completed.png");
//                }
//                else {
//                    $("#step3pending").attr("src", "../Images/steps-completed.png");
//                }
//                if (isExchangeOfProperty && isMultiplePropertiesExchageOfProperty) {
//                    if (!challan.propertyInfo.isUrban && !challan.propertyInfo2.isUrban) {
//                        challan.PayableStampDutyString = parseFloat(challan.PayableSDandCVTString); // Only Stamp Duty
//                        challan.applyCVT = false;
//                        challan.PayableCvtString = null;
//                        challan.PayableSDandCVTString = null;
//                    }

//                    if (parseFloat(challan.lstTaxAmountValue[2].AmountValue) > parseFloat(challan.lstTaxAmountValue[5].AmountValue)) {
//                        // First Prop is larger    
//                        if (challan.propertyInfo.isUrban == true && challan.propertyInfo2.isUrban == false) {
//                            if (challan.propertyInfo.IsGovProperty == false) {
//                                challan.PayableSDandCVTString *= 3; // 3% Stamp Duty Applied on Highest Property
//                            }
//                        } else if (challan.propertyInfo.isUrban == false && challan.propertyInfo2.isUrban == true && challan.propertyInfo.IsGovProperty == false) {
//                            challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.FirstPropertyCvtString);
//                        }
//                    }   
//                    else if ((parseFloat(challan.lstTaxAmountValue[2].AmountValue) == parseFloat(challan.lstTaxAmountValue[5].AmountValue)) && ((challan.propertyInfo.isUrban == true && challan.propertyInfo2.isUrban == false) || (challan.propertyInfo.isUrban == false && challan.propertyInfo2.isUrban == true)))//if both properties are equal and one is urban and other is rural
//                    {
//                        if (challan.propertyInfo.isUrban == true && challan.propertyInfo2.isUrban == false) {
//                            challan.PayableSDandCVTString = parseFloat(challan.propertyInfo2.PropertyStampDutyString); // 3% Stamp Duty Applied on Highest Property
//                        } else if (challan.propertyInfo.isUrban == false && challan.propertyInfo2.isUrban == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString);
//                        }
//                    }
//                    else {
//                        if (challan.propertyInfo.isUrban == false && challan.propertyInfo2.isUrban == true) {
//                            challan.PayableSDandCVTString *= 3; // 3% Stamp Duty Applied on Highest Property
//                        } else
//                        if (challan.propertyInfo.isUrban == true && challan.propertyInfo2.isUrban == false) {
//                            challan.PayableSDandCVTString = parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString);
//                        }
//                    }
//                }
//                rendenChallan();
//                $("#CVTView").hide();
//                $("#confirmfrom").show();
//            }                    
//        }
//        else{
//            $.ajax({
//                url: base_url_service_layer + '/api/Proxy/ChallanForm/ValidateChallanPartialCVT',
//                type: 'POST',
//                data: JSON.stringify(challan),
//                contentType: "application/json;charset=utf-8",
//                success: function (data) {
//                    if (isCVTNextFirstScreen == true && isExchangeOfProperty == true) {
//                        $("#step4pending").attr("src", "../Images/steps-completed.png");
//                        resetCVTScreen();
//                        isCVTNextFirstScreen = false;
//                        populateCVTFields();
//                        calculateCVTTaxAmount();
//                        document.getElementById("cvtHeading").innerHTML = ValueOfStructureSecondParty;// "Value of Structure Calculation of Second Property";
//                    }
//                    else {
//                        if (isExchangeOfProperty == true) {
//                            $("#step5pending").attr("src", "../Images/steps-completed.png");
//                        }
//                        else {
//                            $("#step3pending").attr("src", "../Images/steps-completed.png");
//                        }
//                        if (isExchangeOfProperty && isMultiplePropertiesExchageOfProperty) {
//                            if (!challan.propertyInfo.isUrban && !challan.propertyInfo2.isUrban) {
//                                challan.applyCVT = false;
//                                challan.PayableCvtString = null;
//                                challan.PayableSDandCVTString = null;
//                            }
//                        }
//                        rendenChallan();
//                        $("#CVTView").hide();
//                        $("#confirmfrom").show();
//                    }
//                },
//                error: function (data) {
//                }
//            });
//        }               
//    }
//}



function updateChallanModelCVT() {


    if (isDCValuationFlag == false) {

        var $radio = $('input[name=LandTypeCVT]:checked');

        var id = $radio.attr('id');


        if (id == "Urban" || id == "UrbanCVT") {
            challan.propertyInfo.isUrban = true;
        }
        else {
            challan.propertyInfo.isUrban = false;
        }
        if (challan.propertyInfo.isUrban) {
            if ($('#payableStampDutyandCVTGenerateChallan').val() != null && $('#payableStampDutyandCVTGenerateChallan').val() != "") {
                if (challan.propertyInfo.isUrban == true) {
                    // challan.PayableCvtString = $('#PayCVTValueMultipleProperties').val().replace(/,/g, "");
                    challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, "");
                    // challan.FirstPropertyCvtString = challan.PayableCvtString;                           
                }
                else {
                    $("#payableStampDutyandCVTGenerateChallan").val(0);
                    challan.FirstPropertyCvtString = 0;
                }
            }
            else {
                challan.PayableCvtString = "";
                challan.PayableSDandCVTString = "";
            }
        }
        else {
            challan.FirstPropertyCvtString = 0;
            challan.PayableCvtString = 0;
            //  challan.PayableSDandCVTString = 0;
        }

    }
    else if (exemptCVTforGiftDeed) {
        if ($('#payableStampDutyandCVTGenerateChallan').val() != null && $('#payableStampDutyandCVTGenerateChallan').val() != "") {
            challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, "");
        }
        else {
            challan.PayableCvtString = "";
            challan.PayableSDandCVTString = "";
        }
    }
    else {
        if ($('#payableStampDutyandCVTGenerateChallan').val() != null && $('#payableStampDutyandCVTGenerateChallan').val() != "") {
            if (challan.propertyInfo.isUrban || challan.propertyInfo.treatAsUrban) {
                challan.PayableCvtString = challan.FirstPropertyCvtString;
                challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, "");
            }
            else {
                challan.PayableCvtString = 0;
                if ($('#payableStampDutyandCVTGenerateChallan').val() != null && $('#payableStampDutyandCVTGenerateChallan').val() != "") {
                    challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, "");
                }
                else
                    challan.PayableSDandCVTString = 0;
            }
        }
        else {
            challan.PayableCvtString = "";
            challan.PayableSDandCVTString = "";
        }
    }

    var isPropertyConstructed = $('#propertyConstructed').is(":checked");
    var isMultistory = $('#multiStoryBuilding').is(":checked");
    var isGovProperty = $('#govPropertyExchangeOfPropertyCheckbox').is(":checked");

    challan.propertyInfo.IsConstructed = isPropertyConstructed;
    challan.propertyInfo.IsMultiStory = isMultistory;
    challan.propertyInfo.IsGovProperty = isGovProperty;


    if (isLegalHeir) {
        var isLegalheirs = $('#legalHeirs').is(":checked");
        challan.propertyInfo.IsLegalHeirs = isLegalheirs;
    }
    if (isPropertyConstructed == true) {

        challan.propertyInfo.ConstructedAreaInSqFeet = $('#constructedAreaCVT').val().replace(/,/g, "");
        challan.propertyInfo.DCRateSqftString = $("#DCRateSqFt").text().replace(/[^0-9]/g, '');
        if (challan.propertyInfo != null && challan.propertyInfo.ConstructedStructureValue != null) {
            document.getElementById('CSValueUserProvided').innerHTML = returnCommas($("#constructedStructureValueGenerateChallan").val().replace(/,/g, ""));
            document.getElementById('CSValueUserProvidedRate').innerHTML = returnCommas($("#constructedStructureValueGenerateChallan").val().replace(/,/g, ""));
        }
        else {
            document.getElementById('CSValueUserProvided').innerHTML = "-";
            document.getElementById('CSValueUserProvidedRate').innerHTML = "-";

        }


    }

    if (challan.propertyInfo.LandPropertyValue != null && challan.propertyInfo.LandPropertyValue != "") {
        challan.propertyInfo.DeclaredAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue); // Declared Amount is updated with Updated Constructed Struct Value;
    }
}


//function updateChallanModelCVT2() {
//    var isGovProperty = $('#govPropertyExchangeOfPropertyCheckbox').is(":checked");

//    challan.propertyInfo2.IsGovProperty = isGovProperty;
//    if (isDCValuationFlag == false) {

//        var $radio = $('input[name=LandTypeCVT]:checked');

//        var id = $radio.attr('id');
//        if (id == "Urban" || id == "UrbanCVT") {
//            challan.propertyInfo2.isUrban = true;
//        }
//        else {
//            challan.propertyInfo2.isUrban = false;
//        }

//        //if (challan.propertyInfo2.isUrban) {
//        if ($('#payableStampDutyandCVTGenerateChallan').val() != null && $('#payableStampDutyandCVTGenerateChallan').val() != "") {
//            //Govt. property will be exempted
//            if (challan.propertyInfo.IsGovProperty == true || challan.propertyInfo2.IsGovProperty == true) {

//                if (challan.propertyInfo2.isUrban == true && challan.propertyInfo.isUrban == true) {
//                    if (parseFloat(challan.lstTaxAmountValue[2].AmountValue) > parseFloat(challan.lstTaxAmountValue[5].AmountValue)) { // First Prop is larger                      
//                        challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.FirstPropertyCvtString) + parseFloat(challan.SecondPropertyCvtString);
//                        //Excemption in case of Govt. Property
//                        if (challan.propertyInfo.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.FirstPropertyCvtString);
//                        }
//                        if (challan.propertyInfo2.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.SecondPropertyCvtString);
//                        }
//                        // Set Highest Value to Challan Total Amount
//                        if (challan.propertyInfo.DeclaredAmount > (parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue))) {
//                            challan.TotalAmount = challan.propertyInfo.DeclaredAmount;
//                        }
//                        else {
//                            challan.TotalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue);
//                        }
//                    }
//                    else { // Second Prop is larger
//                        challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, ""); // Update only if Second Property has higher Value;
//                        challan.PayableSDandCVTString = parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString) + parseFloat(challan.FirstPropertyCvtString);
//                        //Excemption in case of Govt. Property
//                        if (challan.propertyInfo.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.FirstPropertyCvtString);
//                        }
//                        if (challan.propertyInfo2.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.SecondPropertyCvtString);
//                        }
//                        // Set Highest Value to Challan Total Amount
//                        if (challan.propertyInfo2.DeclaredAmount > (parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue))) {
//                            challan.TotalAmount = challan.propertyInfo2.DeclaredAmount;
//                        }
//                        else {
//                            challan.TotalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue);
//                        }
//                    }
//                    challan.PayableCvtString = parseFloat(challan.FirstPropertyCvtString) + parseFloat(challan.SecondPropertyCvtString);
//                }
//                    // if (challan.propertyInfo2.isUrban == false && challan.propertyInfo.isUrban == false) {
//                else {
//                    if (challan.propertyInfo.IsGovProperty == true) {
//                        challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, ""); // Update only if Second Property has higher Value;
//                        challan.PayableSDandCVTString = parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString) + parseFloat(challan.FirstPropertyCvtString);
//                        //Excemption in case of Govt. Property
//                        if (challan.propertyInfo.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.FirstPropertyCvtString);
//                        }
//                        if (challan.propertyInfo2.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.SecondPropertyCvtString);
//                        }

//                        if (challan.propertyInfo2.DeclaredAmount > (parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue))) {
//                            challan.TotalAmount = challan.propertyInfo2.DeclaredAmount;
//                        }
//                        else {
//                            challan.TotalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue);
//                        }
//                    }
//                    if (challan.propertyInfo2.IsGovProperty == true) {
//                        challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.FirstPropertyCvtString) + parseFloat(challan.SecondPropertyCvtString);
//                        //Excemption in case of Govt. Property
//                        if (challan.propertyInfo.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.FirstPropertyCvtString);
//                        }
//                        if (challan.propertyInfo2.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.SecondPropertyCvtString);
//                        }


//                        // Set Highest Value to Challan Total Amount
//                        if (challan.propertyInfo.DeclaredAmount > (parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue))) {
//                            challan.TotalAmount = challan.propertyInfo.DeclaredAmount;
//                        }
//                        else {
//                            challan.TotalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue);
//                        }

//                    }
//                    if (challan.propertyInfo.isUrban == false && challan.propertyInfo.IsGovProperty == true && challan.propertyInfo2.isUrban == true) {
//                        if (parseFloat(challan.lstTaxAmountValue[2].AmountValue) > parseFloat(challan.lstTaxAmountValue[5].AmountValue)) { // First Prop is larger                      
//                            challan.PayableSDandCVTString *= 3;
//                        }
//                    }
//                    if (challan.propertyInfo.IsGovProperty == true && challan.propertyInfo2.IsGovProperty == true) {
//                        challan.PayableSDandCVTString = 0;
//                        challan.TotalAmount = 0;
//                    }
//                }
//            }
//            else {
//                if (parseFloat(challan.lstTaxAmountValue[2].AmountValue) > parseFloat(challan.lstTaxAmountValue[5].AmountValue)) { // First Prop is larger                      
//                    challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.FirstPropertyCvtString) + parseFloat(challan.SecondPropertyCvtString);

//                    // Set Highest Value to Challan Total Amount
//                    if (challan.propertyInfo.DeclaredAmount > (parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue))) {
//                        challan.TotalAmount = challan.propertyInfo.DeclaredAmount;
//                    }
//                    else {
//                        challan.TotalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue);
//                    }
//                }
//                else if ((parseFloat(challan.lstTaxAmountValue[2].AmountValue) == parseFloat(challan.lstTaxAmountValue[5].AmountValue)) && ((challan.propertyInfo.isUrban == true && challan.propertyInfo2.isUrban == false) || (challan.propertyInfo.isUrban == false && challan.propertyInfo2.isUrban == true)))//if both properties are equal and one is urban and other is rural
//                {
//                    challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString) + parseFloat(challan.FirstPropertyCvtString);
//                    // Set Highest Value to Challan Total Amount
//                    if (challan.propertyInfo2.DeclaredAmount > (parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue))) {
//                        challan.TotalAmount = challan.propertyInfo2.DeclaredAmount;
//                    }
//                    else {
//                        challan.TotalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue);
//                    }

//                }
//                else { // Second Prop is larger
//                    challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, ""); // Update only if Second Property has higher Value;
//                    challan.PayableSDandCVTString = parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString) + parseFloat(challan.FirstPropertyCvtString);

//                    // Set Highest Value to Challan Total Amount
//                    if (challan.propertyInfo2.DeclaredAmount > (parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue))) {
//                        challan.TotalAmount = challan.propertyInfo2.DeclaredAmount;
//                    }
//                    else {
//                        challan.TotalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue);
//                    }
//                }
//                challan.PayableCvtString = parseFloat(challan.FirstPropertyCvtString) + parseFloat(challan.SecondPropertyCvtString);

//            }
//        }
//        else {
//            challan.PayableCvtString = 0;
//            challan.PayableSDandCVTString = 0;
//        }
//        //}
//        //else {                   
//        //    challan.SecondPropertyCvtString = 0;
//        //    challan.PayableCvtString = 0;
//        //    challan.PayableSDandCVTString = parseFloat(challan.PayableStampDutyString) + parseFloat(challan.FirstPropertyCvtString) - parseFloat(challan.SecondPropertyCvtString); //First PropCVT+Stamp Duty
//        //}

//    } // Multiple Properties is unchecked
//    else {
//        if (challan.propertyInfo2 != null && challan.propertyInfo2.ConstructedStructureValue != null){
//            document.getElementById('CSValueUserProvided').innerHTML =  returnCommas($("#constructedStructureValueSecond").val().replace(/,/g, ""));
//            document.getElementById('CSValueUserProvidedRate').innerHTML = returnCommas($("#constructedStructureValueSecond").val().replace(/,/g, ""));
//        }

//        else {
//            document.getElementById('CSValueUserProvided').innerHTML = "-";
//            document.getElementById('CSValueUserProvidedRate').innerHTML = "-";
//        }

//        challan.propertyInfo2.ConstructedAreaInSqFeet = $('#constructedAreaCVT').val().replace(/,/g, "");             
//        challan.propertyInfo2.DCRateSqftString = $("#DCRateSqFt").text().replace(/[^0-9]/g, '');

//        if ($('#payableStampDutyandCVTGenerateChallan').val() != null && $('#payableStampDutyandCVTGenerateChallan').val() != "") {
//            //Govt. property will be exempted
//            if (challan.propertyInfo.IsGovProperty == true || challan.propertyInfo2.IsGovProperty == true) {

//                if(challan.propertyInfo2.isUrban == true && challan.propertyInfo.isUrban == true)
//                {
//                    if (parseFloat(challan.lstTaxAmountValue[2].AmountValue) > parseFloat(challan.lstTaxAmountValue[5].AmountValue)) { // First Prop is larger    
//                        challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.FirstPropertyCvtString) + parseFloat(challan.SecondPropertyCvtString);
//                        //Excemption in case of Govt. Property
//                        if (challan.propertyInfo.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.FirstPropertyCvtString);
//                        }
//                        if (challan.propertyInfo2.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.SecondPropertyCvtString);
//                        }


//                        // Set Highest Value to Challan Total Amount
//                        if (challan.propertyInfo.DeclaredAmount > (parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue))) {
//                            challan.TotalAmount = challan.propertyInfo.DeclaredAmount;
//                        }
//                        else {
//                            challan.TotalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue);
//                        }
//                    }
//                    else { // Second Prop is larger


//                        challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, ""); // Update only if Second Property has higher Value;
//                        challan.PayableSDandCVTString = parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString) + parseFloat(challan.FirstPropertyCvtString);
//                        //Excemption in case of Govt. Property
//                        if (challan.propertyInfo.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.FirstPropertyCvtString);
//                        }
//                        if (challan.propertyInfo2.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.SecondPropertyCvtString);
//                        }

//                        if (challan.propertyInfo2.DeclaredAmount > (parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue))) {
//                            challan.TotalAmount = challan.propertyInfo2.DeclaredAmount;
//                        }
//                        else {
//                            challan.TotalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue);
//                        }

//                    }
//                }
//                // if (challan.propertyInfo2.isUrban == false && challan.propertyInfo.isUrban == false) {
//                else{
//                    if (challan.propertyInfo.IsGovProperty == true) {
//                        challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, ""); // Update only if Second Property has higher Value;
//                        challan.PayableSDandCVTString = parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString) + parseFloat(challan.FirstPropertyCvtString);
//                        //Excemption in case of Govt. Property
//                        if (challan.propertyInfo.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.FirstPropertyCvtString);
//                        }
//                        if (challan.propertyInfo2.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.SecondPropertyCvtString);
//                        }

//                        if (challan.propertyInfo2.DeclaredAmount > (parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue))) {
//                            challan.TotalAmount = challan.propertyInfo2.DeclaredAmount;
//                        }
//                        else {
//                            challan.TotalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue);
//                        }
//                    }
//                    if (challan.propertyInfo2.IsGovProperty == true) {
//                        challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.FirstPropertyCvtString) + parseFloat(challan.SecondPropertyCvtString);
//                        //Excemption in case of Govt. Property
//                        if (challan.propertyInfo.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.FirstPropertyCvtString);
//                        }
//                        if (challan.propertyInfo2.IsGovProperty == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.PayableSDandCVTString) - parseFloat(challan.SecondPropertyCvtString);
//                        }


//                        // Set Highest Value to Challan Total Amount
//                        if (challan.propertyInfo.DeclaredAmount > (parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue))) {
//                            challan.TotalAmount = challan.propertyInfo.DeclaredAmount;
//                        }
//                        else {
//                            challan.TotalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue);
//                        }

//                    }
//                    if(challan.propertyInfo.IsGovProperty == true &&challan.propertyInfo2.IsGovProperty == true)
//                    {
//                        challan.PayableSDandCVTString = 0;
//                        challan.TotalAmount = 0;
//                    }
//                }

//                if (challan.propertyInfo.isUrban == false && challan.propertyInfo.IsGovProperty == true && challan.propertyInfo2.isUrban == true) {
//                    if (parseFloat(challan.lstTaxAmountValue[2].AmountValue) > parseFloat(challan.lstTaxAmountValue[5].AmountValue)) { // First Prop is larger                      
//                        challan.PayableSDandCVTString *= 3;
//                    }
//                }
//            }
//            else {
//                //if ((parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.FirstPropertyCvtString)) > (parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString))) 
//                if (parseFloat(challan.lstTaxAmountValue[2].AmountValue) > parseFloat(challan.lstTaxAmountValue[5].AmountValue)) { // First Prop is larger    
//                    challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.FirstPropertyCvtString) + parseFloat(challan.SecondPropertyCvtString);

//                    // Set Highest Value to Challan Total Amount
//                    if (challan.propertyInfo.DeclaredAmount > (parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue))) {
//                        challan.TotalAmount = challan.propertyInfo.DeclaredAmount;
//                    }
//                    else {
//                        challan.TotalAmount = parseFloat(challan.propertyInfo.LandPropertyValue) + parseFloat(challan.propertyInfo.ConstructedStructureValue);
//                    }
//                    if (challan.TransactionName == exchangeOfPropertyDeedId) {
//                        if (challan.propertyInfo.isUrban == true && challan.propertyInfo2.isUrban == false) {
//                            challan.PayableSDandCVTString *= 3; // 3% Stamp Duty Applied on Highest Property
//                        }
//                        else if (challan.propertyInfo.isUrban == false && challan.propertyInfo2.isUrban == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.FirstPropertyCvtString);
//                        }
//                    }

//                }
//                else if ((parseFloat(challan.lstTaxAmountValue[2].AmountValue) == parseFloat(challan.lstTaxAmountValue[5].AmountValue)) && ((challan.propertyInfo.isUrban == true && challan.propertyInfo2.isUrban == false) || (challan.propertyInfo.isUrban == false && challan.propertyInfo2.isUrban == true)))//if both properties are equal and one is urban and other is rural
//                {
//                    challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString) + parseFloat(challan.FirstPropertyCvtString);
//                    // Set Highest Value to Challan Total Amount
//                    if (challan.propertyInfo2.DeclaredAmount > (parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue))) {
//                        challan.TotalAmount = challan.propertyInfo2.DeclaredAmount;
//                    }
//                    else {
//                        challan.TotalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue);
//                    }

//                    if (challan.TransactionName == exchangeOfPropertyDeedId) {
//                        if (challan.propertyInfo.isUrban == true && challan.propertyInfo2.isUrban == false) {
//                            challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString) + parseFloat(challan.propertyInfo2.PropertyStampDutyString); // 3% Stamp Duty Applied on Highest Property
//                        }
//                        else if (challan.propertyInfo.isUrban == false && challan.propertyInfo2.isUrban == true) {
//                            challan.PayableSDandCVTString = parseFloat(challan.propertyInfo.PropertyStampDutyString)
//                        }
//                    }
//                }
//                else { // Second Prop is larger


//                    challan.PayableSDandCVTString = $('#payableStampDutyandCVTGenerateChallan').val().replace(/,/g, ""); // Update only if Second Property has higher Value;
//                    challan.PayableSDandCVTString = parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString) + parseFloat(challan.FirstPropertyCvtString);

//                    if (challan.propertyInfo2.DeclaredAmount > (parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue))) {
//                        challan.TotalAmount = challan.propertyInfo2.DeclaredAmount;
//                    }
//                    else {
//                        challan.TotalAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue);
//                    }


//                    if (challan.TransactionName == exchangeOfPropertyDeedId) {
//                        if (challan.propertyInfo.isUrban == false && challan.propertyInfo2.isUrban == true) {
//                            challan.PayableSDandCVTString *= 3; // 3% Stamp Duty Applied on Highest Property
//                        } else if (challan.propertyInfo.isUrban == true && challan.propertyInfo2.isUrban == false) {
//                            challan.PayableSDandCVTString = parseFloat(challan.propertyInfo2.PropertyStampDutyString) + parseFloat(challan.SecondPropertyCvtString);
//                        }
//                    }
//                }
//            }
//        }
//        challan.PayableCvtString = parseFloat(challan.FirstPropertyCvtString) + parseFloat(challan.SecondPropertyCvtString);
//        //Excemption in case of Govt. Property
//        if (challan.propertyInfo.IsGovProperty == true)
//        {
//            challan.PayableCvtString = parseFloat(challan.PayableCvtString)- parseFloat(challan.FirstPropertyCvtString);

//        }
//        if (challan.propertyInfo2.IsGovProperty == true) {
//            challan.PayableCvtString = parseFloat(challan.PayableCvtString) - parseFloat(challan.SecondPropertyCvtString);

//        }





//        //if (challan.propertyInfo2.isUrban == false && !challan.propertyInfo2.treatAsUrban) {                    
//        //    // Merger of Duties Change by PITB, June 5 2017 // ---->>                        
//        //    challan.PayableSDandCVTString = parseFloat(challan.PayableStampDutyString); // Only Stamp Duty
//        //    challan.PayableCvtString = 0;
//        //    // <----
//        //}               
//    }
//    var isMultistory = $('#multiStoryBuilding').is(":checked");
//    var isPropertyConstructed = $('#propertyConstructed').is(":checked");
//    challan.propertyInfo2.IsConstructed = isPropertyConstructed;
//    challan.propertyInfo2.IsMultiStory = isMultistory;
//    if (challan.propertyInfo2.LandPropertyValue != null && challan.propertyInfo2.LandPropertyValue != "") {
//        challan.propertyInfo2.DeclaredAmount = parseFloat(challan.propertyInfo2.LandPropertyValue) + parseFloat(challan.propertyInfo2.ConstructedStructureValue); // Declared Amount is updated with Updated Constructed Struct Value;
//    }

//    if (isLegalHeir) {
//        var isLegalheirs = $('#legalHeirs').is(":checked");
//        challan.propertyInfo2.IsLegalHeirs = isLegalheirs;
//    }          

//}


function resetChallanModelCVT() {

    if (isDCValuationFlag == false) {

        challan.propertyInfo.LandClassificationId = "";
        challan.propertyInfo.LandClassificationString = "";

    }

    challan.propertyInfo.IsConstructed = false;
    challan.propertyInfo.IsMultiStory = false;
    challan.propertyInfo.IsGovProperty = false;

    if (isLegalHeir) {

        challan.propertyInfo.IsLegalHeirs = false;
    }

    challan.propertyInfo.ConstructedAreaInSqFeet = "";
    challan.PayableCvtString = "";
    challan.PayableSDandCVTString = "";
}


function resetChallanModelCVT2() {

    if (isDCValuationFlag == false) {
        challan.propertyInfo2.LandClassificationId = "";
        challan.propertyInfo2.LandClassificationString = "";
    }

    challan.propertyInfo2.IsConstructed = false;
    challan.propertyInfo2.IsGovProperty = false;
    challan.propertyInfo2.IsMultiStory = false;

    if (isLegalHeir) {

        challan.propertyInfo2.IsLegalHeirs = false;
    }


    challan.propertyInfo2.ConstructedAreaInSqFeet = "";


    challan.PayableCvtString = "";
    challan.PayableSDandCVTString = "";

}


function showHideLandClassificationDetailsDC() {

    var landClassificationId = $("#LandClassification").val();

    if (landClassificationId == ResidentialId) {
        $('#checkBoxesCVT').show();
    }
    else {
        $('#checkBoxesCVT').hide();
    }

}

function showHideLandClassificationDetailsDCUrban() {

    var landClassificationId = $("#LandClassificationUrban").val();

    if (landClassificationId == ResidentialId) {
        $('#checkBoxesCVT').show();
    }
    else {
        $('#checkBoxesCVT').hide();
    }

}


function onChangeMultiplePropertiesCheckbox() {
    var check = $('#multiplePropertiesExchangeOfPropertyCheckbox').is(":checked");

    if (check) {
        isDCValuationFlag = false;
        isMultiplePropertiesExchageOfProperty = true;
    }
    else {
        isDCValuationFlag = true;
        isMultiplePropertiesExchageOfProperty = false;
    }
}

function onChangeLeaseYearCheckbox() {
    var check = $('#leaseYearCheckbox').is(":checked");

    if (check) {
        //isDCValuationFlag = false;
        isLeaseYearLessThan20 = true;
    }
    else {
        //isDCValuationFlag = true;
        isLeaseYearLessThan20 = false;
    }
}

function showHideLandClassificationDetailsCVT() {

    //var landClassificationId = $("#LandClassificationCVT").val();

    //if (landClassificationId == ResidentialId) {
    //    $('#checkBoxesCVT').show();

    //    $('#checkBoxesCVT').show();
    //    $('#multiStoryBuildingDiv').show();
    //}
    //else {
    //    $('#checkBoxesCVT').hide();
    //}

    //ShowHideCVTPowerOfAttorney();

}

function onClickCVTCheckBox() {
    if (isCVTMandatory) {
        $('#CVTTax').attr('checked', true);
        $('#CVTTax').prop('checked', true);
        return false;
    }
}

function onClickRegFeeCheckBox() {
    if (isRegFeeMandatory) {
        $('#RegitrationFeeCheck').attr('checked', true);
        $('#RegitrationFeeCheck').prop('checked', true);
        return false;
    }
}
function onchangeTransferComercial() {

    //alert('Testing'); 
    calculateStampDutyDeedDetail();

}
function onchangeTaxCheckBoxes() {
    //removeArrowBarOnChangeDeedName();
    //$("#stepsArrow img:last-child").remove()
    var res = $('#StampDutyCheck').is(":checked");
    var res = $('#StampDutyCheck').is(":checked");
    var res2 = $('#RegitrationFeeCheck').is(":checked");
    var res3 = $('#CVTTax').is(":checked");
    var res4 = $('#AhleCommissionDutyCheck').is(":checked");
    if (res || res2 || res3 || res4) {
        $("#purposeOfChallanTextError").hide();
    }
    areDeedDetailsFieldsCreated = false;
    if (res3 == true && isCVTandNotDC == true) {
        isDCValuationFlag = true;
    } else if (res3 == false && isCVTandNotDC == true) {
        isDCValuationFlag = false;
    }
}

function onchangeTaxBoxPayCVTandReg() {
    var res = $('#CVTTaxDeficient').is(":checked");

    var res2 = $('#RegitrationFeeCheckDeficient').is(":checked");

    var res3 = $('#DeficientCVT').is(":checked");

    var res4 = $('#DeficientRegistration').is(":checked");

    if (res || res2 || res3 || res4) {
        $("#purposeOfChallanTextErrorDeficient").hide();
    }
}



function onPartyWindowClose(e) {
    console.log("event :: close");
    $(document).off("keydown.kendoWindow");
}

function onPartyWindowActivate(e) {
    console.log("event :: activate");

    var windowElement = this.wrapper,
    windowContent = this.element;

    $(document).on("keydown.kendoWindow", function (e) {
        var focusedElement = $(document.activeElement);
        if (e.keyCode == kendo.keys.TAB && focusedElement.closest(windowElement).length == 0) {
            windowContent.focus();
        }
    });
}

function onChangeGiftDeedInheritenceCheckBox() {

    //var res = $('#inheritenceGiftDeedCheckbox').is(":checked");

    //if (res) {
    //    $('#StampDutyCheck').attr('checked', false);
    //}
    //else
    //{
    //    $("#StampDutyCheck").prop('checked', true);
    //}
}

function onChangeRegistryPagesFee() {
    var check = $('#registryFeeCheckbox').is(":checked");

    if (check) {
        isRegistryFeeCheck = true;
    }
    else {
        isRegistryFeeCheck = false;
    }
}

function urduToEnglish_AddChallan() {
    changeFloatingLabelOfElement("ChallanNo", "Enter Challan Number");
    changeFloatingLabelOfElement("StampNo", "Enter e-Stamp Number");
    $("#generateDefForOldStampAddChallan").html('<a href="../ChallanFormView/AddChallan?name=PayDeficiencyForOldRegistry&vCount=@HttpContext.Current.Application["NoOfVisitors"].ToString()&agree=true"> Generate Deficient Stamp/Penalty  </a><br /> <span style="color:grey;">(For old stamp papers)</span>');
    $("#generateDefCvtRegChallanLblAddChallan").html('<a href="../ChallanFormView/AddChallan?name=GenerateChallanForOldRegistry&vCount=@HttpContext.Current.Application["NoOfVisitors"].ToString()&agree=true">  Generate Deficient CVT/Registration Fee </a> <br/><span style="color:gray !important">(For old stamp papers)</span> ');
    $("#districtFloatingLbl").html('District');
    $("#tehsilFloatingLbl").html('Tehsil');
    $("#stampPaperTypeFloatingLbl").html('Stamp Paper Type');
    $("#deedNameFloatingLbl").html('Deed Name');
    $("#saleDeedNoteLbl").html(ForSaleDeedpleaseuseConveyance);
    $("#exemptStampDutyGiftDeedCheckbox").html(ExemptStampDutyegRuralagriculturallandforlegalheirsRegistrationCVTisapplicable);
    $("#isHousingSocietyInvolvedCheckbox").html('Is Housing Society Involved.');
    $("#purposeOfChallanLblAddChallan").html('Purpose of Challan');
    $("#challanAmountPaidByLblAddChallan").html('Challan Amount Paid By?');
    $("#districtFloatingLblReadOnly").html('District');
    $("#tehsilFloatingLblReadOnly").html('Tehsil');
    $("#stampPaperTypeFloatingLblReadOnly").html('Stamp Paper Type');
    $("#deedNameFloatingLblReadOnly").html('Deed Name');
    $("#purposeOfChallanTextDeficientLblAddChallan").html('Purpose of Challan');
    $("#oldRegNumFloatingLbl").html('Old Registry Number');
    $("#oldRegDateFloatingLbl").html('Old Registry Date');
    $("#agentNameFloatingLbl").html('Agent Name');
    $("#agentCnicFloatingLbl").html('Agent CNIC');
    $("#agentContactFloatingLbl").html('Agent Contact');
    $("#agentEmailFloatingLbl").html('Agent Email');
    urduToEnglish_PersonEdit();
    urduToEnglish_RateOfChallan();

}

function englishToUrdu_AddChallan() {
    changeFloatingLabelOfElement("ChallanNo", "چالان نمبر درج کریں");
    changeFloatingLabelOfElement("StampNo", "ای۔اسٹامپ نمبر درج کریں");
    $("#generateDefForOldStampAddChallan").html('<a href="../ChallanFormView/AddChallan?name=PayDeficiencyForOldRegistry&vCount=@HttpContext.Current.Application["NoOfVisitors"].ToString()&agree=true" style="font-family:MehrNastaliqWeb; font-size:120%;"> کم تخمینی کے بقا یا جات /  جرمانہ کی ادائیگی   </a><br /> <span style="color:grey; font-family:MehrNastaliqWeb; font-size:120%;">(پرانی رجسٹری کےلئے)</span>');
    $("#generateDefCvtRegChallanLblAddChallan").html('<a href="../ChallanFormView/AddChallan?name=GenerateChallanForOldRegistry&vCount=@HttpContext.Current.Application["NoOfVisitors"].ToString()&agree=true" style="font-family:MehrNastaliqWeb; font-size:120%;">  سی وی ٹی یا رجسٹریشن فیس اداکریں</a> <br/><span style="color:gray !important;font-family:MehrNastaliqWeb; font-size:120%;">(پرانی رجسٹری کےلئے)</span> ');
    $("#districtFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ضلع</span>');
    $("#tehsilFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">تحصیل</span>');
    $("#stampPaperTypeFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">اسٹامپ کی قسم</span>');
    $("#deedNameFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ڈیڈ نام</span>');
    $("#saleDeedNoteLbl").html(ForSaleDeedpleaseuseConveyance);
    $("#exemptStampDutyGiftDeedCheckbox").html('Exempt Stamp Duty (e.g. Rural agricultural land for legal heirs). Registration/CVT is applicable.');
    $("#isHousingSocietyInvolvedCheckbox").html('Is Housing Society Involved.');
    $("#purposeOfChallanLblAddChallan").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">چالان کا مقصد</span>');
    $("#challanAmountPaidByLblAddChallan").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">چالان رقم کی ادائیگی؟</span>');
    $("#districtFloatingLblReadOnly").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ضلع</span>');
    $("#tehsilFloatingLblReadOnly").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">تحصیل</span>');
    $("#stampPaperTypeFloatingLblReadOnly").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">اسٹامپ کی قسم</span>');
    $("#deedNameFloatingLblReadOnly").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ڈیڈکانام</span>');
    $("#purposeOfChallanTextDeficientLblAddChallan").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">چالان کا مقصد</span>');
    $("#oldRegNumFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">پرانارجسٹری نمبر</span>');
    $("#oldRegDateFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">پرانی رجسٹری تاریخ</span>');
    $("#agentNameFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ایجنٹ کا نام</span>');
    $("#agentCnicFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ایجنٹ کا قومی شناختی کارڈ نمبر</span>');
    $("#agentContactFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ایجنٹ کا رابطہ نمبر</span>');
    $("#agentEmailFloatingLbl").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">ایجنٹ کا ای میل</span>');
    englishToUrdu_PersonEdit();
    englishToUrdu_RateOfChallan();
}

function urduToEnglish_PersonEdit() {
    changeFloatingLabelOfElement("PersonName", "Name");
    changeFloatingLabelOfElement("PersonCnic", "CNIC");
    $("#relationDropDownLblPersonEdit").html('Relation');
    changeFloatingLabelOfElement("RelationName", "Relation Name");
    changeFloatingLabelOfElement("PersonPhone", "Contact Number");
    changeFloatingLabelOfElement("PersonEmail", "Email ID");
    changeFloatingLabelOfElement("PersonAddress", "Address");
}

function englishToUrdu_PersonEdit() {
    changeFloatingLabelOfElement("PersonName", "نام");
    changeFloatingLabelOfElement("PersonCnic", "قومی شناختی کارڈ نمبر");
    $("#relationDropDownLblPersonEdit").html('<span style="font-family:MehrNastaliqWeb; font-size:120%;">رشتہ</span>');
    changeFloatingLabelOfElement("RelationName", "رشتہ دار کا نام");
    changeFloatingLabelOfElement("PersonPhone", "رابطہ نمبر");
    changeFloatingLabelOfElement("PersonEmail", "ای میل");
    changeFloatingLabelOfElement("PersonAddress", "ایڈریس");
}

function changeLanguage() {
    currentLanguage = $("#languageTranslateLink").text();
    if (currentLanguage == "اردو") {
        englishToUrdu_AddChallan();
    }
    else {
        urduToEnglish_AddChallan();
    }
}

//$(document).keydown(function (event) {
//    if (event.keyCode == 123) { // Prevent F12
//        return false;
//    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
//        return false;
//    }
//});
//$(document).on("contextmenu", function (e) {        
//    e.preventDefault();
//})