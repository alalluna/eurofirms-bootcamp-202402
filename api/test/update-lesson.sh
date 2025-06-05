

curl -X PATCH -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjNiM2ZkYTIyMzJmNjI3NjMxZTExMGYiLCJyb2xlIjoidGVhY2hlciIsImlhdCI6MTcxNzg0NDEyMywiZXhwIjoxNzE3ODQ3NzIzfQ.MRb2LW3vyghgW4dHO8B8fhXAAiXwGJ_jku40KHr48m8' \
-H 'Content-Type: application/json' \
-d '{'title': 'Exercise four', 'image': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0LgvYhNnRHtoadYxvakXsj4VR_3gWnISLv4GJ9jbXxi-xxDNnHS2mNmaK9C8hQBhLMam_dSHtVZqz2TjAPbzvEQLKUPo05L-PZT2pnaoyk-DKQAtjowi2-_lqc9reROA_rAcLyxPX8w/s1600/complejas-man-maier01.jpg', 'description': 'En la sesión de hoy hablaremos sobre el encaje', 'link': 'https://prezi.com/view/xo9vedpOpYYxyaGP0l21/', 'video': 'https://www.youtube.com/watch?v=iFQZcZPH7u4&t=23s'}' \
http://localhost:9050/lessons/6661a4f4800dad6e2be6c0ef -v