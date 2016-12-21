import sys
from opencog.pymoses import moses

moses=moses()
def run(argv):
	args=sys.argv[1]
	#print args
	output = moses.run(args=args, scheme=True)
	result = moses.scheme_result(output)
	return result

def result(argv , content ):
	output=sys.argv[2]
	of=open(output, "w")
	of.write(content)

if __name__ == '__main__':
	#print sys.argv
	output=run(sys.argv)
	result(sys.argv,output)
