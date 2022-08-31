// @ts-ignore
// tslint:disable-next-line:no-submodule-imports
import series from 'async/series';
import { CallBack } from './IHook';
export default class AsyncSeriesHook  {
  private tasks: any[];
  private args: any[] = [];
  constructor(...args: any[]) {
    this.tasks = [];
  }

  public promise(...args: any[]): void {
    this.args = args;
    return series(this.tasks);
  }
  public tapPromise(name: string, cb: CallBack) {
    this.tasks.push(async (callback: any) => {
      await cb(...this.args);
      callback(null, name);
    });
  }
}
