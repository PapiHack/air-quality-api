export class Utils {
  static wrapResponse(data: any) {
    return {
      Result: { Pollution: data },
    };
  }
}
