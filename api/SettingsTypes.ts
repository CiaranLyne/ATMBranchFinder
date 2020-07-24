export interface Settings {
    Master: Master;
    Banks:  Bank[];
}

export interface Bank {
    BrandName: string;
    URL:       string;
    IMG_DIR:   string;
}

export interface Master {
    IMG_ICON_DIR:   string;
    IMG_BANNER_DIR: string;
}
