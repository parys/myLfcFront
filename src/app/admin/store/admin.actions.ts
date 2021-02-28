export namespace AdminActions {

    export class RecalculateMaterialComments {
        static readonly type = '[Admin] Recalculate material comments count';
    }

    export class RecalculateUsersNumbers {
        static readonly type = '[Admin] Recalculate users numbers';
    }

    export class UpdateMaterialCommentsCount {
        static readonly type = '[Admin] Update material comments count';
        public constructor(public readonly payload: string) {}
    }

    export class UpdateUsersNumbersCount {
        static readonly type = '[Admin] Update users numbers';
        public constructor(public readonly payload: string) {}
    }
}