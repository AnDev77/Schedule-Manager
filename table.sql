CREATE TABLE users (

	id INT AUTO_INCREMENT PRIMARY KEY,

	email VARCHAR(45) NOT NULL,

	password VARCHAR(45) NOT NULL

);

  
CREATE TABLE teams (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(45) NOT NULL

);

CREATE TABLE TeamMembers (

	id INT AUTO_INCREMENT PRIMARY KEY,

	user_id INT,

	team_id INT,

	FOREIGN KEY (user_id) REFERENCES users(id),

	FOREIGN KEY (team_id) REFERENCES teams(id)
);


CREATE TABLE schedules (

	id INT AUTO_INCREMENT PRIMARY KEY,

	user_id INT,

	team_id INT DEFAULT NULL,

	title VARCHAR(45) NOT NULL,

	detail TEXT,

	start_date DATE NOT NULL,
    
    start_time TIME,
	
    end_time	TIME,

	end_date DATE NOT NULL,

	repeat_type ENUM('NONE', 'DAILY', 'WEEKLY', 'MONTHLY') NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id),

	FOREIGN KEY (team_id) REFERENCES teams(id)
);


CREATE TABLE notifications (

    id INT AUTO_INCREMENT PRIMARY KEY,

    schedule_id INT NOT NULL,        

    user_id INT NOT NULL,            

    notify_time DATETIME NOT NULL,   

    FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
