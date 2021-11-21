/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { BeelockCheyner } from './beelock-cheyner';

@Info({title: 'BeelockCheynerContract', description: 'My Smart Contract' })
export class BeelockCheynerContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async beelockCheynerExists(ctx: Context, beelockCheynerId: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(beelockCheynerId);
        return (!!data && data.length > 0);
    }

    @Transaction()
    public async createBeelockCheyner(ctx: Context, beelockCheynerId: string, value: string): Promise<void> {
        const exists: boolean = await this.beelockCheynerExists(ctx, beelockCheynerId);
        if (exists) {
            throw new Error(`The beelock cheyner ${beelockCheynerId} already exists`);
        }
        const beelockCheyner: BeelockCheyner = new BeelockCheyner();
        beelockCheyner.value = value;
        const buffer: Buffer = Buffer.from(JSON.stringify(beelockCheyner));
        await ctx.stub.putState(beelockCheynerId, buffer);
        const eventPayload: Buffer = Buffer.from(`Created asset ${beelockCheynerId} (${value})`);
        ctx.stub.setEvent('myEvent', eventPayload);
    }

    @Transaction(false)
    @Returns('BeelockCheyner')
    public async readBeelockCheyner(ctx: Context, beelockCheynerId: string): Promise<BeelockCheyner> {
        const exists: boolean = await this.beelockCheynerExists(ctx, beelockCheynerId);
        if (!exists) {
            throw new Error(`The beelock cheyner ${beelockCheynerId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(beelockCheynerId);
        const beelockCheyner: BeelockCheyner = JSON.parse(data.toString()) as BeelockCheyner;
        return beelockCheyner;
    }

    @Transaction()
    public async updateBeelockCheyner(ctx: Context, beelockCheynerId: string, newValue: string): Promise<void> {
        const exists: boolean = await this.beelockCheynerExists(ctx, beelockCheynerId);
        if (!exists) {
            throw new Error(`The beelock cheyner ${beelockCheynerId} does not exist`);
        }
        const beelockCheyner: BeelockCheyner = new BeelockCheyner();
        beelockCheyner.value = newValue;
        const buffer: Buffer = Buffer.from(JSON.stringify(beelockCheyner));
        await ctx.stub.putState(beelockCheynerId, buffer);
    }

    @Transaction()
    public async deleteBeelockCheyner(ctx: Context, beelockCheynerId: string): Promise<void> {
        const exists: boolean = await this.beelockCheynerExists(ctx, beelockCheynerId);
        if (!exists) {
            throw new Error(`The beelock cheyner ${beelockCheynerId} does not exist`);
        }
        await ctx.stub.deleteState(beelockCheynerId);
    }

    @Transaction(false)
    public async queryAllAssets(ctx: Context): Promise<string> {
        const startKey = '000';
        const endKey = '999';
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString());

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString());
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString();
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

}
