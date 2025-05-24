

$(document).ready(function () {
    $('#branchDataDiv').hide();
    //$('#waitModal').modal();
    populateDistrictDropDown();
    populateBranchGridWithAllBranches();
    if (sessionStorage["currentLanguage"] == "Urdu") {
        //englishToUrdu_Layout();
    }
    else {
        //urduToEnglish_Layout();
    }
    //populateBranchGrid();
    //$('[role="listbox"]').css("display", "none");
});
function changeLanguage() {
    currentLanguage = $("#languageTranslateLink").text();
    if (currentLanguage == "اردو") {
        englishToUrdu_Layout();

    }
    else {
        urduToEnglish_Layout();
    }
}
function initializeDropDown(url, placeholder, elementId) {
    $("#" + elementId).kendoDropDownList({
        dataTextField: "Name",
        optionLabel: placeholder,
        dataValueField: "Id",
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

function populateBranchListGrid() {
    $('#waitModal').modal();
    var id = $("#districtListDropDown").val();
    populateBranchGrid(id);
}

function populateDistrictDropDown() {
    //$("#districtListDropDown").val("").data("kendoDropDownList").text("Select District");
    initializeDropDown(base_url_service_layer + '/api/Proxy/Locations/AllDistricts', "Select District", "districtListDropDown");

}

function initializeBranchGrid() {
    $("#branchListGrid").kendoGrid({
        dataSource: {
            //data: reportdata,
            schema: {
                model: {
                    fields: {
                        branchName: { type: "string" },
                        branchCode: { type: "string" },
                        districtName: { type: "string" },
                        branchLocation: { type: "string" },
                        latitude: { type: "string" },
                        longitude: { type: "string" }
                    }
                }
            },
        },
        pageable: false, 
        scrollable: false, sortable: true, filterable: true,
        columns: [
            { field: "", title: "Sr. No.", width: "6%", template: "<span class='row-number'></span>" },
            { field: "districtName", title: "District", width: "11%" },
            { field: "branchCode", title: "Branch Code", width: "15%", filterable: true },
            { field: "branchName", title: "Branch Name", width: "15%" },
            
            { field: "branchLocation", title: "Address", width: "30%" }
            //{ field: "branchContactPersonContactNo", title: "Branch Phone No.", width: "17%" },
            //{
            //    field: "", title: "Map", width: "5%", template: "#=showMap(data.longitude, data.latitude)#", attributes: { style: "text-align:center;" }
            //}
        ],

        dataBound: function () {
            var rows = this.items();
            $(rows).each(function () {
                var index = $(this).index() + 1;
                var rowLabel = $(this).find(".row-number");
                $(rowLabel).html(index);
            });
        },
        filterMenuInit: function (e) {
            //debugger;
            //var res = e.container[0][0];
            $(e.container[0]).find("span").css("display", "none");
            //$("form").find("span").css("display", "none");
            //$("form div:nth-child(2)").hide();
            $(".k-filter-help-text").css("display", "none");
        },
        filterable: {
            extra: false,
            operators: {
                string: {
                    //startswith: "Starts with",
                    //eq: "Is equal to",
                    //neq: "Is not equal to",
                    contains: "Contains"
                }
            }
        },


    });
}

function showMap(longitude, latitude) {
    if (latitude != null && longitude != null) {
        var url = 'http://maps.google.com/?q=' + latitude + ',' + longitude;
        return "<a href='" + url + "'target='_blank'><img src='../Images/googleMap.png'> </a>";
    }
    else
        return "";
}

function SetReportGrids(d, reportScope) {
    $('#branchDataDiv').show();
    $('#branchListGrid').data('kendoGrid').dataSource.data(d);
    $('#branchListGrid').data('kendoGrid').refresh();
}




function populateBranchGrid(id) {
    initializeBranchGrid();
    var branchDistrictString = $('#districtListDropDown').data("kendoDropDownList").text();
    if (branchDistrictString == "Select District")
    {
        $("#waitModal").modal('hide');
        //$("#branchDataDiv").hide();
        populateBranchGridWithAllBranches();
        //$('#DialogueStatus').html('Error');
        //$('#dialogMessage').html("Please select a district to load branches list.");
        //$('#dialogButton').click();
    }
    else
    {
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/Locations/GetPublicBranchesForBOPBankByDistrictId?districtId=' + id,
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                SetReportGrids(data);
                $("#waitModal").modal('hide');
                if (data.length == 0) {
                    $("#branchDataDiv").hide();
                    $('#DialogueStatus').html('Error');
                    $('#dialogMessage').html("No record found.");
                    $('#dialogButton').click();
                }
                else
                    $("#branchDataDiv").show();
            },
            error: function (data) {
                $("#waitModal").modal('hide');
                $("#branchDataDiv").hide();

                $('#dialogButton').click();
                $('#DialogueStatus').html('Error');
                if (data.responseText != null) {
                    var response = JSON.parse(data.responseText);
                    $('#dialogMessage').html(response);

                }
                else
                    $('#dialogMessage').html("No record found.");



            }
        });
    }
}


function populateBranchGridWithAllBranches() {    
    initializeBranchGrid();
        $.ajax({
            url: base_url_service_layer + '/api/Proxy/Locations/GetAllPublicBranchesForBOPBank',
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            success: function (data) {                              
                SetReportGrids(data);
                $("#waitModal").modal('hide');
                if (data.length == 0) {
                    $("#branchDataDiv").hide();
                    $('#DialogueStatus').html('Error');
                    $('#dialogMessage').html("No record found.");
                    $('#dialogButton').click();
                }
                else
                    $("#branchDataDiv").show();
            },
            error: function (data) {               
                $("#waitModal").modal('hide');
                $("#branchDataDiv").hide();

                $('#dialogButton').click();
                $('#DialogueStatus').html('Error');
                if (data.responseText != null) {
                    var response = JSON.parse(data.responseText);
                    $('#dialogMessage').html(response);

                }
                else
                    $('#dialogMessage').html("No record found.");
            }
        });
    
}







