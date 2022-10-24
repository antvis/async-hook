// @ts-ignore
// tslint:disable-next-line:no-submodule-imports
import waterfall from 'async/waterfall';
import { CallBack, IHook } from './IHook';
export default class AsyncWaterfallHook  {
  private tasks: any[];
  constructor(...args: any[]) {
    this.tasks = [];
  }

  public promise(...args: any[]): Promise<any> {
    return waterfall(this.tasks);
  }
  public tapPromise(name: string, cb: CallBack) {
    if (this.tasks.length === 0) {
      this.tasks.push((callback: any) => {
        cb()
        .then((value: any) =>{
          callback(null, value);
        })
      });
    } else {
      this.tasks.push( (arg: any, callback: any) => {
        cb(arg).then((v: any) =>{
          callback(null, v);
        })
      });
    }
  }
}
