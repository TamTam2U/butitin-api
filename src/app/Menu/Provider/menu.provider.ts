import { category, item } from "src/app/entity";

export const MenuProviders = [
    {
        provide: 'ITEM_REPOSITORY',
        useValue: item,
    },
    {
        provide: 'CATEGORY_REPOSITORY',
        useValue: category,
    }
]