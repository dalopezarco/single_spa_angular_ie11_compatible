import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MainMenuComponent } from "./main-menu.component";
import { ZoomMenuModule } from "@zoomui/menu";

describe("MainMenuComponent", () => {
    let fixture: ComponentFixture<MainMenuComponent>;
    let component: MainMenuComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainMenuComponent],
            imports: [ZoomMenuModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainMenuComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should create component", () => {
        expect(component).toBeTruthy();
    });
});
