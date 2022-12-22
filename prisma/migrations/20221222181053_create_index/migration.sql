-- CreateIndex
CREATE INDEX "Driver_id_idx" ON "Driver"("id");

-- CreateIndex
CREATE INDEX "Passenger_id_idx" ON "Passenger"("id");

-- CreateIndex
CREATE INDEX "Ride_id_idx" ON "Ride"("id");

-- CreateIndex
CREATE INDEX "Vehicle_ownerId_idx" ON "Vehicle"("ownerId");
