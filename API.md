
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
**Endpoint**: GET/notifications  
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
        "notify_time": "YYYY-MM-DD HH:MM:SS"
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
