// Copyright (C) 2021-2022 Prosopo (UK) Ltd.
// This file is part of contract <https://github.com/prosopo-io/contract>.
//
// contract is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// contract is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with contract. If not, see <http://www.gnu.org/licenses/>.
import {DispatchError} from "@polkadot/types/interfaces";

export class ProsopoEnvError extends Error {
  constructor(error: Error | string, context?: string, ...params: any[]) {
    const isError = error instanceof Error;
    super(isError ? error.message : error);
    this.name = context && `${ProsopoEnvError.name}@${context}` || ProsopoEnvError.name;
    if (isError) {
      this.cause = error;
    }
    // TODO: if env.debug
    console.error('\n********************* ERROR *********************\n');
    console.error(this.cause, this.stack, ...params);
  }
}

export class ProsopoContractError extends Error {
  constructor(error: DispatchError | string, context?: string, ...params: any[]) {
    if (typeof error === "string") {
      super(error)
    } else {
      const mod = error.asModule;
      const dispatchError = error.registry.findMetaError(mod);
      super(`${dispatchError.section}.${dispatchError.name}`)
    }

    this.name = context && `${ProsopoContractError.name}@${context}` || ProsopoContractError.name;
    console.error('\n********************* ERROR *********************\n');
    console.error(error, this.stack, ...params);
  }
}

