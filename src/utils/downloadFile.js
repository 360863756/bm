export function downloadFile(buffer, filename) {
  let blob = new Blob([buffer]);
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    let link = document.createElement('a');
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', false, false);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
}

/**
 * 根据axios响应提取文件名，下载文件
 * @param {AxiosResponse} axiosRes axios响应
 */
export function downloadFormAxiosRes(axiosRes) {
  const {
    'content-disposition': contentDisposition = '',
  } = axiosRes.headers || {};
  const reg = /filename=([^;]*);?/;
  const [, filename] = contentDisposition.match(reg) || [];
  const buffer = axiosRes.data;
  if (Object.prototype.toString.call(buffer) === '[object ArrayBuffer]') {
    downloadFile(buffer, decodeURIComponent(filename));
  } else {
    console.warn('不正确的文件流响应');
  }
}
