export interface FieldConfig {
    name: string;
    type: string;
}

export interface Fields {
    [key: string]: FieldConfig;
}