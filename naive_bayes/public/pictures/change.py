import cv2 
import numpy 

def main():
    img = cv2.imread('ice_cream.jpg')
    # stream = open('icea_cream.')
    w = 640
    h = 960
    resized = cv2.resize(img, (w  //2, h //2), interpolation= cv2.INTER_AREA ) 
    cv2.imwrite('ice_cream_resized.png', resized)
    return 

main()