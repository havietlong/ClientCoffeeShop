import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scan-qr',
  standalone: true,
  imports: [MatToolbarModule, ZXingScannerModule],
  templateUrl: './scan-qr.component.html',
  styleUrl: './scan-qr.component.scss'
})

export class ScanQrComponent {
  constructor(private router: Router) {}

  handleQrCodeResult(resultString: string) {
    console.log(resultString);
    this.router.navigate(['/menu'], { queryParams: { tableId: resultString } });
  }
}

