SELECT t1.id, t1.place_time, t2.id, t2.username  FROM places AS t1 JOIN users AS t2  ON t1.id = t2.id;