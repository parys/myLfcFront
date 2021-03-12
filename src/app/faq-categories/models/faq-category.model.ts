import { FaqItem } from "@faq-items/models/faq-item.model";

export class FaqCategory {

    public id: number;

    public name: string;

    public forSiteTeam: boolean;

    public order: number;

    public items: FaqItem[];
}
