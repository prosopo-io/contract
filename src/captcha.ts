import {Dataset, DatasetSchema} from "./types/captcha";
import {ERRORS} from './errors'
import {CaptchaMerkleTree} from "./merkle";

const {blake2AsU8a, blake2AsHex} = require('@polkadot/util-crypto');

function hash(data: string | Uint8Array): Uint8Array {

    return blake2AsU8a(data);
}

export function hexHash(data: string | Uint8Array): string {
    return blake2AsHex(data);
}

export function addHashesToDataset(dataset: Dataset, tree: CaptchaMerkleTree): Dataset {
    try {
        dataset['captchas'] = dataset['captchas'].map((captcha, index) => (
            {captchaId: tree.leaves[index].hash, ...captcha}
        ))
        return dataset
    } catch (err) {
        throw(`${ERRORS.DATASET.HASH_ERROR.message}:\n${err}`);
    }

}

export function parseCaptchaDataset(captchaJSON: JSON): Dataset {
    try {
        return DatasetSchema.parse(captchaJSON)
    } catch (err) {
        throw(`${ERRORS.DATASET.PARSE_ERROR.message}:\n${err}`);
    }
}
