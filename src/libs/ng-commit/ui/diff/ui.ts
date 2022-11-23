import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as Diff2Html from 'diff2html';

@Component({
  selector: `my-diff`,
  template: `<div style="position:relative" [innerHtml]="outputHtml"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiffComponent implements OnChanges {
  @Input()
  diff: string | null = '';

  public outputHtml = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.diff) {
      this.outputHtml = Diff2Html.html(changes.diff.currentValue ?? '', {
        drawFileList: true,

        matching: 'lines',
      });
      this.cdr.markForCheck();
    }
  }
}
