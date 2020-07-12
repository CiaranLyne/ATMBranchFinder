export interface ATMListingModel {
    BrandName: string;
    ATM:       ATM[];
}

export interface ATM {
    Identification:      string;
    SupportedLanguages:  SupportedLanguage[];
    ATMServices:         ATMService[];
    Accessibility?:      Accessibility[];
    SupportedCurrencies: SupportedCurrency[];
    Branch:              Branch;
    Location:            Location;
}

export enum ATMService {
    Balance = "Balance",
    BillPayments = "BillPayments",
    CashWithdrawal = "CashWithdrawal",
    MiniStatement = "MiniStatement",
    MobilePaymentRegistration = "MobilePaymentRegistration",
    MobilePhoneTopUp = "MobilePhoneTopUp",
    PINChange = "PINChange",
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

export interface Branch {
    Identification: string;
}

export interface Location {
    PostalAddress: PostalAddress;
}

export interface PostalAddress {
    AddressLine?:        string[];
    BuildingNumber?:     string;
    StreetName:          string;
    TownName?:           string;
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

export enum SupportedCurrency {
    Gbp = "GBP",
}

export enum SupportedLanguage {
    En = "en",
}