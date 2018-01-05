#!/usr/bin/env bash
# kill chrome
killall -s 9 ./node_modules/puppeteer/.local-chromium/linux-508693/chrome-linux/chrome
# remove old saves
rm -f *.png *.html *_.json
# return non-error status
exit 0