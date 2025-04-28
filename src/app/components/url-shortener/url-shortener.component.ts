import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GraphqlsService } from 'src/app/services/graphqls.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-url-shortener',
  templateUrl: './url-shortener.component.html',
  styleUrls: ['./url-shortener.component.css']
})


export class UrlShortenerComponent implements OnInit {
  longUrl: string = ""; // dùng để lưu URL người dùng nhập trên giao diện
  shortUrl: string = ""; // dùng để lưu short URL được tọa ra từ longUrl
  qrCodeUrl: string = "";
  errorMessage: string = "";
  tinyUrl: string = ""; // dùng để lưu đường dẫn gốc khi người dùng click vào 1 shortUrl
  choosed: boolean = false;
  dialogShare: boolean = false;

  sharePlatforms = [
    { name: "Facebook", icon: "fa-facebook fa-beat-fade", url: "https://www.facebook.com/sharer/sharer.php?u=" },
    { name: "Twitter", icon: "fa-twitter fa-fade", url: "https://twitter.com/intent/tweet?url=" },
    { name: "Whatsapp", icon: "fa-whatsapp fa-spin fa-spin-reverse", url: "https://api.whatsapp.com/send?text=" },
    { name: "Linkedin", icon: "fa-linkedin fa-spin", url: "https://www.linkedin.com/shareArticle?url=" },
    { name: "Email", icon: "fa-envelope fa-flip", url: "mailto:?subject=Check%20this%20out&body=" }
  ];


  constructor(private urlService: UrlService, private graphQL: GraphqlsService) { }

  ngOnInit(): void {
  }

  shortenUrlGraphQL() {
    if (!this.longUrl) {
      this.errorMessage = "Please enter a valid URL";
      return;
    }

    this.graphQL.shortenUrl(this.longUrl).subscribe({
      next: (result) => {
        this.errorMessage = "";
        this.shortUrl = result.data.shortenUrl.data;
        this.tinyUrl = "http://localhost:8080/api/v1/tiny-url/" + result.data.shortenUrl.data;
        this.getQRCodeGraphQL(this.shortUrl);
      },
      error: (error) => {
        this.errorMessage = "Error occurs during shorten URLs.";
      }
    });
  }

  getQRCodeGraphQL(tinyUrl: string) {
    this.graphQL.getQRCode(tinyUrl).subscribe({
      next: (response) => {
        // const reader = new FileReader();
        // reader.onload = () => {
        //   this.qrCodeUrl = reader.result as string;
        // };
        // reader.readAsDataURL(response);

        this.qrCodeUrl = `data:image/png;base64,${response.data.getQRCode}`; // prefix "data:image/png;base64" là format chuẩn để browser biết đây là dạng base64.
      },
      error: (error) => {
        console.log("Error occurs during generate QR Code.", error);
      }
    });
  }

  // Tạo shortUrl
  shortenUrl() {
    if (!this.longUrl) {
      this.errorMessage = "Please enter a valid URL";
      return;
    }

    this.urlService.createShortUrl(this.longUrl).subscribe({
      next: (response) => {
        this.shortUrl = response.shortUrl;
        this.errorMessage = "";
        this.getQRCode(this.shortUrl);
        this.tinyUrl = "http://localhost:8080/api/v1/tiny-url/" + this.shortUrl;
      },
      error: (error) => {
        alert("Error occurs during shorten URLs.");
        this.errorMessage = "Failed to shorten URL";
      }
    });
  }

  // Lấy truy cập vào đường dẫn gốc thông qua tiny URL (shortUrl)
  getShortUrl(shortUrl: string) {
    this.urlService.getShortUrl(shortUrl).subscribe({
      next: (response) => {
        console.log("Chuyển hướng đến đường dẫn gốc khi click vào shortUrl.");
      },
      error: (error) => {
        console.log("Có lỗi xảy ra khi truy cập vào tiny URL, ", error);
      }
    });
  }

  // Tạo mã QR Code cho shortUrl
  getQRCode(shortUrl: string) {
    this.urlService.getQRCode(shortUrl).subscribe({
      next: (response) => {
        //Fe hiển thị QR Code do Be trả về content-type: image/png
        const reader = new FileReader();
        reader.onload = () => {
          this.qrCodeUrl = reader.result as string;
        };
        reader.readAsDataURL(response);
      },
      error: (error) => {
        alert("Có lỗi xảy ra trong khi tạo QR Code cho Tiny URL");
        this.errorMessage = "Failed to generate QR Code";
        console.log("Error, ", error);
      }
    });
  }

  displayQRCode() {
    this.choosed = !this.choosed;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.tinyUrl).then(() => {
      alert("Text copied to clipboard");
    }).catch((err) => {
      console.log("Error copying text to clipboard: ", err);
    })
  }

  showDialogShare() {
    this.dialogShare = !this.dialogShare;
    // alert("DialogShare: " + this.dialogShare);
  }

  confirmAccess(event: Event) {
    if (!confirm("Are you sure you want to access this URL?")) { // user ko confirm
      event.preventDefault(); // chặn access
    }
  }

}
