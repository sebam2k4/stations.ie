import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { IrishRailStation } from '../../../../api/irish-rail/irish-rail.model';

@Component({
  selector: 'stations-select',
  templateUrl: './stations-select.component.html',
  styleUrls: ['./stations-select.component.scss']
})

export class StationsSelectComponent implements OnInit, OnDestroy {
  @Input() icon: string;
  @Input() title: string;
  @Output() changeStation = new EventEmitter<IrishRailStation>();

  public stationFormCtrl: FormControl = new FormControl();
  public stationFilterCtrl: FormControl = new FormControl();
  public filteredStations: ReplaySubject<IrishRailStation[]> = new ReplaySubject<IrishRailStation[]>(1);
  protected _onDestroy = new Subject<void>();
  private _stationsList = new BehaviorSubject<IrishRailStation[]>([]);

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

  @Input() set stationsList(value: IrishRailStation[]) {
    this._stationsList.next(value);
  }

  get stationsList() {
    return this._stationsList.getValue();
  }

  ngOnInit() {
    // Make sure async data from parent is available
    this._stationsList.subscribe(stationsList => {
      if (stationsList) {
        // load the initial stations list
        this.filteredStations.next(stationsList.slice());

        // listen for search field value changes
        this.stationFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterStations();
          });
      }
    });
  }

  protected filterStations() {
    if (!this.stationsList) {
      return;
    }

    // get the search keyword
    let search = this.stationFilterCtrl.value;
    if (!search) {
      this.filteredStations.next(this.stationsList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // filter the stations
    this.filteredStations.next(
      this.stationsList.filter(station => station.stationFullName.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public getStation(station: IrishRailStation): void {
    this.changeStation.emit(station);
  }
}
