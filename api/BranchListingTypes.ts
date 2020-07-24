export interface BranchListingModel {
    BrandName: string;
    Branch:    Branch[];
}

export interface Branch {
    Identification:           string;
    SequenceNumber:           string;
    Name:                     BranchName;
    Type:                     Type;
    Photo?:                   string;
    CustomerSegment:          CustomerSegment[];
    ServiceAndFacility?:      ServiceAndFacility[];
    Accessibility?:           Accessibility[];
    OtherServiceAndFacility?: OtherServiceAndFacility[];
    Availability:             Availability;
    PostalAddress:            PostalAddress;
}

export enum Accessibility {
    AutomaticDoors = "AutomaticDoors",
    ExternalRamp = "ExternalRamp",
    InductionLoop = "InductionLoop",
    InternalRamp = "InternalRamp",
    LevelAccess = "LevelAccess",
    LowerLevelCounter = "LowerLevelCounter",
    WheelchairAccess = "WheelchairAccess",
}

export interface Availability {
    StandardAvailability: StandardAvailability;
}

export interface StandardAvailability {
    Day: Day[];
}

export interface Day {
    Name:         DayName;
    OpeningHours: OpeningHour[];
}

export enum DayName {
    Friday = "Friday",
    Monday = "Monday",
    Saturday = "Saturday",
    Sunday = "Sunday",
    Thursday = "Thursday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
}

export interface OpeningHour {
    OpeningTime: OpeningTime;
    ClosingTime: ClosingTime;
}

export enum ClosingTime {
    The0000 = "00:00",
    The1200 = "12:00",
    The1230 = "12:30",
    The1300 = "13:00",
    The1330 = "13:30",
    The1400 = "14:00",
    The1430 = "14:30",
    The1500 = "15:00",
    The1530 = "15:30",
    The1600 = "16:00",
    The1603 = "16:03",
    The1630 = "16:30",
    The1700 = "17:00",
    The1730 = "17:30",
    The1800 = "18:00",
    The1900 = "19:00",
}

export enum OpeningTime {
    The0000 = "00:00",
    The0800 = "08:00",
    The0830 = "08:30",
    The0900 = "09:00",
    The0915 = "09:15",
    The0930 = "09:30",
    The1000 = "10:00",
    The1030 = "10:30",
    The1100 = "11:00",
    The1400 = "14:00",
}

export enum CustomerSegment {
    Business = "Business",
    Corporate = "Corporate",
    Personal = "Personal",
    Premier = "Premier",
    Private = "Private",
    SME = "SME",
    Select = "Select",
    Wealth = "Wealth",
}

export enum BranchName {
    BarclaysBank = "Barclays Bank",
    BarclaysBankASDA = "Barclays Bank (ASDA)",
    NameBarclaysBank = "Barclays bank",
}

export interface OtherServiceAndFacility {
    Name:        Description;
    Description: Description;
}

export enum Description {
    BranchSelfServe = "Branch self-serve",
    CashChequeDepositMachineCoin = "CashChequeDepositMachineCoin",
    ExternalATMAudio = "ExternalAtmAudio",
    InternalATMAudio = "InternalAtmAudio",
}

export interface PostalAddress {
    AddressLine?:        string[];
    BuildingNumber:      string;
    StreetName:          string;
    TownName:            string;
    CountrySubDivision?: string[];
    Country:             Country;
    PostCode:            string;
    GeoLocation:         GeoLocation;
}

export enum Country {
    Uk = "UK",
}

export interface GeoLocation {
    GeographicCoordinates: GeographicCoordinates;
}

export interface GeographicCoordinates {
    Latitude:  string;
    Longitude: string;
}

export enum ServiceAndFacility {
    AccountVerificationService = "AccountVerificationService",
    AssistedServiceCounter = "AssistedServiceCounter",
    BusinessDepositTerminal = "BusinessDepositTerminal",
    ExternalQuickServicePoint = "ExternalQuickServicePoint",
    InternalQuickServicePoint = "InternalQuickServicePoint",
    QuickDeposit = "QuickDeposit",
    SaturdayCounterService = "SaturdayCounterService",
    SelfServiceAccountOpening = "SelfServiceAccountOpening",
}

export enum Type {
    Physical = "Physical",
}
