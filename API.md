
# Schedule-Manager API 명세서

## User

### 회원가입
**Endpoint**: POST/users/join  
**Request**:
```json
{
    "email": "user@example.com",
    "password": "password"
}
```
**Response**:
```json
{
   "message" : "회원가입이 완료되었습니다."
}
```

### 로그인
**Endpoint**: POST/users/login  
**Request**:
```json
{
    "email": "user@example.com",
    "password": "password"
}
```
+ 쿠키(토큰) 저장  
**Response**:
```json
{
   "message" : "로그인 성공"
}
```

### 아이디 확인
**Endpoint**: POST/users/idcheck  
**Request**:
```json
{
    "email": "user@example.com"
}
```
**Response**:
```json
{
   "message": "id가 확인되었습니다."
}
```

### 비밀번호 변경
**Endpoint**: PUT/users/reset  
**Request**:
```json
{
    "email": "user@example.com",
    "password": "password"
}
```
+ 만약 JWT 토큰 존재 시 password만 입력  
**Response**:
```json
{
   "message": "비밀번호가 변경되었습니다."
}
```

### 회원탈퇴
**Endpoint**: DELETE/users/delete  
**Request**:
```json
{
    "email": "user@example.com"
}
```
+ 만약 JWT 토큰 존재 시 email 생략  
**Response**:
```json
{
   "message": "회원탈퇴 처리 되었습니다."
}
```

## Notification

### 알람 추가
**Endpoint**: POST/notifications  
**Request**:
```json
{
    "user_id": "user_id", // 숫자
    "schedule_id": "schedule_id", // 숫자
    "notify_time": "YYYY-MM-DD HH:MM:SS"
}
```
**Response**:
```json
{
   "message" : "알람이 추가되었습니다."
}
```

### 알람 조회
**Endpoint**: POST/notifications/all
**Request**:
```json
{
    "user_id": "user_id" // 숫자
}
```
**Response**:
```json
[
    {
        "id": "id",
        "schedule_id": "schedule_id",
        "user_id": "user_id",
        "notify_time": "YYYY-MM-DD HH:MM:SS",
        "title": "title_id",
        "start_date": "YYYY-MM-DD"
    }
]
```

### 알람 수정
**Endpoint**: PUT/notifications  
**Request**:
```json
{
    "id": "id", // 숫자, 그리고 notifications의 id를 의미
    "notify_time": "notify_time" 
}
```
**Response**:
```json
{
    "message" : "알람이 수정되었습니다."
}
```

### 알람 삭제
**Endpoint**: DELETE/notifications  
**Request**:
```json
{
    "id": "id" // 숫자(notifications_id)
}
```
**Response**:
```json
{
    "message" : "알람이 삭제되었습니다."
}
```

<br></br>
## Schedule

### 일정 추가
**Endpoint**: POST/schedules  
**Request**:
```json
{
    "user_id": 1,
    "title": "일정 제목",
    "start_date" : "2024-09-29",
    "end_date" : "2024-10-01",
    "repet_type"  : 1 // 0 : non-repetition, 1 : weelky, 2 : monthly
}
```
**Response**: HTTP-status-code 201

### 일정 조회
**Endpoint**: GET/schedules?calStartDate=2024-10-01&calEndDate=2024-10-01&user_id=1

**Request**:

**Response**: HTTP-status-code 200
```json
{
    "schedules"  : [{   "id" : 1
                        "title": "일정 제목",
                        "start_date" : "2024-10-01",
                        "end_date" : "2024-10-01",
                        "repet_type"  : 1 
                    },
                    {
                         "id" : 2
                        "title": "일정 제목",
                        "start_date" : "2024-10-12",
                        "end_date" : "2024-10-19",
                        "repet_type"  : 0
                    
                    }]
}
```

### 일정 삭제
**Endpoint**: DELETE/schedules/:id  

**Request**:

**Response**: HTTP-status-code 200


### 일정 수정
**Endpoint**: PUT/schedules  

**Request**:
```json
{
    "schedule_title": "변경할 일정 제목",   
}
```
**Response**: HTTP-status-code 200


### 일정 공유
**Endpoint**: POST/schedules/share  

**Request**:
```json
{
    "user_email": "user@mail.com"
    "invited_email": "invited@mail.com",
    "schedule_title" : "공유된 일정 제목",
}
```
**Response**: HTTP-status-code 201
