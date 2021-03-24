export namespace AdminActions {

    export class RecalculateMaterialComments {
        static readonly type = '[Admin] Recalculate material comments count';
    }

    export class RecalculateUsersNumbers {
        static readonly type = '[Admin] Recalculate users numbers';
    }

    export class CalculateCommentsNumber {
        static readonly type = '[Admin] Calculate comments numbers';
    }

    export class UpdateMaterialCommentsCount {
        static readonly type = '[Admin] Update material comments count';
        public constructor(public readonly payload: string) {}
    }

    export class UpdateUsersNumbersCount {
        static readonly type = '[Admin] Update users numbers';
        public constructor(public readonly payload: string) {}
    }

    export class SendTestEmail {
        static readonly type = '[Admin] Send test email';
        public constructor(public readonly payload: string) {}
    }
}