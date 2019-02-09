import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'stations-select',
  templateUrl: './stations-select.component.html',
  styleUrls: ['./stations-select.component.scss']
})
export class StationsSelectComponent {
  @Input() icon: string;
  @Input() title: string;
  @Input() stationsList: any[];

  @Output() changeStation = new EventEmitter<string>();

  public selectedStationCode: string;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `rail`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/rail.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `bus`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/bus.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `lua`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/lua.svg`)
    );
  }

  getStationCode(value: string): void {
    console.log(value);
    this.selectedStationCode = value;
    this.changeStation.emit(this.selectedStationCode);
  }
}
