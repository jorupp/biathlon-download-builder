export interface Root {
    name: string
    title: string
    targets: any[]
    properties: Properties
    rails: Rail[]
  }
  
  export interface Properties {}
  
  export interface Rail {
    name: string
    title?: string
    layout: string
    properties: Properties2
    sections: Section[]
    hasNext: boolean
    id: string
  }
  
  export interface Properties2 {}
  
  export interface Section {
    name?: string
    properties: Properties3
    contents: (Content | undefined)[]
    type: string
  }
  
  export interface Properties3 {
    componentToUse?: string
    filterKey?: string
    filterValues?: string
    _NumberOfItems_?: string
    usePosterLayout?: string
  }
  
  export interface Content {
    isLTCU?: boolean
    isSTCU?: boolean
    serviceRef?: string
    technicals?: Technical[]
    id?: string
    title?: string
    Title?: string
    Actors?: any[]
    Rating: any
    Ratings: any
    duration?: number
    Description?: string
    Synopsis?: string
    Categories?: string[]
    Directors?: any[]
    Producers?: any[]
    seriesRef: any
    TmsId: any
    programmeId: any
    serviceId: any
    contentType: string
    playbackType?: string
    SeasonNumber: any
    episodeNumber: any
    Episode: any
    Year: any
    Images: any
    position?: number
    sportType: any
    ltcuRepresentationOfStcu?: boolean
    PromoImages?: any[]
    nodeRefs?: string[]
    DisplayPriority?: DisplayPriority
    InHomeBlockingRequired?: boolean
    period?: Period2
    CUStartDate?: number
    CUEndDate?: number
    type?: string
    contentRef?: string
    modelType?: string
    index?: number
  }
  
  export interface Technical {
    products: Product[]
    id: string
    media: Media
    isSTCU: boolean
    isLTCU: boolean
    period: Period
    mainContentRef: string
    Rating: any
    ServiceId?: string
    qmWatermark: boolean
    ProgramId?: string
    ProgrammeStartDate?: number
    ProgrammeEndDate?: number
  }
  
  export interface Product {
    id: string
    startPurchase: number
    endPurchase: number
    endValidity: number
    startValidity: number
    rentalDuration: any
    price: Price
    platformRef: any
    impulsive: boolean
    regions: any
    isFreemium: boolean
  }
  
  export interface Price {
    startPurchase: number
    endPurchase: number
    currency: string
    value: number
  }
  
  export interface Media {
    AV_PlaylistName: AvPlaylistName
  }
  
  export interface AvPlaylistName {
    id: any
    fileName: string
    drmId: string
    drmInstanceName: string
    format: any
    uri: string
  }
  
  export interface Period {
    duration: number
    start: number
    end: number
  }
  
  export interface DisplayPriority {}
  
  export interface Period2 {
    duration: number
    start: number
    end: number
  }
  