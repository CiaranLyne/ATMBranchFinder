"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.ServiceAndFacility = exports.Country = exports.Description = exports.BranchName = exports.CustomerSegment = exports.OpeningTime = exports.ClosingTime = exports.DayName = exports.Accessibility = void 0;
var Accessibility;
(function (Accessibility) {
    Accessibility["AutomaticDoors"] = "AutomaticDoors";
    Accessibility["ExternalRamp"] = "ExternalRamp";
    Accessibility["InductionLoop"] = "InductionLoop";
    Accessibility["InternalRamp"] = "InternalRamp";
    Accessibility["LevelAccess"] = "LevelAccess";
    Accessibility["LowerLevelCounter"] = "LowerLevelCounter";
    Accessibility["WheelchairAccess"] = "WheelchairAccess";
})(Accessibility = exports.Accessibility || (exports.Accessibility = {}));
var DayName;
(function (DayName) {
    DayName["Friday"] = "Friday";
    DayName["Monday"] = "Monday";
    DayName["Saturday"] = "Saturday";
    DayName["Sunday"] = "Sunday";
    DayName["Thursday"] = "Thursday";
    DayName["Tuesday"] = "Tuesday";
    DayName["Wednesday"] = "Wednesday";
})(DayName = exports.DayName || (exports.DayName = {}));
var ClosingTime;
(function (ClosingTime) {
    ClosingTime["The0000"] = "00:00";
    ClosingTime["The1200"] = "12:00";
    ClosingTime["The1230"] = "12:30";
    ClosingTime["The1300"] = "13:00";
    ClosingTime["The1330"] = "13:30";
    ClosingTime["The1400"] = "14:00";
    ClosingTime["The1430"] = "14:30";
    ClosingTime["The1500"] = "15:00";
    ClosingTime["The1530"] = "15:30";
    ClosingTime["The1600"] = "16:00";
    ClosingTime["The1603"] = "16:03";
    ClosingTime["The1630"] = "16:30";
    ClosingTime["The1700"] = "17:00";
    ClosingTime["The1730"] = "17:30";
    ClosingTime["The1800"] = "18:00";
    ClosingTime["The1900"] = "19:00";
})(ClosingTime = exports.ClosingTime || (exports.ClosingTime = {}));
var OpeningTime;
(function (OpeningTime) {
    OpeningTime["The0000"] = "00:00";
    OpeningTime["The0800"] = "08:00";
    OpeningTime["The0830"] = "08:30";
    OpeningTime["The0900"] = "09:00";
    OpeningTime["The0915"] = "09:15";
    OpeningTime["The0930"] = "09:30";
    OpeningTime["The1000"] = "10:00";
    OpeningTime["The1030"] = "10:30";
    OpeningTime["The1100"] = "11:00";
    OpeningTime["The1400"] = "14:00";
})(OpeningTime = exports.OpeningTime || (exports.OpeningTime = {}));
var CustomerSegment;
(function (CustomerSegment) {
    CustomerSegment["Business"] = "Business";
    CustomerSegment["Corporate"] = "Corporate";
    CustomerSegment["Personal"] = "Personal";
    CustomerSegment["Premier"] = "Premier";
    CustomerSegment["Private"] = "Private";
    CustomerSegment["SME"] = "SME";
    CustomerSegment["Select"] = "Select";
    CustomerSegment["Wealth"] = "Wealth";
})(CustomerSegment = exports.CustomerSegment || (exports.CustomerSegment = {}));
var BranchName;
(function (BranchName) {
    BranchName["BarclaysBank"] = "Barclays Bank";
    BranchName["BarclaysBankASDA"] = "Barclays Bank (ASDA)";
    BranchName["NameBarclaysBank"] = "Barclays bank";
})(BranchName = exports.BranchName || (exports.BranchName = {}));
var Description;
(function (Description) {
    Description["BranchSelfServe"] = "Branch self-serve";
    Description["CashChequeDepositMachineCoin"] = "CashChequeDepositMachineCoin";
    Description["ExternalATMAudio"] = "ExternalAtmAudio";
    Description["InternalATMAudio"] = "InternalAtmAudio";
})(Description = exports.Description || (exports.Description = {}));
var Country;
(function (Country) {
    Country["Uk"] = "UK";
})(Country = exports.Country || (exports.Country = {}));
var ServiceAndFacility;
(function (ServiceAndFacility) {
    ServiceAndFacility["AccountVerificationService"] = "AccountVerificationService";
    ServiceAndFacility["AssistedServiceCounter"] = "AssistedServiceCounter";
    ServiceAndFacility["BusinessDepositTerminal"] = "BusinessDepositTerminal";
    ServiceAndFacility["ExternalQuickServicePoint"] = "ExternalQuickServicePoint";
    ServiceAndFacility["InternalQuickServicePoint"] = "InternalQuickServicePoint";
    ServiceAndFacility["QuickDeposit"] = "QuickDeposit";
    ServiceAndFacility["SaturdayCounterService"] = "SaturdayCounterService";
    ServiceAndFacility["SelfServiceAccountOpening"] = "SelfServiceAccountOpening";
})(ServiceAndFacility = exports.ServiceAndFacility || (exports.ServiceAndFacility = {}));
var Type;
(function (Type) {
    Type["Physical"] = "Physical";
})(Type = exports.Type || (exports.Type = {}));
