export const modSlotNames: { [key: number]: string } = {
    0: 'Spoilers',
    1: 'Front Bumper',
    2: 'Rear Bumper',
    3: 'Side Skirt',
    4: 'Exhaust',
    5: 'Frame',
    6: 'Grille',
    7: 'Bonnet',
    8: 'Wing (Left wing)',
    9: 'Right wing',
    10: 'Roof',
    11: 'Engine',
    12: 'Brakes',
    13: 'Transmission',
    14: 'Horns',
    15: 'Suspension',
    16: 'Armor',
    17: 'Unknown Mod (11)',
    18: 'Turbo',
    19: 'Unknown Mod (19)',
    20: 'Custom tire smoke',
    21: 'Unknown Mod (21)',
    22: 'Xenon',
    23: 'Front Wheels',
    24: 'Back Wheels',
    25: 'Plate Holders',
    26: 'Plate Vanity',
    27: 'Trim Design',
    28: 'Ornaments',
    30: 'Dial Design',
    31: 'Door Interior',
    32: 'Seats',
    33: 'Steering Wheel',
    34: 'Shift Lever',
    35: 'Plaques',
    36: 'Rear Shelf',
    37: 'Trunk',
    38: 'Hydraulics',
    39: 'Engine Block',
    40: 'Air Filter',
    41: 'Strut Bar',
    42: 'Arch Cover',
    43: 'Antenna',
    44: 'Exterior Parts',
    45: 'Tank',
    46: 'Door / Windows',
    47: 'Wheels Rear Or Hydraulics',
    48: 'Livery',
    66: 'Primary Color',
    67: 'Secondary Color'
};


export interface VehicleModData {
    modType: number;
    modValue: number;
    modsCount: number;
    modSlotName: string;
}