
curl -X POST \
     -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjY4MWJlZTZlY2EwYjFhYzZlMTMyZDUiLCJyb2xlIjoidGVhY2hlciIsImlhdCI6MTcyMTkwNDEyMSwiZXhwIjoxNzIxOTA3NzIxfQ.7GJGg87T2z_fpERsJ5ba7vq9QCqYNlzeouXwnNXzCeA' \
     -F 'title=logo' \
     -F 'image=@D:\develop\portfolio\public\images' \
     -F 'text=el logo de la academia' \
     http://localhost:9050/works \
     -v