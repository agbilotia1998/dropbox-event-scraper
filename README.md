### Dropbox Events Scraper

* Install
  
  * [Docker]([Get Docker | Docker Documentation](https://docs.docker.com/get-docker/))

* Steps
  
  * Go to https://www.dropbox.com/events
  
  * open networks tab in chrome, filter by `/events/ajax`, right click on first result and click on copy-> copy as node.js fetch.
    
    * The node.js fetch should look something like this:
      
      * ```
        fetch("https://www.dropbox.com/events/ajax", {
          "headers": {
            "accept": "text/plain, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,hi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "locale=en; gvc=MTUyOTQ5Njc3NzI0MzM2MjI3NjI3OTEwNDI3MzE5ODkwMDUzOTk5; _ga=GA1.2.1247140008.1610457563; last_active_role=personal; _gid=GA1.2.158964997.1610556117; lid=AADNocw-0mTg7-gag6H_g5o7PCFcRnkAkoqm5xhmb57mfg; blid=AABr-ubOkuR8Ln_zR7AM_k_G0k2ZWMswwU9A9RuR7JclHQ; __Host-ss=8vnB8wnhTY; jar=W3sibnMiOiA4OTY1NzU5NzYwLCAicmVtZW1iZXIiOiB0cnVlLCAidWlkIjogMzgyNjkyOTA0MCwgImgiOiAiIiwgImV4cGlyZXMiOiAxNzA1MTY0MTIwfV0%3D; t=mXT3hPS0uP5Jqyp1uAgR5IGs; preauth=; __Host-js_csrf=mXT3hPS0uP5Jqyp1uAgR5IGs; bjar=W3sidGVhbV9pZCI6ICIiLCAicm9sZSI6ICJwZXJzb25hbCIsICJ1aWQiOiAzODI2OTI5MDQwLCAic2Vzc19pZCI6IDI3MTE1NDM3MTYzODcyODI4MTU0MTk2OTAzNzA2NzYyMjQyMTc0NSwgImV4cGlyZXMiOiAxNzA1MTY0MTIwLCAidXNlcl9naWQiOiAiQUFxYW4zZU5ORzVqSndqX0FqNlZ6aDR6In1d; db-help-center-uid=ZXlKMllXeDFaU0k2SUhzaWRXbGtJam9nTXpneU5qa3lPVEEwTUgwc0lDSnphV2R1WVhSMWNtVWlPaUFpUVVGQlJrcFpaa2xZVFZoRU0xQldiREJNVUdGQldXTmplVkJxZDNsNFpWSm5UbDlZY21GamJGaGFMVlJLZHlKOQ%3D%3D; utag_main=v_id:0176f6c03fae00c3bce964dc6e5803079002d07100b7e$_sn:2$_se:3$_ss:0$_st:1610557921231$ses_id:1610556113157%3Bexp-session$_pn:1%3Bexp-session"
          },
          "referrer": "https://www.dropbox.com/events",
          "referrerPolicy": "origin-when-cross-origin",
          "body": "is_xhr=true&t=mXT3hPS0uP5Jqyp1uAgR5IGs&page_size=25&ns_ids=8965546032%2C8965759760&timestamp=1610559894&include_avatars=true",
          "method": "POST",
          "mode": "cors"
        });
        ```
    
    * Copy the object from above like:
      
      * ```
        {
          "headers": {
            "accept": "text/plain, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,hi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "locale=en; gvc=MTUyOTQ5Njc3NzI0MzM2MjI3NjI3OTEwNDI3MzE5ODkwMDUzOTk5; _ga=GA1.2.1247140008.1610457563; last_active_role=personal; _gid=GA1.2.158964997.1610556117; lid=AADNocw-0mTg7-gag6H_g5o7PCFcRnkAkoqm5xhmb57mfg; blid=AABr-ubOkuR8Ln_zR7AM_k_G0k2ZWMswwU9A9RuR7JclHQ; __Host-ss=8vnB8wnhTY; jar=W3sibnMiOiA4OTY1NzU5NzYwLCAicmVtZW1iZXIiOiB0cnVlLCAidWlkIjogMzgyNjkyOTA0MCwgImgiOiAiIiwgImV4cGlyZXMiOiAxNzA1MTY0MTIwfV0%3D; t=mXT3hPS0uP5Jqyp1uAgR5IGs; preauth=; __Host-js_csrf=mXT3hPS0uP5Jqyp1uAgR5IGs; bjar=W3sidGVhbV9pZCI6ICIiLCAicm9sZSI6ICJwZXJzb25hbCIsICJ1aWQiOiAzODI2OTI5MDQwLCAic2Vzc19pZCI6IDI3MTE1NDM3MTYzODcyODI4MTU0MTk2OTAzNzA2NzYyMjQyMTc0NSwgImV4cGlyZXMiOiAxNzA1MTY0MTIwLCAidXNlcl9naWQiOiAiQUFxYW4zZU5ORzVqSndqX0FqNlZ6aDR6In1d; db-help-center-uid=ZXlKMllXeDFaU0k2SUhzaWRXbGtJam9nTXpneU5qa3lPVEEwTUgwc0lDSnphV2R1WVhSMWNtVWlPaUFpUVVGQlJrcFpaa2xZVFZoRU0xQldiREJNVUdGQldXTmplVkJxZDNsNFpWSm5UbDlZY21GamJGaGFMVlJLZHlKOQ%3D%3D; utag_main=v_id:0176f6c03fae00c3bce964dc6e5803079002d07100b7e$_sn:2$_se:3$_ss:0$_st:1610557921231$ses_id:1610556113157%3Bexp-session$_pn:1%3Bexp-session"
          },
          "referrer": "https://www.dropbox.com/events",
          "referrerPolicy": "origin-when-cross-origin",
          "body": "is_xhr=true&t=mXT3hPS0uP5Jqyp1uAgR5IGs&page_size=25&ns_ids=8965546032%2C8965759760&timestamp=1610559894&include_avatars=true",
          "method": "POST",
          "mode": "cors"
        }
        ```
      * Add this user-agent manually in headers: <br>
        * Mac OS => "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" <br>
        * Windows => "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36" <br>
        
        Fetch options object finally look like this(for Mac OS):
        ```
        {
          "headers": {
            "accept": "text/plain, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,hi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "locale=en; gvc=MTUyOTQ5Njc3NzI0MzM2MjI3NjI3OTEwNDI3MzE5ODkwMDUzOTk5; _ga=GA1.2.1247140008.1610457563; last_active_role=personal; _gid=GA1.2.158964997.1610556117; lid=AADNocw-0mTg7-gag6H_g5o7PCFcRnkAkoqm5xhmb57mfg; blid=AABr-ubOkuR8Ln_zR7AM_k_G0k2ZWMswwU9A9RuR7JclHQ; __Host-ss=8vnB8wnhTY; jar=W3sibnMiOiA4OTY1NzU5NzYwLCAicmVtZW1iZXIiOiB0cnVlLCAidWlkIjogMzgyNjkyOTA0MCwgImgiOiAiIiwgImV4cGlyZXMiOiAxNzA1MTY0MTIwfV0%3D; t=mXT3hPS0uP5Jqyp1uAgR5IGs; preauth=; __Host-js_csrf=mXT3hPS0uP5Jqyp1uAgR5IGs; bjar=W3sidGVhbV9pZCI6ICIiLCAicm9sZSI6ICJwZXJzb25hbCIsICJ1aWQiOiAzODI2OTI5MDQwLCAic2Vzc19pZCI6IDI3MTE1NDM3MTYzODcyODI4MTU0MTk2OTAzNzA2NzYyMjQyMTc0NSwgImV4cGlyZXMiOiAxNzA1MTY0MTIwLCAidXNlcl9naWQiOiAiQUFxYW4zZU5ORzVqSndqX0FqNlZ6aDR6In1d; db-help-center-uid=ZXlKMllXeDFaU0k2SUhzaWRXbGtJam9nTXpneU5qa3lPVEEwTUgwc0lDSnphV2R1WVhSMWNtVWlPaUFpUVVGQlJrcFpaa2xZVFZoRU0xQldiREJNVUdGQldXTmplVkJxZDNsNFpWSm5UbDlZY21GamJGaGFMVlJLZHlKOQ%3D%3D; utag_main=v_id:0176f6c03fae00c3bce964dc6e5803079002d07100b7e$_sn:2$_se:3$_ss:0$_st:1610557921231$ses_id:1610556113157%3Bexp-session$_pn:1%3Bexp-session",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
          },
          "referrer": "https://www.dropbox.com/events",
          "referrerPolicy": "origin-when-cross-origin",
          "body": "is_xhr=true&t=mXT3hPS0uP5Jqyp1uAgR5IGs&page_size=25&ns_ids=8965546032%2C8965759760&timestamp=1610559894&include_avatars=true",
          "method": "POST",
          "mode": "cors"
        }
        ```
        
  * paste this into the options.json file (do not share this file publicly)
  
  * Set date ranges in `index.js` file in the following locations
    
    * ```
      const START_DATE = 'January 16, 2021 00:00:00 GMT+00:00'
      const END_DATE = 'January 17, 2021 00:00:00 GMT+00:00'
      ```
  
  * Open a command line inside the repo
    
    * For Windows
      
      - One method: Navigate to the project folder, hold down the Shift key and right-click the folder. The context menu will contain an entry, ‘Open PowerShell window here'.
  - Start the Docker
    
    - `docker build -t scraper .`
  
  - Run application
    
    - `docker run --name scraper_container scraper`
  
  - Export out file
    
    - `docker cp scraper_container:/scraper/output.csv ./output.csv`
