#!/bin/bash
sleep 5
curl -sf http://localhost:3000 > /dev/null
exit $?