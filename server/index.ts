import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { useMessenger } from '@Server/systems/messenger.js';

import { modSlotNames, VehicleModData } from './src/VehicleModData.js';
import { tuningShopEvents } from '../shared/events.js';
import { BlipColor } from '@Shared/types/blip.js';

const Rebar = useRebar();
const Messenger = useMessenger();

const blipPos = new alt.Vector3(-335.7363, -137.3934, 38.3619);
const tuningCol = Rebar.controllers.useInteraction(new alt.ColshapeCircle(-335.7363, -137.3934, 5), 'vehicle');

const tuningBlip = Rebar.controllers.useBlipGlobal({
    pos: blipPos,
    color: BlipColor.DARK_PURPLE,
    sprite: 446,
    shortRange: false,
    text: 'Tuning Shop',
    scale: 1,
  });

tuningCol.on(openMenu);
tuningCol.setMessage('enter', `Press 'E' to open shop`);

Messenger.commands.register({
    name: 'setmodkit',
    desc: 'Sets Vehicle Modkit to 1',
    callback: (player: alt.Player) => {
        const pVehicle = player.vehicle;

        if (!pVehicle) {
            alt.log(`Player is not in vehicle`);
        }

        pVehicle.modKit = 1;
    },
});

function getVehicleMods(vehicle: alt.Vehicle): VehicleModData[] {
    const vehicleMods: VehicleModData[] = [];

    for(let modType = 0; modType < 68; modType++) {
        const modValue = vehicle.getMod(modType);
        const modsCount = vehicle.getModsCount(modType);

        if (modsCount > 0) {
            vehicleMods.push({
                modType,
                modValue,
                modsCount,
                modSlotName: modSlotNames[modType] || 'Unknown Mod Slot'
            });
        }
    }

    return vehicleMods;
}

function openMenu(player: alt.Player) {
    const webview = Rebar.player.useWebview(player);
    const pVehicle = player.vehicle;

    webview.show('TuningShop', 'page', false);
    webview.emit(tuningShopEvents.toWebview.sendVehicleMods, getVehicleMods(pVehicle));
}

function previewMods(player: alt.Player, modData) {
    const pVehicle = player.vehicle;
    const { modType, modIndex } = modData;

    pVehicle.setMod(modType, modIndex);
}

function cancelMenu(player: alt.Player, originalMods) {
    const pVehicle = player.vehicle;
    const webview = Rebar.player.useWebview(player);

    originalMods.forEach((mod) => {
        pVehicle.setMod(mod.modType, mod.modValue);
    });

    webview.hide('TuningShop');
}

function saveVehicleMods(player: alt.Player, vehicleMods: { modType: number, modValue: number }[]) {
    const pVehicle = player.vehicle;
    const document = Rebar.document.vehicle.useVehicle(pVehicle);
    const webview = Rebar.player.useWebview(player);

    if (!document.get()) {
        return;
    }

    const mods: { [key: string]: number } = {};

    for (let i = 0; i < 70; i++) {
        const modValue = pVehicle.getMod(i);
        if (modValue !== -1) {
            mods[i] = modValue;
        }
    }

    document.set('mods', mods);
    webview.hide('TuningShop');
}

alt.onClient(tuningShopEvents.toServer.previewMods, previewMods);
alt.onClient(tuningShopEvents.toServer.cancelMenu, cancelMenu);
alt.onClient(tuningShopEvents.toServer.saveMods, saveVehicleMods);