export class SaveCanvasResult {
  id: number | string;
  image: ArrayBuffer;
  page: number;
  isChanged: boolean;

  constructor(
    id: number | string,
    image: ArrayBuffer,
    page: number,
    originalImage: ArrayBuffer | undefined,
    isChanged: boolean,
  ) {
    this.id = id;
    this.image = image;
    this.page = page;

    if (isNaN(Number(id))) {
      this.id = 0;
      this.isChanged = true;
      return;
    }

    if (isChanged) {
      this.isChanged = true;
      return;
    }    

    if (typeof id === "number") {
      this.id = String(id);
    }
    // 이미지끼리 변경된게 있는지 비교
    const originalImageData = new Uint8Array(originalImage ?? []);
    const imageData = new Uint8Array(this.image);
    this.isChanged =
      !originalImage ||
      !originalImageData.every((value, index) => value === imageData?.[index]);
  }
}