// @ts-ignore
// tslint:disable-next-line:no-submodule-imports
import waterfall from 'async/waterfall';
import { CallBack, IHook } from './IHook';
export default class AsyncWaterfallHook  {
  private tasks: any[];
  constructor(...args: any[]) {
    this.tasks = [];
  }

  public async promise(...args: any[]): Promise<any> {
    let err, result;
    await waterfall(this.tasks, (err: Error, result: any[]) =>{
      err = err;
      result = result;
    });
    return {err, result};
  }
  public tapPromise(name: string, cb: CallBack) {
    if (this.tasks.length === 0) {
      this.tasks.push(async(callback: any) => {
        const value = await cb();
        callback(value ? null : false, value);
      });
    } else {
      this.tasks.push(async (arg: any, callback: any) => {
        const value = await cb();
        callback(value ? null : false, name);
      });
    }
  }
}
