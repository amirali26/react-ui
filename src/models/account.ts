import AccountUserInvitation from './accountUserInvitation';
import { AreasOfLegalPractice } from './areas-of-legal-practice';
import { User } from './user';

export enum AccountType {
    LONDON_LARGE_COMMERCIAL = 'LONDON_LARGE_COMMERCIAL',
    LONDON_AMERICAN_FIRMS = 'LONDON_AMERICAN_FIRMS',
    LONDON_MID_SIZED_COMMERCIAL = 'LONDON_MID_SIZED_COMMERCIAL',
    LONDON_SMALLER_COMMERCIAL = 'LONDON_SMALLER_COMMERCIAL',
    REGIONAL_FIRMS = 'REGIONAL_FIRMS',
    GENERAL_PRACTICE_SMALL_FIRMS = 'GENERAL_PRACTICE_SMALL_FIRMS',
    NATIONAL_MULTISITE_FIRMS = 'NATIONAL_MULTISITE_FIRMS',
    NICHE_FIRMS = 'NICHE_FIRMS',
}

export enum AccountPermission {
    ADMIN = 'ADMIN',
    BASIC = 'BASIC',
    READ_ONLY = 'READ_ONLY',
}

export type Account = {
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    website: string,
    size: AccountType,
    permissions: string[],
    registeredDate: string,
    areasOfPractice: AreasOfLegalPractice[],
    createdBy: User,
    createdAt: string,
    users?: User[],
    accountUserInvitations?: AccountUserInvitation[],
    permission: AccountPermission,
    postCode: string,
    address: string,
    region: string,
    imageUrl: string,
    areaInRegion: string,
    firmVerified: boolean,
}
