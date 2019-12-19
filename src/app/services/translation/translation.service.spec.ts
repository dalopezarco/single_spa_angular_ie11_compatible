import { TestBed } from "@angular/core/testing";

import { TranslationService } from "./translation.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TranslateModule } from "@ngx-translate/core";

describe("TranslationService", () => {
    let service: TranslationService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), HttpClientTestingModule]
        });
        service = TestBed.get(TranslationService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
