import { GlobalConfig } from "./globalConfig";

export let proxyPrefix = '';

let win = window as unknown as {globalConfig?: GlobalConfig}

if(win.globalConfig && win.globalConfig?.proxyPrefix){
    proxyPrefix = win.globalConfig?.proxyPrefix;
}