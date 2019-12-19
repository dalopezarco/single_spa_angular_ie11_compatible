import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateDefaultParser } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { TranslationService } from './translation.service';

export class CustomParser extends TranslateDefaultParser {
  constructor() {
    super();
    this.templateMatcher = /{\s?([^{}\s]*)\s?}/g;
  }
}

// export class MyMissingTranslationHandler implements MissingTranslationHandler {
//   constructor() {}
//   handle(params: MissingTranslationHandlerParams) {
//     let subkey = '';
//     const parts = params.key.split('.');
//     if (parts.length > 2) {
//       for (let i = 2; i < parts.length; i++) {
//         subkey = subkey + parts[i];
//         if (i !== parts.length - 1) {
//           subkey = subkey + '.';
//         }
//       }
//       const res = params.translateService.getTranslation(params.translateService.getDefaultLang()).pipe(
//         map(x => {
//           if (x && x[parts[0]] && parts[1]) {
//             return x[parts[0] + '.' + parts[1]][subkey];
//           }
//         }),
//       );
//       return res;
//     }
//     return params.key;
//   }
// }

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  private commonTranslation = {};

  constructor() {}

  handle(params: MissingTranslationHandlerParams): string {
    const result = params.key.split('.').reduce((pre, cur) => (!!pre ? pre[cur] : null), this.commonTranslation);
    return !!result ? params.translateService.parser.interpolate(result, params.interpolateParams) : params.key;
  }
}

export function initTranslations(translationService: TranslationService): () => Promise<any> {
  return (): Promise<any> => translationService.setTranslations().toPromise();
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [],
})
export class CommonTranslationModule {}
