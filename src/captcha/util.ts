// Copyright (C) 2021-2022 Prosopo (UK) Ltd.
// This file is part of provider <https://github.com/prosopo-io/provider>.
//
// provider is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// provider is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with provider.  If not, see <http://www.gnu.org/licenses/>.
import { blake2AsHex } from '@polkadot/util-crypto';

export function hexHash (data: string | Uint8Array): string {
    return blake2AsHex(data)
}

export async function imageHash (path: string) {
    // data must remain in the same order so load images synchronously
    // const fileBuffer = await readFile(path)
    // TODO
    return hexHash(path)
}

