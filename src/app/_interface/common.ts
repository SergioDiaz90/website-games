export interface Ifields {
    image : {
        alt_text?: any,
        content_type?: string,
        description?: string, 
        tags?: string[],
        title: string,
        url: string,
        uuid?: string
    }
}

export interface dataCardWithGameMemory {
    fields: Ifields,
    meta: object
}

