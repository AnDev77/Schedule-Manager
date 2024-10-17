CREATE TABLE users (

	id INT AUTO_INCREMENT PRIMARY KEY,

	email VARCHAR(45) NOT NULL,

	password VARCHAR(45) NOT NULL

);


CREATE TABLE scheduleMembers (

	user_id INT,

	schedule_id INT,

	FOREIGN KEY (user_id) REFERENCES users(id),

	FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);


CREATE TABLE schedules (

	id INT AUTO_INCREMENT PRIMARY KEY,

	user_id INT,

	title VARCHAR(45) NOT NULL,
	
	start_date DATE NOT NULL,
    
	end_date DATE NOT NULL,
    
    	start_time TIME,
	
    	end_time  TIME,

	repet_type INT NOT NULL,  --0 : non-repetition, 1 : weekly, 2 : montly

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
);


CREATE TABLE notifications (

    id INT AUTO_INCREMENT PRIMARY KEY,

    schedule_id INT NOT NULL,        

    user_id INT NOT NULL,            

    notify_time DATETIME NOT NULL,   

    FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO schedules (user_id, title, start_date, end_date, repet_type) VALUES(1, "반복되는 스케줄","2024-09-18", "2024-09-20", 1);
